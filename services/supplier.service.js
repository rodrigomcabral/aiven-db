import SupplierRepository from "../repositories/supplier.repository.js";

//the supplier service is to insert in the db, in this case to the repository
async function createSupplier(supplier) {
  //here instead of returning here through the logs we return for the user (api)
  return await SupplierRepository.insertSupplier(supplier);
}

async function getSuppliers() {
  return await SupplierRepository.getSuppliers();
}

async function getSupplier(id) {
  return await SupplierRepository.getSupplier(id);
}

async function deleteSupplier(id) {
  return await SupplierRepository.deleteSupplier(id);
}

async function updateSupplier(supplier) {
  return await SupplierRepository.updateSupplier(supplier);
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
