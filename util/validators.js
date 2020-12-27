// Contains code to validate information such as login data

module.exports.validateRegisterInput = (
    // data to be validated:
    username, 
    email,
    password,
    confirmPassword
) => {
    // Empty object for errors
    const errors = {};

    // If username is empty, return an error called 'username' that specifies that the field cannot be empty
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }

    // If email is empty, return an error called 'email' that specifies that the field cannot be empty
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
  } else {
    // Regular expression to ensure that an email type format is used
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    // If the email field doesn't match the format defined by the regular expression, return an error called 'email' that specifies the field must be a valid email address
    if(!email.match(regEx)){
        errors.email = 'Email must be a valid email address';
    }
  }

    // If password is empty, return an error that specifies that the password field cannot be empty
    if(password === ''){
    errors.password = 'Password must not be empty'

    // If the password in password field does not match the password in the confirmPassword field, return an error that specifies that the passwords in their respective fields must match
  } else if(password !== confirmPassword){
    errors.confirmPassword = 'Passwords must match';
  }

  // Return any errors if they are caught by validation (as long as there is one)
  return {
    errors,
    valid: Object.keys(errors).length < 1
    }
};


// Function to validate login data
module.exports.validateLoginInput = (username, password) => {

    // Empty object for errors
    const errors = {};

    // Validation to ensure that someone cannot attempt to log in with a blank username
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }

    // Validation to ensure that someone cannot attempt to log in with a blank password
    if(password.trim() === ''){
        errors.username = 'Password must not be empty';
    }

    // Return any errors if they are caught by validation (as long as there is one)
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};