// if (localStorage.getItem("studient")) {
  // Sayfa yüklenme ikonunun gözüküp kaybolması

  window.addEventListener("load", function () {
    document.querySelector(".lds-dual-ring").style.display = "none";
    document.getElementById("main_menu").style.display = "block";
  });

  // To disable right click
  // document.addEventListener("contextmenu", (event) => event.preventDefault());

  // To disable F12 options
  document.onkeypress = function (event) {
    event = event || window.event;
    if (event.keyCode == 123) {
      return false;
    }
  };
  document.onmousedown = function (event) {
    event = event || window.event;
    if (event.keyCode == 123) {
      return false;
    }
  };

  document.onkeydown = function (e) {
    if (
      e.ctrlKey &&
      (e.keyCode === 67 ||
        e.keyCode === 86 ||
        e.keyCode === 85 ||
        e.keyCode === 117)
    ) {
      return false;
    } else {
      return true;
    }
  };
  $(document).keypress("u", function (e) {
    if (e.ctrlKey) {
      return false;
    } else {
      return true;
    }
  });

  // Sayfaya göre belli bir boyutun altında uyarı veren bir mesaj yayınla

  function warning_show() {
    let warning_message = document.querySelectorAll(".warning_message");
    document.getElementById("nav_menu").style.display = "none";
    document.getElementById("main_menu").style.display = "none";
    warning_message.forEach(function (item) {
      item.style.display = "block";
    });
  }

  function warning_hide() {
    let warning_message = document.querySelectorAll(".warning_message");
    document.getElementById("nav_menu").style.display = "block";
    document.getElementById("main_menu").style.display = "block";
    warning_message.forEach(function (item) {
      item.style.display = "none";
    });
  }

  let genislik = 770;
  let yukseklik = 500;

  $(window).resize(function () {
    if ($(window).width() <= genislik || $(window).height() <= yukseklik) {
      warning_show();
    } else {
      warning_hide();
    }
  });

  history.pushState(null, null, location.href);
  history.back();
  history.forward();
  window.onpopstate = function () {
    history.go(1);
  };

  function preventBack() {
    window.history.forward();
  }

  setTimeout("preventBack()", 0);
  window.onunload = function () {
    null;
  };

  preventBack();

  window.onload = preventBack();
  window.onpageshow = function (evt) {
    if (evt.persisted) preventBack();
  };

 
// } else {
//   window.location = "../login.php";
// }
