const field = document.querySelector('textarea');
const backUp = field.getAttribute('placeholder')
const btn = document.querySelector('.btn');
const clear = document.getElementById('clear')
const submit = document.querySelector('#submit')
// const comments = document.querySelector('#comment-box')
const comments = document.getElementById('comment-box');

// array to store the comments
const comments_arr = [];

// to generate html list based on comments array
const display_comments = () => {
  let list = '<ul>';
   comments_arr.forEach(comment => {
    list += `<li>${comment}</li>`;
  })
  list += '</ul>';
  comments.innerHTML = list;
}

clear.onclick = function(event){
  event.preventDefault();
  // reset the array  
   comments_arr.length = 0;
  // re-genrate the comment html list
  display_comments();
}

submit.onclick = function(event){
    event.preventDefault();
    const content = field.value;
    if(content.length > 0){ // if there is content
      // add the comment to the array
      comments_arr.push(content);
      // re-genrate the comment html list
      display_comments();
      // reset the textArea content 
      field.value = '';
    }

/// Function to add a comment
function addComment(commentText, commentList) {
  if (!commentText.trim()) {
      throw new Error('Comment cannot be empty');
  }

  const comment = {
      id: Date.now(),
      text: commentText,
  };

  commentList.push(comment);
  return comment;
}

// Function to delete a comment
function deleteComment(commentId, commentList) {
  const index = commentList.findIndex((comment) => comment.id === commentId);
  if (index === -1) {
      throw new Error('Comment not found');
  }

  commentList.splice(index, 1);
  return true;
}

// Export the function
module.exports = { addComment, deleteComment };
}