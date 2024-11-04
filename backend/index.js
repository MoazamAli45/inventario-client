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
  port: 3310,
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

app.post("/api/saveAuxData", (req, res) => {
  const {
    code,
    classification,
    document,
    docType,
    ruc,
    birthDate,
    status,
    active,
    streetType,
    street,
    streetNumber,
    zoneType,
    zone,
    interiorNumber,
    address,
    country,
    department,
    province,
    district,
    ubigeo,
  } = req.body;

  const query = `
    INSERT INTO aux_code 
    (code, classification, document, docType, ruc, birthDate, status, active,
    streetType, street, streetNumber, zoneType, zone, interiorNumber,
    address, country, department, province, district, ubigeo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    code,
    classification,
    document,
    docType,
    ruc,
    birthDate,
    status,
    active,
    streetType,
    street,
    streetNumber,
    zoneType,
    zone,
    interiorNumber,
    address,
    country,
    department,
    province,
    district,
    ubigeo,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.status(200).send("Data saved successfully");
    }
  });
});

//save General Data
app.post("/api/saveGeneralData", (req, res) => {
  const {
    monedaCodigo,
    moneda,
    fecha,
    tipoCambioCompra,
    tipoCambioVenta,
    tipoCambioComercial,
    estado,
  } = req.body;

  const query = `
    INSERT INTO general_data 
    (monedaCodigo, moneda, fecha, tipoCambioCompra, tipoCambioVenta, tipoCambioComercial, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    monedaCodigo,
    moneda,
    fecha,
    tipoCambioCompra,
    tipoCambioVenta,
    tipoCambioComercial,
    estado,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al guardar los datos");
    } else {
      res.status(200).send("Datos guardados con éxito");
    }
  });
});

//  BILLING
app.post("/api/billing", (req, res) => {
  // Mapping Spanish field names to English for database insertion
  const data = {
    line: req.body.linea,
    lineDescription: req.body.lineaDescripcion,
    invoiceType: req.body.tipoFactura,
    invoiceTypeDescription: req.body.tipoFacturaDescripcion,
    subDiary: req.body.subDiario,
    subDiaryDescription: req.body.subDiarioDescripcion,
    fileNumber: req.body.numeroFile,
    fileNumberDescription: req.body.numeroFileDescripcion,
    grossAmountDebit: req.body.importeBrutoDebe,
    discountAmountDebit: req.body.importeDescuentoDebe,
    discountAmount2Debit: req.body.importeDescuento2Debe,
    discountAmount3Debit: req.body.importeDescuento3Debe,
    taxAmountDebit: req.body.importeIVADebe,
    exciseTaxAmountDebit: req.body.importeISCDebe,
    totalAmountDebit: req.body.importeTotalDebe,
    perceptionAmountDebit: req.body.importePercepcionDebe,
    grossAmountCredit: req.body.importeBrutoHaber,
    discountAmountCredit: req.body.importeDescuentoHaber,
    discountAmount2Credit: req.body.importeDescuento2Haber,
    discountAmount3Credit: req.body.importeDescuento3Haber,
    taxAmountCredit: req.body.importeIVAHaber,
    exciseTaxAmountCredit: req.body.importeISCHaber,
    totalAmountCredit: req.body.importeTotalHaber,
    perceptionAmountCredit: req.body.importePercepcionHaber,
  };

  const sql = `
    INSERT INTO billing_parameters SET ?
  `;

  db.query(sql, data, (error, result) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save billing data" });
    } else {
      res.status(200).json({ message: "Billing data saved successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
