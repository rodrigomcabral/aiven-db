import SupplierService from "../services/supplier.service.js";

// first we create a supplier
async function createSupplier(req, res, next) {
  let supplier = req.body;
  try {
    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error("Name, Cnpj, Phone, Email or Address are mandatory!");
    }
    //create the supplier in the db and return the service
    supplier = await SupplierService.createSupplier(supplier);
    res.send(supplier);
    logger.info(`POST /supplier - ${JSON.stringfy(supplier)}`);
  } catch (error) {
    next(error);
  }
}

async function getSuppliers(req, res, next) {
  try {
    res.send(await SupplierService.getSuppliers());
    logger.info("GET /suppliers");
  } catch (error) {
    next(error);
  }
  return await SupplierService.getSuppliers();
}

async function getSupplier(req, res, next) {
  try {
    //req.params.param_name to access the value passed in the route
    res.send(await SupplierService.getSupplier(req.params.id));
    logger.info("GET /supplier");
  } catch (error) {
    next(error);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    await SupplierService.deleteSupplier(req.params.id);
    res.end();
    logger.info("DELETE /supplier");
  } catch (error) {
    next(error);
  }
}

async function updateSupplier(req, res, next) {
  try {
    //here we add the id as a condtion to update
    let supplier = req.body;
    if (
      !supplier.supplier_id ||
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error(
        "Supplier ID, Name, Cnpj, Phone, Email, Address are mandatory to update."
      );
    }
    //in case the req is legit
    supplier = await SupplierService.updateSupplier(supplier);
    res.send(supplier);
    //print to log parsed to js
    logger.info(`PUT /supplier - ${JSON.stringify(supplier)})`);
  } catch (error) {
    next(error);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
