async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    renderProducts(products);
    loadCategories(products);
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
}

function renderProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p><strong>${product.price} $</strong></p>
            </div>
        `;
    });
}

function loadCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category.toUpperCase()}</option>`;
    });
}

document.getElementById('categoryFilter').addEventListener('change', async function() {
    const res = await fetch('https://fakestoreapi.com/products');
    let products = await res.json();
    if (this.value !== 'all') {
        products = products.filter(p => p.category === this.value);
    }
    renderProducts(products);
});

document.getElementById('priceSort').addEventListener('change', async function() {
    const res = await fetch('https://fakestoreapi.com/products');
    let products = await res.json();
    if (this.value === 'asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (this.value === 'desc') {
        products.sort((a, b) => b.price - a.price);
    }
    renderProducts(products);
});

setTimeout(fetchProducts, 1000);