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
import { db } from "./database/knex";
const { format } = require("date-fns-tz");

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
app.get("/users", async (req, res) => {
  try {
    const result: TUser[] = await db.select().from("users");

    res.status(200).send(result);
  } catch (error) {
    console.error("Erro:", error);

    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await db.select().from("products");
    res.status(200).send(products);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao buscar os produtos");
  }
});

app.get("/products/search", async (req, res) => {
  try {
    const query: string = req.query.q as string;

    if (query.length === 0) {
      res.status(404).send(`Query deve possuir pelo menos um caractere`);
      return;
    }

    const productsByName: TProducts[] = await db
      .select()
      .from("products")
      .where("name", "like", `%${query}%`);

    res.status(200).send(productsByName);
  } catch (error) {
    console.error("Erro:", error);

    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

//3

app.post("/users", async (req, res) => {
  try {
    const { id, name, email, password } = req.body;

    if (
      !id ||
      typeof name !== "string" ||
      name.length < 2 ||
      !email ||
      !email.includes("@") ||
      typeof password !== "string" ||
      password.length < 6
    ) {
      res.status(400).send("Os dados enviados são inválidos.");
      return;
    }

    const userWithSameId = await db.select().from("users").where("id", id);

    if (userWithSameId.length > 0) {
      res.status(400).send("Já existe uma conta com o mesmo ID.");
      return;
    }

    const userWithSameEmail = await db
      .select()
      .from("users")
      .where("email", email);

    if (userWithSameEmail.length > 0) {
      res.status(400).send("Já existe uma conta com o mesmo e-mail.");
      return;
    }

    const brazilTimezone = "America/Sao_Paulo";
    const currentDatetime = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
      timeZone: brazilTimezone,
    });

    await db("users").insert({
      id,
      name,
      email,
      password,
      created_at: currentDatetime,
    });

    console.log("Novo usuário registrado:", { id, name, email });
    res.status(201).send("Usuário registrado com sucesso");
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao registrar usuário");
  }
});

app.post("/products", async (req, res) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    // Validar os dados recebidos
    if (
      !id ||
      !name ||
      typeof price !== "number" ||
      price <= 1 ||
      !description ||
      typeof description !== "string" ||
      description.length < 2
    ) {
      res.status(400).send("Os dados enviados são inválidos.");
      return;
    }

    // Validar a URL da imagem
    const validUrlRegex = /^(https?:\/\/[^\s]+)/;

    if (imageUrl && !validUrlRegex.test(imageUrl)) {
      res.status(400).send("A URL da imagem possui um formato inválido.");
      return;
    }

    // Verificar se o produto já existe
    const productWithSameId = await db.raw(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (productWithSameId.length > 0) {
      res.status(400).send(`Já existe um produto com o mesmo ID ${id}.`);
      return;
    }

    // Inserir o novo produto no banco de dados
    await db.raw(
      "INSERT INTO products (id, name, price, description, image_url) VALUES (?, ?, ?, ?, ?)",
      [id, name, price, description, imageUrl]
    );

    res.status(201).send({ message: "Produto cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao cadastrar produto");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const userExists = await db.select().from("users").where("id", id);

    if (userExists.length === 0) {
      res.status(404).send({ message: `Não existe uma conta com o id ${id}` });
      return;
    }

    await db("users").where("id", id).del();

    res.status(200).send({ message: "O usuário foi deletado com sucesso" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(400).send(`Erro ao deletar usuário: ${error}`);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await db.raw("SELECT * FROM products WHERE id = ?", [id]);

    if (product[0].length === 0) {
      res.status(404).send({ message: `Não existe uma conta com o id ${id}` });
      return;
    }

    await db.raw("DELETE FROM products WHERE id = ?", [id]);

    res.status(200).send({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao deletar produto");
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const product = await db.raw("SELECT * FROM products WHERE id = ?", [id]);

    if (product[0].length === 0) {
      // O produto não foi encontrado
      res.status(404).send({ message: `Não existe um produto com o id ${id}` });
      return;
    }

    const updatedProduct: any = {};

    if (newName && newName.length > 0) {
      updatedProduct.name = newName;
    }

    if (newPrice !== undefined && newPrice > 0) {
      updatedProduct.price = newPrice;
    }

    if (newDescription && newDescription.length > 0) {
      updatedProduct.description = newDescription;
    }

    if (newImageUrl) {
      const validUrlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

      if (validUrlRegex.test(newImageUrl)) {
        updatedProduct.imageUrl = newImageUrl;
      } else {
        res
          .status(404)
          .send({ message: "A URL da imagem possui um formato inválido" });
        return;
      }
    }

    await db("products").where("id", id).update(updatedProduct);

    res.status(200).send({ message: "O item foi alterado com sucesso" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(400).send("Erro ao editar produto");
  }
});

// //Create purchase

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer_id, id_product, quantity } = req.body;

    console.log("@===>>>", id, buyer_id);

    if (typeof id !== "string" || id.length < 4) {
      res.statusCode = 404;
      throw new Error("O campo do id é obrigatório");
    }

    if (typeof buyer_id !== "string" || buyer_id.length < 3) {
      res.statusCode = 404;
      throw new Error("O campo do buyer id é obrigatório");
    }

    if (typeof id_product !== "string" || id_product.length < 2) {
      res.statusCode = 404;
      throw new Error("O campo do preço é obrigatório");
    }

    const [isPriceProduct] = await db("products").where({ id: id_product });

    if (!isPriceProduct) {
      res.status(404).send("O produto associado não existe");
      return;
    }

    const sumQuantity = quantity * isPriceProduct.price;

    const newPurchases = {
      id,
      buyer_id,
      total_price: sumQuantity,
    };

    const newPurchasesProducts = {
      purchase_id: id,
      product_id: id_product,
      quantity,
    };

    await db("purchases").insert(newPurchases);
    await db("purchases_products").insert(newPurchasesProducts);

    res.status(200).send("Produto cadastrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.get("/purchases", async (req, res) => {
  try {
    const result = req.body.purchases;

    const results = await db.select().from("purchases");

    res.status(200).send(results);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro: a query deve possuir pelo menos um caractere");
    }
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.newId as string | undefined;
    const newName = req.body.newName as string | undefined;
    const newPrice = req.body.newPrice as number | undefined;
    const newDescription = req.body.newDescription as string | undefined;
    const newImageUrl = req.body.newImageUrl as string | undefined;

    const [product] = await db.raw("SELECT * FROM products WHERE id = ?", [id]);

    if (product.length === 0) {
      res.statusCode = 404;
      throw new Error(`Esse produto não existe`);
    }

    if (newName?.length === 0) {
      res.statusCode = 404;
      throw new Error("Novo produto deve ter mais que 1 caracter");
    }

    if (newPrice !== undefined && newPrice <= 0) {
      res.statusCode = 404;
      throw new Error("Novo preço menor que R$ 1");
    }

    if (newDescription?.length === 0) {
      res.statusCode = 404;
      throw new Error("Nova descrição deve ter mais que 1 caracter");
    }

    const validUrlRegex = /^http:\/\//;

    if (newImageUrl && !validUrlRegex.test(newImageUrl)) {
      res.statusCode = 404;
      throw new Error("Nova imagem possui um formato inválido");
    }

    const [newProduct] = await db.raw(
      `SELECT * FROM products WHERE id = "${id}"`
    );

    if (newProduct) {
      await db.raw(`UPDATE products SET
      
      id = "${newId || newProduct.id}",
      name = "${newName || newProduct.name}",
      price = "${newPrice || newProduct.price}",
      description = "${newDescription || newProduct.description}",
      image_Url = "${newImageUrl || newProduct.image_Url}"
      WHERE id = "${id}"
      `);

      res.status(200).send("Produto editado com sucesso");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDel: string = req.params.id;

    const [searchId] = await db.raw(`
    SELECT id FROM purchases WHERE id = '${idToDel}'
    `);

    if (!searchId) {
      res.statusCode = 404;
      throw new Error("Pedido deletado com sucesso");
    }

    await db.raw(`
    DELETE FROM purchases_products WHERE purchase_id ='${searchId.id}';
    `);
    await db.raw(`
    DELETE FROM purchases WHERE id ='${searchId.id}';
    `);

    res.status(200).send({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.get("/purchases/:id", async (req, res) => {
  try {
    const purchaseId = req.params.id;

    if (!purchaseId) {
      res.statusCode = 404;
      throw new Error(`Pedido com ID ${purchaseId} não encontrado`);
    }

    const [purchaseInfo] = await db("purchases")
      .select(
        "purchases.id as purchaseId",
        "users.id as buyerId",
        "users.name as buyerName",
        "users.email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt"
      )
      .innerJoin("users", "purchases.buyer_id", "=", "users.id")
      .where({ "purchases.id": purchaseId });

    const resultProducts = await db("purchases_products")
      .select(
        "id as idProduct",
        "name as nameProduct",
        "price as priceProduct",
        "description as descriptionProduct",
        "image_url as imageUrlProducts",
        "quantity as qtnd"
      )
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where({ "purchases_products.purchase_id": purchaseId });

    const newResult = {
      ...purchaseInfo,
      products: resultProducts,
    };

    res.status(200).send(newResult);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao buscar informações do pedido");
  }
});
