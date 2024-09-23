$(".leftUrl").click(function (e) {
  if (
    e.target.parentElement.name != "" &&
    e.target.parentElement.name != undefined
  ) {
    var url = e.target.parentElement.name.split("|||");

    swal({
      title: "Tek Ekranlı Uygulamalar - Çift Ekranlı Uygulamalar",
      text: "Uygulama sırasında egzersizleri tek ekran veya çift ekranlı bir şekilde uygulaya bilirsiniz. Tek ekranda sadece bir ekran üzerinden egzersizler yaptırılır. Çift ekranda ise uygula içerisinde kullanılabilecek farklı bir ekran daha açılır.",
      icon: "warning",
      buttons: ["Tek Ekran", "Çift Ekran"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        location = url[1];
      } else {
        location = url[0];
      }
    });
  }

  e.stopPropagation();
  e.preventDefault();
});
