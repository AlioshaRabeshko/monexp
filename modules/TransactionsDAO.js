import SqlDAO from './SqlDAO';
import PreviewDAO from './PreviewsDAO';

export default class TransactionsDAO extends SqlDAO {
  constructor(connection) {
    super(connection, 'transactions', {
      id: 'id',
      amount: 'amount',
      categoryId: 'category_id',
      timestamp: 'timestamp',
      description: 'description'
    });
    this._previewDAO = new PreviewDAO(connection);
  }

  async create(records) {
    for (const record of records) {
      const {records: [preview]} = await this._previewDAO.read(['value'], {option: record.categoryId});
      await this._previewDAO.update({value: preview.value + record.amount}, {option: record.categoryId});
    }
    return await super.create(records);
  }

  async update(record, filters) {    
    if (record.hasOwnProperty('amount')) {
      const {records: [transaction]} = await super.read(['amount', 'categoryId'], filters);
      const {records: [preview]} = await this._previewDAO.read(['value'], {option: transaction.categoryId});
      await this._previewDAO.update({value: preview.value + record.amount}, {option: transaction.categoryId});
    }

    return await super.update(record, filters);
  }

  async delete(filters) {
    const {records} = await super.read(['amount', 'categoryId'], filters);
    for (const record of records) {
      const {records: [preview]} = await this._previewDAO.read(['value'], {option: record.categoryId});
      await this._previewDAO.update({value: preview.value - record.amount}, {option: record.categoryId});
    }
    return await super.delete(filters);
  }
}