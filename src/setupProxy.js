const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/debug', {
        target: 'https://www.easy-mock.com/mock/5ce34f3781db8b299f231911',
        changeOrigin:true,
        // pathRewrite: {
        //     "^/debug": "/"
        // }
    }))
}