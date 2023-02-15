
import ProductModel from '../schemas/product-schema.js';
import Product from '../schemas/product.js';
import Image from '../schemas/images.js';
import { ObjectId } from 'mongodb';

export class ProductService {
  constructor() { }

  async addProduct(product) {
    const productModel = ProductModel.create(product);
    return productModel
  }

  async add(product) {
    const newProduct = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image
    })
    return await Product.create(newProduct)
  }

  async addImage(image) {
    const newImage = new Image({
      fieldname: image.fieldname,
      originalname: image.originalname,
      filename: image.filename,
      path: image.path
    })
    return await Image.create(newImage)
  }

  async findImageById(imageId) {
    const image = await Image.findById(ObjectId(imageId))
    return image
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
    if (product && product.stock > 0) {
      product.stock = product.stock - 1;
      console.log(product.stock)
      return await ProductModel.updateOne({ _id: ObjectId(id) }, product);
    }
    return null;
  }

}

