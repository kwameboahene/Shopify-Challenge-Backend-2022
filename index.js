const express = require("express");
const app = express();
const Select = require("./middleware/select");
const Insert = require("./middleware/insert");
const Delete = require("./middleware/delete");
const Update = require("./middleware/edit");
const bodyParser = require("body-parser");
const moment = require("moment");
const cookieParser = require("cookie-parser");

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

const select = new Select();
const insert = new Insert();
const remove = new Delete();
const edit = new Update();

app.get("/", async (req, res) => {
  const inventory = await select.viewInventory();
  res.cookie("inventory", JSON.stringify(inventory));
  if (inventory.error) {
    console.log("error");
  } else {
    res.render("./inventory/entries", { invent: inventory });
  }
});

app.get("/Inventory", async (req, res) => {
  const inventory = await select.viewInventory();
  res.cookie("inventory", JSON.stringify(inventory));
  if (inventory.error) {
    console.log("error");
  } else {
    res.render("./inventory/entries", { invent: inventory });
  }
});

app.get("/addInventory", async (req, res) => {
  const dates = {
    maxdate: moment(moment.now()).format("YYYY-MM-DD"),
  };
  const products = await select.viewProduct();
  if (products.error) {
    console.log("error");
  } else {
    const locations = await select.viewLocation();
    if (locations.error) {
      console.log("error");
    } else {
      res.render("./inventory/form", {
        prod: products,
        loc: locations,
        date: dates,
      });
    }
  }
});

app.post("/addInventory", async (req, res) => {
  const add = await insert.insertInventory(req.body);
  if (add.error) {
    console.log(add.status);
  } else {
    res.redirect("/Inventory");
  }
});

app.get("/deleteInventory", async (req, res) => {
  const del = await remove.deleteInventory(req.query.id);
  if (del.error) {
    console.log(del.status);
  } else {
    res.redirect("/Inventory");
  }
});

app.get("/editInventory", async (req, res) => {
  const inventory = await select.viewInventoryId(req.query.id);
  const products = await select.viewProduct();
  const locations = await select.viewLocation();
  const dates = {
    indate: moment(inventory[0].date).utc().format("YYYY-MM-DD"),
    maxdate: moment(moment.now()).format("YYYY-MM-DD"),
  };
  if (inventory.error) {
    console.log(add.status);
  } else {
    res.render("./inventory/editinventory", {
      invent: inventory,
      prod: products,
      loc: locations,
      date: dates,
    });
  }
});

app.post("/editInventory", async (req, res) => {
  const update = await edit.editInventory(req.body);
  if (update.error) {
    console.log(add.status);
  } else {
    res.redirect("/Inventory");
  }
});

app.get("/Product", async (req, res) => {
  const product = await select.viewProduct();
  const inventory = await select.viewInventory();
  res.cookie("inventory", JSON.stringify(inventory));
  if (product.error) {
    console.log("error");
  } else {
    res.render("./product/products", { prod: product });
  }
});

app.get("/addProduct", async (req, res) => {
  res.render("./product/productform");
});

app.post("/addProduct", async (req, res) => {
  const product = await insert.insertProduct(req.body);
  if (product.error) {
    console.log("error");
  } else {
    res.redirect("/Product");
  }
});

app.get("/deleteProduct", async (req, res) => {
  const del = await remove.deleteProduct(req.query.id);
  if (del.error) {
    console.log(del.status);
  } else {
    res.redirect("/Product");
  }
});

app.get("/editProduct", async (req, res) => {
  const product = await select.viewProductId(req.query.id);
  if (product.error) {
    console.log(product.status);
  } else {
    res.render("./product/editProduct", {
      prod: product,
    });
  }
});

app.post("/editProduct", async (req, res) => {
  const update = await edit.editProduct(req.body);

  if (update.error) {
    console.log(update.status);
  } else {
    res.redirect("/Product");
  }
});

app.get("/Location", async (req, res) => {
  const location = await select.viewLocation();
  const inventory = await select.viewInventory();
  res.cookie("inventory", JSON.stringify(inventory));
  if (location.error) {
    console.log("error");
  } else {
    res.render("./location/locations", { loc: location });
  }
});

app.get("/addLocation", async (req, res) => {
  res.render("./location/locationform");
});

app.post("/addlocation", async (req, res) => {
  const location = await insert.insertLocation(req.body);

  if (location.error) {
    console.log("error");
  } else {
    res.redirect("/Location");
  }
});

app.get("/deleteLocation", async (req, res) => {
  const del = await remove.deleteLocation(req.query.id);
  if (del.error) {
    console.log(del.status);
  } else {
    res.redirect("/Location");
  }
});

app.get("/editLocation", async (req, res) => {
  const location = await select.viewLocationId(req.query.id);
  if (location.error) {
    console.log(location.status);
  } else {
    res.render("./location/editLocation", {
      loc: location,
    });
  }
});

app.post("/editLocation", async (req, res) => {
  const update = await edit.editLocation(req.body);
  if (update.error) {
    console.log(update.status);
  } else {
    res.redirect("/Location");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
