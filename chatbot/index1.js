document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const messagesDiv = document.getElementById('messages');
    const loadingDots = document.createElement('div');
  
    loadingDots.id = 'loading-dots';
    loadingDots.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
    messagesDiv.appendChild(loadingDots);
  
    function sendMessage() {
      const message = userInput.value.trim();
      if (message === '') return;
  
      appendMessage('user-message', message);
  
      // Show loading dots
      loadingDots.style.display = 'block';
  
      fetch('/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: message })
      })
      .then(response => response.json())
      .then(data => {
          // Hide loading dots
          loadingDots.style.display = 'none';
          typeMessage('bot-message', data.response);
      })
      .catch(error => {
          loadingDots.style.display = 'none';
          appendMessage('bot-message', 'Error: Unable to reach the server.');
          console.error('Error:', error);
      });
  
      userInput.value = '';
    }
  
    sendButton.addEventListener('click', sendMessage);
  
    userInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default action of the Enter key (e.g., form submission)
        sendMessage();
      }
    });
  
    function appendMessage(className, message) {
      const messageDiv = document.createElement('div');
      messageDiv.className = className;
      messageDiv.textContent = message;
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  
    function typeMessage(className, message) {
      const messageDiv = document.createElement('div');
      messageDiv.className = className;
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
      let index = 0;
      const typingSpeed = 30; // Time delay between characters (ms)
      
      function typeWriter() {
        if (index < message.length) {
          messageDiv.textContent += message.charAt(index);
          index++;
          setTimeout(typeWriter, typingSpeed);
        } else {
          // Ensure the message is fully displayed
          messageDiv.textContent = message;
        }
      }
      
      typeWriter();
    }
  });