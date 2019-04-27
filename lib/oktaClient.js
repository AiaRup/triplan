const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  // orgUrl: 'https://dev-497398.oktapreview.com',
  // token: '00YabjrlNxpXmEaH6jeUorS5y5OPZUrYFIqd4Mljs9'
  orgUrl: 'https://dev-789825.okta.com',
  token: '00GROH7P6k51X9fpQNx1a5ubPW8bpcfNCGNq7HnHkw',
});

module.exports = client;
