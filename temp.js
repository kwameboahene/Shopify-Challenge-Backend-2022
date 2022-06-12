const Pool = require("./middleware/db");

class Utilities {
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
}

module.exports = Utilities;
