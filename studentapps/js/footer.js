window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("user")) {
      document.getElementById("body_id").style.display = "block";
    } else {
      setInterval(() => {
        window.location = "../login.php";
      }, 100);
    }
  });
  