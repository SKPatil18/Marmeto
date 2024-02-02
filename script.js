document.addEventListener("DOMContentLoaded", function () {
    // Fetch API data
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            // Process and display the data
            displayProductCategories(data.categories);
            showCategory('Men'); // Show Men category by default
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Display product categories
function displayProductCategories(categories) {
    const container = document.body;

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.id = category.category_name;

        const categoryNameElement = document.createElement('h2');
        categoryNameElement.textContent = category.category_name;
        categoryElement.appendChild(categoryNameElement);

        const productsElement = document.createElement('div');

        category.category_products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            // Display product details
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="title">
                    <p class="two-line-text "><b>${product.title}</b></p>                    
                    <p>&nbsp&nbsp&#9679;&nbsp&nbsp&nbsp${product.vendor}</p>
                </div>
                <div class="innerdiv">
                    <p id="original">Rs &nbsp${product.price}.00</p>
                    <p id="offer" style="text-decoration: line-through;">&nbsp&nbsp&nbsp${product.compare_at_price}.00</p>
                    <p style=" color:red;">&nbsp&nbsp&nbsp50% off</p>
                </div>
                <div>
                    <button class="btn">Add to Cart</button>
                </div>

            `;
            productsElement.appendChild(productElement);
        });

        categoryElement.appendChild(productsElement);
        container.appendChild(categoryElement);
    });
}






// Show specific category and hide others
function showCategory(categoryName) {
    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach(category => {
        category.style.display = 'none';
    });

    const selectedCategory = document.getElementById(categoryName);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }
}



