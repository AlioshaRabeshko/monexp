import squel from 'squel';
import {omit} from '../utils/utils';
import moment from 'moment';

class SqlDAO {
  constructor(connection, table, fields, selectQuery) {
    this._connection = connection;
    this._table = table;
    this._fields = fields;
    this._selectQuery = selectQuery
  }

  _transactionPromiseWrapper(query, args) {
    return new Promise((resolve, reject) => 
      this._connection.transaction(
        tx => tx.executeSql(query, args, (tx, res) => resolve(res), reject)
      )
    );
  }

  _restrictRecords(records) {
    let recordsArray = records;
    if (!Array.isArray(records)) {
      recordsArray = [records];
    }

    const restrictedRecords = [];
    for (const record of recordsArray) {
      const restricted = omit(record, this._fields);
      if (restricted) {
        restrictedRecords.push(restricted);
      }
    }
    return restrictedRecords;
  }

  _restrictFields(fields) {
    if (!Array.isArray(fields)) {
      return [fields];
    }

    const restrictedFields = {};
    for (const field of fields) {
      if (Object.keys(this._fields).includes(field)) {
        restrictedFields[field] = this._fields[field];
      } else {
        console.warn(`Unknown field ${field}`);
      }
    }
    return restrictedFields;
  }

  _restrictFilters(filters) {
    const restrictedFilters = {};
    for (const filter of Object.keys(filters)) {
      if (Object.keys(this._fields).includes(filter)) {
        restrictedFilters[this._fields[filter]] = filters[filter];
      } else {
        console.warn(`Unknown filter ${filter}, skiping...`);
      }
    }
    return restrictedFilters;
  }

  _applyFilters(query, filters) {
    const restrictFilters = this._restrictFilters(filters);
    for (const field in restrictFilters) {
      if (typeof restrictFilters[field] === 'string') {
        query.where(field, filters[field]);
        continue;
      }

      switch (Object.keys(restrictFilters[field])[0]) {
        case 'in':
          query.where(`${field} IN ?`, restrictFilters[field].in);
          break;
        case 'between':
          query.where(`${field} BETWEEN ? AND ?`, restrictFilters[field].between[0], restrictFilters[field].between[1])
        case 'dateBetween':
          query.where(`${field} BETWEEN ? AND ?`,
            moment(restrictFilters[field].dateBetween[0]).format('YYYY-MM-DD HH:mm:ss'),
            moment(restrictFilters[field].dateBetween[1]).format('YYYY-MM-DD HH:mm:ss')
          )
        default:
          break;
      }
    }
  }

  _applyLimitOffset(query, limit, offset) {
    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }
  }

  _applyOrder(query, orders) {
    if (orders) {
      if (!Array.isArray(orders)) {
        throw new Error('Wrong order structure');
      }

      for (const order of orders) {
        if (!Array.isArray(order)) {
          throw new Error(`Wrong order ${order[0]}`);
        }

        query.order(order[0], order[1].toUpperCase() === 'ASC')
      }
    }
  }

  async read(fields, filters, orders, limit, offset) {
    if (!fields) {
      throw new Error('Nothing to select');
    }

    const readQuery = this._selectQuery ? this._selectQuery.clone() : squel.select().from(this._table);

    const restrictedFields = this._restrictFields(fields);
    for (const field in restrictedFields) {
      readQuery.field(restrictedFields[field], field);
    }
    this._applyFilters(readQuery, filters);
    this._applyOrder(readQuery, orders);
    this._applyLimitOffset(readQuery, limit, offset);

    // console.log(readQuery.toString());
    let records;
    try {
      records = await this._transactionPromiseWrapper(readQuery.toString());
    } catch (error) {
      throw error;
    }

    return {records: records.rows._array, length: records.rows.length};
  }

  async create(records) {
    if (!records) {
      throw new Error('Nothing to insert');
    }

    const insertQuery = squel.insert().into(this._table);

    const restrictedRecords = this._restrictRecords(records);
    insertQuery.setFieldsRows(restrictedRecords);

    let recordIds;
    try {
      recordIds = await this._transactionPromiseWrapper(insertQuery.toString());
    } catch (error) {
      throw error;
    }

    if (!recordIds) {
      throw new Error('Something went wrong');
    }
    
    return recordIds
  }

  async update(record, filters) {
    if (!record) {
      throw new Error('Nothing to update');
    }

    const updateQuery = squel.update().table(this._table);

    const restrictedRecords = omit(record, ['id']);
    updateQuery.setFields(restrictedRecords);
    this._applyFilters(updateQuery, filters);

    return this._transactionPromiseWrapper(updateQuery.toString());
  }

  async delete(filters) {
    if (!filters) {
      throw new Error('Nothing to delete');
    }
    
    const deleteQuery = squel.delete().from(this._table);

    this._applyFilters(deleteQuery, filters);
    
    return this._transactionPromiseWrapper(deleteQuery.toString());
  }

  async execute(query, args) {
    return this._transactionPromiseWrapper(query, args)
  }
}

export default SqlDAO;