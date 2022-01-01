const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const userController = require('../controllers/apiUser.js');
const imageController = require('../controllers/apiImage.js');
const typeController = require('../controllers/apiType.js');
const tradeGiveController = require('../controllers/apiTradeGive.js');
const tradeExchangeController = require('../controllers/apiTradeExchange.js');
const tradeLoanController = require('../controllers/apiTradeLoan.js');
const conversationController = require ('../controllers/apiConvesration.js')
const adminController = require ('../controllers/apiAdmin.js')
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
    .put(/*authenticateJWT, */ productController.updateProduct);

  // Update atribute state of product with id = id
  router.route('/product/updateState/:id')
    .put(/*authenticateJWT, */productController.updateStateProduct);

  // Delete product with id = id
  router.route('/product/delete/:id')
    .delete(authenticateJWT, productController.deleteProduct);

  // Create new category
  router.route('/category/create/')
    .post(validateCreateCategory, categoryController.createCategory);

  // Read category with id = id
    router.route('/category/:id')
    .get(categoryController.readCategory);
  
  // Read all categories
  router.route('/category/')
    .get(categoryController.readAllCategories);
  
  // Update category with id = id
  router.route('/category/update/:id')
    .put(categoryController.updateCategory);
  
  // Delete category with id = id
  router.route('/category/delete/:id')
    .delete(categoryController.deleteCategory);

  // Create new type
  router.route('/type/create/')
    .post(validateCreateType, typeController.createType);

  // Read type with id = id
  router.route('/type/:id')
    .get(typeController.readType);

  // Read all types
  router.route('/type/')
    .get(typeController.readAllTypes);

  // Update type with id = id
  router.route('/type/update/:id')
    .put(typeController.updateType);

  // Delete type with id = id
  router.route('/type/delete/:id')
    .delete(typeController.deleteType);

    
  // ======================
  // ---- USER  Routes ----
  // ======================

  router.route('/register')

    .post(userController.registerUser);

  router.route('/login')
    .post(userController.loginUser);


  router.route('/deleteUser/:id')
    .delete(userController.deleteUser);

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
  
  router.route('/user/:id/products')
    .get(userController.getUserProducts)
  
  router.route('/user/:userId/rate')
    .post(authenticateJWT, userController.rateUser);

  router.route('/user/:id/products')
    .get(userController.getRewards)

  router.route('/user/:id/points')
    .get(userController.getUserPoints)

  router.route('/user/:id/wishlist')
    .get(userController.getUserWishlist)
    
  router.route('/user/:id/level')
    .get(userController.getUserLevel)

  router.route('/user/:id/levelManage')
    .get(userController.levelManage)

  router.route('/user/:id/rewards')
    .get(userController.getUserRewards)

  router.route('/user/:id/AddToWishlist')
    .post(userController.addToWishlist)

    router.route('/user/:id/DeleteFromWishlist')
    .post(userController.deleteFromWishlist)
  
  router.route('/user/:id/AddFollowed')
    .post(userController.addUserFollowed)
  
  router.route('/user/:id/AddFollower')
    .post(userController.addUserFollower)
  
  router.route('/user/:id/followed')
    .get(userController.getUserFollowed)

  router.route('/user/:id/followers')
    .get(userController.getUserFollowers)

  router.route('/user/:id/unfollow')
    .post(userController.unfollow)

  router.route('/user/:id/loseFollower')
    .post(userController.loseFollower)
    
  // ======================
  // ---- Trade Routes ----
  // ======================

  // Create new tradeGive
  router.route('/tradeGive/create/')
    .post(tradeGiveController.createTradeGive);

  // Read tradeGive with id = id
    router.route('/tradeGive/:id')
    .get(tradeGiveController.readTradeGive);
  
  // Read all tradeGive
  router.route('/tradeGive/')
    .get(tradeGiveController.readAllTradeGive);
  
  // Update tradeGive with id = id
  router.route('/tradeGive/update/:id')
    .put(tradeGiveController.updateTradeGive);
  
  // Delete tradeGive with id = id
  router.route('/tradeGive/delete/:id')
    .delete(tradeGiveController.deleteTradeGive);

  // Create new tradeExchange
  router.route('/tradeExchange/create/')
    .post(tradeExchangeController.createTradeExchange);

  // Read tradeExchange with id = id
  router.route('/tradeExchange/:id')
    .get(tradeExchangeController.readTradeExchange);

  // Read all tradeExchange
  router.route('/tradeExchange/')
    .get(tradeExchangeController.readAllTradeExchange);

  // Update tradeExchange with id = id
  router.route('/tradeExchange/update/:id')
    .put(tradeExchangeController.updateTradeExchange);

  // Delete tradeExchange with id = id
  router.route('/tradeExchange/delete/:id')
    .delete(tradeExchangeController.deleteTradeExchange);

  // Create new tradeLoan
  router.route('/tradeLoan/create/')
    .post(tradeLoanController.createTradeLoan);

  // Read tradeLoan with id = id
  router.route('/tradeLoan/:id')
    .get(tradeLoanController.readTradeLoan);

  // Read all tradeLoan
  router.route('/tradeLoan/')
    .get(tradeLoanController.readAllTradeLoan);

  // Update tradeLoan with id = id
  router.route('/tradeLoan/update/:id')
    .put(tradeLoanController.updateTradeLoan);

  // Delete tradeLoan with id = id
  router.route('/tradeLoan/delete/:id')
    .delete(tradeLoanController.deleteTradeLoan);

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

  router.route('/admin/:id/gifts')
    .get(adminController.readGifts);

  router.route('/admin/:id/loans')
    .get(adminController.readLoans);

  router.route('/admin/:id/exchanges')
    .get(adminController.readExchanges);
  
  router.route('/admin/:id/users')
    .get(adminController.readUsers)

  router.route('/admin/:id/products')
    .get(adminController.readProducts)

  router.route('/admin/:id/ecoPoints')
    .get(adminController.readEcoPoints)

  router.route('/admin/:id/blockedUsers')
    .get(adminController.readBlockedUsers)

  return router;


}

