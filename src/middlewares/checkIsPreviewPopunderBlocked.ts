import ipDetector from '../services/ipDetector/index';

module.exports = (req, res, next) => {
  const countryCode = ipDetector.getCountryCode(ipDetector.getUserIpFromRequest(req));

  if (countryCode === 'BR') {
    req.isPreviewPopunderBlocked = true;
  }

  next();
};
