import multer from 'multer';
import path from 'path';

import HttpError from '../helpers/HttpError.js';

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split('.').pop;
  if (extention === 'exe') return callback(HttpError(400, '.exe extention not allow'));
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
