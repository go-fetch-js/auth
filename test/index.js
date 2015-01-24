var assert      = require('assert');
var HttpClient  = require('go-fetch');
var auth        = require('..');

describe('go-fetch-auth', function() {

	it('should set the header in the correct format', function(done) {

		var
			request = HttpClient().get('http://localhost/'),
			response = null
		;

		HttpClient()
			.use(auth('steve.jobs', 'l33tH@ck3r'))
			.emit('before', request, response, function(error, request, response) {

				var
					header    = (new Buffer(request.getHeader('Authorization').substr(6), 'base64').toString()),
					username  = header.split(':')[0],
					password  = header.split(':')[1]
				;

				assert.equal('steve.jobs', username);
				assert.equal('l33tH@ck3r', password);

				done(error)
			})
		;

	});

	it('should work against a public test service online (assuming connection)', function(done) {
		this.timeout(10000);

		HttpClient()
			.use(auth('steve.jobs', 'l33tH@ck3r'))
			.use(HttpClient.plugins.body())
			.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r', function(error, response) {
				var json = JSON.parse(response.getBody());
				assert.equal(response.getStatus(), 200);
				assert.equal(json.authenticated, true);
				assert.equal(json.user, 'steve.jobs');
				done(error)
			})
		;

	});

});
