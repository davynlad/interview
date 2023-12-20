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
            document.getElementById('targetSearch').addEventListener('input', function () {
                searchProducts(this.value, products);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function searchProducts(targetProduct, originalProducts) {
    targetProduct = targetProduct.toLowerCase();

    const matchingProducts = [];
    const productMatches = document.getElementById('result1');

    originalProducts.forEach(product => {
        let index = targetProduct.length - 1;
        if (product.title.toLowerCase().charAt(index) == targetProduct.charAt(index)) {
            matchingProducts.push(product);
        }
    });
    displayProductsOnPage(matchingProducts);
    
}

function sortProductsByPrice(products) {
    products.sort((a, b) => a.price - b.price);

    return products;
}

function displayProductsOnPage(products) {
    const productsListElement = document.getElementById('products-list');

    productsListElement.innerHTML = '';

    products = sortProductsByPrice(products);

    products.forEach(product => {

        const listItem = document.createElement('div');
        listItem.className = "product";

        const productImage = document.createElement('img');
        productImage.className = "productImage";
        productImage.src = `${product.images[0].src}`;
        productImage.alt = '';

        const productInfo = document.createElement('div');
        productInfo.className = "productInfo";

        const productTitle = document.createElement('p');
        productTitle.className = "productTitle";
        productTitle.textContent = `${product.title}`;

        const productPrice = document.createElement('p');
        productPrice.className = "productPrice";
        let priceString = product.price.toString();
        let price = priceString.slice(0, -2) + '.' + priceString.slice(-2);
        productPrice.textContent = `$${price}`;

        productsListElement.appendChild(listItem);
        listItem.appendChild(productImage);
        listItem.appendChild(productInfo);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPrice);
    });
};