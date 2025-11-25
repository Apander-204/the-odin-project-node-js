const db = require("../db/quires");

async function getCatetories(req, res) {
    const categories = await db.getAllCategories();
    res.render("index", {categories: categories});
}

async function getProduct(req, res) {
    const product = await db.getProduct(req.params.name);
    res.render("product", {product: product});
}

async function getAll(req, res) {
    const products = await db.getAllProducts();
    res.render("all", {products: products});
}

async function getPorductsInCategory(req, res) {
    const products = await db.getProductsInCategory(req.params.cat);
    res.render("products", {products: products});
}

async function newProduct(req, res) {
    res.render("new_product");
}

async function addNewProduct(req, res) {
    const name = req.body.name;
    const category = req.body.category;
    const brend = req.body.brend;
    const price = req.body.price;
    await db.createProduct(name, category, brend, price);
    res.redirect("/");
}

async function getDeleteCategory(req, res) {
    res.render("delete_category");
}

async function getDeleteProduct(req, res) {
    res.render("delete_product");
}

async function postDeleteCategory(req, res) {
    db.deleteCategory(req.body.category);
    res.redirect("/");
}

async function postDeleteProduct(req, res) {
    db.deleteProduct(req.body.product);
    res.redirect("/");
}

async function deleteIdProduct(req, res) {
    db.deleteIdProduct(req.params.id);
    res.redirect("/");
}

module.exports = {
    getCatetories,
    getPorductsInCategory,
    newProduct,
    addNewProduct,
    getAll,
    getDeleteCategory,
    getDeleteProduct,
    postDeleteCategory,
    postDeleteProduct,
    getProduct,
    deleteIdProduct
};