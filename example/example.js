'use strict';
const Client = require('go-fetch');
const auth = require('..');

new Client()
	.use(auth.basic('steve.jobs', 'l33tH@ck3r'))
	.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r')
    .then(res => {
      console.log(res.status);
      return res.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err.stack))
;
