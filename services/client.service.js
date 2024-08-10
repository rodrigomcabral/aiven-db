import ClientRepository from "../repositories/client.repository.js";

//the client service is to insert in the db, in this case to the repository
async function createClient(client) {
  //here instead of returning here through the logs we return for the user (api)
  return await ClientRepository.insertClient(client);
}

async function getClients() {
  return await ClientRepository.getClients();
}

async function getClient(id) {
  return await ClientRepository.getClient(id);
}

async function deleteClient(id) {
  return await ClientRepository.deleteClient(id);
}

async function updateClient(client) {
  return await ClientRepository.updateClient(client);
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
