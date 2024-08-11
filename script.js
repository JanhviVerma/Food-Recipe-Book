document.addEventListener('DOMContentLoaded', function() {
    const recipeButtons = document.querySelectorAll('.view-recipe');
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('recipe-details');
    const closeModal = document.getElementsByClassName('close')[0];
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const recipeSections = document.querySelectorAll('section');

    const recipes = {
        pancakes: {
            title: "Pancakes",
            ingredients: ["1 cup flour", "2 tbsp sugar", "1 tsp baking powder", "1 cup milk", "1 egg", "Butter for cooking"],
            instructions: "Mix all ingredients until smooth. Heat a non-stick pan over medium heat and add butter. Pour 1/4 cup of batter onto the pan. Cook until bubbles form, then flip and cook the other side until golden brown.",
            prepTime: "10 minutes",
            servings: "4"
        },
        omelette: {
            title: "Omelette",
            ingredients: ["2 eggs", "1/4 cup cheese", "1/4 cup diced veggies", "Salt and pepper to taste", "Butter for cooking"],
            instructions: "Whisk eggs with salt and pepper. Heat a pan over medium heat and add butter. Pour eggs into the pan and cook until they start to set. Add cheese and veggies, then fold the omelette in half. Cook until the cheese is melted.",
            prepTime: "15 minutes",
            servings: "2"
        },
        caesar_salad: {
            title: "Caesar Salad",
            ingredients: ["1 head romaine lettuce", "1/4 cup Caesar dressing", "1/4 cup grated Parmesan cheese", "Croutons"],
            instructions: "Chop lettuce and place in a bowl. Add Caesar dressing and toss to coat. Sprinkle with Parmesan cheese and top with croutons before serving.",
            prepTime: "10 minutes",
            servings: "2"
        },
        spaghetti: {
            title: "Spaghetti Bolognese",
            ingredients: ["200g spaghetti", "250g ground beef", "1 can tomato sauce", "1 onion, diced", "2 cloves garlic, minced", "1 tbsp olive oil", "Salt and pepper to taste"],
            instructions: "Cook spaghetti according to package instructions. In a pan, heat olive oil and cook onions and garlic until translucent. Add ground beef and cook until browned. Stir in tomato sauce and simmer for 20 minutes. Serve over spaghetti.",
            prepTime: "30 minutes",
            servings: "4"
        },
        grilled_chicken: {
            title: "Grilled Chicken",
            ingredients: ["4 chicken breasts", "1 tbsp olive oil", "1 tbsp lemon juice", "1 tsp paprika", "Salt and pepper to taste"],
            instructions: "Marinate chicken breasts with olive oil, lemon juice, paprika, salt, and pepper for at least 30 minutes. Preheat grill to medium-high heat and cook chicken for 6-7 minutes per side or until cooked through.",
            prepTime: "40 minutes",
            servings: "4"
        },
        lasagna: {
            title: "Lasagna",
            ingredients: ["12 lasagna noodles", "500g ground beef", "2 cups ricotta cheese", "2 cups shredded mozzarella", "2 cups marinara sauce", "1/2 cup grated Parmesan cheese"],
            instructions: "Preheat oven to 375°F (190°C). Cook lasagna noodles according to package instructions. In a baking dish, layer noodles, beef, ricotta, mozzarella, and marinara sauce. Repeat layers and top with Parmesan cheese. Bake for 30-35 minutes.",
            prepTime: "1 hour",
            servings: "6"
        },
        chocolate_cake: {
            title: "Chocolate Cake",
            ingredients: ["1 3/4 cups flour", "1 1/2 cups sugar", "3/4 cup cocoa powder", "1 1/2 tsp baking powder", "1 1/2 tsp baking soda", "1/2 tsp salt", "2 eggs", "1 cup milk", "1/2 cup vegetable oil", "2 tsp vanilla extract", "1 cup boiling water"],
            instructions: "Preheat oven to 350°F (175°C). In a bowl, mix flour, sugar, cocoa powder, baking powder, baking soda, and salt. Add eggs, milk, oil, and vanilla. Mix until smooth. Stir in boiling water. Pour into greased pans and bake for 30-35 minutes.",
            prepTime: "45 minutes",
            servings: "12"
        },
        cheesecake: {
            title: "Cheesecake",
            ingredients: ["1 1/2 cups graham cracker crumbs", "1/4 cup sugar", "1/2 cup butter, melted", "4 packages cream cheese", "1 cup sugar", "1 tsp vanilla extract", "4 eggs", "1 cup sour cream", "1 cup heavy cream"],
            instructions: "Preheat oven to 325°F (163°C). Mix graham cracker crumbs, sugar, and melted butter. Press into the bottom of a springform pan. Beat cream cheese and sugar until smooth. Add vanilla and eggs one at a time. Mix in sour cream and heavy cream. Pour over crust and bake for 60-70 minutes.",
            prepTime: "1 hour 30 minutes",
            servings: "10"
        },
        nachos: {
            title: "Nachos",
            ingredients: ["Tortilla chips", "1 cup shredded cheese", "1/2 cup salsa", "1/2 cup sour cream", "1/4 cup sliced jalapeños", "1/2 cup chopped green onions"],
            instructions: "Preheat oven to 375°F (190°C). Spread tortilla chips on a baking sheet. Sprinkle with cheese and bake for 10 minutes until cheese is melted. Top with salsa, sour cream, jalapeños, and green onions before serving.",
            prepTime: "15 minutes",
            servings: "4"
        },
        popcorn: {
            title: "Popcorn",
            ingredients: ["1/2 cup popcorn kernels", "2 tbsp vegetable oil", "Salt to taste", "Butter (optional)"],
            instructions: "Heat oil in a large pot over medium heat. Add popcorn kernels and cover with a lid. Shake the pot occasionally until popping slows. Remove from heat, season with salt and melted butter if desired.",
            prepTime: "10 minutes",
            servings: "4"
        }
    };

    function showRecipe(recipeId) {
        const recipe = recipes[recipeId];
        if (recipe) {
            modalContent.innerHTML = `
                <h2>${recipe.title}</h2>
                <h3>Ingredients:</h3>
                <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                <h3>Instructions:</h3>
                <p>${recipe.instructions}</p>
                <p><strong>Preparation Time:</strong> ${recipe.prepTime}</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
            `;
            modal.style.display = 'block';
        }
    }

    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.parentElement.getAttribute('data-recipe');
            showRecipe(recipeId);
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    searchButton.addEventListener('click', function() {
        const searchTerm = searchBar.value.toLowerCase();
        recipeSections.forEach(section => {
            const cards = section.querySelectorAll('.recipe-card');
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
