document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Menu items data
  const menuItems = [
    {
      name: "Tablas",
      subitems: [
        { name: "Entorno de Facturación", href: "/tablas/entorno-facturacion" },
        {
          name: "Operaciones de Facturacion",
          href: "/tablas/operaciones-facturacion",
        },
        { name: "Zonas de Vents", href: "/tablas/zonas-vents" },
        { name: "Canales de Venta", href: "/tablas/canales-venta" },
        { name: "Vendedores", href: "/tablas/vendedores" },
        { name: "Cobradores", href: "/tablas/cobradores" },
        { name: "Cilentes", href: "/tablas/clientes" },
        { name: "Unidades Operativas", href: "/tablas/unidades-operativas" },
        {
          name: "Condiciones comerciales",
          href: "/tablas/condiciones-comerciales",
        },
        {
          name: "Cargos para Códigos Auxiliares",
          href: "/tablas/cargos-codigos-auxiliares",
        },
        {
          name: "Listas de Precio Descuento",
          subitems: [
            { name: "Listas de Precios", href: "/tablas/listas-precios" },
            {
              name: "Actualización de Listes de Precio",
              href: "/tablas/actualizacion-listas-precio",
            },
            { name: "Listas de Descuentos", href: "/tablas/listas-descuentos" },
          ],
        },
        {
          name: "Contabilización de Ventas",
          href: "/tablas/contabilizacion-ventas",
        },
        {
          name: "Tablas Comunes",
          subitems: [
            { name: "Lineas", href: "/tablas/comunes/lineas" },
            { name: "Subliness", href: "/tablas/comunes/sublineas" },
            {
              name: "Catálogo de Articulos",
              href: "/tablas/comunes/catalogo-articulos",
            },
            {
              name: "Catálogo de Servicios",
              href: "/tablas/comunes/catalogo-servicios",
            },
            {
              name: "Gnidades de Medida",
              href: "/tablas/comunes/unidades-medida",
            },
            { name: "Tipos de Cambio", href: "/tablas/comunes/tipos-cambio" },
            {
              name: "Tipos de Documento",
              href: "/tablas/comunes/tipos-documento",
            },
            {
              name: "Numeradores de Documentos",
              href: "/tablas/comunes/numeradores-documentos",
            },
            {
              name: "Tarjetas de Credito",
              href: "/tablas/comunes/tarjetas-credito",
            },
            { name: "Almacenes", href: "/tablas/comunes/almacenes" },
          ],
        },
        {
          name: "Reporte de Codigos Auxiliares",
          href: "/tablas/codigo-auxiliary",
        },
      ],
    },
    {
      name: "Transacciones",
      subitems: [
        {
          name: "Preventa",
          subitems: [
            {
              name: "Cotizaciones",
              subitems: [
                {
                  name: "Cotizaciones",
                  href: "/transacciones/preventa/cotizaciones/cotizaciones",
                },
                {
                  name: "Aprobación de Cotizaciones",
                  href: "/transacciones/preventa/cotizaciones/aprobacion-de-cotizaciones",
                },
              ],
            },
            {
              name: "Pedidos",
              subitems: [
                {
                  name: "Registro de Pedidos",
                  href: "/transacciones/preventa/pedidos/registro-de-pedidos",
                },
                {
                  name: "Registro de Pedido Simplificado",
                  href: "/transacciones/preventa/pedidos/registro-de-pedido-simplificado",
                },
                {
                  name: "Pedidos desde Cotización",
                  href: "/transacciones/preventa/pedidos/registro-de-pedidos",
                },
                {
                  name: "Aprobación de Pedidos",
                  href: "/transacciones/preventa/pedidos/aprobacion-de-pedidos",
                },
                {
                  name: "Liberar Reserva Stock",
                  href: "/transacciones/preventa/pedidos/liberar-reserva-stock",
                },
              ],
            },
            {
              name: "Cancelación Cotizaciones/Pedidos",
              href: "/transacciones/preventa/cancelacion-cotizaciones-pedidos",
            },
            {
              name: "Cancelación Pedido por Detalle",
              href: "/transacciones/preventa/cancelacion-pedido-por-detalle",
            },
          ],
        },
        {
          name: "Facturación",
          subitems: [
            {
              name: "Facturas Directas",
              href: "/transacciones/facturacion/facturas-directas",
            },
            {
              name: "Facturación de Anticipos",
              href: "/transacciones/facturacion/facturacion-de-anticipos",
            },
            {
              name: "Facturación POS",
              href: "/transacciones/facturacion/facturacion-pos",
            },
          ],
        },
        {
          name: "Notas de Débito/Crédito",
          href: "/transacciones/notas-debito-credito",
        },
        {
          name: "Notas de Crédito por Devolución",
          href: "/transacciones/notas-credito-devolucion",
        },
        {
          name: "Consulta de Documentos",
          href: "/transacciones/consulta-documentos",
        },
        {
          name: "Impresión Masiva de Facturas",
          href: "/transacciones/impresion-masiva-facturas",
        },
        {
          name: "Impresión Masiva de Guías",
          href: "/transacciones/impresion-masiva-guias",
        },
      ],
    },
    {
      name: "Procesos",
      subitems: [
        { name: "Process 1", href: "/procesos/process-1" },
        { name: "Process 2", href: "/procesos/process-2" },
        { name: "Process 3", href: "/procesos/process-3" },
      ],
    },
    {
      name: "Informes",
      subitems: [
        { name: "Report 1", href: "/informes/report-1" },
        { name: "Report 2", href: "/informes/report-2" },
        { name: "Report 3", href: "/informes/report-3" },
      ],
    },
    {
      name: "Consultas",
      subitems: [
        { name: "Query 1", href: "/consultas/query-1" },
        { name: "Query 2", href: "/consultas/query-2" },
        { name: "Query  3", href: "/consultas/query-3" },
      ],
    },
    {
      name: "Ventana",
      subitems: [
        { name: "Window 1", href: "/ventana/window-1" },
        { name: "Window 2", href: "/ventana/window-2" },
        { name: "Window 3", href: "/ventana/window-3" },
      ],
    },
    {
      name: "Ayuda",
      subitems: [
        { name: "Help 1", href: "/ayuda/help-1" },
        { name: "Help 2", href: "/ayuda/help-2" },
        { name: "Help 3", href: "/ayuda/help-3" },
      ],
    },
  ];

  // Sidebar items data
  const sidebarItems = [
    {
      name: "Requerimientos de materiales",
      href: "/sidebar/requerimientos-materiales",
    },
    { name: "Ingresos del almacén", href: "/sidebar/ingresos-almacen" },
    { name: "Salidas del almacén", href: "/sidebar/salidas-almacen" },
    { name: "Transformaciones", href: "/sidebar/transformaciones" },
    { name: "Inventario Físico", href: "/sidebar/inventario-fisico" },
    {
      name: "Reporte resumen de movimientos",
      href: "/sidebar/reporte-resumen-movimientos",
    },
    {
      name: "Reporte detallado de Movimientos",
      href: "/sidebar/reporte-detallado-movimientos",
    },
  ];

  // Toolbar icons data
  const toolbarIcons = [
    { icon: "file-text", label: "New" },
    { icon: "save", label: "Save" },
    { icon: "printer", label: "Print" },
    { icon: "trash", label: "Delete" },
    { icon: "arrow-left", label: "Previous" },
    { icon: "arrow-right", label: "Next" },
    { icon: "calculator", label: "Calculate" },
    { icon: "filter", label: "Filter" },
    { icon: "grid", label: "Grid" },
    { icon: "image", label: "Image" },
  ];

  // // Function to create submenu

  // // // Populate menu items
  // const mainMenu = document.querySelector(".menu-items");

  // function createMenuItem(item) {
  //   const li = document.createElement("li");
  //   li.className = "menu-item";

  //   const button = document.createElement("button");
  //   button.textContent = item.name;

  //   if (item.subitems && item.subitems.length > 0) {
  //     const chevronIcon = document.createElement("i");
  //     chevronIcon.setAttribute(
  //       "data-lucide",
  //       item.subitems ? "chevron-right" : "chevron-down"
  //     );
  //     chevronIcon.className = "chevron-icon";
  //     button.appendChild(chevronIcon);

  //     const submenu = document.createElement("ul");
  //     submenu.className = "submenu";
  //     item.subitems.forEach((subitem) => {
  //       submenu.appendChild(createMenuItem(subitem));
  //     });
  //     li.appendChild(submenu);
  //   }

  //   li.insertBefore(button, li.firstChild);
  //   return li;
  // }

  // menuItems.forEach((item) => {
  //   mainMenu.appendChild(createMenuItem(item));
  // });

  const mainMenu = document.querySelector(".menu-items");

  function createMenuItem(item) {
    const li = document.createElement("li");
    li.className = "menu-item";

    const button = document.createElement("button");
    button.textContent = item.name;

    if (item.subitems && item.subitems.length > 0) {
      const chevronIcon = document.createElement("i");
      chevronIcon.setAttribute("data-lucide", "chevron-right");
      chevronIcon.className = "chevron-icon";
      button.appendChild(chevronIcon);

      const submenu = document.createElement("ul");
      submenu.className = "submenu";
      item.subitems.forEach((subitem) => {
        submenu.appendChild(createMenuItem(subitem));
      });
      li.appendChild(submenu);
    } else if (item.href) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = item.href;
      });
    }

    li.insertBefore(button, li.firstChild);
    return li;
  }

  menuItems.forEach((item) => {
    mainMenu.appendChild(createMenuItem(item));
  });

  // Initialize Lucide icons
  lucide.createIcons();

  // Improved menu interaction
  const menuItemsWithSubmenus = document.querySelectorAll(".menu-item");
  let openMenus = [];
  let closeTimeout;

  function closeAllMenus() {
    openMenus.forEach((menu) => menu.classList.remove("open"));
    openMenus = [];
  }

  menuItemsWithSubmenus.forEach((menuItem) => {
    menuItem.addEventListener("mouseenter", () => {
      clearTimeout(closeTimeout);
      if (menuItem.querySelector(".submenu")) {
        closeAllMenus();
        menuItem.classList.add("open");
        openMenus.push(menuItem);
      }
    });

    menuItem.addEventListener("mouseleave", () => {
      closeTimeout = setTimeout(() => {
        menuItem.classList.remove("open");
        openMenus = openMenus.filter((m) => m !== menuItem);
      }, 300); // 300ms delay before closing
    });
  });

  // Close menus when hovering over the body
  document.body.addEventListener("mouseover", (e) => {
    if (!e.target.closest(".main-nav")) {
      closeAllMenus();
    }
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-item")) {
      closeAllMenus();
    }
  });

  // Populate sidebar items
  const sidebarNav = document.querySelector(".sidebar-nav");
  sidebarItems.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.name;
    sidebarNav.appendChild(link);
  });

  // Populate toolbar icons
  const toolbar = document.querySelector(".toolbar");
  toolbarIcons.forEach((tool) => {
    const button = document.createElement("button");
    button.innerHTML = `<i data-lucide="${tool.icon}"></i>`;
    button.title = tool.label;
    toolbar.appendChild(button);
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => {
    menuItemsContainer.classList.toggle("active");
  });

  // Sidebar toggle
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebar.classList.toggle("active");
    sidebarNav.classList.toggle("active-sidenav");
    sidebarToggle
      .querySelector("i")
      .setAttribute(
        "data-lucide",
        sidebar.classList.contains("collapsed")
          ? "chevron-right"
          : "chevron-left"
      );

    lucide.createIcons();
  });

  // Close mobile menu and sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav") && !e.target.closest(".sidebar")) {
      menuItemsContainer.classList.remove("active");
      sidebar.classList.remove("active");
    }
  });

  // Reinitialize Lucide icons after dynamic content is added
  lucide.createIcons();
});
