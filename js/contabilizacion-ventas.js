const tableData = [
  {
    id: 10180,
    linea: 1,
    descripcion: "ENVASES Y EMBALAJES",
    claseFact: "FVD",
    descripcionOperacion: "FACTURA DE VENTA",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 178,
    linea: 12,
    descripcion: "ANTICIPOS CLIENTES",
    claseFact: "NCS",
    descripcionOperacion: "NOTA DE CREDITO S",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 177,
    linea: 12,
    descripcion: "ANTICIPOS CLIENTES",
    claseFact: "FVS",
    descripcionOperacion: "FACTURA DE VENTA",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 173,
    linea: 77,
    descripcion: "FINANCIEROS",
    claseFact: "BVS",
    descripcionOperacion: "BOLETA DE VENTA S",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 172,
    linea: 76,
    descripcion: "ENAJENACION DE ACTIVO",
    claseFact: "BVD",
    descripcionOperacion: "BOLETA DE VENTA D",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 171,
    linea: 21,
    descripcion: "PRODUCTO TERMINADO",
    claseFact: "CFD",
    descripcionOperacion: "CREDITO EXTERIOR",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 168,
    linea: 25,
    descripcion: "SUMINISTROS DIVERSOS",
    claseFact: "FGD",
    descripcionOperacion: "FACTURA GRATUITA",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 166,
    linea: 77,
    descripcion: "FINANCIEROS",
    claseFact: "BVD",
    descripcionOperacion: "BOLETA DE VENTA D",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 164,
    linea: 77,
    descripcion: "FINANCIEROS",
    claseFact: "NCS",
    descripcionOperacion: "NOTA DE CREDITO S",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
  {
    id: 163,
    linea: 70,
    descripcion: "SERVICIOS",
    claseFact: "GIS",
    descripcionOperacion: "GUIA INTERNA SOL",
    descripcionSubDiario: "FACTURACION",
    kfuente: "F001",
  },
];

const table = document.getElementById("dataTable");
const tbody = table.querySelector("tbody");
const filterInput = document.getElementById("filterInput");
let sortColumn = "";
let sortDirection = "asc";

function renderTable(data) {
  tbody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function sortData(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortColumn = column;
    sortDirection = "asc";
  }

  const sortedData = [...tableData].sort((a, b) => {
    if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
    if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  renderTable(sortedData);
  updateSortIcons();
}

function updateSortIcons() {
  const headers = table.querySelectorAll("th");
  headers.forEach((header) => {
    header.classList.remove("sort-icon", "asc", "desc");
    if (header.textContent.toLowerCase() === sortColumn) {
      header.classList.add("sort-icon", sortDirection);
    }
  });
}

function filterTable() {
  const filterValue = filterInput.value.toLowerCase();
  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterValue)
    )
  );
  renderTable(filteredData);
}

// Initialize table
renderTable(tableData);

// Add event listeners
table.querySelector("thead").addEventListener("click", (e) => {
  if (e.target.tagName === "TH") {
    const column = e.target.textContent.toLowerCase();
    sortData(column);
  }
});

filterInput.addEventListener("input", filterTable);

document
  .getElementById("billingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Form validation
    const formData = new FormData(this);

    // Convert FormData to a regular object
    const data = Object.fromEntries(formData.entries());

    // Sending data to Node.js API
    fetch("http://localhost:3000/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          alert("Failed to save billing data.");
          console.error("Error:", result.error);
        } else {
          alert("Billing data saved successfully!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error sending data.");
      });
  });
