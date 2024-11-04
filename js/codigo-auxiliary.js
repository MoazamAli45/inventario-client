document.addEventListener("DOMContentLoaded", function () {
  const sunatButton = document.getElementById("sunat-button");

  // Date input default value (today's date)
  const fechaNacInput = document.getElementById("fecha-nac");
  const today = new Date().toISOString().split("T")[0];
  fechaNacInput.value = today;

  sunatButton.addEventListener("click", function () {
    // Gather data from form fields
    const data = {
      code: document.getElementById("codigo").value,
      classification: document.getElementById("clasificacion").value,
      document: document.getElementById("documento").value,
      docType: document.getElementById("tipo-doc").value,
      ruc: document.getElementById("ruc").value,
      birthDate: document.getElementById("fecha-nac").value,
      status: document.getElementById("estado").value,
      active: document.getElementById("activo").value,
      streetType: document.getElementById("tipo-via").value,
      street: document.getElementById("via").value,
      streetNumber: document.getElementById("numero-via").value,
      zoneType: document.getElementById("tipo-zona").value,
      zone: document.getElementById("zona").value,
      interiorNumber: document.getElementById("numero-interior").value,
      address: document.getElementById("direccion").value,
      country: document.getElementById("pais").value,
      department: document.getElementById("departamento").value,
      province: document.getElementById("provincia").value,
      district: document.getElementById("distrito").value,
      ubigeo: document.getElementById("ubigeo").value,
    };

    // Send data to the server using fetch
    fetch("http://localhost:3000/api/saveAuxData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data saved successfully!");
        } else {
          alert("Failed to save data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error saving data.");
      });
  });
});
