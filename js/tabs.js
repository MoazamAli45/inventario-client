document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and panels
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    // Add active class to clicked button and corresponding panel
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});
