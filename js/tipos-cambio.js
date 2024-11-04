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

function renderTable(data) {
  const tbody = document.getElementById("exchangeTableBody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.className = "exchange-row";

    tr.innerHTML = `
            <td class="exchange-cell">${row.id}</td>
            <td class="exchange-cell">${row.numero}</td>
            <td class="exchange-cell exchange-number">${row.compra.toFixed(
              4
            )}</td>
            <td class="exchange-cell exchange-number">${row.venta.toFixed(
              4
            )}</td>
            <td class="exchange-cell exchange-number">${row.comercial.toFixed(
              4
            )}</td>
            <td class="exchange-cell exchange-status">${row.estado}</td>
            <td class="exchange-cell">${row.creacion}</td>
            <td class="exchange-cell">${row.modifica}</td>
        `;

    tbody.appendChild(tr);
  });
}

function filterTable() {
  const filterValue = document
    .getElementById("exchangeFilter")
    .value.toLowerCase();
  const filteredData = exchangeData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterValue)
    )
  );
  renderTable(filteredData);
}

// Initialize table
renderTable(exchangeData);

// Add event listener for filter input
document
  .getElementById("exchangeFilter")
  .addEventListener("input", filterTable);

// Add click event listener to rows
document.getElementById("exchangeTableBody").addEventListener("click", (e) => {
  const row = e.target.closest(".exchange-row");
  if (row) {
    const cells = row.cells;
    const rowData = {
      id: cells[0].textContent,
      numero: cells[1].textContent,
      compra: cells[2].textContent,
      venta: cells[3].textContent,
      comercial: cells[4].textContent,
      estado: cells[5].textContent,
      creacion: cells[6].textContent,
      modifica: cells[7].textContent,
    };
    console.log("Selected Row:", rowData);
  }
});
