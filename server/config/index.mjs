import dotenv from 'dotenv'
import path from 'path'
import rootDir from './../rootDir'

const envPath = path.join(rootDir, '.env');
dotenv.config({ path: envPath });

export const config = {
  google: {
    auth: process.env.GOOGLE_AUTH,
    cx: process.env.GOOGLE_CX
  }
};
