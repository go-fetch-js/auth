
/**
 * Basic HTTP authentication.
 *  - only supports the `basic` method at the moment - feel free to submit a PR
 * @param   {string} username
 * @param   {string} password
 * @returns {function(Client)}
 */
module.exports = function(username, password) {
	return client => client.before((req, next) => {
    req.headers['Authorization'] = 'Basic '+(new Buffer(username+':'+password)).toString('base64');
    next(null, req);
  });
};
