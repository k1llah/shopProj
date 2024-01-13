import "./styleCart.css";
let cart = document.querySelector(".carts") as HTMLDivElement;
let emptyAlert = document.querySelector(".basket_empty") as HTMLHeadingElement;

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  if (cartItems.length === 0 || cartItems.every((item: any) => item === null)) {
    emptyAlert.style.opacity = "1";
    cart.innerHTML = "";
  } else {
    emptyAlert.style.opacity = "0";
    cart.innerHTML = cartItems
      .filter((item: any) => item !== null) // Убираем null элементы
      .map(
        (item: any) => `
				<div class="card_wrapper">
      <img src="${item.img}" class="img_card">
      <p class="name_card">${item.name}</p>
      <div class="div_bottom_card">
        <div class="div_coast">
          <p class="coast_p">Цена:</p>
          <p class="priceP">${item.coast.toLocaleString()}</p>
        </div>
        <button class="delete_button">🗑️</button>
      </div>
    </div>
		`
      )
      .join("");
  }
}

// Вызывайте функцию для отображения корзины при загрузке страницы
renderCart();
let circle = document.querySelector('.button_cr') as HTMLDivElement
circle.addEventListener('click',(event)=>{
let target = event.target as HTMLElement
if(target.classList.contains('div')){
	target.classList.toggle('end')
}
})