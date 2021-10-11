const ordersDao = require("../dao/orders-dao");

async function newOrder(orderData, cartId, userId) {
    orderData.orderDate = await getToday();
    console.log(orderData.orderDate);
    await ordersDao.newOrder(orderData, cartId, userId);
}

async function getOrderDetails(cartId) {
    let orderDetails = await ordersDao.getOrderDetails(cartId);
    orderDetails = await fixOrderDetails(orderDetails);
    
    return orderDetails;
}

async function fixOrderDetails(orderDetails) {
    console.log(orderDetails);
    let products = [];

    for(let index = 0; index < orderDetails.length; index++){
        products.push({
            name: orderDetails[index].name,
            description: orderDetails[index].description,
            amount: orderDetails[index].amount,
            price: orderDetails[index].price
        })
    }

    orderDetails = {
        orderId: orderDetails[0].orderId,
        orderDate: orderDetails[0].orderDate,
        totalPrice: orderDetails[0].totalPrice,
        city: orderDetails[0].city,
        address: orderDetails[0].address,
        shippingDate: orderDetails[0].shippingDate,
        products: products
    }

    return orderDetails;
}

async function getNumberOfOrders() {
    let numberOfOrders = await ordersDao.getNumberOfOrders();

    return numberOfOrders;
}

async function isAbleShippingDate(shippingOrderData) {
    let isAbleShippingDate = await ordersDao.isAbleShippingDate(shippingOrderData);
    
    if(isAbleShippingDate == 3){
        return false;
    }

    return true;
}

async function getUserOrders(userId) {
    let allOrders = await ordersDao.getUserOrders(userId);
    console.log(allOrders);
    let ordersId = [];
    let orders = [];
    allOrders.forEach(order => {
        if (!ordersId.includes(order.orderId)) {
            ordersId.push(order.orderId);
        }
    });
    
    for (let index = 0; index < ordersId.length; index++) {
        let order = {
            order: await getOrderData(ordersId[index], allOrders),
            products: await getProductsData(ordersId[index], allOrders)
        }
        orders.push(order);
    }
    
    return orders;
}

async function getOrderData(orderId, allOrders) {
    for (let index = 0; index < allOrders.length; index++) {
        if (allOrders[index].orderId == orderId) {
            orderData = {
                orderId: orderId,
                totalPrice: allOrders[index].totalPrice,
                orderDate: allOrders[index].orderDate,
                shippingDate: allOrders[index].shippingDate,
            }
            
            return orderData;
        }
    }
}

async function getProductsData(orderId, allOrders) {
    let products = [];
    let isProductIdFound = false;

    for (let index = 0; index < allOrders.length; index++) {
        if (allOrders[index].orderId == orderId) {
            isProductIdFound = true;
            let product = {
                productId: allOrders[index].productId,
                productName: allOrders[index].productName,
                description: allOrders[index].description,
                amount: allOrders[index].amount,
                price: allOrders[index].price,
                image: allOrders[index].image
            }

            products.push(product);
        }

        if (allOrders[index].orderId != orderId && isProductIdFound) {
            return products;
        }
    }

    return products;
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

module.exports = {
    getUserOrders,
    newOrder,
    getOrderDetails,
    isAbleShippingDate,
    getNumberOfOrders
}