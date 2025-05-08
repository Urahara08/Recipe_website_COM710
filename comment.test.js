const { addComment, deleteComment, backUp } = require('./comment');

describe('addComment', () => {
    test('should add a comment to the list', () => {
        const commentList = [];
        const commentText = 'This is a test comment';

        const comment = addComment(commentText, commentList);

        expect(commentList).toHaveLength(1);
        expect(commentList[0]).toEqual(comment);
        expect(comment.text).toBe(commentText);
    });

    test('should throw an error if the comment is empty', () => {
        const commentList = [];
        expect(() => addComment('', commentList)).toThrow('Comment cannot be empty');
    });

    test('should trim whitespace from the comment', () => {
        const commentList = [];
        const commentText = '   This is a test comment   ';

        const comment = addComment(commentText, commentList);

        expect(comment.text).toBe(commentText.trim());
    });
});

describe('deleteComment', () => {
    test('should delete a comment from the list', () => {
        const commentList = [
            { id: 1, text: 'Comment 1' },
            { id: 2, text: 'Comment 2' },
        ];

        const result = deleteComment(1, commentList);

        expect(result).toBe(true);
        expect(commentList).toHaveLength(1);
        expect(commentList[0].id).toBe(2);
    });

    test('should throw an error if the comment is not found', () => {
        const commentList = [{ id: 1, text: 'Comment 1' }];

        expect(() => deleteComment(2, commentList)).toThrow('Comment not found');
    });
});

describe('DOM interactions', () => {
    beforeEach(() => {
        // Mock the DOM
        document.body.innerHTML = `
            <textarea placeholder="Enter your comment"></textarea>
            <button class="btn">Submit</button>
            <button id="clear">Clear</button>
            <button id="submit">Submit</button>
        `;
    });

    test('should get the placeholder attribute from the textarea', () => {
        const field = document.querySelector('textarea');
        const placeholder = field.getAttribute('placeholder');

        expect(placeholder).toBe('Enter your comment');
    });

    test('should find the submit button', () => {
        const submit = document.querySelector('#submit');
        expect(submit).not.toBeNull();
        expect(submit.textContent).toBe('Submit');
    });
});