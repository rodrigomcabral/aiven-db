import { connect } from "./db.js";

//here we will interate with the database
async function insertSale(sale) {
  const conn = await connect();
  try {
    const sql =
      //sale_id is generated automatic
      "INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [sale.value, sale.date, sale.client_id, sale.product_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function getSales() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * from sales");
    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function getSalesByProductId(productId) {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * from sales WHERE product_id = $1", [
      productId,
    ]);
    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function getSale(id) {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * from sales WHERE sale_id = $1", [
      id,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function deleteSale(id) {
  const conn = await connect();
  try {
    //no need to return, its a deletion
    await conn.query("DELETE FROM sales WHERE client_id = $1", [id]);
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function updateSale(sale) {
  const conn = await connect();
  try {
    //we wont need the product_id here since it doesn't make sense to change it
    const sql =
      "UPDATE sales SET value = $1, date = $2, client_id = $3 WHERE sale_id = $4 RETURNING *";
    const values = [sale.value, sale.date, sale.client_id, sale.sale_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

export default {
  insertSale,
  getSales,
  getSalesByProductId,
  getSale,
  updateSale,
  deleteSale,
  updateSale,
};
