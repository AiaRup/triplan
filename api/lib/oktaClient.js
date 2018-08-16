const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-497398.oktapreview.com',
  token: '00YabjrlNxpXmEaH6jeUorS5y5OPZUrYFIqd4Mljs9'
});

module.exports = client;