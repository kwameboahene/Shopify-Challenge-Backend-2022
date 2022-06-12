const Pool = require("./db");

class Insert {
  async insertInventory(body) {
    const { product, quantity, date, location } = body;
    try {
      const prod = await Pool.query(
        `Insert into inventory.inventory(product,quantity,date,location) values($1,$2,$3,$4)`,
        [product, quantity, date, location]
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

  async insertProduct(body) {
    const { product } = body;
    try {
      const prod = await Pool.query(
        `Insert into inventory.product(name) values($1)`,
        [product]
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
  async insertLocation(body) {
    const { location } = body;
    try {
      const loc = await Pool.query(
        `Insert into inventory.location(location_name) values($1)`,
        [location]
      );
      return "success";
    } catch (error) {
      //console.log(error);
      return {
        error: true,
        status: error.response,
      };
    }
  }
}

module.exports = Insert;
