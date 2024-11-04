// Sample data array
const tableData = [
  {
    id: 40,
    codigo: "OB1",
    descripcion: "OBSEQUIOS TRANSFERENCIA GRAT",
    tipo: "Crédito",
    diasVista: 0,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 38,
    codigo: "B03",
    descripcion: "COMERCIO COMPENSADO",
    tipo: "Crédito",
    diasVista: 1,
    diasPlazo: 1,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 37,
    codigo: "Z01",
    descripcion: "CONTADO",
    tipo: "Contado",
    diasVista: 0,
    diasPlazo: 0,
    estado: "I",
    ctipo_cv: "C",
  },
  {
    id: 36,
    codigo: "B02",
    descripcion: "CONTADO DEPOSITO BANCO",
    tipo: "Crédito",
    diasVista: 1,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 35,
    codigo: "L09",
    descripcion: "LETRAS A 180 DIAS",
    tipo: "Crédito",
    diasVista: 180,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 34,
    codigo: "D07",
    descripcion: "CHEQUE DIFERIDO A 120 DIAS",
    tipo: "Crédito",
    diasVista: 120,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 33,
    codigo: "D06",
    descripcion: "CHEQUE DIFERIDO A 90 DIAS",
    tipo: "Crédito",
    diasVista: 90,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 32,
    codigo: "D05",
    descripcion: "CHEQUE DIFERIDO A 60 DIAS",
    tipo: "Crédito",
    diasVista: 60,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
  {
    id: 31,
    codigo: "D04",
    descripcion: "CHEQUE DIFERIDO A 45 DIAS",
    tipo: "Crédito",
    diasVista: 45,
    diasPlazo: 0,
    estado: "A",
    ctipo_cv: "D",
  },
];

// Function to generate table rows
function generateTable() {
  const tableBody = document.getElementById("tableBody");

  tableData.forEach((row) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="id-column">${row.id}</td>
            <td class="code-column">${row.codigo}</td>
            <td>${row.descripcion}</td>
            <td class="type-column">${row.tipo}</td>
            <td class="number-column">${row.diasVista}</td>
            <td class="number-column">${row.diasPlazo}</td>
            <td class="status-column ${
              row.estado === "A" ? "status-active" : "status-inactive"
            }">${row.estado}</td>
            <td class="code-column">${row.ctipo_cv}</td>
        `;

    tableBody.appendChild(tr);
  });
}

// Generate table on page load
document.addEventListener("DOMContentLoaded", generateTable);

document.getElementById("saleForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Remove any existing error messages
  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());
  document
    .querySelectorAll(".error")
    .forEach((field) => field.classList.remove("error"));

  // Get all form fields
  const fields = [
    "codigo",
    "descripcion",
    "tipo",
    "estado",
    "diasVencimiento",
    "diasTolerancia",
  ];
  let hasError = false;

  // Validate each field
  fields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    const value = field.value.trim();

    if (!value) {
      hasError = true;
      field.classList.add("error");

      // Create error message
      const errorMsg = document.createElement("div");
      errorMsg.className = "error-message";
      errorMsg.textContent = "Este campo es requerido";
      field.parentNode.appendChild(errorMsg);
    }
  });

  if (!hasError) {
    // Collect form data
    const formData = {
      codigo: document.getElementById("codigo").value,
      descripcion: document.getElementById("descripcion").value,
      tipo: document.getElementById("tipo").value,
      estado: document.getElementById("estado").value,
      diasVencimiento: document.getElementById("diasVencimiento").value,
      diasTolerancia: document.getElementById("diasTolerancia").value,
      generarPlanilla: document.getElementById("generarPlanilla").checked,
    };
  }
});
document.getElementById("saleForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Remove any existing error messages
  document
    .querySelectorAll(".sale-form-error-message")
    .forEach((msg) => msg.remove());
  document
    .querySelectorAll(".sale-form-input-error")
    .forEach((field) => field.classList.remove("sale-form-input-error"));

  // Get all form fields
  const fields = [
    "codigo",
    "descripcion",
    "tipo",
    "estado",
    "diasVencimiento",
    "diasTolerancia",
  ];
  let hasError = false;

  // Validate each field
  fields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    const value = field.value.trim();

    if (!value) {
      hasError = true;
      field.classList.add("sale-form-input-error");

      // Create error message
      const errorMsg = document.createElement("div");
      errorMsg.className = "sale-form-error-message";
      errorMsg.textContent = "Este campo es requerido";
      field.parentNode.appendChild(errorMsg);
    }
  });

  if (!hasError) {
    // Collect form data
    const formData = {
      codigo: document.getElementById("codigo").value,
      descripcion: document.getElementById("descripcion").value,
      tipo: document.getElementById("tipo").value,
      estado: document.getElementById("estado").value,
      diasVencimiento: document.getElementById("diasVencimiento").value,
      diasTolerancia: document.getElementById("diasTolerancia").value,
      generarPlanilla: document.getElementById("generarPlanilla").checked,
    };

    fetch("http://localhost:3000/condiciones-comerciales/datos", {
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
  }
});
