"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
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
function createUser(id, name, email, password) {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return "Produto cadastrado com sucesso";
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(name) {
    return exports.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
}
exports.searchProductsByName = searchProductsByName;
