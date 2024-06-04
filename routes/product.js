const express = require("express");

const router = express.Router();

const authenticatedRoute = require("../middleware/auth");

const isAdminMiddleWare = require("../middleware/isAdmin");

const {createProduct,addToFavourite,removeFromFav,deleteFood,getSingleFood,updateProduct,addToCart,prepareOrder} = require("../controllers/product");

router.route("/").post(authenticatedRoute , isAdminMiddleWare , createProduct);

router.route("/addToFav/:foodId/:userId").patch(authenticatedRoute, addToFavourite);

router.route("/removeFromFav/:foodId/:userId").patch(authenticatedRoute, removeFromFav);

router.route("/delete/:foodId").delete(authenticatedRoute, isAdminMiddleWare ,deleteFood)

router.route("/:foodId").patch(authenticatedRoute,isAdminMiddleWare,getSingleFood).put(authenticatedRoute, isAdminMiddleWare ,updateProduct);;


router.route("/cart/:userId/:productId").post(authenticatedRoute,addToCart);

router.route("/order_prepare").post(authenticatedRoute,prepareOrder);


module.exports = router;