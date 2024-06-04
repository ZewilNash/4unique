const express = require("express");

const router = express.Router();

const authenticatedRoute = require("../middleware/auth");
const isAdminRoute = require("../middleware/isAdmin");
 
const {signup , login , getUserCartLength,deleteFromCart,updateCartQty,makeOrder,getCart,deleteCart,sendReport,getAllOrders,getOrder,editOrder,deleteOrder,findOrder,deleteReport,findReport,getAllOrderWithStatus,deleteUser,updateUser,getUser,deleteAllDeliveredOrders,deleteAllCanceledOrders,getUserOrders,bookOrder,findBookedOrder,deleteBookedOrder,getBookedOrder,getAllBookedOrderWithStatus,deleteAllCompletedOrders,editBookedOrder,makeReview,getFoodReviews,deleteReview,createCategory,getCategory,deleteCategory,updateCategory,getSingleCategory,forgotPass,changePass} = require("../controllers/auth");

router.route("/signup").post(signup);
router.route("/login").post(login);


router.route("/cart/:id").get(authenticatedRoute,getUserCartLength);
router.route("/report_us").post(authenticatedRoute,sendReport);

router.route("/get_orders").get(authenticatedRoute,isAdminRoute,getAllOrders);

router.route("/get_user_orders/:id").get(authenticatedRoute,getUserOrders);

router.route("/get_order/:id").get(authenticatedRoute,isAdminRoute,getOrder);

router.route("/edit_order/:id").patch(authenticatedRoute,isAdminRoute,editOrder);

router.route("/edit_booked_order/:id").patch(authenticatedRoute,isAdminRoute,editBookedOrder);

router.route("/delete_order/:id").delete(authenticatedRoute,isAdminRoute,deleteOrder);
router.route("/delete_booked_order/:id").delete(authenticatedRoute,isAdminRoute,deleteBookedOrder);

router.route("/get_order").post(authenticatedRoute,isAdminRoute,findOrder);


router.route("/make_review/:id").post(authenticatedRoute,isAdminRoute,makeReview);


router.route("/get_reviews/:id").get(authenticatedRoute,getFoodReviews);

router.route("/delete_review/:id").delete(authenticatedRoute,isAdminRoute,deleteReview);



router.route("/get_booked_order").post(authenticatedRoute,isAdminRoute,findBookedOrder);

router.route("/create_category").post(authenticatedRoute,isAdminRoute,createCategory);


router.route("/get_category").get(authenticatedRoute,getCategory);
router.route("/get_single_category/:category").get(authenticatedRoute,isAdminRoute,getSingleCategory);

router.route("/delete_category/:category").delete(authenticatedRoute,isAdminRoute,deleteCategory);

router.route("/update_category/:category").patch(authenticatedRoute,isAdminRoute,updateCategory);



router.route("/get_booked_order/:id").get(authenticatedRoute,isAdminRoute,getBookedOrder);

router.route("/delete_report/:id").delete(authenticatedRoute,isAdminRoute,deleteReport);

router.route("/find_report/:id").get(authenticatedRoute,isAdminRoute,findReport);

router.route("/delete_user/:id").delete(authenticatedRoute,isAdminRoute,deleteUser);

router.route("/update_user/:id").patch(authenticatedRoute,isAdminRoute,updateUser);

router.route("/forgotPass").patch(forgotPass);
router.route("/changePass").patch(changePass);



router.route("/delivered_all_delete").delete(authenticatedRoute,isAdminRoute,deleteAllDeliveredOrders);

router.route("/canceled_all_delete").delete(authenticatedRoute,isAdminRoute,deleteAllCanceledOrders);

router.route("/completed_all_delete").delete(authenticatedRoute,isAdminRoute,deleteAllCompletedOrders);

router.route("/get_user/:id").get(authenticatedRoute,isAdminRoute,getUser);

router.route("/find_order_status/:status").get(authenticatedRoute,isAdminRoute,getAllOrderWithStatus);

router.route("/find_booked_order_status/:status").get(authenticatedRoute,isAdminRoute,getAllBookedOrderWithStatus);


router.route("/order").post(authenticatedRoute,makeOrder);

router.route("/book_order").post(authenticatedRoute,bookOrder);

router.route("/get_cart/:id").get(authenticatedRoute,getCart);

router.route("/delete_cart/:id").delete(authenticatedRoute,deleteCart);

router.route("/cart/remove/:userId/:foodId").delete(authenticatedRoute,deleteFromCart);

router.route("/cart/update_qty/:userId/:foodId").patch(authenticatedRoute,updateCartQty);


module.exports = router;