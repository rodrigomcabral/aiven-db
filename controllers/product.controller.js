import ProductService from "../services/product.service.js";

// first we create a product
async function createProduct(req, res, next) {
  let product = req.body;
  try {
    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        "Name, Description, Value, Stock or supplier_id are mandatory!"
      );
    }
    //create the product in the db and return the service
    product = await ProductService.createProduct(product);
    res.send(product);
    logger.info(`POST /product - ${JSON.stringfy(product)}`);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    res.send(await ProductService.getProducts());
    logger.info("GET /products");
  } catch (error) {
    next(error);
  }
  return await ProductService.getProducts();
}

async function getProduct(req, res, next) {
  try {
    //req.params.param_name to access the value passed in the route
    res.send(await ProductService.getProduct(req.params.id));
    logger.info("GET /product");
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.end();
    logger.info("DELETE /product");
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    //here we add the id as a condtion to update (key)
    let product = req.body;
    if (
      !product.product_id ||
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        "Product ID, Name, Description, Value, Stock, supplier_id are mandatory to update."
      );
    }
    //in case the req is legit
    product = await ProductService.updateProduct(product);
    res.send(product);
    //print to log parsed to js
    logger.info(`PUT /product - ${JSON.stringify(product)})`);
  } catch (error) {
    next(error);
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
