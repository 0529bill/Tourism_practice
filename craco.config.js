const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Api': path.resolve(__dirname, 'src/api/'),
      '@Components': path.resolve(__dirname, 'src/components/'),
    },
  },
};
