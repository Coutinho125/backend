const User = require('../models/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.createUser = async (req, res) => {
    console.log("inside create user")

    const {username, email, password, userType} = req.body;

    try{
        const existingAccount = await User.findOne({email});
        if(!!existingAccount) {
            console.log(`Account with email ${email} already exists`)
            res.status(201).json({ message: 'User already exists',username: username });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hashedPassword, userType });
        await newUser.save();
        console.log(newUser);
        console.log(newUser._id);
        res.status(201).json({ message: 'User created successfully' , username: username,  userId: newUser._id,  userType: userType});
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginUser = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log("found user while logging in ");
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.json({ message: 'Login successful' , username: user.username, userType: user.userType, userId: user._id});
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const { userIds } = req.query;
        const users = await User.find({ _id: { $in: userIds } }).select('username email');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        console.log("user found")
        console.log(user)
        return user
    } catch (error) {
        console.error('Error deleting property:', error);
        throw new Error(error)
    }
}