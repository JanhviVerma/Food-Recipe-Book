document.addEventListener('DOMContentLoaded', function() {
    const recipeButtons = document.querySelectorAll('.view-recipe');
    
    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Recipe details will be displayed here soon!');
        });
    });
    
    console.log('Breakfast and lunch recipes are now interactive.');
});
