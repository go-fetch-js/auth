'use strict';

module.exports = {};

/**
 * Basic HTTP authentication
 * @param   {string} username
 * @param   {string} password
 * @returns {function(Client)}
 */
module.exports.basic = function(username, password) {
	return client => client.before((req, next) => {
    req.headers['Authorization'] = `Basic ${(new Buffer(username+':'+password)).toString('base64')}`;
    next(null, req);
  });
};

/**
 * Bearer HTTP authentication
 * @param   {string} token
 * @returns {function(Client)}
 */
module.exports.bearer = function(token) {
  return client => client.before((req, next) => {
    req.headers['Authorization'] = `Bearer ${token}`;
    next(null, req);
  });
};
