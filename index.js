// Get form elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

const toSignup = document.getElementById("to-signup");
const toLogin = document.getElementById("to-login");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

let loginDisclaimer = document.getElementById("disclaimer-login");
let passwordLogin = document.getElementById("disclaimer-passowrd-login");

let signUpDisclaimer = document.getElementById("disclaimer-signUp");
let disclaimerpasswordSignUp = document.getElementById("disclaimer-password-signUp");

let passwordErrorMessage = "Password Should be atleast 8 characters";
let disclaimerName = document.getElementById("disclaimer-name");

const confirmPassword = document.getElementById("confirm-password");
let disclaimerConfirmPassword = document.getElementById("disclaimer-confirm-password");
let SignedInAlert = document.getElementById("SignedIn-Alert");
let loginAlert = document.getElementById("login-alert");
let emailAlreadyExistsError = document.getElementById("emailAlreadyExistsError");

console.clear();
// JS
const users = JSON.parse(localStorage.getItem("users")) || [];

toSignup.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});
toLogin.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});


const CreateUser = (e) => {
  e.preventDefault();

  let hasError = false; // Ensure hasError is properly scoped

  // Name validation
  if (!signupName.value) {
    disclaimerName.textContent = "Please enter your name";
    hasError = true;
  } else {
    disclaimerName.textContent = "";
  }

  // Email validation
  if (!signupEmail.value) {
    signUpDisclaimer.textContent = "Email is required!";
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.value)) {
    signUpDisclaimer.textContent = "Email is invalid.";
    hasError = true;
  } else {
    signUpDisclaimer.textContent = "";
  }

  // Password validation
  if (!signupPassword.value) {
    disclaimerpasswordSignUp.textContent = "Please enter your password";
    hasError = true;
  } else if (signupPassword.value.length < 8) {
    disclaimerpasswordSignUp.textContent = "Password must be at least 8 characters";
    hasError = true;
  } else {
    disclaimerpasswordSignUp.textContent = "";
  }

  // Confirm Password validation
  if (!confirmPassword.value) {
    disclaimerConfirmPassword.textContent = "Please confirm your password";
    hasError = true;
  } else if (confirmPassword.value !== signupPassword.value) {
    disclaimerConfirmPassword.textContent = "Confirm password is incorrect!";
    hasError = true;
  } else {
    disclaimerConfirmPassword.textContent = "";
  }



  if (hasError) {
    return;
  }

  const randomID = Math.random().toString(36).substr(2, 9) + "-" + Date.now();
 
  const user = {
    id: randomID,
    username: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
   
  const existUser = users.find((user)=> user.email == signupEmail.value)

  
  
  if(existUser){
    emailAlreadyExistsError.classList.remove("hidden")
    setTimeout(() => {
      emailAlreadyExistsError.classList.add("hidden")
    }, 3000);
    return
  }


  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);

  
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  confirmPassword.value = "";

  SignedInAlert.classList.remove("hidden");
  setTimeout(() => {
    SignedInAlert.classList.add("hidden");
  }, 3000);
 
  
};

// USER LOGIN
// const login = (e) => {
//   e.preventDefault();

//   const email = loginEmail.value
//   const password = loginPassword.value

//   let hasError = false;
//   if (!loginEmail.value) {
//     loginDisclaimer.textContent = "Email is required!";
//     hasError = true;
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.value)) {
//     loginDisclaimer.textContent = "Email is invalid.";
//     hasError = true;
//   } else {
//     loginDisclaimer.textContent = "";
//     hasError = false;
//   }

  
//   if(!password){
//     passwordLogin.textContent = "Please enter your password";
//   }
//   else if (password.length < 8) {
//     passwordLogin.textContent = passwordErrorMessage;
//   } 
//   else {
//     passwordLogin.textContent = "";
   
//   }

//   console.log(email,password,"email and passwrod");

//   const findUser = users.find((user)=>user.email == email)
//   console.log(findUser);
//   if(!findUser) {
//     loginAlert.classList.remove("hidden")
//     setTimeout(() => {
//       loginAlert.classList.add("hidden")
//     }, 3000); 
//     return
//   } 
 
//   localStorage.setItem("loggedInUser", JSON.stringify(findUser)); // Store session
//   window.location.href = "/home.html"
 
//   const authToken = Math.random().toString(36).substr(2) + Date.now().toString(36);

//   // Store user and token in localStorage
//   localStorage.setItem("loggedInUser", JSON.stringify(findUser));
//   localStorage.setItem("authToken", authToken);

//   // Redirect to home page
//   window.location.href = "/home.html";
// };
// const authToken = localStorage.getItem("authToken");

// if (!authToken) {
//   // Redirect to login page if no token is found
//   window.location.href = "/home.html";
// }

const login = (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  let hasError = false;

  // ✅ Email Validation
  if (!email) {
    loginDisclaimer.textContent = "Email is required!";
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    loginDisclaimer.textContent = "Email is invalid.";
    hasError = true;
  } else {
    loginDisclaimer.textContent = "";
  }

  // ✅ Password Validation
  if (!password) {
    passwordLogin.textContent = "Please enter your password";
    hasError = true;
  } else if (password.length < 8) {
    passwordLogin.textContent = "Password must be at least 8 characters";
    hasError = true;
  } else {
    passwordLogin.textContent = "";
  }

  // ✅ Stop execution if validation fails
  if (hasError) return;

  console.log(email, password, "email and password");

  // ✅ Find user in database
  const findUser = users.find((user) => user.email === email);
  console.log(findUser);

  if (!findUser) {
    loginAlert.classList.remove("hidden");
    setTimeout(() => {
      loginAlert.classList.add("hidden");
    }, 3000);
    return;
  }

  // ✅ Generate a unique authentication token
  const authToken = Math.random().toString(36).substr(2) + Date.now().toString(36);

  // ✅ Store user and token in localStorage
  localStorage.setItem("loggedInUser", JSON.stringify(findUser));
  localStorage.setItem("authToken", authToken);

  // ✅ Redirect to home page
  window.location.href = "/home.html";
};

// ✅ Check authentication on page load
const authToken = localStorage.getItem("authToken");

if (!authToken) {
  // Redirect to login page if no token is found
  window.location.href = "/index.html";
}


// ADD EVENTLISTENERS
signupBtn.addEventListener("click", CreateUser);
loginBtn.addEventListener("click", login);
