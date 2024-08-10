import ClientService from "../services/client.service.js";

// first we create a client
async function createClient(req, res, next) {
  let client = req.body;
  try {
    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("Name, Cpf, Phone, Email and Address are mandatory!");
    }
    //create the client in the db and return the service
    client = await ClientService.createClient(client);
    res.send(client);
    logger.info(`POST /client - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await ClientService.getClients());
    logger.info("GET /clients");
  } catch (error) {
    next(error);
  }
  return await ClientService.getClients();
}

async function getClient(req, res, next) {
  try {
    //req.params.param_name to access the value passed in the route
    res.send(await ClientService.getClient(req.params.id));
    logger.info("GET /client");
  } catch (error) {
    next(error);
  }
}

async function deleteClient(req, res, next) {
  try {
    await ClientService.deleteClient(req.params.id);
    res.end();
    logger.info("DELETE /client");
  } catch (error) {
    next(error);
  }
}

async function updateClient(req, res, next) {
  try {
    //here we add the id as a condtion to update
    let client = req.body;
    if (
      !client.client_id ||
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error(
        "Client ID, Name, Cpf, Phone, Email and Address are mandatory to update."
      );
    }
    //in case the req is legit
    client = await ClientService.updateClient(client);
    res.send(client);
    //print to log parsed to js
    logger.info(`PUT /client - ${JSON.stringify(client)})`);
  } catch (error) {
    next(error);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
