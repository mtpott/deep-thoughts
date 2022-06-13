const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        //get all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        //get one thought
        thought: async(parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        //get all users
        users: async () => {
            return User.find()
                .select( '-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        //get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }
    }
};

//pass parent param above as a placeholder; this is so we can access the username argument from second param! use ternary operator in order to check if the username exists. if so, set params to obj with username key set to that value

module.exports = resolvers;