const express = require('express');
const router = express.Router();

const baseController = require('../controllers/baseController');

router.get("/", baseController.getCatetories);

router.get("/product/:name", baseController.getProduct);

router.get("/all", baseController.getAll);

router.get("/new", baseController.newProduct);

router.post("/new", baseController.addNewProduct);

router.get("/deletecategory", baseController.getDeleteCategory);

router.get("/deleteproduct", baseController.getDeleteProduct);

router.post("/deletecategory", baseController.postDeleteCategory);

router.post("/deleteproduct", baseController.postDeleteProduct);

router.get("/delete_id/:id", baseController.deleteIdProduct);

module.exports = router;