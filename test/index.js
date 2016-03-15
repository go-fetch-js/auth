const expect = require('chai').expect;
const sinon = require('sinon');
var Client = require('go-fetch');
var json = require('go-fetch-json');
var auth = require('..');
const Request = Client.Request;

describe('go-fetch-auth', function() {

  it('should call next()', () => {

    const client = {};
    client.before = sinon.stub().returns(client);
    auth('steve.jobs', 'l33tH@ck3r')(client);

    const req = new Request();
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    expect(next.calledWith(null, req)).to.be.true;

  });

	it('should set the header in the correct format', function() {

    const client = {};
    client.before = sinon.stub().returns(client);
    auth('steve.jobs', 'l33tH@ck3r')(client);

    const req = new Request();
    const next = sinon.spy();
    client.before.callArgWith(0, req, next);

    var
      header    = (new Buffer(req.headers['Authorization'].substr(6), 'base64').toString()),
      username  = header.split(':')[0],
      password  = header.split(':')[1]
    ;

    expect(username).to.be.equal('steve.jobs');
    expect(password).to.be.equal('l33tH@ck3r');

  });

	it('should authenticate against an online public test service (assuming connected to the internet)', () => {
		this.timeout(10000);

		return new Client()
			.use(auth('steve.jobs', 'l33tH@ck3r'))
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
