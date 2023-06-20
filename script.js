function createAccount(username, password, email, dateOfBirth, phoneNumber, address, city, pincode) {
  const user = {
    username: username,
    password: password,
    email: email,
    dateOfBirth: dateOfBirth,
    phoneNumber: phoneNumber,
    address: address,
    city: city,
    pincode: pincode
    // Add other fields if needed
  };
  // Retrieve existing accounts from localStorage
  const existingAccounts = localStorage.getItem('accounts');
  let accounts = [];

  if (existingAccounts) {
    accounts = JSON.parse(existingAccounts);
  }

  // Check if username already exists
  const userExists = accounts.find(account => account.username === username);
  if (userExists) {
    document.getElementById("createAccountMessage").textContent = "Username already exists. Please choose a different username.";
  } else {
    accounts.push(user);

    // Store updated accounts in localStorage
    localStorage.setItem('accounts', JSON.stringify(accounts));

    document.getElementById("createAccountMessage").textContent = "Account created successfully. You can now log in.";
    document.getElementById("createAccountForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
}

// Function to handle form submission for creating a new account
document.getElementById("createAccountForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;
  const newEmail = document.getElementById("newEmail").value;
  const newDateOfBirth = document.getElementById("newDateOfBirth").value;
  const newPhoneNumber = document.getElementById("newPhoneNumber").value;
  const newAddress = document.getElementById("newAddress").value;
  const newCity = document.getElementById("newCity").value;
  const newPincode = document.getElementById("newPincode").value;
  // Retrieve other fields if needed

  

  createAccount(newUsername, newPassword, newEmail, newDateOfBirth, newPhoneNumber, newAddress, newCity, newPincode);
});







document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Verify username and password
  const usernameRegex = /^#[0-9][z]{2}[0-9]#$/;
  const passwordRegex = /^[!@#$%^&*]{8}$/;
  const existingAccounts = localStorage.getItem('accounts');
  
  if (usernameRegex.test(username) && passwordRegex.test(password)) {
    // Set session variable to indicate user is logged in
    sessionStorage.setItem('isLoggedIn', 'true');

    // Redirect to admin.html
    window.location.href = 'admin.html';
  } else if (existingAccounts) {
    const accounts = JSON.parse(existingAccounts);

    // Check if username and password match
    const user = accounts.find(
      (account) =>
        account.username === username && account.password === password
    );

    if (user) {
      // Set session variable to indicate user is logged in
      sessionStorage.setItem('isLoggedIn', 'true');

      // Store user details in sessionStorage
      sessionStorage.setItem('userDetails', JSON.stringify(user));

      // Redirect to dashboard.html
      window.location.href = 'dashboard.html';
    } else {
      // Display error message for invalid username or password
      document.getElementById('message').textContent =
        'Invalid username or password.';
    }
  } else {
    // Display error message for no existing accounts
    document.getElementById("message").textContent = "No accounts found. Please create an account first.";
  }
});




// // Function to handle form submission for logging in
// document.getElementById("loginForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   // Retrieve accounts from localStorage
//   const existingAccounts = localStorage.getItem('accounts');
//   if (existingAccounts) {
//     const accounts = JSON.parse(existingAccounts);

//     // Check if username and password match
//     const user = accounts.find(
//       (account) =>
//         account.username === username && account.password === password
//     );
//     if (user) {
//       // Set session variable to indicate user is logged in
//       sessionStorage.setItem('isLoggedIn', 'true');

//       // Store user details in sessionStorage
//       sessionStorage.setItem('userDetails', JSON.stringify(user));

//       // Redirect to dashboard.html
//       window.location.href = 'dashboard.html';
//     } else {
//       // Display error message
//       document.getElementById('message').textContent =
//         'Invalid username or password.';
//     }
//   } else {
//     document.getElementById("message").textContent = "No accounts found. Please create an account first.";
//   }
// });


// Function to show create account form when the link is clicked
document.getElementById("createAccountLink").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("createAccountForm").style.display = "block";
});

// Add event listener to Pincode field
document.getElementById("newPincode").addEventListener("input", function() {
  const pincodeInput = this.value;
  this.value = pincodeInput.replace(/\D/g, '').slice(0, 6);
});



document.getElementById("loginLink").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("createAccountForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

document.getElementById("loginLink2").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("createAccountForm").style.display = "none";
  document.getElementById("forgotAccountForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// forgot user 
// Function to handle form submission for forgot username or password
document.getElementById("forgotAccountLink").addEventListener("click", function(e) {
  e.preventDefault();
  
  // Hide the login form and create account form
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("createAccountForm").style.display = "none";
  
  // Show the forgot account form
  document.getElementById("forgotAccountForm").style.display = "block";
});

// Function to handle form submission for retrieving username or password
document.getElementById("forgotAccountForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Retrieve user inputs
  const dateOfBirth = document.getElementById("forgotDateOfBirth").value;
  const email = document.getElementById("forgotEmail").value;

  // Retrieve accounts from localStorage
  const existingAccounts = localStorage.getItem('accounts');
  if (existingAccounts) {
    const accounts = JSON.parse(existingAccounts);

    // Check if the provided date of birth and email match any registered account
    const user = accounts.find(
      (account) =>
        account.dateOfBirth === dateOfBirth && account.email === email
    );

    if (user) {
      // Display the retrieved username and password
      document.getElementById("forgotAccountMessage").innerHTML =
        "Your username: " +'<span style="color: red;">'+ user.username + '</span>'+"<br> Your password: " + '<span style="color: red;">'+ user.password+ '</span>';
    } else {
      // Display error message for incorrect or non-existent account details
      document.getElementById("forgotAccountMessage").textContent =
        "This account does not exist or the provided details are incorrect.";
    }
  } else {
    // Display error message if no accounts exist
    document.getElementById("forgotAccountMessage").textContent =
      "No accounts found. Please create an account first.";
  }
});
