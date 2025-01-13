class Product {
    constructor(id, title, price, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const products = data.slice(0, 20).map(item => new Product(
            item.id,
            item.title,
            item.price,
            item.description,
            item.image
        ));
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <button onclick="updateProduct(${product.id})">Update Title</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `).join('');
}

function updateProduct(id) {
    const newTitle = prompt('Enter the new title:');
    if (newTitle) {
        const productCard = document.querySelector(`.product-card[data-id="${id}"]`);
        if (productCard) {
            productCard.querySelector('h2').textContent = newTitle;
        }
    }
}

function deleteProduct(id) {
    const productCard = document.querySelector(`.product-card[data-id="${id}"]`);
    if (productCard) {
        productCard.remove();
    }
}

function createProduct() {
    const title = prompt('Enter the product title:');
    const price = prompt('Enter the product price:');
    const description = prompt('Enter the product description:');
    const image = prompt('Enter the product image URL:');

    if (title && price && description && image) {
        const newProduct = new Product(
            Date.now(), 
            title,
            parseFloat(price),
            description,
            image
        );

        const container = document.getElementById('products-container');
        container.insertAdjacentHTML('beforeend', `
            <div class="product-card" data-id="${newProduct.id}">
                <img src="${newProduct.image}" alt="${newProduct.title}">
                <h2>${newProduct.title}</h2>
                <p>$${newProduct.price}</p>
                <p>${newProduct.description}</p>
                <button onclick="updateProduct(${newProduct.id})">Update Title</button>
                <button onclick="deleteProduct(${newProduct.id})">Delete</button>
            </div>
        `);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const createButton = document.createElement('button');
    createButton.textContent = 'Create New Product';
    createButton.onclick = createProduct;
    header.appendChild(createButton);

    fetchProducts();
});