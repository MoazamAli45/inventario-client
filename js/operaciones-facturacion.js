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
      facturacion: {
        code: this.facturacion_code.value,
        description: this.facturacion_desc.value,
      },
      logSalida: {
        code: this.log_salida_code.value,
        description: this.log_salida_desc.value,
      },
      logAnulacion: {
        code: this.log_anulacion_code.value,
        description: this.log_anulacion_desc.value,
      },
      notaCredito: {
        code: this.nota_credito_code.value,
        description: this.nota_credito_desc.value,
      },
      showInApp: this.show_in_app.checked,
    };

    // Show confirmation
    if (confirm("¿Desea guardar los cambios?")) {
      console.log("Form Data:", formData);
      alert("Datos guardados exitosamente");
    }
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
      codigo: this.codigo.value,
      descripcion: this.descripcion.value,
      tipoDocumento: {
        code: this.tipo_doc_code.value,
        description: this.tipo_doc_desc.value,
      },
      impuesto: this.impuesto.value,
      moneda: {
        code: this.moneda_code.value,
        description: this.moneda_desc.value,
      },
      estado: this.estado.value,
    };

    // Show confirmation
    if (confirm("¿Desea guardar los cambios?")) {
      console.log("Form Data:", formData);
      alert("Datos guardados exitosamente");
    }
  });
