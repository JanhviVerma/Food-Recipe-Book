document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('recipe-grid');
    const loadMoreButton = document.getElementById('load-more');
    const recipeModal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('modal-recipe-content');
    const closeModal = document.querySelector('.close');
    const generateMealPlanButton = document.getElementById('generate-meal-plan');
    const weeklyMeals = document.getElementById('weekly-meals');
    const favoritesGrid = document.getElementById('favorites-grid');
    const editProfileButton = document.getElementById('edit-profile');

    // Sample recipe data
    const recipes = [
        {
            id: 1,
            title: 'Spaghetti Carbonara',
            image: 'https://example.com/spaghetti-carbonara.jpg',
            description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
            ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano', 'Pancetta', 'Black pepper'],
            instructions: ['Cook spaghetti...', 'In a bowl, mix eggs...', 'Cook pancetta...', 'Combine all ingredients...'],
            prepTime: '20 minutes',
            cookTime: '15 minutes',
            servings: 4,
            difficulty: 'Medium',
            cuisine: 'Italian',
            category: 'Main Course',
            rating: 4.5,
            reviews: 120
        },
        // Add more recipe objects here
    ];

    const shoppingList = document.getElementById('shopping-list-items');
    const newItemInput = document.getElementById('new-item');
    const addItemBtn = document.getElementById('add-item-btn');
    const clearCompletedBtn = document.getElementById('clear-completed');

    addItemBtn.addEventListener('click', addShoppingListItem);
    clearCompletedBtn.addEventListener('click', clearCompletedItems);
    document.getElementById('generate-meal-plan').addEventListener('click', generateMealPlan);

    function addShoppingListItem() {
        const itemText = newItemInput.value.trim();
        if (itemText) {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox">
                <span>${itemText}</span>
                <button class="delete-item">Delete</button>
            `;
            shoppingList.appendChild(li);
            newItemInput.value = '';

            li.querySelector('.delete-item').addEventListener('click', () => {
                li.remove();
            });
        }
    }

    function clearCompletedItems() {
        const completedItems = shoppingList.querySelectorAll('input[type="checkbox"]:checked');
        completedItems.forEach(item => item.closest('li').remove());
    }

    // Calendar Widget
    const calendarEl = document.getElementById('calendar-widget');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Sample events, replace with actual meal plan data
            {
                title: 'Spaghetti Carbonara',
                start: '2024-08-15'
            },
            {
                title: 'Grilled Chicken Salad',
                start: '2024-08-17'
            }
        ],
        eventClick: function(info) {
            alert('Meal: ' + info.event.title);
        }
    });
    calendar.render();

    // Extend generateMealPlan function to update calendar
    function generateMealPlan() {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        weeklyMeals.innerHTML = '';
        calendar.removeAllEvents();

        daysOfWeek.forEach((day, index) => {
            const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
            const mealItem = document.createElement('li');
            mealItem.textContent = `${day}: ${randomRecipe.title}`;
            weeklyMeals.appendChild(mealItem);

            // Add event to calendar
            const date = new Date();
            date.setDate(date.getDate() + index);
            calendar.addEvent({
                title: randomRecipe.title,
                start: date
            });
        });

        calendar.render();
    }

    function displayRecipes(start, count) {
        const recipesToShow = recipes.slice(start, start + count);
        recipesToShow.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipeGrid.appendChild(recipeCard);
        });
    }

    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <div class="rating">Rating: ${recipe.rating} (${recipe.reviews} reviews)</div>
                <div class="meta">
                    <span>${recipe.prepTime} prep</span>
                    <span>${recipe.difficulty}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openRecipeModal(recipe));
        return card;
    }

    function openRecipeModal(recipe) {
        modalContent.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
            <p>${recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <h3>Instructions:</h3>
            <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
            <div class="recipe-details">
                <p>Prep Time: ${recipe.prepTime}</p>
                <p>Cook Time: ${recipe.cookTime}</p>
                <p>Servings: ${recipe.servings}</p>
                <p>Difficulty: ${recipe.difficulty}</p>
                <p>Cuisine: ${recipe.cuisine}</p>
                <p>Category: ${recipe.category}</p>
            </div>
        `;
        recipeModal.style.display = 'block';
    }

    loadMoreButton.addEventListener('click', () => {
        const currentRecipeCount = recipeGrid.children.length;
        displayRecipes(currentRecipeCount, 6);
        if (currentRecipeCount + 6 >= recipes.length) {
            loadMoreButton.style.display = 'none';
        }
    });

    closeModal.addEventListener('click', () => {
        recipeModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === recipeModal) {
            recipeModal.style.display = 'none';
        }
    });

    function generateMealPlan() {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        weeklyMeals.innerHTML = '';
        daysOfWeek.forEach(day => {
            const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
            const mealItem = document.createElement('li');
            mealItem.textContent = `${day}: ${randomRecipe.title}`;
            weeklyMeals.appendChild(mealItem);
        });
    }

    generateMealPlanButton.addEventListener('click', generateMealPlan);

    function displayFavorites() {
        // This would typically be fetched from user data
        const favoriteRecipes = recipes.slice(0, 4);
        favoriteRecipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            favoritesGrid.appendChild(recipeCard);
        });
    }

    editProfileButton.addEventListener('click', () => {
        // Implement profile editing functionality
        console.log('Edit profile clicked');
    });

    // Initial display
    displayRecipes(0, 6);
    displayFavorites();
});