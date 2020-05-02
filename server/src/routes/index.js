const router = require('koa-router')();
const auth = require('./auth');

router.use(auth.routes(), auth.allowedMethods());

router.get('/index', (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});





module.exports = router;