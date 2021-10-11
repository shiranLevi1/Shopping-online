let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getUserOrders(userId) {
  let sql = `SELECT 
  cp.product_id AS productId,
  cp.amount,
  cp.total_price AS price,
  cp.cart_id AS cartId,
  order_id AS orderId,
  o.total_price AS totalPrice,
  DATE_FORMAT(o.order_date, "%d/%m/%Y %h:%m:%s") AS orderDate,
  DATE_FORMAT(o.shipping_date, "%d/%m/%Y") AS shippingDate,
  p.image,
  p.product_name AS productName,
  p.description AS description
FROM
  cart_products cp
      JOIN
  products p ON p.product_id = cp.product_id
      JOIN
  (SELECT 
      *
  FROM
      orders
  WHERE
      user_id = ?) o ON o.cart_id = cp.cart_id
  ORDER BY o.order_id desc`;

  let parameters = [
    userId
  ];

  try {
    let allOrders = await connection.executeWithParameters(sql, parameters);
    return allOrders;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

async function getOrderDetails(cartId) {
    let sql = `SELECT 
    cp.amount,
    cp.total_price AS price,
    p.product_name AS name,
    p.description,
    o.order_id AS orderId,
    o.total_price AS totalPrice,
    o.city,
    o.address,
    DATE_FORMAT(o.shipping_date, "%d/%m/%Y") AS shippingDate, 
    DATE_FORMAT(o.order_date, "%d/%m/%Y %h:%m:%s") AS orderDate 
FROM
    cart_products cp
        JOIN
    products p ON p.product_id = cp.product_id
        JOIN
    (SELECT 
        *
    FROM
        orders
    WHERE
        cart_id = ?) o ON o.cart_id = cp.cart_id`;
  
    let parameters = [
      cartId
    ];
  
    try {
      let orderDetails = await connection.executeWithParameters(sql, parameters);
      return orderDetails;
    }
    catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
    }
  }
  
  async function newOrder(orderData, cartId, userId) {
    let sql = `INSERT INTO orders SET 
      cart_id = ?, 
      user_id = ?, 
      order_date = ?, 
      total_price = ?, 
      city = ?, 
      address = ?, 
      shipping_date = ?, 
      last_4_digits_payment = ?`;
  
    let parameters = [
      cartId,
      userId,
      orderData.orderDate,
      orderData.totalPrice,
      orderData.city,
      orderData.address,
      orderData.shippingDate,
      orderData.creditCard,
    ];
  
    try {
      await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(orderData) + JSON.stringify(cartId) + JSON.stringify(userId), e);
    }
  }
  
  async function isAbleShippingDate(shippingOrderData) {
    let sql = `SELECT order_id FROM orders WHERE shipping_date = ?`;

    let parameters = [
      shippingOrderData
    ];
  
    try {
      let isAbleShippingDate = await connection.executeWithParameters(sql, parameters);
      
      return isAbleShippingDate.length;
    }
    catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(shippingOrderData), e);
    }
  }
  
  async function getNumberOfOrders() {
    let sql = `SELECT order_id FROM orders`;
  
    try {
      let numberOfOrders = await connection.execute(sql);
      
      return numberOfOrders.length;
    }
    catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
  }

module.exports = {
  getUserOrders,
    newOrder,
    getOrderDetails,
    isAbleShippingDate,
    getNumberOfOrders
}