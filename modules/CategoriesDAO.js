import SqlDAO from './SqlDAO';

export default class CategoriesDAO extends SqlDAO {
  constructor(connection) {
    super(connection, 'categories', {
      id: 'id',
      name: 'name'
    });
  }
}