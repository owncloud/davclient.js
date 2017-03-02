
/* global dav */
describe("client", function() {

    var client;
    var fakeServer;
    var oldPromise;

    beforeEach(function() {
        client = new dav.Client({
            baseUrl: 'http://example.org/',
            userName: 'user',
            password: 'password'
        });

        client.xmlNamespaces['http://example.org/ns'] = 'e';

        oldPromise = window.Promise;
        window.Promise = sinon.stub();

        fakeServer = sinon.fakeServer.create();
    });

    afterEach(function() {
        client = null;
        fakeServer.restore();
        fakeServer = null;
        window.Promise = oldPromise;
    });

    describe('request', function() {
        it('sends the given request', function() {

            client.request(
                'PUT',
                '/rel/path',
                {
                    'CustomHeader': 'Value',
                    'CustomHeader2': 'Value2'
                },
                'body'
            );

            expect(fakeServer.requests.length).toEqual(1);
            var request = fakeServer.requests[0];

            expect(request.method).toEqual('PUT');
            expect(request.url).toEqual('http://example.org/rel/path');

            expect(request.requestHeaders).toEqual({
                CustomHeader: 'Value',
                CustomHeader2: 'Value2',
                'Content-Type': 'text/plain;charset=utf-8',
                Authorization: 'Basic dXNlcjpwYXNzd29yZA==',
            });

            expect(request.requestBody).toEqual('body');
        });

        it('processes response', function() {
            client.request(
                'GET',
                '/rel/path',
                {
                    'CustomHeader': 'Value',
                    'CustomHeader2': 'Value2'
                },
                'body'
            );

            expect(fakeServer.requests.length).toEqual(1);
            var request = fakeServer.requests[0];

            expect(window.Promise.calledOnce).toEqual(true);

            var promise = window.Promise.getCall(0).args[0];
            var fulfillStub = sinon.stub();
            var rejectStub = sinon.stub();
            promise(fulfillStub, rejectStub);

            expect(fulfillStub.notCalled).toEqual(true);
            expect(rejectStub.notCalled).toEqual(true);

            request.respond(
                200,
                { 'Content-Type': 'text/plain' },
                'responsebody'
            );

            expect(fulfillStub.calledOnce).toEqual(true);
            expect(fulfillStub.getCall(0).args[0].body).toEqual('responsebody');
            expect(fulfillStub.getCall(0).args[0].status).toEqual(200);
            expect(fulfillStub.getCall(0).args[0].xhr).toBeDefined();

            expect(rejectStub.notCalled).toEqual(true);
        });
    });

});
