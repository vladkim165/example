import ipDetector from '../services/ipDetector/index';

const page = ({ text }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${text}</title>
    <style type="text/css">
      @media (prefers-color-scheme: dark) {
        body{ background: black; color: white; }
      }
    </style>
  </head>
  <body style="display: flex;">
    <div style="max-width: 980px; margin: auto">
      <p>${text}</p>
    </div>
  </body>
</html>
`;

const COUNTRY_NAME = {
  US: 'United States',
  GB: 'United Kingdom',
  RU: 'Российской Федерации',
};

const blockedCountries = process.env.FULLY_BLOCKED_COUNTRIES
  ? process.env.FULLY_BLOCKED_COUNTRIES.split(',')
  : [];
const isGoogleBot = userAgent => userAgent.includes('Googlebot') || userAgent.includes('Google-Site-Verification');

module.exports = (req, res, next) => {
  const countryCode = ipDetector.getCountryCode(ipDetector.getUserIpFromRequest(req));
  const allowRequest =
    isGoogleBot(req.headers['user-agent'] || '') || !blockedCountries.includes(countryCode);

  if (allowRequest) {
    next();
    return;
  }

  const text =
    countryCode === 'RU'
      ? `Этот сервис навсегда недоступен в ${COUNTRY_NAME[countryCode]}`
      : `This service is permanently unavailable in ${COUNTRY_NAME[countryCode]}`;

  res.end(
    page({
      text,
    }),
  );
};
