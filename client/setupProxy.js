const { createProxyMiddleware } = require('http-proxy-middleware');

const WEBSOCKET_API = process.env.WEBSOCKET_API;

const wsProxy = createProxyMiddleware({
    target: WEBSOCKET_API,
    changeOrigin: true,
    ws: true,
  })

module.exports = function(app) {
    app.get('/chat', wsProxy);
};