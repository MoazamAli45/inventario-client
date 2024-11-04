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

//Operation Datos
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

//Operation Configuration
app.post("/operaciones-facturacion/configuration", (req, res) => {
  const {
    facturacion_code,
    facturacion,
    logSalida_code,
    logSalida,
    logAnulacion_code,
    logAnulacion,
    notaCredito_code,
    notaCredito,
    showInApp,
  } = req.body;

  const insertQuery =
    "INSERT INTO billing_operation_configuration (BillingCode, BillingDescription, LogOutCode, LogOutDescription, LogCancellationCode, LogCancellationDescription,NoteCreditCode,NoteCreditCodeDescription, IsShowOnApp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const insertValues = [
    facturacion_code,
    facturacion,
    logSalida_code,
    logSalida,
    logAnulacion_code,
    logAnulacion,
    notaCredito_code,
    notaCredito,
    showInApp,
  ];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error("Error inserting data into MySQL:", insertErr);
      res.status(500).json({
        error:
          "Internal Server Error while inserting data to billing_operation_configuration",
      });
    } else {
      res.status(200).json({
        message: "Insertion successful in billing_operation_configuration",
      });
    }
  });
});

//Vendores Datos
app.post("/vendedores/datos", (req, res) => {
  const {
    datosPrincipales_codigo,
    datosPrincipales_descripcion,
    direccion,
    telefono,
    estado,
    clasificacion,
    comision,
    descuentoMax,
    validacionDescuento,
    claveAutorizacion,
    zonaVenta_codigo,
    zonaVenta_descripcion,
  } = req.body;

  const insertQuery =
    "INSERT INTO sellers_data (code, description, address, telephone, state, classification,commission,discountMax, validationDiscount,claveAuthorization,zoneSaleCode,zoneSaleDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const insertValues = [
    datosPrincipales_codigo,
    datosPrincipales_descripcion,
    direccion,
    telefono,
    estado,
    clasificacion,
    comision,
    descuentoMax,
    validacionDescuento,
    claveAutorizacion,
    zonaVenta_codigo,
    zonaVenta_descripcion,
  ];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error("Error inserting data into MySQL:", insertErr);
      res.status(500).json({
        error: "Internal Server Error while inserting data to sellers_data",
      });
    } else {
      res.status(200).json({
        message: "Insertion successful in sellers_data",
      });
    }
  });
});

//Clients Datos
app.post("/clientes/datos", (req, res) => {
  const {
    codigo,
    clasificacion,
    documento,
    tipoPersona,
    tipoDoc,
    descripcion,
    ruc,
    fechaNac,
    estado,
    tipoVia,
    via,
    numeroVia,
    tipoZona,
    direccion,
    nacionalidad,
    pais,
    departamento,
    provincia,
    distrito,
    ubigeo,
  } = req.body;

  const insertQuery =
    "INSERT INTO clients_data (code, classification, document, personType, docType, description, taxId, birthDate, state, streetType, street, streetNumber, zoneType, address, nationality, country, department, province, district, ubigeo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const insertValues = [
    codigo,
    clasificacion,
    documento,
    tipoPersona,
    tipoDoc,
    descripcion,
    ruc,
    fechaNac,
    estado,
    tipoVia,
    via,
    numeroVia,
    tipoZona,
    direccion,
    nacionalidad,
    pais,
    departamento,
    provincia,
    distrito,
    ubigeo,
  ];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error("Error inserting data into MySQL:", insertErr);
      res.status(500).json({
        error: "Internal Server Error while inserting data to clients_data",
      });
    } else {
      res.status(200).json({
        message: "Insertion successful in clients_data",
      });
    }
  });
});

//Clients Datos
app.post("/condiciones-comerciales/datos", (req, res) => {
  const {
    codigo,
    descripcion,
    tipo,
    estado,
    diasVencimiento,
    diasTolerancia,
    generarPlanilla,
  } = req.body;

  const insertQuery =
    "INSERT INTO commercial_conditions_data (code, description, type, state, expirationDays, toleranceDays, generatePayroll) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const insertValues = [
    codigo,
    descripcion,
    tipo,
    estado,
    diasVencimiento,
    diasTolerancia,
    generarPlanilla,
  ];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error("Error inserting data into MySQL:", insertErr);
      res.status(500).json({
        error:
          "Internal Server Error while inserting data to commercial_conditions_data",
      });
    } else {
      res.status(200).json({
        message: "Insertion successful in commercial_conditions_data",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
