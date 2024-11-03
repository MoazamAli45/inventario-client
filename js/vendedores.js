// Sample data array
const tableData = [
  {
    id: 128,
    codigo: "034",
    descripcion: "Ag. Pre Prensa Trujillo",
    direccion: "Trujillo",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "23/08/2022",
  },
  {
    id: 127,
    codigo: "033",
    descripcion: "Frank Nahui Beita",
    direccion: "LINCE",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "22/06/2022",
  },
  {
    id: 126,
    codigo: "032",
    descripcion: "Helly Lucila Arévalo Arias",
    direccion: "LINCE",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "22/06/2022",
  },
  {
    id: 125,
    codigo: "031",
    descripcion: "Miguel Pauline Durant",
    direccion: "Lince",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "02/03/2022",
  },
  {
    id: 124,
    codigo: "030",
    descripcion: "Lilian Flores Macedo",
    direccion: "Lince",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "26/01/2022",
  },
  {
    id: 122,
    codigo: "999",
    descripcion: "Incoterm - DOW",
    direccion: "LIMA",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "25/06/2021",
  },
  {
    id: 121,
    codigo: "029",
    descripcion: "Zona Centro",
    direccion: "Huancayo",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "07/04/2021",
  },
  {
    id: 120,
    codigo: "028",
    descripcion: "Anthony Vargas Machuca",
    direccion: "Lince",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "18/12/2019",
  },
  {
    id: 119,
    codigo: "027",
    descripcion: "Georg Linder Sadaña",
    direccion: "Lince",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "21/08/2019",
  },
  {
    id: 114,
    codigo: "026",
    descripcion: "Vicente Alvarez Garcia",
    direccion: "Lince",
    telefono: "4419600",
    estado: "A",
    cod_cia: "001",
    dfch_crea: "31/07/2019",
  },
];

// Function to generate table rows
function generateTable() {
  const tableBody = document.getElementById("tableBody");

  tableData.forEach((row) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.codigo}</td>
            <td>${row.descripcion}</td>
            <td>${row.direccion}</td>
            <td>${row.telefono}</td>
            <td class="status-a">${row.estado}</td>
            <td>${row.cod_cia}</td>
            <td class="date-column">${row.dfch_crea}</td>
        `;

    tableBody.appendChild(tr);
  });
}

// Generate table on page load
document.addEventListener("DOMContentLoaded", generateTable);

document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset any previous error states
  const inputs = this.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("error");
  });

  // Check for empty fields
  let hasError = false;
  inputs.forEach((input) => {
    if (input.type !== "checkbox" && !input.value.trim()) {
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
    datosPrincipales: {
      codigo: this.codigo.value,
      descripcion: this.descripcion.value,
      direccion: this.direccion.value,
      telefono: this.telefono.value,
      estado: this.estado.value,
    },
    datosComerciales: {
      clasificacion: this.clasificacion.value,
      comision: this.comision.value,
      descuentoMax: this.descuento.value,
      validacionDescuento: this.validacion_descuento.checked,
      claveAutorizacion: this.clave_autorizacion.value,
      zonaVenta: {
        codigo: this.zona_venta_codigo.value,
        descripcion: this.zona_venta_desc.value,
      },
    },
  };

  // Show confirmation
  if (confirm("¿Desea guardar los cambios?")) {
    console.log("Form Data:", formData);
    alert("Datos guardados exitosamente");
  }
});
