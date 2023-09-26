import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
  TUser,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts } from "./types";

// console.log(users, products);

// console.log(createUser("u003", "Astrodev", "astrodev@email.com", 145695));
// console.log(getAllUsers());

// console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));

// console.log(getAllProducts());

// console.log(searchProductsByName("MESA"));

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//1

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//2
app.get("/users", (req: Request, res: Response): void => {
  try {
    const result: TUser[] = users;

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("erro inesperado");
    }
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    const result: TProducts[] = products;

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro no produtos");
    }
  }
});

app.get("/products/search", (req: Request, res: Response): void => {
  try {
    const query: string = req.query.q as string;

    if (query.length === 0) {
      res.statusCode = 404;
      throw new Error(`Query deve possuir pelo menos um caractere`);
    }

    const productsByName: TProducts[] = products.filter((product) =>
      product.name.toLowerCase().startsWith(query.toLowerCase())
    );

    if (productsByName.length === 0) {
      res.statusCode = 404;
      throw new Error(`Nenhum produto encontrado para a query "${query}"`);
    }

    res.status(200).send(productsByName);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro: a query deve possuir pelo menos um caractere");
    }
  }
});

//3

app.post("/users", (req: Request, res: Response): void => {
  try {
    const { id, name, email, password, createdAt }: TUser = req.body;

    if (!id) {
      res.statusCode = 404;
      throw new Error(`O campo do 'id' é obrigatório`);
    }

    if (typeof name !== "string" || name.length < 2) {
      res.statusCode = 404;
      throw new Error(`O campo do 'name' é obrigatório`);
    }

    if (!email || !email.includes("@")) {
      res.statusCode = 404;
      throw new Error(`O campo 'email' deve ser um endereço de e-mail válido`);
    }

    //Verificar essa condição

    if (typeof password !== "number" || password <= 6) {
      res.statusCode = 404;
      throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
    }

    if (!createdAt || isNaN(Date.parse(createdAt))) {
      res.statusCode = 404;
      throw new Error(
        `O campo 'createdAt' deve ser uma data válida no formato ISO8601.`
      );
    }

    // Não deve ser possível criar mais de uma conta com a mesma id
    const userWithSameId = users.find((user) => user.id === id);

    if (userWithSameId) {
      res.statusCode = 404;
      throw new Error(`Já existe conta com o mesmo ${id}`);
    }

    // Não deve ser possível criar mais de uma conta com o mesmo e-mail
    const userlWithSameEmail = users.find((user) => user.email === email);

    if (userlWithSameEmail) {
      res.statusCode = 404;
      throw new Error(`Já existe conta com o mesmo ${email}`);
    }

    const newUsers: TUser = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUsers);
    res.status(2001).send("Usuário registrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});


app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body;

    if (!id) {
      res.statusCode = 404;
      throw new Error(`O campo do 'id' é obrigatório`);
    }

    if (!name) {
      res.statusCode = 404;
      throw new Error(`O campo do 'name' é obrigatório`);
    }

    if (typeof price !== "number" || price <= 1) {
      res.statusCode = 404;
      throw new Error(`O campo do 'preço' é obrigatório`);
    }

    if (typeof description !== "string" || description.length < 2) {
      res.statusCode = 404;
      throw new Error(`O campo de 'descrição' é obrigatório`);
    }

    const validUrlRegex = /^http:\/\//;

    if (imageUrl && !validUrlRegex.test(imageUrl)) {
      res.statusCode = 404;
      throw new Error("nova imagem possui um formato inválido");
    }

    const productWithSame = products.find((product) => product.id === id);

    if (productWithSame) {
      res.statusCode = 404;
      throw new Error(`Já existe produto com o mesmo id ${id}`);
    }

    const newProducts: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    products.push(newProducts);
    res.status(201).send("Produto registrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});


//delete users

app.delete("/users/:id", (req: Request, res: Response): void => {
  try {
    const id = req.params.id;

    const idAccountExist = users.find((user) => user.id === id);

    if (!idAccountExist) {
      res.statusCode = 404;
      throw new Error(`Não existe uma conta com o id ${id}`);
    }

    const indexToDelete = users.findIndex((user) => user.id === id);

    if (indexToDelete !== -1) {
      users.splice(indexToDelete, 1);
    } else {
      console.log("Deu ruim nao deleteou nada");
    }

    res.status(200).send({ message: "O usuario deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Erro ao deletar usuário");
    }
  }
});

//delete prodcuts

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const idAccountExist = products.find((product) => product.id === id);

    if (!idAccountExist) {
      res.statusCode = 404;
      throw new Error(`Não existe um produto com o id ${id}`);
    }

    const indexToDelete = products.findIndex((product) => product.id === id);

    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);
    } else {
      console.log("Deu ruim nao deleteou nada");
    }

    res.status(200).send({ message: "Produto deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Erro ao deletar produto");
    }
  }
});

app.put("/products/:id", (req: Request, res: Response): void => {
  try {
    const id = req.params.id;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const product = products.find((product) => product.id === id);

    if (!product) {
      res.status(404).send({ message: `Não existe um produto com o id ${id}` });
      return;
    }

    if (newName?.length === 0) {
      res.statusCode = 404;
      throw new Error(`Novo nome deve possuir pelo menos um caractere`);
    }

    if (newPrice !== undefined && newPrice <= 0) {
      res.statusCode = 404;
      throw new Error(`O preço deve ser maior que 1`);
    }

    if (newDescription?.length === 0) {
      res.statusCode = 404;
      throw new Error(`A nova descrição deve possuir pelo menos um caractere`);
    }

    const validUrlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

    if (newImageUrl && !validUrlRegex.test(newImageUrl)) {
      res.statusCode = 404;
      throw new Error("nova imagem possui um formato inválido");
    }

    if (product) {
      product.name = newName || product.name;
      product.price = newPrice || product.price;
      product.description = newDescription || product.description;
      product.imageUrl = newImageUrl || product.imageUrl;

      res.status(200).send({ message: "O item foi alterado com sucesso" });
    } else {
      res.status(404).send({ message: "Produto não encontrado" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Erro ao editar produto");
    }
  }
});
