// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  // Add .hidden class to error modal (should be in HTML already)
  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden');
  
  // Add click event listeners to all like buttons
  const likeButtons = document.querySelectorAll('.like-glyph');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('activated-heart')) {
        // If already liked, unlike it
        button.classList.remove('activated-heart');
        button.textContent = EMPTY_HEART;
      } else {
        // Attempt to like
        mimicServerCall()
          .then(() => {
            // Success - update heart appearance
            button.textContent = FULL_HEART;
            button.classList.add('activated-heart');
          })
          .catch(error => {
            // Failure - show error modal
            const errorModal = document.getElementById('modal');
            const errorMessage = document.getElementById('modal-message');
            
            errorMessage.textContent = error;
            errorModal.classList.remove('hidden');
            
            // Hide modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
