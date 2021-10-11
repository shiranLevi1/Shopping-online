let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getUserCart(cartId) {
  let sql = `SELECT 
  cp.cart_product_id AS cartProductId,
  cp.product_id AS productId,
  cp.amount,
  cp.total_price AS totalPrice,
  p.image,
  p.price,
  p.description,
  p.product_name AS productName,
  DATE_FORMAT(c.created_date, "%d/%m/%Y") AS createdDate
FROM
  products p
      JOIN
  (SELECT 
      *
  FROM
      cart_products
  WHERE
      cart_id = ?) cp ON cp.product_id = p.product_id
      JOIN
  carts c ON c.cart_id = cp.cart_id`;

  let parameters = [
    cartId
  ];

  try {
    let userCart = await connection.executeWithParameters(sql, parameters);

    return userCart;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
  }
}

async function addProductToCart(productData, cartId) {
  let sql = `INSERT INTO cart_products SET cart_id = ?, product_id = ?, amount = ?, total_price = ?`;

  let parameters = [
    cartId,
    productData.productId,
    productData.amount,
    productData.totalPrice
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productData) + JSON.stringify(cartId), e);
  }
}

async function updateProductToCart(productData, cartId) {
  let sql = `UPDATE cart_products SET amount = ?, total_price = ? WHERE cart_id = ? AND product_id = ?`;

  let parameters = [
    productData.amount,
    productData.totalPrice,
    cartId,
    productData.productId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productData) + JSON.stringify(cartId), e);
  }
}

async function createCart(date, userId) {
  let sql = `INSERT INTO carts SET user_id = ?, created_date = ?`;

  let parameters = [
    userId,
    date
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(date) + JSON.stringify(userId), e);
  }
}

async function removeItemFromCart(productId) {
  let sql = `DELETE FROM cart_products WHERE product_id = ?`;

  let parameters = [
    productId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productId), e);
  }
}

async function clearCart(cartId) {
  let sql = `DELETE FROM cart_products WHERE cart_id = ?`;

  let parameters = [
    cartId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
  }
}

async function deleteCart(cartId) {
  let sql = `DELETE FROM carts WHERE cart_id = ?`;

  let parameters = [
    cartId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
  }
}

async function getCartId(userId) {
  let sql = `SELECT 
  c.cart_id AS cartId,
  CASE
      WHEN ord.cart_id IS NOT NULL THEN 0
      ELSE 1
  END AS 'isOpenCart'
FROM
  carts c
      LEFT JOIN
  orders ord ON ord.cart_id = c.cart_id
WHERE
  c.user_id = ?`;

  let parameters = [
    userId
  ];

  try {
    let cartId = await connection.executeWithParameters(sql, parameters);

    return cartId;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

module.exports = {
  createCart,
  addProductToCart,
  getCartId,
  getUserCart,
  removeItemFromCart,
  updateProductToCart,
  deleteCart,
  clearCart
};