import { TProducts, TUser } from "./types";

export { TUser } from "./types";

export const users: TUser[] = [
  {
    id: "Joao788",
    name: "João Lucas",
    email: "teste@example.com",
    password: 12345,
    createdAt: new Date().toISOString(),
  },

  {
    id: "Lucas7852",
    name: "Lucas",
    email: "teste@example.com",
    password: 54321,
    createdAt: new Date().toISOString(),
  },
  {
    id: "Maria7888",
    name: "Maria",
    email: "teste@example.com",
    password: 5432155,
    createdAt: new Date().toISOString(),
  },
  {
    id: "Dani7888",
    name: "Dani",
    email: "teste@example.com",
    password: 54325551,
    createdAt: new Date().toISOString(),
  },
];

export const products: TProducts[] = [
  {
    id: "jl78255",
    name: "Cadeira",
    price: 50,
    description: "nao sei ainda",
    imageUrl: "http://",
  },

  {
    id: "lu785555",
    name: "Mesa",
    price: 70,
    description: "nao sei ainda",
    imageUrl: "http://",
  },
  {
    id: "tell299",
    
    name: "Telefone",
    price: 799,
    description: "nao sei ainda",
    imageUrl: "http://",
  },
];

// criação novo usuario
export function createUser(id: string, name: string, email: string, password: number): string {

  const createdAt = new Date().toISOString()
  const newUser:  TUser = { id, name, email, password, createdAt }
  users.push(newUser)
  return "Cadastro realizado com sucesso"
}

// busca todos usuarios
export function getAllUsers(): TUser[] {
  return users
}

// cria novo produto
export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): string {
  const newProduct: TProducts = {id, name, price, description, imageUrl}
  products.push(newProduct)
  return "Produto cadastrado com sucesso"
}

// busca todos produtos
export function getAllProducts () : TProducts[] {
  return products
}



// busca produtos por nome 
export function searchProductsByName(name: string): TProducts[] {

  return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
}


