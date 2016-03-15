const expect = require('chai').expect;
const sinon = require('sinon');
var Client = require('go-fetch');
var json = require('go-fetch-json');
var auth = require('..');
const Request = Client.Request;

describe('go-fetch-auth', function() {
  this.timeout(10000);

  describe('basic()', () => {

    it('should get a JSON response', () => {

      return new Client()
        .use(auth.basic('steve.jobs', 'l33tH@ck3r'))
        .use(json())
        .get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r')
        .then(res => {
          expect(res.status).to.be.equal(200);
          return res.json();
        })
        .then(json => {
          expect(json).to.have.property('authenticated').to.be.true;
          expect(json).to.have.property('user').to.be.equal('steve.jobs');
        })
        ;

    });

  });

});
