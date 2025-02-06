// Function to handle keypress event
function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchMember(); // Call the search function
    }
}

// Function to search for the member by codename or name
function searchMember() {
    // Get the search term entered by the user
    const searchTerm = document.getElementById('codename-input').value.trim().toLowerCase();
    console.log('Searching for:', searchTerm); // Debugging

    // Hide any previous error message
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.classList.add('hidden');
    errorMessageElement.textContent = ''; // Reset error message text

    // Hide previous member details
    document.getElementById('member-details').classList.add('hidden');

    // Fetch the members' data from the JSON file
    fetch('./members.json') // Ensure correct relative path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging

            // Ensure data structure matches expected format
            if (!data.members || !Array.isArray(data.members)) {
                throw new Error('Invalid data format in JSON.');
            }

            // Find the member whose codename or name matches
            const member = data.members.find(m => 
                m.Codename.toLowerCase() === searchTerm || 
                m.Name.toLowerCase() === searchTerm
            );
            console.log('Found member:', member); // Debugging

            // Check if a member was found
            if (member) {
                displayMemberDetails(member);
            } else {
                displayErrorMessage(searchTerm);
            }
        })
        .catch(error => {
            console.error('Error loading member data:', error); // Debugging
            displayErrorMessage(searchTerm);
        });
}

// Function to display a single member's details
function displayMemberDetails(member) {
  console.log('Displaying member details:', member); // Debugging

  const resultsContainer = document.getElementById('member-details');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Get the search term to highlight
  const searchTerm = document.getElementById('codename-input').value.trim();
  const highlightText = (text) => text.replace(
      new RegExp(searchTerm, 'gi'),
      match => `<span class="highlight">${match}</span>`
  );

  // Create the result card (WITHOUT IMAGE)
  const memberCard = document.createElement('div');
  memberCard.classList.add('member-card');

  memberCard.innerHTML = `
      <h3>${highlightText(member.Name)} <span class="codename">(${highlightText(member.Codename)})</span></h3>
      <p class="role">Role: ${member.Role}</p>
  `;

  resultsContainer.appendChild(memberCard);

  // Ensure the member details container is shown
  resultsContainer.style.display = 'block'; 
  resultsContainer.classList.remove('hidden'); 
  resultsContainer.classList.add('show');
}



// Function to display an error message inside the result card
function displayErrorMessage(input) {
  console.log('Displaying error message:', input); // Debugging

  const resultsContainer = document.getElementById('member-details');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Create error message card
  const errorCard = document.createElement('div');
  errorCard.classList.add('member-card', 'error-card');

  errorCard.innerHTML = `
      <h3 class="error-title">Member Not Found</h3>
      <p class="error-message">"${input}" does not match any registered member.</p>
  `;

  resultsContainer.appendChild(errorCard);

  // Ensure the member details container is visible
  resultsContainer.style.display = 'block';
  resultsContainer.classList.remove('hidden');
  resultsContainer.classList.add('show');
}




// Blog section
document.addEventListener('DOMContentLoaded', () => {
  const readMoreButtons = document.querySelectorAll('.read-more');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const article = button.closest('.blog-post');
      const extraContent = article.querySelector('.extra-content');

      // Toggle expanded view
      const isExpanded = article.classList.contains('expanded');
      article.classList.toggle('expanded', !isExpanded);
      overlay.classList.toggle('active', !isExpanded);
      document.body.classList.toggle('no-scroll', !isExpanded);

      // Toggle extra content visibility
      if (extraContent.classList.contains('hidden')) {
        extraContent.classList.remove('hidden');
        extraContent.classList.add('visible');
        button.textContent = 'Read Less';
      } else {
        extraContent.classList.remove('visible');
        extraContent.classList.add('hidden');
        button.textContent = 'Read More';
      }
    });
  });

  // Click outside to close expanded view
  overlay.addEventListener('click', () => {
    const expandedArticle = document.querySelector('.blog-post.expanded');
    if (expandedArticle) {
      expandedArticle.classList.remove('expanded');
      expandedArticle.querySelector('.extra-content').classList.add('hidden');
      expandedArticle.querySelector('.read-more').textContent = 'Read More';
    }
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('imageModal');
  if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
          modal.style.display = "none"; // Delayed hiding to prevent click issues
      }, 10); // Small delay to prevent immediate hiding
  }
});

function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const fullImage = document.getElementById('fullImage');

  if (modal && fullImage) {
      fullImage.src = imageSrc;
      modal.style.display = "flex"; // Use flex for better centering
      setTimeout(() => {
          modal.style.opacity = "1"; // Gradually fade in
      }, 50); // Short delay for smooth transition
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');

  if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
          modal.style.display = "none"; // Hide only after fade-out
      }, 300); // Matches CSS transition time
  }
}


// burger
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
      navLinks.classList.remove("active");
    }
  });
});



  

  
  

  
  
  
  
  
  
  
  
  
  
  
