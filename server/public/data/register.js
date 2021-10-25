const register_admin = document.querySelector("#register-admin");
const register_dispatcher = document.querySelector("#register-dispatcher");
const register_driver = document.querySelector("#register-driver");

const register_admin_2 = document.querySelector("#register-admin-2");
const register_dispatcher_2 = document.querySelector("#register-dispatcher-2");
const register_driver_2 = document.querySelector("#register-driver-2");

const container = document.querySelector(".container")

register_dispatcher.addEventListener("click", () =>{
    container.classList.add("register-dispatcher-mode")
});
register_dispatcher.addEventListener("click", () =>{
    container.classList.remove("register-admin-mode")
});
register_dispatcher.addEventListener("click", () =>{
    container.classList.remove("register-driver-mode")
});


register_driver.addEventListener("click", () =>{
    container.classList.add("register-driver-mode")
});
register_driver.addEventListener("click", () =>{
    container.classList.remove("register-admin-mode")
});
register_driver.addEventListener("click", () =>{
    container.classList.remove("register-dispatcher-mode")
});


register_admin.addEventListener("click", () =>{
    container.classList.add("register-admin-mode")
});
register_admin.addEventListener("click", () =>{
    container.classList.remove("register-dispatcher-mode")
});
register_admin.addEventListener("click", () =>{
    container.classList.remove("register-driver-mode")
});


register_dispatcher_2.addEventListener("click", () =>{
    container.classList.add("register-dispatcher-mode")
});
register_dispatcher_2.addEventListener("click", () =>{
    container.classList.remove("register-admin-mode")
});
register_dispatcher_2.addEventListener("click", () =>{
    container.classList.remove("register-driver-mode")
});


register_driver_2.addEventListener("click", () =>{
    container.classList.add("register-driver-mode")
});
register_driver_2.addEventListener("click", () =>{
    container.classList.remove("register-admin-mode")
});
register_driver_2.addEventListener("click", () =>{
    container.classList.remove("register-dispatcher-mode")
});


register_admin_2.addEventListener("click", () =>{
    container.classList.add("register-admin-mode")
});
register_admin_2.addEventListener("click", () =>{
    container.classList.remove("register-dispatcher-mode")
});
register_admin_2.addEventListener("click", () =>{
    container.classList.remove("register-driver-mode")
});