const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://jszzmpafxcwjel:3d18c1b011fcf20dbc707db09fd806627159a2b184efacd69c01d7cc3f7a12c4@ec2-52-30-67-143.eu-west-1.compute.amazonaws.com:5432/d965iik53uq523",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
