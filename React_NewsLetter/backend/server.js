var restify = require('restify');
var server = restify.createServer();
var corsMiddleware = require('restify-cors-middleware');
var request = require('request');
require('dotenv').config()
function subscribe(req, res, next) {
  var email = req.body.email; //Email entered
  var dataCenter = process.env.DATA_CENTER;
  var apiKey = process.env.API_KEY;
  var listID = process.env.LIST_ID;
  //Request settings
  var options = {
    url: `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listID}/members`,
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Authorization': `apikey ${apiKey}` },
    body: JSON.stringify({ email_address: email, status: 'subscribed' })
  }
  // Make a simple POST call to MailChimp
  request(options, function (error, response, body) {
    try {
      var respObj = {}; //Initial response object
      if (response.statusCode === 200) {
        respObj = { success: `Subscribed using ${email}!`, message: JSON.parse(response.body) };
      } else {
        respObj = { error: `Error trying to subscribe ${email}. Please try again.`, message: JSON.parse(response.body) };
      }
      res.send(respObj);
    } catch (err) {
      var respErrorObj = { error: 'There was an error with your request', message: err.message };
      res.send(respErrorObj);
    }
  });
  next();
}

//Enable CORS Middleware
var cors = corsMiddleware({
  origins: ['https://petc-newsletter.web.app/']
});

server.use(restify.plugins.bodyParser());

//Use CORS...
server.pre(cors.preflight);
server.use(cors.actual);

//Subscribe endpoint
server.post('/subscribe', subscribe);

const PORT = process.env.PORT || 8080;

server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});