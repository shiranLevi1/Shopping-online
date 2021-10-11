let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function register(registrationData) {
  let sql = `INSERT INTO users SET user_id = ?, email = ?, password = ?, first_name = ?, last_name = ?, city = ?, address = ?`;

  let parameters = [
    registrationData.id,
    registrationData.email,
    registrationData.password,
    registrationData.firstName,
    registrationData.lastName,
    registrationData.city,
    registrationData.address
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
  }
}

async function getUserDetails(userId) {
  let sql = `SELECT CONCAT(first_name, " " ,last_name) AS fullName,first_name AS firstName, last_name AS lastName , email, city, address FROM users WHERE user_id = ?`;

  let parameters = [
    userId
  ];

  try {
    let userDetails = await connection.executeWithParameters(sql, parameters);
    return userDetails[0];
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

async function login(email, password) {
  let sql = `SELECT user_id as userId, user_type as userType, is_new AS isNew, CONCAT(first_name, " " ,last_name) AS fullName FROM users WHERE email = ? AND password = ?`;

  let parameters = [
    email,
    password
  ];

  try {
    let userLogin = await connection.executeWithParameters(sql, parameters);

    return userLogin[0];
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(email) + JSON.stringify(password), e);
  }
}

async function unNewCustomer(email) {
  let sql = `UPDATE users SET is_new = 0 WHERE email = ?`;

  let parameters = [
    email
  ];

  try {
    let userLogin = await connection.executeWithParameters(sql, parameters);

    return userLogin[0];
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(email), e);
  }
}

async function updateUserData(userData, userId) {
  let sql = `UPDATE users SET first_name = ?, last_name = ?, city = ?, address = ? WHERE user_id = ?`;

  let parameters = [
    userData.firstName,
    userData.lastName,
    userData.city,
    userData.address,
    userId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userData) + JSON.stringify(userId), e);
  }
}

async function updateUserEmail(email, userId) {
  let sql = `UPDATE users SET email = ? WHERE user_id = ?`;

  let parameters = [
    email,
    userId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userData) + JSON.stringify(userId), e);
  }
}

async function isEmailInUse(email, userId) {
  let sql = `SELECT user_id FROM users WHERE email = ? AND NOT user_id = ?`;

  let parameters = [
    email,
    userId
  ];

  try {
    let isEmailInUse = await connection.executeWithParameters(sql, parameters);
    return isEmailInUse.length;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(email) + JSON.stringify(userId), e);
  }
}

async function isEmailExsist(email) {
  let sql = `SELECT user_id FROM users WHERE email = ?`;

  let parameters = [
    email
  ];

  try {
    let isEmailExsist = await connection.executeWithParameters(sql, parameters);

    return isEmailExsist.length;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(email), e);
  }
}

async function isIdExsist(id) {
  let sql = `SELECT user_id FROM users WHERE user_id = ?`;

  let parameters = [
    id
  ];

  try {
    let isIdExsist = await connection.executeWithParameters(sql, parameters);
    return isIdExsist.length;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(id), e);
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


module.exports = {
  register,
  login,
  updateUserData,
  updateUserEmail,
  isEmailInUse,
  getUserDetails,
  getCartId,
  createCart,
  isEmailExsist,
  isIdExsist,
  unNewCustomer
};