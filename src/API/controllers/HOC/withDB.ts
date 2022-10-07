import dbConnect from '../../../mongoDB/utils/dbConnect';
import { Controller } from '../types';

const withConnectedDB = async (controller: any) => {
  await dbConnect();
  return controller;
};

export default withConnectedDB;
