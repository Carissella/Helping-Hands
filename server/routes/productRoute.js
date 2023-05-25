const router = require("express").Router();
const {
  uploadProduct,
  getProduct,
  createCheckoutSession,
} = require("../controllers/product");

router.route("/uploadProduct").post(uploadProduct);
router.route("/product").get(getProduct);
router.route("/create-checkout-session").post(createCheckoutSession);

module.exports = router;
