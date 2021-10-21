const register = document.querySelector("#register");
const delete_vehicle = document.querySelector("#delete");
const container = document.querySelector(".container");

delete_vehicle.addEventListener("click", () => {
  container.classList.add("delete-mode");
});

register.addEventListener("click", () => {
  container.classList.remove("delete-mode");
});