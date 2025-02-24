document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartContainer = document.querySelector(".cart-items-container");
    const cartCount = document.querySelector(".cart-count");
    const totalPrice = document.querySelector(".total-price");
    const confirmOrderBtn = document.querySelector("#confirm-order");
    const newOrderBtn = document.querySelector("#new-order");
    const addToCartButtons = document.querySelectorAll("article button");
  
    function updateCart() {
      cartContainer.innerHTML = "";
      let totalItems = 0;
      let totalCost = 0;
  
      cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;
        const itemEl = document.createElement("div");
        itemEl.classList.add("flex", "justify-between", "items-center", "border-b", "p-2");
        itemEl.innerHTML = `
          <span>${item.name} (${item.quantity}x @ $${item.price.toFixed(2)})</span>
          <div class="flex items-center">
            <button class="decrease bg-red-500 text-white p-1 rounded" data-index="${index}">-</button>
            <button class="increase bg-green-500 text-white p-1 rounded ml-2" data-index="${index}">+</button>
            <button class="remove bg-gray-500 text-white p-1 rounded ml-2" data-index="${index}">x</button>
          </div>
        `;
        cartContainer.appendChild(itemEl);
      });
  
      cartCount.textContent = totalItems;
      totalPrice.textContent = `$${totalCost.toFixed(2)}`;
    }
  
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const itemElement = e.target.closest("article");
        if (!itemElement) return;
        const itemName = itemElement.querySelector("h2").textContent;
        const itemPrice = parseFloat(itemElement.querySelectorAll("p")[1].textContent);
        
        const existingItem = cart.find((item) => item.name === itemName);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        updateCart();
      });
    });
  
    cartContainer.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (index === null) return;
      const itemIndex = parseInt(index, 10);
      
      if (e.target.classList.contains("decrease")) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity--;
        } else {
          cart.splice(itemIndex, 1);
        }
      } else if (e.target.classList.contains("increase")) {
        cart[itemIndex].quantity++;
      } else if (e.target.classList.contains("remove")) {
        cart.splice(itemIndex, 1);
      }
      updateCart();
    });
  
    confirmOrderBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert(`Order confirmed! Total: $${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}\nThank you for your purchase.`);
      cart.length = 0;
      updateCart();
    });
  
    newOrderBtn.addEventListener("click", () => {
      cart.length = 0;
      updateCart();
    });
  
    updateCart();
  });
  
  