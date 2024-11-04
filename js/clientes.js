// Sample data array
const tableData = [
  {
    codigo: "20294866117",
    descripcion: "CABLES ELECTRICOS BRANDE S.A.C",
    coa: "20294866117",
    clase: "C",
    estado: "A",
    tipo: "02",
    codigo2: "06",
    distrito: "LA VICTORIA",
  },
  {
    codigo: "10726910978",
    descripcion: "SOLIER HUAMAN ELVIN STEVEN",
    coa: "10726910974",
    clase: "C",
    estado: "A",
    tipo: "01",
    codigo2: "06",
    distrito: "LIMA",
  },
  {
    codigo: "20563734101",
    descripcion: "ENDOMED TECHNOLOGIES S.A.C",
    coa: "20563734101",
    clase: "C",
    estado: "A",
    tipo: "02",
    codigo2: "06",
    distrito: null,
  },
  {
    codigo: "20844874348",
    descripcion: "HM & ASOCIADOS SA",
    coa: "20844874348",
    clase: "C",
    estado: "A",
    tipo: "02",
    codigo2: "06",
    distrito: "CARMEN DE LA LEGUA REYNOSO",
  },
  {
    codigo: "10726910974",
    descripcion: "SOLIER HUAMAN ELVIN STEVEN",
    coa: "10726910974",
    clase: "C",
    estado: "A",
    tipo: "01",
    codigo2: "06",
    distrito: "LIMA",
  },
  {
    codigo: "20602093139",
    descripcion: "EMPAQUES INSUMOS Y MAQUINARIAS S.A.C",
    coa: "20602093139",
    clase: "C",
    estado: "A",
    tipo: "02",
    codigo2: "06",
    distrito: "LOS OLIVOS",
  },
  {
    codigo: "20568190450",
    descripcion: "ASOCIACION DE PRODUCTORES KEMITO - EN",
    coa: "20568190450",
    clase: "C",
    estado: "A",
    tipo: "02",
    codigo2: "06",
    distrito: "SATIPO",
  },
  {
    codigo: "20564436144",
    descripcion: "AGROINDUSTRIAS ALIMENTARIAS NUTRILAC",
    coa: "20564436144",
    clase: "C",
    estado: "A",
    tipo: "02",
    codigo2: "06",
    distrito: "SAN JERONIMO",
  },
  {
    codigo: "10410784021",
    descripcion: "HARO LACUNZA JOSEPH KARL",
    coa: "10410784021",
    clase: "C",
    estado: "A",
    tipo: "01",
    codigo2: "06",
    distrito: "TRUJILLO",
  },
  {
    codigo: "10076236479",
    descripcion: "BORGES CASTILLO LOURDES TRINIDAD",
    coa: "10076236479",
    clase: "C",
    estado: "A",
    tipo: "01",
    codigo2: "06",
    distrito: "LIMA",
  },
];

// Function to generate table rows
function generateTable() {
  const tableBody = document.getElementById("tableBody");

  tableData.forEach((row) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="code-column">${row.codigo}</td>
            <td>${row.descripcion}</td>
            <td class="code-column">${row.coa}</td>
            <td>${row.clase}</td>
            <td class="status-column">${row.estado}</td>
            <td>${row.tipo}</td>
            <td>${row.codigo2}</td>
            <td>${
              row.distrito
                ? row.distrito
                : '<span class="null-value">(null)</span>'
            }</td>
        `;

    tableBody.appendChild(tr);
  });
}

// Generate table on page load
document.addEventListener("DOMContentLoaded", generateTable);

document.getElementById("addressForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset any previous error states
  const inputs = this.querySelectorAll("input");
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
    clasificacion: this.clasificacion.value,
    documento: this.documento.value,
    tipoPersona: this.tipo_persona.value,
    tipoDoc: this.tipo_doc.value,
    descripcion: this.descripcion.value,
    ruc: this.ruc.value,
    fechaNac: this.fecha_nac.value,
    estado: this.estado.value,
    tipoVia: this.tipo_via.value,
    via: this.via.value,
    numeroVia: this.numero_via.value,
    tipoZona: this.tipo_zona.value,
    direccion: this.direccion.value,
    nacionalidad: this.nacionalidad.value,
    pais: this.pais.value,
    departamento: this.departamento.value,
    provincia: this.provincia.value,
    distrito: this.distrito.value,
    ubigeo: this.ubigeo.value,
  };

  fetch("http://localhost:3000/clientes/datos", {
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
});

document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("clientes-filter");
  const tableBody = document.getElementById("clientes-data");

  // Function to fetch data from the server
  const fetchClientData = async () => {
    try {
      const response = await fetch("http://localhost:3000/clientes/datos");
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  // Function to populate the table with data
  const populateTable = (data) => {
    tableBody.innerHTML = ""; // Clear existing table data
    data.forEach((client) => {
      const row = document.createElement("tr");
      for (const key in client) {
        const cell = document.createElement("td");
        cell.textContent = client[key];
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    });
  };

  // Filter functionality
  filterInput.addEventListener("input", function () {
    const filterValue = filterInput.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const rowText = Array.from(cells)
        .map((cell) => cell.textContent.toLowerCase())
        .join(" ");
      row.style.display = rowText.includes(filterValue) ? "" : "none";
    });
  });

  // Fetch data when the page loads
  fetchClientData();
});
