import express from 'express';
const router = express.Router();
import Products from '../schemas/products.schema.js';
// import Products from '../schema/products.js';

// 1. 상품 작성 API
router.post('/products', async (req, res) => {
  const { productName, content, userName, password } = req.body;
  //authur
  if (!productName || !content || !userName || !password) {
    res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }

  try {
    const product = { productName, content, userName, password };
    await Products.create(product);

    res.json({ message: '판매 상품을 등록하였습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '상품 등록에 실패했습니다.' });
  }
});

// 2. 상품 목록 조회 API
router.get('/products', async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ errorMessage: '상품 목록 조회에 실패하였습니다.' });
  }
});

// 3. 상품 상세 조회 API

router.get('/products/:productName', async (req, res) => {
  const { productName } = req.params;
  try {
    const product = await Products.findOne({ productName });

    if (!product) {
      return res.status(400).json({ errorMessage: '상품을 찾을 수 없습니다.' });
    }

    res.json({ product });
  } catch (error) {
    res.status(400).json({ errorMessage: '상품 조회에 실패하였습니다.' });
  }
});

// 4. 상품 정보 수정 API
router.put('/products/:productName', async (req, res) => {
  const { productName } = req.params;
  const { content, status, password } = req.body;

  try {
    const product = await Products.findOne({ productName });

    if (!product) {
      return res.status(400).json({ errorMessage: '상품을 찾을 수 없습니다.' });
    }

    if (product.password !== password) {
      return res.status(400).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    if (content) {
      product.content = content;
    }
    if (status) {
      product.status = status;
    }

    await product.save();

    res.json({ message: '상품 정보가 수정되었습니다.' });
  } catch (error) {
    res.status(500).json({ errorMessage: '상품 정보 수정에 실패하였습니다.' });
  }
});

// 5. 상품 삭제 API
router.delete('/products/:productName', async (req, res) => {
  const { productName } = req.params;
  const { password } = req.body;

  try {
    const product = await Products.findOne({ productName });
    console.log(password);
    if (!product) {
      return res.status(400).json({ errorMessage: '상품을 찾을 수 없습니다.' });
    }

    if (product.password !== password) {
      return res.status(400).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    await Products.remove({ productName });

    res.json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: '상품 삭제에 실패하였습니다.' });
  }
});

export default router;
