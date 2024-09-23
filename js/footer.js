window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dealer")) {
    document.getElementById("body_id").style.display = "block";
  } else {
    setInterval(() => {
      window.location = "login.php";
    }, 100);
  }
});
