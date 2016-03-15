const expect = require('chai').expect;
const sinon = require('sinon');
var Client = require('go-fetch');
var json = require('go-fetch-json');
var auth = require('..');
const Request = Client.Request;

describe('go-fetch-auth', () => {

  describe('basic()', () => {

    it('should call next() when complete', () => {

      const client = {};
      client.before = sinon.stub().returns(client);
      auth.basic('steve.jobs', 'l33tH@ck3r')(client);

      const req = new Request();
      const next = sinon.spy();
      client.before.callArgWith(0, req, next);

      expect(next.calledWith(null, req)).to.be.true;

    });

    it('should set the header with the username and password encoded', function() {

      const client = {};
      client.before = sinon.stub().returns(client);
      auth.basic('steve.jobs', 'l33tH@ck3r')(client);

      const req = new Request();
      const next = sinon.spy();
      client.before.callArgWith(0, req, next);

      const
        header = (new Buffer(req.headers['Authorization'].substr(6), 'base64').toString()),
        username = header.split(':')[0],
        password = header.split(':')[1]
      ;

      expect(username).to.be.equal('steve.jobs');
      expect(password).to.be.equal('l33tH@ck3r');

    });

  });

  describe('bearer()', () => {

    it('should call next() when complete', () => {

      const client = {};
      client.before = sinon.stub().returns(client);
      auth.bearer('abcdefg')(client);

      const req = new Request();
      const next = sinon.spy();
      client.before.callArgWith(0, req, next);

      expect(next.calledWith(null, req)).to.be.true;

    });

    it('should set the header with the token', function() {

      const client = {};
      client.before = sinon.stub().returns(client);
      auth.bearer('abcdefg')(client);

      const req = new Request();
      const next = sinon.spy();
      client.before.callArgWith(0, req, next);

      const
        header = (new Buffer(req.headers['Authorization'].substr(7)).toString())
      ;

      expect(header).to.be.equal('abcdefg');

    });

  });


});
