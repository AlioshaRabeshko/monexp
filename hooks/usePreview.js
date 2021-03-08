import {useState, useEffect} from 'react';
import PreviewsDAO from '../modules/PreviewsDAO';
import {fromEntries} from '../utils/utils';

export default function usePreview(db, options) {
  const [preview, setPreview] = useState({});
  useEffect(() => {
    const previewsDAO = new PreviewsDAO(db);
    previewsDAO.read(['option', 'value'], {option: {in: options}})
      .then(({records}) => setPreview(fromEntries(records)))
      .catch(console.warn)
  }, [db, options])

  return preview;
}
