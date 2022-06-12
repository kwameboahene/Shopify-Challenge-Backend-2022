const Pool = require("./db");

class Delete {
  async deleteInventory(body) {
    try {
      const del = await Pool.query(
        `DELETE FROM inventory.inventory WHERE inventory_id = $1`,
        [body]
      );
      console.log("doneeee");
      return "success";
    } catch (error) {
      console.log(error);
      return {
        error: true,
        status: error,
      };
    }
  }

  async deleteProduct(body) {
    try {
      const del = await Pool.query(
        `DELETE FROM inventory.product WHERE product_id = $1`,
        [body]
      );
      return "success";
    } catch (error) {
      //console.log(error);
      return {
        error: true,
        status: error,
      };
    }
  }
  async deleteLocation(body) {
    console.log(body);
    try {
      const del = await Pool.query(
        `DELETE FROM inventory.location WHERE location_id= $1`,
        [body]
      );
      return "success";
    } catch (error) {
      //console.log(error);
      return {
        error: true,
        status: error,
      };
    }
  }
}

module.exports = Delete;
