import {useState, useEffect, useMemo} from 'react';
import PreviewsDAO from '../modules/PreviewsDAO';
import {fromEntries} from '../utils/utils';

export default function usePreview(db, options) {
  const [preview, setPreview] = useState({});
  const previewsDAO = new PreviewsDAO(db);
  useEffect(() => {
    previewsDAO.read(['option', 'value'], {option: {in: options}})
      .then(({records}) => setPreview(fromEntries(records)))
      .catch(console.warn)
  }, [options])

  return preview;
}
