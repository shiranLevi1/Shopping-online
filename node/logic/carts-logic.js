const cartsDao = require("../dao/carts-dao");
let cacheModule = require('../dao/cache-module');

async function addProductToCart(productData, cartId) {
    await cartsDao.addProductToCart(productData, cartId);
}

async function updateProductToCart(productData, cartId) {
    await cartsDao.updateProductToCart(productData, cartId);
}

async function openNewCart(userId) {
    let dateTime = await getToday();
    await cartsDao.createCart(dateTime, userId);
    let cartsIdArray = await cartsDao.getCartId(userId);
    let newCartId;
    for(let index = 0; index < cartsIdArray.length; index++){
        if(cartsIdArray[index].isOpenCart == 1){
            newCartId = cartsIdArray[index].cartId;
        }
    }
    cacheModule.setCartId(userId, newCartId);
}

async function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();

    let fixedToday = yyyy + '-' + mm + '-' + dd + " " + hour + ':' + min + ':' + '00';

    return fixedToday;
}

async function getUserCart(cartId) {
    let userCart = await cartsDao.getUserCart(cartId);
    return userCart;
}

async function removeItemFromCart(productId) {
    await cartsDao.removeItemFromCart(productId);
}

async function clearCart(cartId) {
    await cartsDao.clearCart(cartId);
}

module.exports = {
    addProductToCart,
    getUserCart,
    removeItemFromCart,
    updateProductToCart,
    openNewCart,
    clearCart
}