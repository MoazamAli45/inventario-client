document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save-button");
  const fiscalYearSelect = document.getElementById("fiscal-year");
  const checkboxes = document.querySelectorAll(
    '.checkbox-grid input[type="checkbox"]'
  );

  saveButton.addEventListener("click", function () {
    const selectedYear = fiscalYearSelect.value;
    const monthsData = {};

    // Iterate over each month checkbox to get its checked status as boolean
    checkboxes.forEach((checkbox, index) => {
      monthsData[`m${index + 1}`] = checkbox.checked;
    });

    const data = {
      year: selectedYear,
      ...monthsData,
    };

    // Send POST request to the endpoint
    fetch("http://localhost:3000/entorno-facturacion/datos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(
              error.error || "Failed to insert data into the database"
            );
          });
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        alert("Data saved successfully!");
      })
      .catch((error) => {
        // Check for unique constraint violation
        if (error.message.includes("Duplicate entry")) {
          alert(
            "Data for this fiscal year already exists. Please select a different year."
          );
        } else {
          console.error("Error:", error);
          alert("An error occurred while saving the data.");
        }
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const environmentTableBody = document.querySelector(
    "#environmentTable tbody"
  );

  // Fetch environment data from the server
  fetch("http://localhost:3000/entorno-facturacion/datos")
    .then((response) => {
      if (!response.ok) throw new Error("Error al obtener los datos");
      return response.json();
    })
    .then((data) => {
      data.forEach((row) => {
        const tr = document.createElement("tr");

        // Add Year column
        const yearCell = document.createElement("td");
        yearCell.textContent = row.year;
        tr.appendChild(yearCell);

        // Add checkboxes for each month
        for (let i = 1; i <= 12; i++) {
          const monthCell = document.createElement("td");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = row[`month${i}`] === 1; // Check if value is true (1)

          // Disable the checkbox to make it read-only
          checkbox.disabled = true;

          monthCell.appendChild(checkbox);
          tr.appendChild(monthCell);
        }

        environmentTableBody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al obtener los datos.");
    });
});
