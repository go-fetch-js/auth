var HttpClient = require('go-fetch');
var auth = require('..');

HttpClient()
	.use(auth('steve.jobs', 'l33tH@ck3r'))
	.use(HttpClient.plugins.body())
	.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r', function(error, response) {
		console.log(error, response.getStatus(), JSON.parse(response.getBody()));
	})
;
