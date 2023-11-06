import express from 'express';
const app = express();
const port = 3000;

// MongoDB 연결
import connect from './schemas/index.js';
connect();
app.use(express.json());

// Router 설정
import productRouter from './routes/products.router.js';
app.use('/api', productRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다.');
});
