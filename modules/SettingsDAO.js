import SqlDAO from './SqlDAO';

export default class SettingsDAO extends SqlDAO {
  constructor(connection) {
    super(connection, 'settings', {
      id: 'id',
      option: 'option',
      value: 'value'
    });
  }
}