# go-fetch-auth

[![Build Status](https://travis-ci.org/go-fetch-js/auth.svg?branch=master)](https://travis-ci.org/go-fetch-js/auth)

Basic HTTP authentication.

## Installation

    npm install --save go-fetch-auth
    
## Usage

```javascript
const Client = require('go-fetch');
const auth = require('go-fetch-auth');

new Client()
  .use(auth('steve.jobs', 'l33tH@ck3r'))
  .get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r')
    .then(res => {
      console.log(res.status);
      return res.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err.stack))
;

```

