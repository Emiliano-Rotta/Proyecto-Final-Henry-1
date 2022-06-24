const {Product, User} = require('../db');

async function getFavourites(username) {
    const where = {username};
    const user = User.findOne({where});
    return user.getFavouriteProducts();
};

async function addFavourite(username, productId) {
    const where = {username};
    const user = User.findOne({where});
    const product = Product.findByPk(productId);
    if (!product) throw new Error('El producto no existe en la base de datos.');
    user.addFavouriteProduct(product);
};

module.exports={
    addFavourite,
    getFavourites
};