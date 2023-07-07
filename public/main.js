console.log("main js");

console.log(window.location.href);

const cartInBtn = document.querySelector(".cart-in");
const drawerCart = document.querySelector(".cart-drawer");
const drawerOverlay = document.querySelector(".drawer-overlay");

cartInBtn.addEventListener("click", () => {
  console.log("click to cart in");
  drawerCart.classList.toggle("drawer-in");
  drawerOverlay.classList.toggle("overlay-in");
});
