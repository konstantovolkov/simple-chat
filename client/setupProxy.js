const { createProxyMiddleware } = require('http-proxy-middleware');

const wsProxy = createProxyMiddleware({
    target: 'http://backend:8080',
    changeOrigin: true,
    ws: true,
  })

module.exports = function(app) {
    app.get('/chat', wsProxy);
};