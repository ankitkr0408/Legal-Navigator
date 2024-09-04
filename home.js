
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  
  document.querySelector('.chatbot-icon').addEventListener('click', function() {
    alert('Chatbot icon clicked! This is where the chatbot would open.');
  });
  
 
  document.querySelectorAll('.section01').forEach(section => {
    section.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
  

  const style = document.createElement('style');
  style.textContent = `
    .section01.expanded {
      background-color: #e0e0e0;
      max-height: 1000px; /* Adjust as needed */
      overflow: auto;
    }
  `;
  document.head.appendChild(style);
  

  document.querySelector('form')?.addEventListener('submit', function(e) {
    const inputs = this.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = '';
      }
    });
    if (!valid) {
      e.preventDefault();
      alert('Please fill out all required fields.');
    }
  });
  
  
  document.querySelector('#about-department').addEventListener('click', function() {
    if (!this.classList.contains('loaded')) {
      const moreContent = document.createElement('div');
      moreContent.innerHTML = `
        <h3>Additional Information</h3>
        <p>This is additional content loaded dynamically when you click on the 'About Department' section.</p>
      `;
      this.appendChild(moreContent);
      this.classList.add('loaded');
    }
  });
  

  document.querySelectorAll('.insight_box').forEach(box => {
    box.addEventListener('click', function() {
      const title = this.querySelector('.subtitle').textContent;
      alert(`You clicked on: ${title}`);
    });
  });
  
