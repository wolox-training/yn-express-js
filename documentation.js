const dictum = require('dictum.js');

// For every endpoints
dictum.document({
  description: 'Some description for the given endpoint',
  endpoint: '/some/endpoint',
  method: 'GET',
  resource: 'My Resource'
});
