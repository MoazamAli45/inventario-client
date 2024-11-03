// Dynamic table generation
const tableData = [
  { id: 34, ejercicio: "EJ2017" },
  { id: 56, ejercicio: "EJ2018" },
  { id: 78, ejercicio: "EJ2019" },
];

const periods = 12;

function generateTable() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Create header row
  const headerRow = document.createElement("tr");
  [
    "Id",
    "Ejercicio",
    ...Array(periods)
      .fill()
      .map((_, i) => `Periodo_${i + 1}`),
  ].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create data rows
  tableData.forEach((row) => {
    const tr = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.textContent = row.id;
    tr.appendChild(idCell);

    const ejercicioCell = document.createElement("td");
    ejercicioCell.textContent = row.ejercicio;
    tr.appendChild(ejercicioCell);

    for (let i = 1; i <= periods; i++) {
      const td = document.createElement("td");
      td.className = "checkbox-cell";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = row.ejercicio;
      checkbox.dataset.period = i;
      checkbox.addEventListener("change", updateCheckboxStatus);
      td.appendChild(checkbox);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("tableContainer").appendChild(table);
}

// Checkbox status tracking
function updateCheckboxStatus() {
  const status = {};

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const year = checkbox.name;
    const period = checkbox.dataset.period;

    if (!status[year]) {
      status[year] = {};
    }

    status[year][`Periodo_${period}`] = checkbox.checked
      ? "Checked"
      : "Not checked";
  });

  // Display status
  const statusDiv = document.getElementById("checkboxStatus");
  statusDiv.innerHTML =
    "<h3>Checkbox Status:</h3>" +
    Object.entries(status)
      .map(
        ([year, periods]) =>
          `<p><strong>${year}:</strong> ` +
          Object.entries(periods)
            .map(([period, state]) => `${period}: ${state}`)
            .join(", ") +
          "</p>"
      )
      .join("");
}

// Generate table on page load
generateTable();
updateCheckboxStatus();
