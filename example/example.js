var HttpClient = require('go-fetch');
var auth = require('..');
var parseBody   = require('go-fetch-body-parser');
var contentType = require('go-fetch-content-type');

HttpClient()
	.use(auth('steve.jobs', 'l33tH@ck3r'))
	.use(contentType)
	.use(parseBody.json())
	.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r', function(error, response) {
		console.log(arguments);
		console.log(error, response.getStatus(), response.getBody());
	})
;
