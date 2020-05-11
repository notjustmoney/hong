const mongoose = require('mongoose');
const { Schema } = mongoose;
const { generateToken } = require('../../lib/token');
const crypto = require('crypto');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: { type: String, required: [true, 'User name is required'], trim: true },
        nickname: { type: String, required: [true, 'Nick name is required'], trim: true },
        thumbnail: { type: String, default: '/static/img/default_thumbnail.png' }
    },
    email: { type: String, required: [true, 'Email is required'], unique: true, trim: true },
    password: { type: String, required: [true, 'Password is required'], trim: true }, // this must hashing
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

Account.virtual('currentPassword')
    .get(() => { return this._currentPassword; })
    .set((value) => { this._currentPassword = value; });
    
Account.virtual('newPassword')
    .get(() => { return this-_newPassword; })
    .set((value) => { this._newPassword = value; });

Account.path('password').validate(function(value) {
    const account = this;

    // case: register
    if(account.isNew) {
        if(!account.passwordConfirmation) {
            account.invalidate('passwordConfirmation', 'Password Confirmation is required');
        } else if(account.password !== account.passwordConfirmation) {
            account.invalidate('passwordConfirmation', 'Password Confirmation does not matched');
        }
    }

    // case: update
    if(!account.isNew) {
        if(!account.currentPassword) {
            account.invalidate('currentPassword', 'Current Password is required');
        } else if(account.currentPassword !== account.originPassword) {
            account.invalidate('currentPassword', 'Current Password is invalid');
        }
        if(account.newPassword !== account.passwordConfirmation) {
            account.invalidate('passwordConfirmation', 'Passowrd Confirmation does not matched');
        }
    }
})

// static method of model 
Account.statics.findByUsername = function(username) {
    // this indicate Account's model
    return this.findOne({'profile.username': username}).exec();
};

Account.statics.findByEmail = function(email) {
    return this.findOne({ email }).exec();
}

Account.statics.findByNickname = function(nickname) {
    return this.findOne({ nickname }).exec();
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

Account.statics.localRegister = function({ username,nickname, email, password, passwordConfirmation }) {
    const account = new this({
        profile: {
            username,
            nickname
        },
        email,
        password: hash(password),
        passwordConfirmation: hash(passwordConfirmation)
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

Account.methods.isProductor = function() {
    return this.productor;
}

Account.methods.isAdmin = function() {
    return this.admin;
}

module.exports = mongoose.model('Account', Account);