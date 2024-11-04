const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "inventory",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
});

//Post Methods

app.post("/operaciones-facturacion/datos", (req, res) => {
  const {
    code,
    description,
    document_type_code,
    document_type,
    tax,
    currency_code,
    currency,
    state,
  } = req.body;

  const insertQuery =
    "INSERT INTO billing_operation_data (Code, Description, DocumentTypeCode, DocumentType, Tax, CurrencyCode,Currency,State) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const insertValues = [
    code,
    description,
    document_type_code,
    document_type,
    tax,
    currency_code,
    currency,
    state,
  ];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error("Error inserting data into MySQL:", insertErr);
      res.status(500).json({
        error:
          "Internal Server Error while inserting data to billing_operation_data",
      });
    } else {
      res
        .status(200)
        .json({ message: "Insertion successful in billing_operation_data" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
