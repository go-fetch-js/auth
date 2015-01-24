# go-fetch-auth

Basic HTTP authentication plugin for [go-fetch](https://www.npmjs.com/package/go-fetch).

## Installation

    npm install --save go-fetch-auth
    
## Usage

    var HttpClient = require('go-fetch');
    var auth = require('go-fetch-auth');
    
    HttpClient()
    	.use(auth('steve.jobs', 'l33tH@ck3r'))
    	.use(HttpClient.plugins.body())
    	.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r', function(error, response) {
    		console.log(error, response.getStatus(), JSON.parse(response.getBody()));
    	})
    ;

## API

## Methods

### auth(username, password)

Create an instance of the authentication plugin with the specified username and passsword.

## License

The MIT License (MIT)

Copyright (c) 2014 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.