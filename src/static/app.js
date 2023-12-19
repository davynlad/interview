window.addEventListener("DOMContentLoaded", setup());

async function setup() {
    // START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products

    fetch('/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(products => {

            displayProductsOnPage(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProductsOnPage(products) {
    const productsListElement = document.getElementById('products-list');

    productsListElement.innerHTML = '';

    products.forEach(product => {
        const listItem = document.createElement('div');
        listItem.textContent = `${product.title} - ${product.price}`;
        productsListElement.appendChild(listItem);
    });
}