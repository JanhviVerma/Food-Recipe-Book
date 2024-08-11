const recipes = [
    { id: 1, title: 'Pancakes', category: 'breakfast', rating: 5, image: 'images/pancakes.jpg', description: 'Delicious and fluffy pancakes.', prepTime: '20 minutes', ingredients: ['Flour', 'Eggs', 'Milk', 'Sugar', 'Butter'], instructions: 'Mix all ingredients and cook on a hot griddle.', nutritionalInfo: 'Calories: 350, Fat: 15g, Carbs: 45g', comments: [{ user: 'JohnDoe', text: 'Amazing recipe!', timestamp: '2024-08-10 10:00' }] },
    { id: 2, title: 'Chicken Salad', category: 'lunch', rating: 4, image: 'images/chicken-salad.jpg', description: 'A fresh and healthy chicken salad.', prepTime: '15 minutes', ingredients: ['Chicken', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Olive Oil'], instructions: 'Mix all ingredients in a bowl and dress with olive oil.', nutritionalInfo: 'Calories: 250, Fat: 10g, Carbs: 15g', comments: [{ user: 'JaneSmith', text: 'Very refreshing!', timestamp: '2024-08-10 12:30' }] },
    { id: 3, title: 'Spaghetti Bolognese', category: 'dinner', rating: 5, image: 'images/spaghetti.jpg', description: 'Classic spaghetti with a rich bolognese sauce.', prepTime: '45 minutes', ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Onion', 'Garlic'], instructions: 'Cook beef, add sauce, and mix with spaghetti.', nutritionalInfo: 'Calories: 600, Fat: 20g, Carbs: 70g', comments: [{ user: 'ChefGordon', text: 'Perfectly seasoned!', timestamp: '2024-08-10 15:45' }] }
];

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
        document.getElementById('modalIngredients').innerText = `Ingredients: ${recipe.ingredients.join(', ')}`;
        document.getElementById('modalPrepTime').innerText = `Preparation Time: ${recipe.prepTime}`;
        document.getElementById('modalInstructions').innerText = `Instructions: ${recipe.instructions}`;
        document.getElementById('modalNutritionalInfo').innerText = `Nutritional Info: ${recipe.nutritionalInfo}`;
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

document.getElementById('profileForm').onsubmit = function(event) {
    event.preventDefault();
    document.getElementById('profileResponse').innerText = 'Profile updated successfully!';
    document.getElementById('profileForm').reset();
};

document.querySelectorAll('#loginForm form, #registerForm form').forEach(form => {
    form.onsubmit = function(event) {
        event.preventDefault();
        const isRegister = form.parentElement.id === 'registerForm';
        const email = form.querySelector('input[type=email]').value;
        const password = form.querySelector('input[type=password]').value;
        const action = isRegister ? 'Registered' : 'Logged in';
        document.getElementById(isRegister ? 'registerResponse' : 'loginResponse').innerText = `${action} successfully with email ${email}`;
        form.reset();
    };
});

document.getElementById('toggleLoginPassword').onclick = function() {
    const passwordField = document.getElementById('loginPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
};

document.getElementById('toggleRegisterPassword').onclick = function() {
    const passwordField = document.getElementById('registerPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
};

function filterRecipes() {
    const category = document.getElementById('categoryFilter').value;
    const rating = parseInt(document.getElementById('ratingFilter').value);
    const ingredient = document.getElementById('ingredientFilter').value.toLowerCase();
    const prepTime = document.getElementById('prepTimeFilter').value.toLowerCase();
    const search = document.getElementById('searchBar').value.toLowerCase();
    const dietary = document.getElementById('dietaryFilter').value;

    const filteredRecipes = recipes.filter(recipe => {
        return (category === 'all' || recipe.category === category) &&
               (rating === 0 || recipe.rating >= rating) &&
               (recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredient))) &&
               (prepTime === '' || recipe.prepTime.toLowerCase().includes(prepTime)) &&
               (search === '' || recipe.title.toLowerCase().includes(search)) &&
               (dietary === 'all' || recipe.ingredients.some(ing => ing.toLowerCase().includes(dietary)));
    });

    renderRecipes(filteredRecipes);
}

document.getElementById('categoryFilter').onchange = filterRecipes;
document.getElementById('ratingFilter').onchange = filterRecipes;
document.getElementById('ingredientFilter').oninput = filterRecipes;
document.getElementById('prepTimeFilter').oninput = filterRecipes;
document.getElementById('searchBar').oninput = filterRecipes;
document.getElementById('dietaryFilter').onchange = filterRecipes;

document.getElementById('commentSubmit').onclick = function() {
    const commentText = document.getElementById('commentInput').value;
    if (commentText.trim()) {
        const recipeId = parseInt(document.querySelector('.rating-stars').dataset.recipe.split('-').pop());
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
            recipe.comments.push({ user: 'Anonymous', text: commentText, timestamp: new Date().toISOString() });
            showRecipe(recipe.id);
        }
        document.getElementById('commentInput').value = '';
    }
};

renderRecipes(recipes);
