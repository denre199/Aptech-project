// Search functionality
const searchInput = document.querySelector('.search input');
const books = document.querySelectorAll('.book1');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  books.forEach(book => {
    const bookName = book.querySelector('h4').textContent.toLowerCase();
    book.style.display = bookName.includes(searchText) ? 'block' : 'none';
  });
});


const sortButton = document.querySelector('.sort');
sortButton.addEventListener('click', () => {
  const container = document.querySelector('.books');
  const booksArray = Array.from(container.children);

  booksArray.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('h4:last-child').textContent.replace('$', ''));
    const priceB = parseFloat(b.querySelector('h4:last-child').textContent.replace('$', ''));
    return priceA - priceB;
  });

  // Reorder the books in the DOM
  booksArray.forEach(book => container.appendChild(book));
});


const booksPerPage = 4; // Number of books per page
const paginationButtons = document.querySelectorAll('.boxes button:not(:last-child)');
const booksContainer = document.querySelector('.books');

function showPage(page) {
  const books = Array.from(booksContainer.children);
  books.forEach((book, index) => {
    book.style.display = (index >= (page - 1) * booksPerPage && index < page * booksPerPage) ? 'block' : 'none';
  });
}

// Add event listeners to pagination buttons
paginationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showPage(index + 1);
  });
});

// Show the first page by default
showPage(1);


const cart = [];
const addToCartButtons = document.querySelectorAll('.books .book1');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const bookName = button.querySelector('h4').textContent;
    const bookPrice = parseFloat(button.querySelector('h4:last-child').textContent.replace('$', ''));
    
    const existingBook = cart.find(item => item.name === bookName);
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.push({ name: bookName, price: bookPrice, quantity: 1 });
    }

    displayCart();
  });
});

function displayCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = cart.map(item => `
    <p>${item.name} - $${item.price} x ${item.quantity}</p>
  `).join('');
}


const stars = document.querySelectorAll('.icon i');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    const allStars = star.parentElement.children;
    for (let i = 0; i < allStars.length; i++) {
      allStars[i].classList.toggle('fa-star', i <= index);
      allStars[i].classList.toggle('fa-star-o', i > index);
    }
  });
});

const menuToggle = document.querySelector('.title a');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', (e) => {
  e.preventDefault();
  navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});


document.addEventListener('DOMContentLoaded', () => {
    // Declare cart only once at the top of the script
    let cart = []; 

    // Select all products
    const products = document.querySelectorAll('.book1');

    products.forEach(product => {
        product.addEventListener('click', () => {
            const bookName = product.querySelector('h4').textContent; // Get book name
            const bookPrice = parseFloat(product.querySelector('h4:last-child').textContent.replace('$', '')); // Get book price

            // Check if the book is already in the cart
            const existingBook = cart.find(item => item.name === bookName);
            if (existingBook) {
                existingBook.quantity += 1; // Increment quantity if it exists
            } else {
                cart.push({ name: bookName, price: bookPrice, quantity: 1 }); // Add new item to cart
            }

            updateCartDisplay(); // Update cart
        });
    });

    function updateCartDisplay() {
        const cartContainer = document.getElementById('cart');
        const totalPriceElement = document.getElementById('total-price');

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>The cart is empty.</p>';
            totalPriceElement.textContent = 'Total: $0';
            return;
        }

        // Generate cart HTML
        cartContainer.innerHTML = cart
            .map(item => `
                <p>
                    ${item.name} - $${item.price} x ${item.quantity}
                    <button class="remove-item" data-name="${item.name}">Remove</button>
                </p>
            `)
            .join('');

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceElement.textContent = `Total: $${totalPrice}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                removeFromCart(name);
            });
        });
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name); // Remove item from cart
        updateCartDisplay(); // Update display
    }
});
