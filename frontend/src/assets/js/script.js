$(document).ready(function() {
    $('.all-owlstars').owlCarousel({
      loop: true,
      margin: 10,
      autoplay: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 2,
          nav: true,
          margin: 20
        }
      }
    })
    $('.partners-logo').owlCarousel({
        loop: true,
        autoplay: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 3,
            nav: false
          },
          1000: {
            items: 5,
            nav: true,
            loop: false,
            margin: 20
          }
        }
      });
  });
  