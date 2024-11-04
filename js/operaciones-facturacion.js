// Document data
const documents = [
  { codigo: "BED", descripcion: "BOLETA EXTERIOR DOLARES", tipoDoc: "BV" },
  { codigo: "FED", descripcion: "FACTURA EXTERIOR DOLARES", tipoDoc: "FV" },
  { codigo: "BGD", descripcion: "BOLETA GRATUITA DOLARES", tipoDoc: "BG" },
  { codigo: "BGS", descripcion: "BOLETA GRATUITA SOLES", tipoDoc: "BG" },
  { codigo: "FGD", descripcion: "FACTURA GRATUITA DOLARES", tipoDoc: "FG" },
  { codigo: "FGS", descripcion: "FACTURA GRATUITA SOLES", tipoDoc: "FG" },
  { codigo: "NDD", descripcion: "NOTA DEBITO DOLARES", tipoDoc: "ND" },
  { codigo: "NDS", descripcion: "NOTA DEBITO SOLES", tipoDoc: "ND" },
  { codigo: "NCD", descripcion: "NOTA DE CREDITO DOLARES", tipoDoc: "NC" },
];

// Function to generate table rows
function generateTable() {
  const tableBody = document.getElementById("tableBody");

  documents.forEach((doc) => {
    const row = document.createElement("tr");

    const codigoCell = document.createElement("td");
    codigoCell.className = "codigo";
    codigoCell.textContent = doc.codigo;

    const descripcionCell = document.createElement("td");
    descripcionCell.textContent = doc.descripcion;

    const tipoDocCell = document.createElement("td");
    tipoDocCell.className = "tipo-doc";
    tipoDocCell.textContent = doc.tipoDoc;

    row.appendChild(codigoCell);
    row.appendChild(descripcionCell);
    row.appendChild(tipoDocCell);

    tableBody.appendChild(row);
  });
}

// Generate table on page load
document.addEventListener("DOMContentLoaded", generateTable);

document
  .getElementById("operationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset any previous error states
    const inputs = this.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      input.classList.remove("error");
    });

    // Check for empty fields
    let hasError = false;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error");
        hasError = true;
      }
    });

    if (hasError) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    // Collect form data
    const formData = {
      facturacion_code: this.facturacion_code.value,
      facturacion: this.facturacion_desc.value,
      logSalida_code: this.log_salida_code.value,
      logSalida: this.log_salida_desc.value,
      logAnulacion_code: this.log_anulacion_code.value,
      logAnulacion: this.log_anulacion_desc.value,
      notaCredito_code: this.nota_credito_code.value,
      notaCredito: this.nota_credito_desc.value,
      showInApp: this.show_in_app.checked,
    };

    //API CALL
    fetch("http://localhost:3000/operaciones-facturacion/configuration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        alert("Configurationes guardados exitosamente");
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

document
  .getElementById("mainDataForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset any previous error states
    const inputs = this.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.classList.remove("error");
    });

    // Check for empty fields
    let hasError = false;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error");
        hasError = true;
      }
    });

    if (hasError) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    // Collect form data
    const formData = {
      code: this.codigo.value,
      description: this.descripcion.value,
      document_type_code: this.tipo_doc_code.value,
      document_type: this.tipo_doc_desc.value,
      tax: this.impuesto.value,
      currency_code: this.moneda_code.value,
      currency: this.moneda_desc.value,
      state: this.estado.value,
    };
    //API CALL
    fetch("http://localhost:3000/operaciones-facturacion/datos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        alert("Datos guardados exitosamente");
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

document.addEventListener("DOMContentLoaded", () => {
  let tableData = []; // Array to store all data

  // Fetch data and display in table
  fetch("http://localhost:3000/operaciones-facturacion/datos")
    .then((response) => response.json())
    .then((data) => {
      tableData = data; // Save data to filter later
      displayTableData(tableData);
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Display table data
  function displayTableData(data) {
    const tableBody = document.getElementById("billing-data");
    tableBody.innerHTML = "";

    data.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${row.Code}</td>
          <td>${row.Description}</td>
          <td>${row.DocumentTypeCode}</td>
          <td>${row.DocumentType}</td>
          <td>${row.Tax}</td>
          <td>${row.CurrencyCode}</td>
          <td>${row.Currency}</td>
          <td>${row.State}</td>
        `;
      tableBody.appendChild(tr);
    });
  }

  // Filter table data based on input
  document
    .getElementById("billing-filter")
    .addEventListener("input", (event) => {
      const filterValue = event.target.value.toLowerCase();

      const filteredData = tableData.filter((row) => {
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(filterValue)
        );
      });

      displayTableData(filteredData);
    });
});
