import { TProducts, TUser } from "./types";

export { TUser } from "./types";

export const users: TUser[] = [
  {
    id: "Joao78",
    name: "João Lucas",
    email: "teste@example.com",
    password: 12345,
    createdAt: new Date().toISOString(),
  },

  {
    id: "Lucas78",
    name: "Lucas",
    email: "teste@example.com",
    password: 54321,
    createdAt: new Date().toISOString(),
  },
];

export const products: TProducts[] = [
  {
    id: "jl78",
    name: "Cadeira",
    price: 50,
    description: "nao sei ainda",
    imageUrl: "http://",
  },

  {
    id: "lu78",
    name: "Mesa",
    price: 70,
    description: "nao sei ainda",
    imageUrl: "http://",
  },
];
