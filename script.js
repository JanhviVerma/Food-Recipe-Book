document.addEventListener('DOMContentLoaded', function() {
    const recipeButtons = document.querySelectorAll('.view-recipe');
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('recipe-details');
    const closeModal = document.getElementsByClassName('close')[0];
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const recipeSections = document.querySelectorAll('section');
    const ratingStars = document.querySelectorAll('.rating-stars');
    const commentSubmitButtons = document.querySelectorAll('.comment-submit');
    const prevPageButton = document.querySelector('.prev-page');
    const nextPageButton = document.querySelector('.next-page');
    const pageNumberSpan = document.querySelector('.page-number');

    let currentPage = 1;
    const recipesPerPage = 2;

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
        // Additional recipes...
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

    function updatePagination() {
        pageNumberSpan.textContent = `Page ${currentPage}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage >= Math.ceil(recipeSections.length / recipesPerPage);
    }

    function filterRecipes() {
        recipeSections.forEach(section => {
            const cards = section.querySelectorAll('.recipe-card');
            cards.forEach((card, index) => {
                if (index < (currentPage - 1) * recipesPerPage || index >= currentPage * recipesPerPage) {
                    card.style.display = 'none';
                } else {
                    card.style.display = '';
                }
            });
        });
    }

    function handleRating(recipeId, rating) {
        const ratingValue = document.querySelector(`.rating-value[data-recipe="${recipeId}"]`);
        ratingValue.textContent = rating;
    }

    function handleCommentSubmit(recipeId) {
        const commentInput = document.querySelector(`.comment-input[data-recipe="${recipeId}"]`);
        const commentsList = document.querySelector(`.comments-list[data-recipe="${recipeId}"]`);
        if (commentInput.value.trim()) {
            const commentElement = document.createElement('p');
            commentElement.textContent = commentInput.value;
            commentsList.appendChild(commentElement);
            commentInput.value = '';
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

    ratingStars.forEach(stars => {
        stars.addEventListener('click', function(event) {
            const recipeId = this.getAttribute('data-recipe');
            const rating = event.target.getAttribute('data-value');
            if (rating) {
                handleRating(recipeId, rating);
            }
        });
    });

    commentSubmitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-recipe');
            handleCommentSubmit(recipeId);
        });
    });

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            filterRecipes();
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < Math.ceil(recipeSections.length / recipesPerPage)) {
            currentPage++;
            updatePagination();
            filterRecipes();
        }
    });

    updatePagination();
    filterRecipes();
});
