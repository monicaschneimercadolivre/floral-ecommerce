import "dotenv/config";
import express from "express";
import { ProductService } from './services/product-service.js';
import { UserService } from "./services/user-service.js";
import jwt from "jsonwebtoken";
import multer from 'multer';
import crypto from 'crypto';

const app = express();
const port = 3300
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const newFileName = crypto.randomBytes(32).toString('hex');
    const fileExtension = extname(file.originalname);
    cb(null, `${newFileName}${fileExtension}`);
  }
});
const uploadMidleWare = multer({ storage })


app.get('/', async (req, res) => {
  res.send("Floral-E-Commerce");
});

app.post('/products', async (req, res) => {
  const productService = new ProductService();
  const { name, description, price, stock, image } = req.body;
  console.log(req.body)
  const product = { name, description, price, stock, image }
  await productService.add(product);
  return res.status(201).json(product);

})

app.get("/products", async (req, res) => {
  const productService = new ProductService();
  const products = await productService.findAll();
  return res.status(200).json(products);
});


app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const productService = new ProductService();
  const product = await productService.findById(id);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).json({ message: "Produto não encontrado" });
});

app.put("/products/sell/:id", async (req, res) => {
  const id = req.params.id;
  const productService = new ProductService();

  await productService.sellProducts(id);

  return res.status(200).json({ message: "Venda realizada com sucesso" });
});

//create a new user
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  if (!user.name || !user.password) {
    res.send("Invalid Details")
  } else {
    const email = await userService.findByEmail(user.email)
    if (email.email === req.body.email) {
      //res.render('signup', {
      res.status(400)
      res.send('User already exists! Please login')
      // })
    }
  }
  await userService.create(user);
  return res.status(201).json(user);
});

app.get('/users', async (req, res) => {
  const userService = new UserService;
  const users = await userService.findAll();
  return res.status(200).json(users);
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userService = new UserService;
  const users = await userService.find(id);
  if (users) {
    return res.status(200).json(users);
  }
  return res.status(404).send("Usuário não encontrado");
})


app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const userService = new UserService;
  const users = await userService.findUserById(id);
  if (users) {
    await userService.delete(id)
    await userService.findUserById(id)
    return res.status(200).send("Usuário excluído com sucesso");
  }

  return res.status(404).send("Usuário não encontrado");
})


app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const user = { name, email, password }
  const userService = new UserService();
  const findUser = await userService.find(id);
  console.log(findUser)
  if (findUser) {
    await userService.updtae(id, user)
    return res.status(200).send("Usuário atualizado com sucesso");

  }
  return res.status(404).send("Usuário não encontrado");
})


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService();
  const userLogged = await userService.login(email, password);
  if (userLogged) {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ user: userLogged }, secretKey, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: "E-mail ou senha inválidos." });
});

app.get("/user",async(req, res) => {
      const token = req.headers["authorization"];
      const secretKey = process.env.SECRET_KEY;
      jwt.verify(token, secretKey, { ignoreExpiration: false }, async (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: "Aconteceu um erro ao logar no sistema" })
        }
        const isValidToken = decodedToken && decodedToken.user;
        if (!isValidToken) {
            res.status(401).json({ message: "Aconteceu um erro ao logar no sistema" })
        }
        const userService = new UserService();
        const user = await userService.findByEmail(decodedToken.user.email);   
        if (user) {
            return res.status(200).json({ 
              user,
              message: "You are logged" });
        }
    });
  }
);



app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});