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
];
