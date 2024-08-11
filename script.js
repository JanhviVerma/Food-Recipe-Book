document.addEventListener('DOMContentLoaded', function() {
    const recipeButtons = document.querySelectorAll('.view-recipe');
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('recipe-details');
    const closeModal = document.getElementsByClassName('close')[0];

    const recipes = {
        pancakes: {
            title: "Pancakes",
            ingredients: ["1 cup flour", "2 tbsp sugar", "1 tsp baking powder", "1 cup milk", "1 egg", "Butter for cooking"],
            instructions: "Mix all ingredients until smooth. Heat a non-stick pan over medium heat and add butter. Pour 1/4 cup of batter onto the pan. Cook until bubbles form, then flip and cook the other side until golden brown."
        },
        omelette: {
            title: "Omelette",
            ingredients: ["2 eggs", "1/4 cup cheese", "1/4 cup diced veggies", "Salt and pepper to taste", "Butter for cooking"],
            instructions: "Whisk eggs with salt and pepper. Heat a pan over medium heat and add butter. Pour eggs into the pan and cook until they start to set. Add cheese and veggies, then fold the omelette in half. Cook until the cheese is melted."
        },
                caesar_salad: {
            title: "Caesar Salad",
            ingredients: ["1 head romaine lettuce", "1/4 cup Caesar dressing", "1/4 cup grated Parmesan cheese", "Croutons"],
            instructions: "Chop lettuce and place in a bowl. Add Caesar dressing and toss to coat. Sprinkle with Parmesan cheese and top with croutons before serving."
        },
        spaghetti: {
            title: "Spaghetti Bolognese",
            ingredients: ["200g spaghetti", "250g ground beef", "1 can tomato sauce", "1 onion, diced", "2 cloves garlic, minced", "1 tbsp olive oil", "Salt and pepper to taste"],
            instructions: "Cook spaghetti according to package instructions. In a pan, heat olive oil and cook onions and garlic until translucent. Add ground beef and cook until browned. Stir in tomato sauce and simmer for 20 minutes. Serve over spaghetti."
        },
        grilled_chicken: {
            title: "Grilled Chicken",
            ingredients: ["4 chicken breasts", "1 tbsp olive oil", "1 tbsp lemon juice", "1 tsp paprika", "Salt and pepper to taste"],
            instructions: "Marinate chicken breasts with olive oil, lemon juice, paprika, salt, and pepper for at least 30 minutes. Preheat grill to medium-high heat and cook chicken for 6-7 minutes per side or until cooked through."
        },
        lasagna: {
            title: "Lasagna",
            ingredients: ["12 lasagna noodles", "500g ground beef", "2 cups ricotta cheese", "2 cups shredded mozzarella", "2 cups marinara sauce", "1/2 cup grated Parmesan cheese"],
            instructions: "Preheat oven to 375°F (190°C). Cook lasagna noodles according to package instructions. In a pan, cook ground beef until browned. In a baking dish, layer noodles, beef, ricotta, mozzarella, and marinara sauce. Repeat layers and top with Parmesan cheese. Bake for 30-35 minutes."
        }
    };

    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.parentElement.getAttribute('data-recipe');
            const recipe = recipes[recipeId];

            if (recipe) {
                modalContent.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <h3>Ingredients:</h3>
                    <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                    <h3>Instructions:</h3>
                    <p>${recipe.instructions}</p>
                `;
                modal.style.display = 'block';
            }
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

    console.log('Dinner recipes and modal functionality have been added.');
});

