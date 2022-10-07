const path = require('path');
const MMDBReader = require('mmdb-reader');

const reader = new MMDBReader(path.join(__dirname, '/geodb/GeoIP2-Country.mmdb'));

module.exports = {
  getUserIpFromRequest(req) {
    const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.connection.remoteAddress || req.socket.remoteAddress || '';
    return ip.replace(/^::ffff:/, '');
  },

  getCountryCode(userIp) {
    const ipInfo = userIp !== undefined ? reader.lookup(userIp) : null;
    if (ipInfo && ipInfo.country && ipInfo.country.iso_code) {
      return ipInfo.country.iso_code;
    }
    return null;
  },
};
