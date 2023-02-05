
import ProductModel from '../schemas/product-schema.js';
import { ObjectId } from 'mongodb';

export class ProductService {
    constructor(){}

  async add(product) {
    await ProductModel.create(product);
  }

  async findAll() {
    return await ProductModel.find({});
  }

  async findById(id) {
    const product = await ProductModel.findById(ObjectId(id));
    
    return product
  }

  async sellProducts(id) {
  const product = await this.findById(id)
  console.log(`the product sell is: ${product.stock}`)
    if(product && product.stock > 0) {
      product.stock = product.stock - 1;
      console.log(product.stock)
      return await ProductModel.updateOne({ _id: ObjectId(id) }, product);
    } 
    return null;
  }

}

