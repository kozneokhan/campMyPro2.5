import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // 1. 상품명
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    // 2. 작성내용
    content: {
      type: String,
      required: true,
    },
    // 3. 작성자명
    userName: {
      type: String,
      required: true,
    },
    // 4. 비밀번호
    password: {
      type: String,
      required: true,
    },
    // 5. 판매상태
    status: {
      type: String,
      required: true,
      default: 'FOR_SALE',
    },
    //createdAt
  },
  // timestamps: true - 기본으로 createdAt, updatedAt 생성
  { timestamps: true },
);

//productSchema.set("timestamps", { createdAt: true, updatedAt: false });
const Product = mongoose.model('Products', productSchema);

export default Product;
