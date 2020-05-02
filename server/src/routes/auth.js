const auth = require('koa-router')().prefix('/auth');
const authCtrl = require('../controller/auth.controller');
const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`
}


auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.register);
auth.post('/logout', authCtrl.logout);
auth.put('/', handler);
auth.patch('/', handler);

module.exports = auth;