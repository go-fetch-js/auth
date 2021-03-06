# go-fetch-auth

[![Build Status](https://travis-ci.org/go-fetch-js/auth.svg?branch=master)](https://travis-ci.org/go-fetch-js/auth)

A `go-fetch` plugin for authenticating requests.

## Installation

    npm install --save go-fetch-auth
    
## Usage

```javascript
const Client = require('go-fetch');
const auth = require('go-fetch-auth');

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

```

## API

```javascript
auth.basic(username, password)
```

Authenticate each request using the `Basic` scheme for HTTP authentication.

**Parameters:**

- `username : string` Required. The username.
- `password : string` Required. The password.

**Returns:**

A plugin instance.

```javascript
auth.bearer(token)
```

Authenticate each request using the `Bearer` scheme for HTTP authentication.

**Parameters:**

- `token : string` Required. The token.

**Returns:**

A plugin instance.