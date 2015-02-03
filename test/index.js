var assert      = require('assert');
var Client      = require('go-fetch');
var auth        = require('..');
var parseBody   = require('go-fetch-body-parser');
var contentType = require('go-fetch-content-type');

describe('go-fetch-auth', function() {

	it('should set the header in the correct format', function(done) {

		var
			request   = Client().get('http://localhost/'),
			response  = new Client.Request(),
			event     = new Client.Event({
				name:     'before',
				request:  request,
				response: response
			})
		;

		Client()
			.use(auth('steve.jobs', 'l33tH@ck3r'))
			.emit(event, function(error, event) {

				var
					header    = (new Buffer(event.request.getHeader('Authorization').substr(6), 'base64').toString()),
					username  = header.split(':')[0],
					password  = header.split(':')[1]
				;

				assert.equal('steve.jobs', username);
				assert.equal('l33tH@ck3r', password);

				done(error)
			})
		;

	});

	it('should authenticate against an online public test service (assuming connected to the internet)', function(done) {
		this.timeout(10000);

		Client()
			.use(auth('steve.jobs', 'l33tH@ck3r'))
			.use(contentType)
			.use(parseBody.json())
			.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r', function(error, response) {
				assert.equal(response.getStatus(), 200);
				var json = response.getBody();
				assert.equal(json.authenticated, true);
				assert.equal(json.user, 'steve.jobs');
				done(error)
			})
		;

	});

});
