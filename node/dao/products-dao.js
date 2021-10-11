const connection = require("./connection-wrapper");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function getAllProducts() {

  let sql = `SELECT 
  p.product_id AS productId,
  p.product_name AS name,
  p.description,
  c.category_id AS categoryId,
  c.category_name AS categoryName,
  p.price,
  p.image
FROM
  products p
      RIGHT JOIN
  categories c ON c.category_id = p.category_id`;

  try {
    let allProducts = await connection.execute(sql);
    return allProducts;
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, e);
  }

}

async function addProduct(productData) {

  let sql = `INSERT INTO products SET product_name = ?, description = ?, category_id = ?, price = ?, image = ?`;

  let parameters = [
    productData.name,
    productData.description,
    productData.categoryId,
    productData.price,
    productData.image
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productData), e);
  }

}

async function updateProduct(productData) {

  let sql = `UPDATE products SET product_name = ?, description = ?, category_id = ?, price = ?, image = ? WHERE product_id = ?`;

 let parameters = [
  productData.name,
  productData.description,
  productData.categoryId,
  productData.price,
  productData.image,
  productData.productId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  }
  catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productData), e);
  }

}


module.exports = {
  getAllProducts,
  updateProduct,
  addProduct
}