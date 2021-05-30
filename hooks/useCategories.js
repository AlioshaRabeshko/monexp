import {useState, useEffect, useMemo} from 'react';
import CategoriesDAO from '../modules/CategoriesDAO';
import {fromEntries} from '../utils/utils';

export default function useCategories(db, options) {
  const [categories, setCategories] = useState([]);
  const categoriesDAO = new CategoriesDAO(db);
  useEffect(() => {
    categoriesDAO.read(['name', 'color', 'icon', 'id'], {})
      .then(({records}) => setCategories(records))
      .catch(console.warn)
  }, [options])

  return categories;
}
