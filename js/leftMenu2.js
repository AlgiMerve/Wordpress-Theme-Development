
  $(".leftUrl").click(function (e) {
    // Get the data attribute value
    var imageSrc = $(this).data("image");
    var imageAlt = $(this).data("alt") || "Görsel";

    if (imageSrc) {
      swal({
        title: "",
        text: "",
        content: {
          element: "img",
          attributes: {
            id: "fullscreenImage",
            src: imageSrc,
            alt: imageAlt,
            width: "200",
          },
        },
        buttons: ["Tam Ekran", "Kapat"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // Close the message
          swal.close();
        } else {
          // Display the image in full screen
          var img = document.getElementById("fullscreenImage");
          if (img.requestFullscreen) {
            img.requestFullscreen();
          } else if (img.mozRequestFullScreen) { // Firefox
            img.mozRequestFullScreen();
          } else if (img.webkitRequestFullscreen) { // Chrome, Safari and Opera
            img.webkitRequestFullscreen();
          } else if (img.msRequestFullscreen) { // IE/Edge
            img.msRequestFullscreen();
          }
        }
      });
    }
  });




  
  
  