import { baseUrl } from "./config/app";

const authProvider = {
  isAuthenticated: false,

  signin(username, password, callback) {
    fetch(baseUrl + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.success) {
        this.isAuthenticated = true;
        localStorage.setItem("token", data.token);
        callback(null); // Call the callback with no error
      } else {
        callback(data.message || 'Authentication failed'); // Call the callback with an error message
      }
    })
    .catch(error => {
      callback(error.message || 'An error occurred while signing in'); // Call the callback with an error message
    });
  },

  signout(callback) {
    this.isAuthenticated = false;
    localStorage.clear()
    callback(null); // Call the callback with no error
  },
};

export { authProvider };
