import SqlDAO from './SqlDAO';

export default class PreviewDAO extends SqlDAO {
  constructor(connection) {
    super(connection, 'previews', {
      id: 'id',
      option: 'option',
      value: 'value'
    });
  }
}