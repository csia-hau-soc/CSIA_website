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

// Function to display member details
function displayMemberDetails(member) {
    console.log('Displaying member details:', member); // Debugging

    // Hide any previous error message
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.classList.add('hidden');
    errorMessageElement.textContent = '';

    // Show the member details
    const memberDetails = document.getElementById('member-details');
    memberDetails.classList.remove('hidden');
    document.getElementById('member-name').textContent = `${member.Name} (${member.Codename})`;
    document.getElementById('member-role').textContent = `Role: ${member.Role}`;
}

// Function to display an error message if the search fails
function displayErrorMessage(input) {
    console.log('Displaying error message:', input); // Debugging

    // Hide member details
    document.getElementById('member-details').classList.add('hidden');

    // Show error message with user's input
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = `"${input}" is not a member.`;
    errorMessageElement.classList.remove('hidden');
}


// Blog section
document.addEventListener("DOMContentLoaded", function () {
    const readMoreButtons = document.querySelectorAll(".read-more");
  
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const blogPost = button.closest(".blog-post");
        const extraContent = blogPost.querySelector(".extra-content");
  
        // Close all other blog posts
        document.querySelectorAll(".extra-content").forEach((content) => {
          if (content !== extraContent) {
            content.classList.remove("visible");
            const otherPost = content.closest(".blog-post");
            const otherButton = otherPost.querySelector(".read-more");
            otherButton.textContent = "Read More";
          }
        });
  
        // Toggle the current blog post
        if (extraContent.classList.contains("visible")) {
          extraContent.classList.remove("visible");
          button.textContent = "Read More";
        } else {
          extraContent.classList.add("visible");
          button.textContent = "Read Less";
        }
      });
    });
  });
  
  

  
  

  
  
  
  
  
  
  
  
  
  
  
