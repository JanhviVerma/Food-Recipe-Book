// Sample data with usernames and timestamps for comments
const recipes = [
    { id: 1, title: 'Pancakes', category: 'breakfast', rating: 5, image: 'images/pancakes.jpg', description: 'Delicious and fluffy pancakes.', comments: [{ user: 'JohnDoe', text: 'Amazing recipe!', timestamp: '2024-08-10 10:00' }] },
    { id: 2, title: 'Chicken Salad', category: 'lunch', rating: 4, image: 'images/chicken-salad.jpg', description: 'A fresh and healthy chicken salad.', comments: [{ user: 'JaneSmith', text: 'Very refreshing!', timestamp: '2024-08-10 12:30' }] },
    { id: 3, title: 'Spaghetti Bolognese', category: 'dinner', rating: 5, image: 'images/spaghetti.jpg', description: 'Classic spaghetti with a rich bolognese sauce.', comments: [{ user: 'ChefGordon', text: 'Perfectly seasoned!', timestamp: '2024-08-10 15:45' }] }
];

// Utility functions
function renderRecipes(recipes) {
    document.querySelectorAll('.recipe-container').forEach(container => {
        container.innerHTML = '';
    });
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Rating: ${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}</p>
            <button onclick="showRecipe(${recipe.id})">View Recipe</button>
        `;
        document.querySelector(`#${recipe.category} .recipe-container`).appendChild(card);
    });
}

function showRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        document.getElementById('modalTitle').innerText = recipe.title;
        document.getElementById('modalImage').src = recipe.image;
        document.getElementById('modalDescription').innerText = recipe.description;
        document.querySelector('.rating-stars').dataset.recipe = recipe.title.toLowerCase().replace(/\s+/g, '-');
        document.querySelector('.rating-value').innerText = recipe.rating;
        const commentsList = document.querySelector('.comments-list');
        commentsList.innerHTML = '';
        recipe.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `<strong>${comment.user}</strong> <em>${comment.timestamp}</em><p>${comment.text}</p>`;
            commentsList.appendChild(commentElement);
        });
        document.getElementById('recipeModal').style.display = 'flex';
    }
}

document.querySelector('.close').onclick = function() {
    document.getElementById('recipeModal').style.display = 'none';
};

document.getElementById('contactForm').onsubmit = function(event) {
    event.preventDefault();
    document.getElementById('formResponse').innerText = 'Thank you for your message!';
    document.getElementById('contactForm').reset();
};

// Filter recipes based on category, rating, and search term
function filterRecipes() {
    const category = document.getElementById('categoryFilter').value;
    const rating = document.getElementById('ratingFilter').value;
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredRecipes = recipes.filter(r => 
        (category === 'all' || r.category === category) &&
        (rating === '0' || r.rating >= rating) &&
        r.title.toLowerCase().includes(searchTerm)
    );
    renderRecipes(filteredRecipes);
}

document.getElementById('categoryFilter').onchange = filterRecipes;
document.getElementById('ratingFilter').onchange = filterRecipes;
document.getElementById('searchBar').onkeyup = filterRecipes;

// Add comment functionality
document.getElementById('commentSubmit').onclick = function() {
    const recipeTitle = document.querySelector('.rating-stars').dataset.recipe.replace(/-/g, ' ');
    const commentText = document.getElementById('commentInput').value;
    if (commentText) {
        const recipe = recipes.find(r => r.title.toLowerCase().replace(/\s+/g, '-') === recipeTitle);
        if (recipe) {
            recipe.comments.push({
                user: 'Anonymous',
                text: commentText,
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
            });
            showRecipe(recipe.id);
        }
        document.getElementById('commentInput').value = '';
    }
};

// Initial rendering
renderRecipes(recipes);
