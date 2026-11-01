import mongoose from 'mongoose';
import {env} from '../config/env.js';

mongoose.connect(env.db.url)
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

mongoose.connect(env.db.url);
