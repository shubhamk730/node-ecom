const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

const router = express.Router();

// /admin/add-product => GET
router.get(
  "/add-product",
  [
    body("title", "Add suitable title").isString().isLength({ min: 1 }).trim(),
    body("imageUrl", "Not a valid URL").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 3 }).trim(),
  ],
  isAuth,
  adminController.getAddProduct
);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Add suitable title").isString().isLength({ min: 1 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 3 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
