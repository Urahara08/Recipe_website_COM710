const { getRandomRecipe } = require('./random');

describe('getRandomRecipe', () => {
    test('should return a recipe from the list', () => {
        const recipes = ['Recipe 1', 'Recipe 2', 'Recipe 3'];

        const randomRecipe = getRandomRecipe(recipes);

        expect(recipes).toContain(randomRecipe);
    });

    test('should throw an error if the recipes array is empty', () => {
        expect(() => getRandomRecipe([])).toThrow('Recipes array must not be empty');
    });

    test('should throw an error if the input is not an array', () => {
        expect(() => getRandomRecipe(null)).toThrow('Recipes array must not be empty');
        expect(() => getRandomRecipe('not an array')).toThrow('Recipes array must not be empty');
    });

    test('should return a random recipe (multiple calls)', () => {
        const recipes = ['Recipe 1', 'Recipe 2', 'Recipe 3'];
        const results = new Set();

        for (let i = 0; i < 10; i++) {
            results.add(getRandomRecipe(recipes));
        }

        // Ensure at least two different recipes were returned
        expect(results.size).toBeGreaterThan(1);
    });
});