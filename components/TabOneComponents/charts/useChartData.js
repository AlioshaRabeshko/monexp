import {useState, useEffect, useMemo} from 'react';
import TransactionsDAO from '../../../modules/TransactionsDAO';

function useChartData(db, dateRange) {
  const [data, setData] = useState({});
  const transactionsDAO = useMemo(() => new TransactionsDAO(db), [db])
  useEffect(() => {
    transactionsDAO.read(
      ['amount', 'categoryId', 'date', 'category', 'color'],
      {date: {dateBetween: [dateRange.start, dateRange.end]}}
    )
      .then(setData)
      .catch(console.error);
  }, [dateRange])

  return data;
}

export default useChartData;