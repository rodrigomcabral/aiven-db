import ProductRepository from "../repositories/product.repository.js";
import SupplierRepository from "../repositories/supplier.repository.js";

//the product service is to insert in the db, in this case to the repository
async function createProduct(product) {
  //first we check if the supplier exists to create a product
  //second instead of returning through logs we return for the user (api)
  if (await SupplierRepository.getSupplier(product.supplier_id)) {
    return await ProductRepository.insertProduct(product);
  }
  throw new Error("Supplier_id passed does not exist!");
}

async function getProducts() {
  return await ProductRepository.getProducts();
}

async function getProduct(id) {
  return await ProductRepository.getProduct(id);
}

async function deleteProduct(id) {
  return await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplier_id)) {
    return await ProductRepository.updateProduct(product);
  }
  throw new Error("The supplier_id passed as a parameter does not exist!");
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
