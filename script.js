document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipeContainer');
    const recipeModal = document.getElementById('recipeModal');
    const closeModal = document.getElementById('closeModal');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeImage = document.getElementById('recipeImage');
    const recipeDescription = document.getElementById('recipeDescription');
    const recipeIngredients = document.getElementById('recipeIngredients');
    const prepTime = document.getElementById('prepTime');
    const commentsList = document.getElementById('commentsList');
    const commentInput = document.getElementById('commentInput');
    const commentSubmit = document.getElementById('commentSubmit');
    const authForm = document.getElementById('authForm');
    const loginResponse = document.getElementById('loginResponse');
    const registerResponse = document.getElementById('registerResponse');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    
    // Dummy data for recipes
    const recipes = [
        {
            id: 1,
            title: "Classic Pancakes",
            category: "breakfast",
            image: "https://via.placeholder.com/400",
            description: "Fluffy and light classic pancakes.",
            ingredients: ["Flour", "Milk", "Eggs", "Butter"],
            prepTime: "20 minutes",
            rating: 4,
            comments: ["Delicious!", "Perfect for breakfast."]
        },
        // Add more recipes as needed
    ];

    function displayRecipes() {
        recipeContainer.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" onclick="openModal(${recipe.id})">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
            </div>
        `).join('');
    }

    function openModal(id) {
        const recipe = recipes.find(r => r.id === id);
        recipeTitle.textContent = recipe.title;
        recipeImage.src = recipe.image;
        recipeDescription.textContent = recipe.description;
        recipeIngredients.innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        prepTime.textContent = recipe.prepTime;
        commentsList.innerHTML = recipe.comments.map(comment => `<p>${comment}</p>`).join('');
        recipeModal.style.display = 'flex';
    }

    function closeModal() {
        recipeModal.style.display = 'none';
    }

    function addComment() {
        const comment = commentInput.value;
        if (comment) {
            commentsList.innerHTML += `<p>${comment}</p>`;
            commentInput.value = '';
        }
    }

    closeModal.addEventListener('click', closeModal);
    commentSubmit.addEventListener('click', addComment);

    authForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const isRegister = e.submitter.textContent === 'Register';
        const responseElement = isRegister ? registerResponse : loginResponse;

        // Simulate an authentication process
        setTimeout(() => {
            responseElement.textContent = isRegister ? `Registered with ${email}` : `Logged in with ${email}`;
            responseElement.style.color = 'green';
        }, 500);
    });

    toggleLoginPassword.addEventListener('click', () => {
        const passwordField = document.getElementById('loginPassword');
        passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    });

    toggleRegisterPassword.addEventListener('click', () => {
        const passwordField = document.getElementById('registerPassword');
        passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    });

    displayRecipes();
});
