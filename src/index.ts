

import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName, TUser} from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProducts } from "./types";



// console.log(users, products);

// console.log(createUser("u003", "Astrodev", "astrodev@email.com", 145695));
// console.log(getAllUsers());


// console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));

// console.log(getAllProducts());


// console.log(searchProductsByName("MESA"));

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


//1

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


//2
app.get('/users', (req: Request, res: Response) => {

    const result: TUser[] = users

    res.status(200).send(result)
})


app.get('/products', (req: Request, res: Response) => {

    const result: TProducts[] = products

    res.status(200).send(result)
})


app.get('/products/search', (req:Request, res: Response) => {

    const query: string  = req.query.q as string

    const productsByName: TProducts[] = products.filter(product => product.name.toLowerCase() === query.toLowerCase())

    res.status(200).send(productsByName)
})


//3

app.post('/users', (req:Request, res:Response) => {

    const {id, name, email, password, createdAt} : TUser = req.body

    const newUser : TUser = {

        id,
        name,
        email,
        password,
        createdAt
    }

    users.push(newUser)

    res.status(201).send('Cadastro realizado com sucesso')
})

app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl }: TProducts = req.body;
  
    const newProducts: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };
  
    products.push(newProducts);
    res.status(2001).send("Produto registrado com sucesso");
  });


