const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const userController = require('../controllers/apiUser.js');
const imageController = require('../controllers/apiImage.js');
const typeController = require('../controllers/apiType.js');
const tradeGiveController = require('../controllers/apiTradeGive.js');
const tradeExchangeController = require('../controllers/apiTradeExchange.js');
const tradeLoanController = require('../controllers/apiTradeLoan.js');
const reportController = require('../controllers/apiReport.js');
const conversationController = require ('../controllers/apiConvesration.js')
const adminController = require ('../controllers/apiAdmin.js')
const messageController = require ('../controllers/apiMessages.js')
const jwt = require('jsonwebtoken')

const { validateCreateProduct } = require('../validators/product.js');
const { validateCreateCategory } = require('../validators/category.js');
const { validateCreateType } = require('../validators/type.js');
const upload = require('../config/storage.js');
const authenticateJWT = require('../config/authorization.js')


module.exports = function(app) {
  const router = express.Router();

  // ========================
  // ---- Product Routes ----
  // ========================

  // Create new product
  router.route('/product/create/')
    .post(upload.array('img', 6), (validateCreateProduct), authenticateJWT, productController.createProduct);

  router.route('/product/name/:name')
    .get(productController.readProductsByName)

  router.route('/product/image/:id')
    .get(productController.getImg)

  // Read Product with id = id
  router.route('/product/:id')
    .get(productController.readProduct);
  
  // Read all products
  router.route('/product/')
    .get(productController.readAllProducts);
 
  router.route('/ids/product/')
  .get(productController.readProductsId);

   // Read products filtered
   router.route('/byCategory/product/')
   .get(productController.readProductsFilteredCategory);

  // Read products filtered
  router.route('/byType/product/')
  .get(productController.readProductsFilteredType);

  // Update product with id = id
  router.route('/product/update/:id')
    .put(authenticateJWT, productController.updateProduct);

  // Update atribute state of product with id = id
  router.route('/product/updateState/:id')
    .put(authenticateJWT, productController.updateStateProduct);

  // Delete product with id = id
  router.route('/product/delete/:id')
    .delete(authenticateJWT, productController.deleteProduct);

  // Create new category
  router.route('/category/create/')
    .post(authenticateJWT, validateCreateCategory, categoryController.createCategory);

  // Read category with id = id
    router.route('/category/:id')
    .get(categoryController.readCategory);
  
  // Read all categories
  router.route('/category/')
    .get(categoryController.readAllCategories);
  
  // Update category with id = id
  router.route('/category/update/:id')
    .put(authenticateJWT, categoryController.updateCategory);
  
  // Delete category with id = id
  router.route('/category/delete/:id')
    .delete(authenticateJWT, categoryController.deleteCategory);

  // Create new type
  router.route('/type/create/')
    .post(authenticateJWT, validateCreateType, typeController.createType);

  // Read type with id = id
  router.route('/type/:id')
    .get(typeController.readType);

  // Read all types
  router.route('/type/')
    .get(typeController.readAllTypes);

  // Update type with id = id
  router.route('/type/update/:id')
    .put(authenticateJWT, typeController.updateType);

  // Delete type with id = id
  router.route('/type/delete/:id')
    .delete(authenticateJWT, typeController.deleteType);

  router.route('/product/noImages/')
    .delete(productController.deleteWihtNoImages)

    
  // ======================
  // ---- USER  Routes ----
  // ======================

  router.route('/register')

    .post(userController.registerUser);

  router.route('/login')
    .post(userController.loginUser);


  router.route('/deleteUser/:id')
    .delete(authenticateJWT, userController.deleteUser);

  // Update user with id = id
  router.route('/user/update/:id')
    .put(userController.updateUser);

  // Read all products
  router.route('/user/')
    .get(userController.readAllUsers);

  router.route('/ids/user/')
    .get(userController.readUsersId);

  router.route('/user/:id')
    .get(userController.readUser);

  router.route('/user/name/:userId')
    .get(userController.readUserByName);
  
  router.route('/user/:id/products')
    .get(userController.getUserProducts)
  
  router.route('/user/:userId/rate')
    .post(authenticateJWT, userController.rateUser);

  router.route('/user/:id/products/rewards')
    .put(userController.getRewards)

  router.route('/user/:id/points')
    .get(userController.getUserPoints)

  router.route('/user/:id/wishlist')
    .get(authenticateJWT, userController.getUserWishlist)
    
  router.route('/user/:id/level')
    .get(userController.getUserLevel)

  router.route('/user/:id/levelManage')
    .get(authenticateJWT, userController.levelManage)
  /*
  router.route('/user/:id/rewards')
    .put(authenticateJWT, userController.getUserRewards)
  */
  router.route('/user/:id/AddToWishlist')
    .put(authenticateJWT, userController.addToWishlist)

  router.route('/user/:id/DeleteFromWishlist')
    .delete(authenticateJWT, userController.deleteFromWishlist)
  
  router.route('/user/:id/followed')
    .get(userController.getUserFollowed)

  router.route('/user/:id/followers')
    .get(userController.getUserFollowers)

  router.route('/user/:id/productsRecentlyViewed')
    .get(userController.getRecentlyViewed);

  router.route('/user/:id/addProductsRecentlyViewed')
    .put(userController.updateRecentlyViewed);

  router.route('/user/:id/follow')
    .post(authenticateJWT, userController.follow)

    
  // ======================
  // ---- Trade Routes ----
  // ======================

  // Create new tradeGive
  router.route('/tradeGive/create/')
    .post(authenticateJWT, tradeGiveController.createTradeGive);

  // Read tradeGive with id = id
    router.route('/tradeGive/:id')
    .get(tradeGiveController.readTradeGive);
  
  // Read all tradeGive
  router.route('/tradeGive/')
    .get(tradeGiveController.readAllTradeGive);
  
  // Delete tradeGive with id = id
  router.route('/tradeGive/delete/:id')
    .delete(/*authenticateJWT,*/ tradeGiveController.deleteTradeGive);

  // Create new tradeExchange
  router.route('/tradeExchange/create/')
    .post(authenticateJWT, tradeExchangeController.createTradeExchange);

  // Read tradeExchange with id = id
  router.route('/tradeExchange/:id')
    .get(tradeExchangeController.readTradeExchange);

  // Read all tradeExchange
  router.route('/tradeExchange/')
    .get(tradeExchangeController.readAllTradeExchange);

  // Delete tradeExchange with id = id
  router.route('/tradeExchange/delete/:id')
    .delete(authenticateJWT, tradeExchangeController.deleteTradeExchange);

  // Create new tradeLoan
  router.route('/tradeLoan/create/')
    .post(authenticateJWT, tradeLoanController.createTradeLoan);

  // Read tradeLoan with id = id
  router.route('/tradeLoan/:id')
    .get(tradeLoanController.readTradeLoan);

  // Read all tradeLoan
  router.route('/tradeLoan/')
    .get(tradeLoanController.readAllTradeLoan);

  // Delete tradeLoan with id = id
  router.route('/tradeLoan/delete/:id')
    .delete(authenticateJWT, tradeLoanController.deleteTradeLoan);

  // ======================
  // ---- Report Routes ---
  // ======================

  // Create new Report
  router.route('/report/create/')
    .post(authenticateJWT, reportController.createReport);

  // Read reports from userReported = userReported
    router.route('/report/user/:userReported')
    .get(authenticateJWT, reportController.readUserReports);
  
  // Read all reports
  router.route('/report/')
    .get(authenticateJWT, reportController.readAllReports);
  
     // Read no solved reports from userReported = userReported
  router.route('/report/nosolveds/:userReported')
  .get(authenticateJWT, reportController.readNoSolvedUserReports);

  router.route('/report/nosolved/')
  .get(authenticateJWT, reportController.readNoSolvedReports);

  // Close Report with id = id
  router.route('/report/close/:id')
    .put(authenticateJWT, reportController.closeReport);
  
  // Delete Report with id = id
  router.route('/report/delete/:id')
    .delete(authenticateJWT, reportController.deleteReport);

  // ======================
  // ---- Image Routes ----
  // ======================

  router.route('/image')
    .get(imageController.getAllImages)

  router.route('/image/:productId')
    .get(imageController.getProductImages)
    .post(upload.array('img',6), /*authenticateJWT, */ imageController.uploadImages)
  router.route('/product/:productId/image/:imageId')
    .delete(/*authenticateJWT, */ imageController.deleteImages)
    //.put(upload.array('img',6), /*authenticateJWT, */ imageController.updateImages)

  router.route('/filter/products')
    .get(categoryController.getProductCategory2)
  router.route('/filter/product')
    .get(categoryController.getProductCategory)


  router.route('/comments')
    .get(userController.getAllComments)
  router.route('/comments/done')
    .get(authenticateJWT, userController.getMyCommentsDone)
  router.route('/comments/recived')
    .get(authenticateJWT, userController.getMyCommentsRecived)

    // CONVERSATION
  router.route('/conversation')
    .get(conversationController.getConversations)
    .post(authenticateJWT, conversationController.newConversation)

  router.route('/conversation/user')
    .get(authenticateJWT, conversationController.getConversations)

  // ======================
  // ---- Admin Routes ----
  // ======================

  router.route('/registerAdmin')
    .post(adminController.registerAdmin);
  
  router.route('/deleteAdmin/:id')
    .delete(adminController.deleteAdmin);

  router.route('/admin/:id/gifts')
    .get(adminController.readGifts);

  router.route('/admin/:id/increaseGifts')
    .put(adminController.increaseGifts);

  router.route('/admin/:id/loans')
    .get(adminController.readLoans);

  router.route('/admin/:id/increaseLoans')
    .put(adminController.increaseLoans);

  router.route('/admin/:id/exchanges')
    .get(adminController.readExchanges);

  router.route('/admin/:id/increaseExchanges')
    .put(adminController.increaseExchanges);
  
  router.route('/admin/:id/users')
    .get(adminController.readUsers)

  router.route('/admin/:id/increaseUsers')
    .put(adminController.increaseUsers);

  router.route('/admin/:id/products')
    .get(adminController.readProducts)

  router.route('/admin/:id/increaseProducts')
    .put(adminController.increaseProducts);

  router.route('/admin/:id/ecoPoints')
    .get(adminController.readEcoPoints)

  router.route('/admin/:id/increaseEcopoints')
    .put(adminController.increaseEcopoints);

  router.route('/admin/:id/increaseBlockedUsers')
    .put(adminController.increaseBlockedUsers);

  router.route('/admin/:id/blockedUsers')
    .get(adminController.readBlockedUsers)


    // get my conversations
    router.route('/conversation/mine').get(authenticateJWT, conversationController.getMyConversations)


  router.route('/message')
    .get(messageController.getMessages)
    .post(authenticateJWT, messageController.sendMessage)
  
  router.route('/conversation/:conversationId')
    .get(authenticateJWT, messageController.getConversationMessages)


    // ADMIN PAGE
  router.route('/admin/transactions').get(adminController.numTransasPorTipo)
  router.route('/admin/categories').get(adminController.numCategories)
  return router;


}

