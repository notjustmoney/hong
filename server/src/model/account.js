const mongoose = require('mongoose');
const { Schema } = mongoose;
const { generateToken } = require('../../lib/token');
const crypto = require('crypto');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username:  { type: String, required: [true, 'User name is required'] },
        thumbnail: { type: String, default: '/static/img/default_thumbnail.png' }
    },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] }, // this must hashing
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    gender: { type: String, enum: ['m', 'f', 'u'], default: 'u' },  // m: male, f: female, u: undefined
    productor: { type: Boolean, default: false }, // admin can update this field 
    postCount: { type: Number, default: 0 },
    admin: { type: Boolean, default: false },
    status: { type: String, enum: ['y', 'n', 'd'], default: 'y' },  // y: normal, n: sign out, d: denied
    createAt: { type: Date, default: Date.now }
}, {
    toObject : { virtuals: true }
});

Account.virtual('passwordConfirmation')
    .get(() => { return this._passwordConfirmation; })
    .set((value) => { this._passwordConfirmation=value; });

Account.virtual('originPassword')
    .get(() => { return this._originPassword; })
    .set((value) => { this._originPassword = value; });

Account.virtuals('newPassword')
    .get(() => { return this-_newPassword; })
    .set((value) => { this._newPassword = value; });

// static method of model 
Account.statics.findByUsername = function(username) {
    // this indicate Account's model
    return this.findOne({'profile.username': username}).exec();
};

Account.statics.findByEmail = function(email) {
    return this.findOne({ email }).exec();
}

Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // find username or email
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Account.statics.localRegister = function({ username, email, password }) {
    const account = new this({
        profile: {
            username
        },
        email,
        password: hash(password)
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    // compare hash password param to stored hash password
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function() {
    const payload = {
        _id: this._id,
        profile: this.profile
    };
    return generateToken(payload, 'account');
}

module.exports = mongoose.model('Account', Account);