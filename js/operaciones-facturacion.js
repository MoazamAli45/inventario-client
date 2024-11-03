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
