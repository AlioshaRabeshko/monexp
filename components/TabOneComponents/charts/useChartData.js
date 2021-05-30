import {useState, useEffect, useMemo} from 'react';
import TransactionsDAO from '../../../modules/TransactionsDAO';

function useChartData(db, dateRange) {
  const [data, setData] = useState({});
  const transactionsDAO = useMemo(() => new TransactionsDAO(db), [db])
  useEffect(() => {
    transactionsDAO.read(
      ['amount', 'categoryId', 'date', 'category', 'color', 'description', 'categoryIcon', 'categoryColor'],
      {date: {dateBetween: [dateRange.start, dateRange.end]}},
      [['timestamp', 'DESC']]
    )
      .then(setData)
      .catch(console.error);
  }, [dateRange])

  return data;
}

export default useChartData;