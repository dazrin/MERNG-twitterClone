const bcrypt = require('bcryptjs'); // Dependancy to encrypt sensitive data
const jwt = require('jsonwebtoken'); // Dependancy to create a unique token
const { UserInputError } = require('apollo-server'); // 

const { validateRegisterInput, validateLoginInput } = require('../../util/validators'); // Import validation methods
const { SECRET_KEY } = require('../../config'); // Sensitive data 
const User = require('../../models/User'); // User Schema 

// Function to generate a new user token
function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

// Code to handle login functionality
module.exports = {
    // Mutation because it is changing the database
    Mutation: {

        // An asynchronous function to handle login functionality
        async login(_, { username, password }){

            // Validate login data
            const {errors, valid} = validateLoginInput(username, password);

            // If login data is not valid, throw error created by validator
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            // Finds a user in the database that matches the username field inputted
            const user = await User.findOne({ username });

            // 
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
        _,
        {
         registerInput : { username, email, password, confirmPassword }
        },
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            // Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        usermame: 'This username is taken'
                    }
                })
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
    }
};