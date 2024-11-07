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

//GET Operation
app.get("/operaciones-facturacion/datos", (req, res) => {
  const selectQuery = "SELECT * FROM billing_operation_data";

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving data from MySQL:", err);
      res.status(500).json({
        error:
          "Internal Server Error while retrieving data from billing_operation_data",
      });
    } else {
      res.status(200).json(result);
    }
  });
});

//POST Auxilary
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

// API to fetch general data
app.get("/api/getGeneralData", (req, res) => {
  const query = `
    SELECT id, monedaCodigo, moneda, fecha, tipoCambioCompra, tipoCambioVenta, tipoCambioComercial, estado
    FROM general_data
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
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

//POST Vendores Datos
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

// GET Vendores

app.get("/vendedores/datos", (req, res) => {
  const selectQuery = "SELECT * FROM sellers_data";

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving data from MySQL:", err);
      res.status(500).json({
        error: "Internal Server Error while retrieving data from sellers_data",
      });
    } else {
      res.status(200).json(result);
    }
  });
});

//POST Clients Datos
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

//GET Client Datos
app.get("/clientes/datos", (req, res) => {
  const selectQuery = "SELECT * FROM clients_data";

  db.query(selectQuery, (selectErr, selectResult) => {
    if (selectErr) {
      console.error("Error retrieving data from MySQL:", selectErr);
      res.status(500).json({
        error: "Internal Server Error while retrieving data from clients_data",
      });
    } else {
      res.status(200).json(selectResult); // Return the retrieved data
    }
  });
});

//Post Commercial Condition Datos
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

//GET Commercial Condition
app.get("/condiciones-comerciales/datos", (req, res) => {
  const selectQuery = "SELECT * FROM commercial_conditions_data";

  db.query(selectQuery, (selectErr, selectResult) => {
    if (selectErr) {
      console.error("Error retrieving data from MySQL:", selectErr);
      res.status(500).json({
        error:
          "Internal Server Error while retrieving data from commercial_conditions_data",
      });
    } else {
      res.status(200).json(selectResult); // Return the retrieved data
    }
  });
});

app.post("/entorno-facturacion/datos", (req, res) => {
  const { year, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12 } = req.body;

  const insertQuery = `
    INSERT INTO environment_data (year, month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const insertValues = [
    year,
    m1,
    m2,
    m3,
    m4,
    m5,
    m6,
    m7,
    m8,
    m9,
    m10,
    m11,
    m12,
  ];

  db.query(insertQuery, insertValues, (insertErr, insertResult) => {
    if (insertErr) {
      console.error("Error inserting data into MySQL:", insertErr);
      res.status(500).json({
        error: "Internal Server Error while inserting data to environment_data",
      });
    } else {
      res.status(200).json({
        message: "Insertion successful in environment_data",
      });
    }
  });
});

// Get Environment Data
app.get("/entorno-facturacion/datos", (req, res) => {
  const selectQuery = "SELECT * FROM environment_data";

  db.query(selectQuery, (err, results) => {
    if (err) {
      res.status(500).json({
        error:
          "Internal Server Error while retrieving data from environment_data",
      });
    } else {
      res.status(200).json(results);
    }
  });
});

//GET OPERATION

//    FETCHING
// BILLING: Fetch all data
// BILLING: Fetch all data with English field names
app.get("/api/billing", (req, res) => {
  const sql = `SELECT id, line, lineDescription, invoiceType, invoiceTypeDescription, subDiary, 
               subDiaryDescription, fileNumber, grossAmountDebit, discountAmountDebit, 
               discountAmount2Debit, discountAmount3Debit, taxAmountDebit, exciseTaxAmountDebit, 
               totalAmountDebit, perceptionAmountDebit, grossAmountCredit, discountAmountCredit, 
               discountAmount2Credit, discountAmount3Credit, taxAmountCredit, exciseTaxAmountCredit, 
               totalAmountCredit, perceptionAmountCredit 
               FROM billing_parameters`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to retrieve billing data" });
    } else {
      res.status(200).json(results);
    }
  });
});

//POST QOUTES

app.post("/api/quotes-data", (req, res) => {
  const {
    documentCode,
    currency,
    series,
    issueDate,
    exchangeRate,
    expiryDate,
    documentNumber,
    warehouse,
    priority,
    status,
    description,
    customer,
    customerName,
    address,
    vendor,
    vendorName,
    condition,
    conditionDescription,
    taxReg,
    conditionType,
  } = req.body;

  const insertQuery = `
    INSERT INTO quotes_data (
      documentCode, currency, series, issueDate, exchangeRate,
      expiryDate, documentNumber, warehouse, priority, status,
      description, customer, customerName, address, vendor,
      vendorName, conditions, conditionDescription, taxReg, conditionType
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    documentCode,
    currency,
    series,
    issueDate,
    exchangeRate,
    expiryDate,
    documentNumber,
    warehouse,
    priority,
    status,
    description,
    customer,
    customerName,
    address,
    vendor,
    vendorName,
    condition,
    conditionDescription,
    taxReg,
    conditionType,
  ];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ error: "Error saving data." });
    } else {
      res.status(200).json({ message: "Data saved successfully!" });
    }
  });
});

//  FOR FETCHING QUO TES DATA

app.get("/api/quotes-data", (req, res) => {
  const query = `
    SELECT 
      id,
      documentCode,
      currency,
      series,
      DATE_FORMAT(issueDate, '%Y-%m-%d') as issueDate,
      exchangeRate,
      DATE_FORMAT(expiryDate, '%Y-%m-%d') as expiryDate,
      documentNumber,
      warehouse,
      priority,
      status,
      description,
      customer,
      customerName,
      address,
      vendor,
      vendorName,
      conditions,
      conditionDescription,
      taxReg,
      conditionType FROM quotes_data`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ error: "Error fetching data." });
    } else {
      res.status(200).json(results);
    }
  });
});

//POST Quotes Products

app.post("/api/quotes-products", async (req, res) => {
  try {
    const {
      numero,
      article,
      description,
      warehouse,
      warehouse_description,
      vendor,
      vendor_description,
      model,
      brand,
      stock,
      quantity,
      price,
      currency,
      delivery_date,
      perception,
      usage_code,
      cost_center,
      project_code,
      discount1,
      discount2,
      discount3,
      gross,
      net,
      isc,
      tax,
      total,
      amount,
    } = req.body;

    // Input validation
    if (!article || !description || !warehouse || !vendor) {
      return res.status(400).json({
        error: "Required fields are missing",
      });
    }

    const insertQuery = `
      INSERT INTO quotes_product (
        numbers, article, description, warehouse, warehouse_description, 
        vendor, vendor_description, model, brand,
        stock, quantity, price, currency, delivery_date, perception,
        usage_code, cost_center, project_code,
        discount1, discount2, discount3, gross, net, isc, tax, total, amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      numero,
      article,
      description,
      warehouse,
      warehouse_description || null,
      vendor,
      vendor_description || null,
      model || null,
      brand || null,
      stock || 0,
      quantity || 0,
      price || 0,
      currency || "USD",
      delivery_date || null,
      perception || null,
      usage_code || null,
      cost_center || null,
      project_code || null,
      discount1 || 0,
      discount2 || 0,
      discount3 || 0,
      gross || 0,
      net || 0,
      isc || 0,
      tax || 0,
      total || 0,
      amount || 0,
    ];

    // Promisify the query
    const result = await new Promise((resolve, reject) => {
      db.query(insertQuery, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    res.status(201).json({
      message: "Product quote created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Failed to create product quote",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

//  GET QUOTES PRODUCTS
app.get("/api/quotes-products", (req, res) => {
  const { numbers } = req.query;

  const query = `
    SELECT * 
    FROM quotes_product 
    WHERE numbers = ?`;

  db.query(query, [numbers], (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ error: "Error fetching data." });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
