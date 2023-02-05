import { ObjectId } from "mongodb";
import UserModel from "../schemas/user-schema.js";
import agregationUser from '../agregations/userAgregation.js'

export class UserService {
  constructor() { }

  async findUserById(id) {
    return await UserModel.findById(ObjectId(id));
  }

  async create(user) {
    await UserModel.create(user);
  }

  async findAll() {
    return await UserModel.find({});
  }

  async delete(id) {
    await UserModel.deleteOne({ _id: ObjectId(id) });
  }

  async update(id, user) {
    return await UserModel.updateOne({ _id: ObjectId(id) }, user);
  }

  async findByEmail(email) {
    return await UserModel.findOne({},
      {
        email: email
      }
    );
  }

  async findByUser(email, password) {
    return await UserModel.findOne({},
      {
        email: email,
        password:password
      }
    );
  }

  async login(email, password) {
    if (email, password) {
      const user = await this.findByUser(email, password);
      const wholeUser = await agregationUser(email)
      if (user) {
        const auth = user.password === password;
        if (auth) {
          return wholeUser;
        }
        return null;
      }
      return null;
    }
    return null;
  }
}