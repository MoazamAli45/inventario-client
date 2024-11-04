// Add event listener for form submission
document.getElementById("generalForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Remove any existing error messages
  document
    .querySelectorAll(".general-error-message")
    .forEach((msg) => msg.remove());
  document
    .querySelectorAll(".general-error")
    .forEach((field) => field.classList.remove("general-error"));

  // Define required fields
  const fields = [
    "moneda",
    "fecha",
    "tipoCambioCompra",
    "tipoCambioVenta",
    "tipoCambioComercial",
    "estado",
  ];
  let hasError = false; // Flag to track errors

  // Validate each required field
  fields.forEach((fieldName) => {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const value = field.value.trim();

    if (!value) {
      hasError = true;
      field.classList.add("general-error");

      // Display error message
      const errorMsg = document.createElement("div");
      errorMsg.className = "general-error-message";
      errorMsg.textContent = "This field is required";
      field.parentNode.appendChild(errorMsg);
    }
  });

  // Validate that exchange rates are positive numbers
  const rateFields = [
    "tipoCambioCompra",
    "tipoCambioVenta",
    "tipoCambioComercial",
  ];
  rateFields.forEach((fieldName) => {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const value = parseFloat(field.value);

    if (value <= 0 || isNaN(value)) {
      // Check if the value is positive and a number
      hasError = true;
      field.classList.add("general-error");

      // Display error message for invalid exchange rate
      const errorMsg = document.createElement("div");
      errorMsg.className = "general-error-message";
      errorMsg.textContent = "Exchange rate must be greater than 0";
      field.parentNode.appendChild(errorMsg);
    }
  });

  // If no validation errors, proceed to collect data
  if (!hasError) {
    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Log form data to console
    console.log("Form Data:", data);

    // Send data to server (or perform other actions)
    fetch("http://localhost:3000/api/saveGeneralData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form successfully saved!");
        } else {
          alert("Failed to save form.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Connection error.");
      });
  }
});

// Sample data
const exchangeData = [
  {
    id: 72006,
    numero: "02 - 01/12/2022",
    compra: 3.849,
    venta: 3.854,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 62005,
    numero: "02 - 24/11/2022",
    compra: 3.848,
    venta: 3.852,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61995,
    numero: "02 - 14/11/2022",
    compra: 3.854,
    venta: 3.86,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61989,
    numero: "02 - 23/09/2022",
    compra: 3.726,
    venta: 3.733,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61983,
    numero: "02 - 22/11/2022",
    compra: 3.831,
    venta: 3.838,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61977,
    numero: "02 - 20/11/2022",
    compra: 3.821,
    venta: 3.841,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61971,
    numero: "02 - 17/11/2022",
    compra: 3.837,
    venta: 3.842,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61965,
    numero: "02 - 16/11/2022",
    compra: 3.833,
    venta: 3.838,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61959,
    numero: "02 - 13/11/2022",
    compra: 3.854,
    venta: 3.86,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61953,
    numero: "02 - 29/11/2022",
    compra: 3.839,
    venta: 3.85,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
  {
    id: 61947,
    numero: "02 - 13/11/2022",
    compra: 3.827,
    venta: 3.841,
    comercial: 0.0,
    estado: "A",
    creacion: "ADM",
    modifica: "ADM",
  },
];

// Utility function to format date as DD/MM/YYYY
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const tbody = document.getElementById("exchangeTableBody");
const filterInput = document.getElementById("exchangeFilter");
console.log("filterInput", filterInput);
let tableData = []; // Store the data globally for filtering

// Fetch data from the API
async function fetchGeneralData() {
  try {
    const response = await fetch("http://localhost:3000/api/getGeneralData");
    tableData = await response.json();
    renderTable(tableData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render table data
function renderTable(data) {
  tbody.innerHTML = ""; // Clear existing table rows

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.className = "exchange-row";

    tr.innerHTML = `
      <td class="exchange-cell">${row.id}</td>
      <td class="exchange-cell">${row.monedaCodigo} - ${formatDate(
      row.fecha
    )}</td>
      <td class="exchange-cell exchange-number">${row.tipoCambioCompra.toFixed(
        4
      )}</td>
      <td class="exchange-cell exchange-number">${row.tipoCambioVenta.toFixed(
        4
      )}</td>
      <td class="exchange-cell exchange-number">${row.tipoCambioComercial.toFixed(
        4
      )}</td>
      <td class="exchange-cell exchange-status">${row.estado}</td>
   
    `;

    tbody.appendChild(tr);
  });
}

// Filter table based on input value
function filterTable() {
  const filterValue = filterInput.value.toLowerCase();
  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterValue)
    )
  );
  renderTable(filteredData);
}

// Initialize table by fetching data
fetchGeneralData();

// Add event listener for filtering
filterInput.addEventListener("input", filterTable);
