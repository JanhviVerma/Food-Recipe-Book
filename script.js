document.addEventListener('DOMContentLoaded', () => {
    const recipes = {
        'breakfast': [
            { id: 'pancakes', title: 'Pancakes', image: 'images/pancakes.jpg', description: 'Fluffy and delicious pancakes with maple syrup.', rating: 4.5 },
            { id: 'waffles', title: 'Waffles', image: 'images/waffles.jpg', description: 'Crispy waffles served with fresh fruit.', rating: 4.2 }
        ],
        'lunch': [
            { id: 'caesar-salad', title: 'Caesar Salad', image: 'images/caesar-salad.jpg', description: 'Classic Caesar salad with creamy dressing.', rating: 4.0 },
            { id: 'grilled-cheese', title: 'Grilled Cheese', image: 'images/grilled-cheese.jpg', description: 'Warm and gooey grilled cheese sandwich.', rating: 4.7 }
        ],
        'dinner': [
            { id: 'spaghetti', title: 'Spaghetti', image: 'images/spaghetti.jpg', description: 'Spaghetti with marinara sauce and meatballs.', rating: 4.8 },
            { id: 'stir-fry', title: 'Stir Fry', image: 'images/stir-fry.jpg', description: 'Vegetable stir fry with tofu.', rating: 4.3 }
        ]
    };

    function renderRecipes(category) {
        const container = document.querySelector(`#${category} .recipe-container`);
        container.innerHTML = '';
        recipes[category].forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <button data-id="${recipe.id}">View Details</button>
            `;
            container.appendChild(card);
        });
    }

    function openModal(recipe) {
        document.getElementById('modalTitle').textContent = recipe.title;
        document.getElementById('modalImage').src = recipe.image;
        document.getElementById('modalDescription').textContent = recipe.description;
        document.querySelector('.rating-stars').setAttribute('data-recipe', recipe.id);
        document.querySelector('.rating-value').textContent = recipe.rating;
        document.getElementById('recipeModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('recipeModal').style.display = 'none';
    }

    function submitComment() {
        const commentInput = document.getElementById('commentInput');
        const commentList = document.querySelector('.comments-list');
        if (commentInput.value.trim()) {
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.textContent = commentInput.value;
            commentList.appendChild(comment);
            commentInput.value = '';
        }
    }

    function searchRecipes() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const results = document.getElementById('searchResults');
        results.innerHTML = '';
        Object.values(recipes).flat().forEach(recipe => {
            if (recipe.title.toLowerCase().includes(searchInput)) {
                const result = document.createElement('div');
                result.className = 'search-result';
                result.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <button data-id="${recipe.id}">View Details</button>
                `;
                results.appendChild(result);
            }
        });
    }

    document.querySelectorAll('.recipe-card button').forEach(button => {
        button.addEventListener('click', () => {
            const recipeId = button.getAttribute('data-id');
            const recipe = Object.values(recipes).flat().find(r => r.id === recipeId);
            openModal(recipe);
        });
    });

    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', event => {
        if (event.target === document.getElementById('recipeModal')) {
            closeModal();
        }
    });

    document.getElementById('commentSubmit').addEventListener('click', submitComment);

    document.getElementById('contactForm').addEventListener('submit', event => {
        event.preventDefault();
        document.getElementById('formResponse').textContent = 'Thank you for your message!';
        event.target.reset();
    });

    document.getElementById('searchButton').addEventListener('click', searchRecipes);
    document.getElementById('searchInput').addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            searchRecipes();
        }
    });

    function handlePagination() {
        let currentPage = 1;
        const totalPages = 5; // Adjusted for more pages

        function updatePagination() {
            document.querySelector('.page-number').textContent = `Page ${currentPage}`;
        }

        document.querySelector('.prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });

        document.querySelector('.next-page').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });

        updatePagination();
    }

    handlePagination();
    renderRecipes('breakfast');
    renderRecipes('lunch');
    renderRecipes('dinner');
});
