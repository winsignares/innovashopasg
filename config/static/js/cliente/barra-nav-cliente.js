console.log("EMPRESA-NAV-CLIENTE JS");

document.addEventListener("DOMContentLoaded", verifySession)

function verifySession(){
  if(!localStorage.getItem("id_usuario")){
    window.location.href = "/login"
  }
}

function logout(){
  localStorage.removeItem("id_usuario");
  window.location.href = "/login"
}