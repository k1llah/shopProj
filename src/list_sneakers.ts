import "./style.css";
console.log("new project");
let arrOfSneakers = [
  {
    img: "airmax.webp",
    name: " Nike airmax",
    coast: 12_700,
  },
  {
    img: "potat.jpeg",
    name: "vans knu school",
    coast: 15_300,
    type: "Кеды",
  },
  {
    img: "trainer.webp",
    name: " Nike airmax",
    coast: 11_200,
    type: "Кроссовки",
  },
  {
    img: "purp.jpeg",
    name: " Nike air Jordan Purple metallic",
    coast: 13_800,
    type: "Кроссовки",
  },
  {
    img: "purp.jpeg",
    name: " Nike air Jordan Purple metallic",
    coast: 13_800,
    type: "Кроссовки",
  },
];
let items = document.querySelector(".items") as HTMLDivElement;
function renderCards(data: any) {
  items.innerHTML = "";
  items.innerHTML = data
    .map(
      (el: any, index:number) => `
  <div class="card_wrapper">
      <img src="${el.img}" class="img_card">
      <p class="name_card">${el.name}</p>
      <div class="div_bottom_card">
        <div class="div_coast">
          <p class="coast_p">Цена:</p>
          <p class="priceP">${el.coast.toLocaleString()}</p>
        </div>
        <button class="add_button" onclick="addToCart(${index})">+</button>
      </div>
    </div>
  `
    )
    .join("");
}
(window as any).addToCart = function(index: number) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const selectedItem = arrOfSneakers[index];
  cartItems.push(selectedItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Товар добавлен в корзину!');
  console.log(localStorage.getItem('cartItems'))
}


let select = document.querySelector(".filter") as HTMLSelectElement;
const savedFilter = localStorage.getItem("selectedFilter");
if (savedFilter) {
  select.value = savedFilter;
}
const firstExpensive = [...arrOfSneakers].sort((a, b) => b.coast - a.coast);
const sortedFirstCheap = [...arrOfSneakers].sort((a, b) => a.coast - b.coast);
const sortedProducts = [...arrOfSneakers].sort((a: any, b: any) => a.name.localeCompare(b.name));
select.addEventListener("change", el => {
  let target = el.target as HTMLSelectElement;
  localStorage.setItem("selectedFilter", target.value);
  if (select.value == "by_name") {
    renderCards(sortedProducts);
  } else if (target.value == "expensive") {
    renderCards(firstExpensive);
  } else if (target.value == "cheap") {
    renderCards(sortedFirstCheap);
  }
  console.log(target.value);
});
if (select.value == "by_name") {
  renderCards(sortedProducts);
} else if (select.value == "expensive") {
  renderCards(firstExpensive);
} else if (select.value == "cheap") {
  renderCards(sortedFirstCheap);
}
console.log(select.value);


//! Здесь буду делать поиск с debounce func глянем чо выйдет)))))
let inputSearch = document.querySelector('#search_sneaker') as HTMLInputElement
inputSearch.addEventListener('input',(event)=>{
	let searchTerm = (event.target as HTMLInputElement).value.toLowerCase()
	let filteredProducts = arrOfSneakers.filter((el)=>{
		el.name.toLowerCase().includes(searchTerm)
		renderCards(filteredProducts);
	})
})
 function debounceFunc (func:any,delay:any){
	let timeoutId:number
	return function(){
    //@ts-ignore
    const context = this;
		const arg = arguments
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			func.apply(context,arg)
		},delay)
	}
 }
 let debouncedSearch = debounceFunc((searchTerm:any) => {
  let filteredProducts = arrOfSneakers.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );
  renderCards(filteredProducts);
}, 300); 
inputSearch.addEventListener('input', (event)=>{
	let searchTerm = (event.target as HTMLInputElement).value.toLowerCase()
	//@ts-ignore
	debouncedSearch(searchTerm)
})


 