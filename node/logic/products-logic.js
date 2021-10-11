const productsDao = require("../dao/products-dao");
const uuid = require("uuid");

async function getAllProducts() {
    let allProducts = await productsDao.getAllProducts();

    return allProducts;
}

async function addProduct(productData) {
    await productsDao.addProduct(productData);
}

async function uploadImage(file) {
    const extension = file.name.substr(file.name.lastIndexOf("."));
    let newUuidFileName = uuid.v4();
    await file.mv("./uploads/" + newUuidFileName + extension);
    let imageStr = newUuidFileName + extension;
    return imageStr;
}

async function updateProduct(productData) {
    let allProducts = await productsDao.updateProduct(productData);

    return allProducts;
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    uploadImage
}