import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';

async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require('../assets/data/data.db')).uri,
    FileSystem.documentDirectory + 'SQLite/data.db'
  );
  return SQLite.openDatabase('data.db');
} 

function getSQLiteConnection() {
  return openDatabase();
}

export default getSQLiteConnection;
