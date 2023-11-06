import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB', process.env.MONGODB_ID);

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_ID)

    .then(() => {
      console.log('몽고디비 연결 성공!');
    })
    .catch((err) => console.log(err));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;
