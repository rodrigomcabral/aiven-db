import SaleService from "../services/sale.service.js";

// first we create a sale
async function createSale(req, res, next) {
  let sale = req.body;
  try {
    if (!sale.value || !sale.date || !sale.client_id || !sale.product_id) {
      throw new Error("Value, Date, Client_id or Product_id are mandatory!");
    }
    //create the sale in the db and return the service
    sale = await SaleService.createSale(sale);
    res.send(sale);
    logger.info(`POST /sale - ${JSON.stringfy(sale)}`);
  } catch (error) {
    next(error);
  }
}

async function getSales(req, res, next) {
  try {
    //in case we want to consider the product_id in the url: re.query.product_id
    res.send(await SaleService.getSales(req.query.product_id));
    logger.info("GET /sales");
  } catch (error) {
    next(error);
  }
  return await SaleService.getSales();
}

async function getSale(req, res, next) {
  try {
    //req.params.param_name to access the value passed in the route
    res.send(await SaleService.getSale(req.params.id));
    logger.info("GET /sale");
  } catch (error) {
    next(error);
  }
}

async function deleteSale(req, res, next) {
  try {
    await SaleService.deleteSale(req.params.id);
    res.end();
    logger.info("DELETE /sale");
  } catch (error) {
    next(error);
  }
}

async function updateSale(req, res, next) {
  try {
    //here we add the id as a condition to update (key)
    let sale = req.body;
    if (
      !sale.sale_id ||
      !sale.value ||
      !sale.date ||
      !sale.client_id ||
      !sale.product_id
    ) {
      throw new Error(
        "Sale_id, Value, Date, Client_id and Product_id are mandatory to update!"
      );
    }
    //in case the req is legit
    sale = await SaleService.updateSale(sale);
    res.send(sale);
    //print to log parsed to js
    logger.info(`PUT /sale - ${JSON.stringify(sale)})`);
  } catch (error) {
    next(error);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
