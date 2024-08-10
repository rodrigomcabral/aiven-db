import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";

//the sale service is to insert in the db, in this case to the repository
async function createSale(sale) {
  //validate if theres client and product first
  if (!(await ClientRepository.getClient(sale.client_id))) {
    throw new Error("The client_id passed does not exist!");
  }
  const product = await ProductRepository.getProduct(sale.product_id);
  if (!product) {
    throw new Error("The product_id passed does not exist!");
  }
  //in case theres product available, we check how many of them we have and subtract
  if (product.stock > 0) {
    //here instead of returning here through the logs we return for the user (api)
    sale = await SaleRepository.insertSale(sale);
    product.stock--;
    ProductRepository.updateProduct(product);
  } else {
    throw new Error("The product wanted is out of stock!");
  }
}

async function getSales(productId) {
  if (productId) {
    return await SaleRepository.getSalesByProductId(productId);
  }
  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  //first we save the sale to give data back to the storage
  const sale = await SaleRepository.getSale(id);
  if (sale) {
    //second we save the product by getting its id
    const product = await ProductRepository.getProduct(sale.product_id);
    //third we can delete the sale
    await SaleRepository.deleteSale(id);
    //then we add the product back to the stock
    product.stock++;
    //finally we update the stock
    await productRepository.updateProduct(product);
  } else {
    throw new Error("The id of the sale passed does not exist!");
  }
  //also suppose we have nuances in here. For instance: get the money back to the bank by getting its id - sale.value
}

async function updateSale(sale) {
  return await SaleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
