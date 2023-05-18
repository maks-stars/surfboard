;(function() {
let openBurgerMenu = document.querySelector(".hamburger");
let burgerMenu = document.querySelector(".burger-menu");
let closeBurgerMenu = document.querySelector(".burger-menu__close");
let burgerMenuLink = document.querySelectorAll(".burger-menu__link");

openBurgerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  burgerMenu.classList.add("burger-menu-active");
});

burgerMenuLink.forEach(item => {
  item.addEventListener("click", (e) => {
    burgerMenuLink.forEach(link => {
      link.classList.remove("burger-link-active");
    });

    item.classList.add("burger-link-active")
    if (item.classList.contains("burger-link-active")) {
      burgerMenu.classList.remove("burger-menu-active");
    }
  });
});

closeBurgerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  burgerMenu.classList.remove("burger-menu-active");
});
})()



// $(".hamburger").on("click", function (event) {
//   $('.burger-menu').addClass("burger-menu-active");
// });

// $(".burger-menu__close").on("click", function (event) {
//   $('.burger-menu').removeClass("burger-menu-active");
// });

// $(".burger-item").on("click", function (event) {
//   $('.burger-menu').removeClass("burger-menu-active");
// });