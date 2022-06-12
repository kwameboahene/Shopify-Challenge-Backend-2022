const Pool = require("./db");

class Select {
  //get products
  async viewProduct() {
    try {
      const product = await Pool.query(`Select * from inventory.product`);
      return product.rows;
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }
  async viewProductId(body) {
    try {
      const product = await Pool.query(
        `Select * from inventory.product where product_id=$1`,
        [body]
      );
      return product.rows;
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }

  //get locations
  async viewLocation() {
    try {
      const locations = await Pool.query(`Select * from inventory.location`);
      return locations.rows;
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }
  async viewLocationId(body) {
    try {
      const locations = await Pool.query(
        `Select * from inventory.location where location_id=$1`,
        [body]
      );
      return locations.rows;
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }
  //get inventory
  async viewInventory() {
    try {
      const inventory = await Pool.query(`Select * from inventory.inventory`);
      return inventory.rows;
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }
  async viewInventoryId(body) {
    try {
      const inventory = await Pool.query(
        `Select * from inventory.inventory where inventory_id=$1`,
        [body]
      );
      return inventory.rows;
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }
}

module.exports = Select;
