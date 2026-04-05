// toggle user type
const types = document.querySelectorAll(".type");

types.forEach(type => {
  type.addEventListener("click", () => {
    types.forEach(t => t.classList.remove("active"));
    type.classList.add("active");
  });
});