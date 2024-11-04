// JavaScript

const table = document.getElementById("dataTable");
const tbody = table.querySelector("tbody");
const filterInput = document.getElementById("filterInput");
let sortColumn = "";
let sortDirection = "asc";
let tableData = [];

// Fetch data from the backend
async function fetchBillingData() {
  try {
    const response = await fetch("http://localhost:3000/api/billing");
    tableData = await response.json();
    renderTable(tableData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render table data
function renderTable(data) {
  tbody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.line}</td>
      <td>${row.lineDescription}</td>
      <td>${row.invoiceType}</td>
      <td>${row.invoiceTypeDescription}</td>
      <td>${row.subDiary}</td>
      <td>${row.subDiaryDescription}</td>
      <td>${row.fileNumber}</td>
      <td>${row.grossAmountDebit}</td>
      <td>${row.discountAmountDebit}</td>
      <td>${row.discountAmount2Debit}</td>
      <td>${row.discountAmount3Debit}</td>
      <td>${row.taxAmountDebit}</td>
      <td>${row.exciseTaxAmountDebit}</td>
      <td>${row.totalAmountDebit}</td>
      <td>${row.perceptionAmountDebit}</td>
      <td>${row.grossAmountCredit}</td>
      <td>${row.discountAmountCredit}</td>
      <td>${row.discountAmount2Credit}</td>
      <td>${row.discountAmount3Credit}</td>
      <td>${row.taxAmountCredit}</td>
      <td>${row.exciseTaxAmountCredit}</td>
      <td>${row.totalAmountCredit}</td>
      <td>${row.perceptionAmountCredit}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Filter table data based on the input value
function filterTable() {
  const filterValue = filterInput.value.toLowerCase();
  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterValue)
    )
  );
  renderTable(filteredData);
}

// Sort and filter functions remain the same

// Initialize table by fetching data
fetchBillingData();

// Add event listeners for sorting and filtering
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
