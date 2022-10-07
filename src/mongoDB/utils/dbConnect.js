import mongoose from 'mongoose';
import { siteName } from '../../config/site.config';
import logger from '../../utils/logger';

const dbHost = process.env.DB_HOST || '';
const user = process.env.DB_USER || '';
const pass = process.env.DB_PASS || '';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(dbHost, {
      dbName: siteName,
      user,
      pass,
    });
    logger.log('Connected to db');
  } catch (error) {
    logger.error('Failed connect to db: ', error);
  }
};

export default dbConnect;
