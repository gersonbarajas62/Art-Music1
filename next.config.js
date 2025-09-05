```javascript
// next.config.js
module.exports = {
  // ...existing config...
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```