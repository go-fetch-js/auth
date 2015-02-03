
/**
 * Basic HTTP authentication.
 *  - only supports the `basic` method at the moment - feel free to submit a PR
 * @param   {string} username
 * @param   {string} password
 * @returns {function(Client)}
 */
module.exports = function(username, password) {
	return function(client) {
		client.on('before', function(event) {

			event.request.setHeader(
				'Authorization',
				'Basic '+(new Buffer(username+':'+password)).toString('base64')
			);

		});

	};
};