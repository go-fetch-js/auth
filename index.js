var HttpClient = require('go-fetch');

/**
 * HTTP Authentication plugin for the go-fetch client.
 *  - only supports the `basic` method at the moment - feel free to submit a PR
 * @param   {string} username
 * @param   {string} password
 * @returns {function(HttpClient)}
 */
module.exports = function(username, password) {
	return function(client) {
		client.on('before', function(request, response) {

			request.setHeader(
				'Authorization',
				'Basic '+(new Buffer(username+':'+password)).toString('base64')
			);

		});

	};
};