const auth = require('koa-router')()

auth.get('/test', (ctx, next) => {
    ctx.body = 'GET' + ctx.request.path;
})

module.exports = auth;