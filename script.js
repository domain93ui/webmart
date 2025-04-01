const products = [
    { name: "Orange Kurkure", price: 10, image: "source/kurkure/okurkure.jpg" },
    { name: "Tedhe Medhe", price: 10, image: "source/kurkure/tedhemedthe.jpg" },
    { name: "Blue Lays", price: 10, image: "source/lays/blays.jpg" },
    { name: "Yellow Lays", price: 10, image: "source/lays/ylays.jpg" },
    { name: "5-Star", price: 10, image: "source/choco/5star.jpg" },
    { name: "Britania Cake", price: 20, image: "source/choco/britaniacake.jpg" },
    { name: "Amul TriCone", price: 40, image: "source/choco/cone.jpg" },
    { name: "Dairy Milk", price: 20, image: "source/choco/dairymilk.jpg" },
    { name: "Dark Chocolate", price: 55, image: "source/choco/darkchocolate.jpg" },
    { name: "Green Kurkure", price: 10, image: "source/kurkure/gkurkure.jpg" },
    { name: "Amul Frostik", price: 40, image: "source/choco/frostik.jpg" },
    { name: "Frooti", price: 10, image: "source/drinks/frooti.jpg" },
    { name: "Limca", price: 20, image: "source/drinks/limca.jpg" },
    { name: "Red Chilli Lays", price: 10, image: "source/lays/clays.jpg" },
    { name: "Red Tomato Lays", price: 10, image: "source/lays/rlays.jpg" },
    { name: "Dark Fantasy", price: 40, image: "source/choco/darkfantasy.jpg" }
];

let cart = [];
let total = 0;

function displayProducts(searchTerm = "") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-card");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-to-cart-button" onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(index) {
    const product = products[index];
    cart.push(product);
    total += product.price;
    updateCart();
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    total -= removedItem.price;
    updateCart();
}

function updateTotal() {
    let deliveryCharge = parseInt(document.getElementById("delivery-type").value);
    document.getElementById("total").textContent = `₹${total + deliveryCharge}`;
}

function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <button class="remove-button" onclick="removeFromCart(${index})">✕</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    updateTotal(); // Recalculate total with delivery
}

function shareCart() {
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    let message = "Shopping Cart:\n";
    cart.forEach((item) => {
        message += `${item.name} - ₹${item.price}\n`;
    });
    message += `Total: ₹${total}`;

    const subject = "Shopping Cart Shared";
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:techtips3108@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.open(mailtoLink, '_blank');
}

document.getElementById('product-search').addEventListener('input', (event) => {
    displayProducts(event.target.value);
});

displayProducts();