const Pool = require("./db");

class Edit {
  async editInventory(body) {
    const { id, product, quantity, date, location } = body;
    try {
      const prod = await Pool.query(
        `Update inventory.inventory SET product=$2, quantity=$3, date=$4, location=$5  where inventory_id=$1`,
        [id, product, quantity, date, location]
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

  async editProduct(body) {
    const { id, product } = body;
    try {
      const prod = await Pool.query(
        `Update inventory.product SET name=$2 where product_id=$1`,
        [id, product]
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
  async editLocation(body) {
    const { id, location } = body;
    try {
      const loc = await Pool.query(
        `Update inventory.location SET location_name=$2 where location_id=$1`,
        [id, location]
      );
      return "success";
    } catch (error) {
      //console.log(error);
      return {
        status: error.response.status,
      };
    }
  }
}

module.exports = Edit;
