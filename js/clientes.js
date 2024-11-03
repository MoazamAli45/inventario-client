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
    datosPrincipales: {
      codigo: this.codigo.value,
      clasificacion: this.clasificacion.value,
      documento: this.documento.value,
      tipoPersona: this.tipo_persona.value,
      tipoDoc: this.tipo_doc.value,
      descripcion: this.descripcion.value,
      ruc: this.ruc.value,
      fechaNac: this.fecha_nac.value,
      estado: this.estado.value,
    },
    direccionPrincipal: {
      tipoVia: this.tipo_via.value,
      via: this.via.value,
      numeroVia: this.numero_via.value,
      tipoZona: this.tipo_zona.value,
      direccion: this.direccion.value,
      nacionalidad: this.nacionalidad.value,
      ubicacion: {
        pais: this.pais.value,
        departamento: this.departamento.value,
        provincia: this.provincia.value,
        distrito: this.distrito.value,
        ubigeo: this.ubigeo.value,
      },
    },
  };

  // Show confirmation
  if (confirm("¿Desea guardar los cambios?")) {
    console.log("Form Data:", formData);
    alert("Datos guardados exitosamente");
  }
});
