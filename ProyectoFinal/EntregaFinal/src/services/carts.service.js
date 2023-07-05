import cartsMongo from '../persistence/DAO/cartsDAO/cartsMongo.js';

export const createCartService  = async (cart) => {
    const newCart = await cartsMongo.create(cart);
    return newCart;
}

export const getAllCartsService = async () => {
    const carts = await cartsMongo.findAll();
    return carts;
}

export const updateCartService = async (id, cartObj) => {
    const updateCart = await cartsMongo.updateOne(id, cartObj);
    return updateCart;
}

export const findOneCartService = async (id) => {
    const cartId = await cartsMongo.findOne(id);
    return cartId;
}

export const deleteCartService = async (id) => {
    const cartId = await cartsMongo.deleteOne(id);
    return cartId;
}

export const addProductInCartService = async (cid, pid, quantity) => {
    const newProductInCart = await cartsMongo.addProductInCart(cid, pid, quantity);
    return newProductInCart;
}

export const finalizePurchaseService = async (cid) => {
    const newPurchase = await cartsMongo.finalizePurchase(cid);
    console.log('carts.service: newPurchase ', newPurchase);
    return newPurchase;
}