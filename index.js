const http = require('http');

const user = {
    name: 'Valera',
    age: 54
};
const routing = new Map([
    ['/', '<h1>Welcome to homepage</h1>'],
    ['/user', user],
    ['/user/name', () => user.name.toUpperCase()],
    ['/user/age', () => user.age],
    ['/hello', {
        hello: 'world',
        andArray: [1, 2, 3, 4, 5, 6, 7]
    }],
    ['/api/method1', (req, res) => {
        console.log([req.url, ' ', res.statusCode].join(''));
        return {
            status: res.statusCode
        };
    }],
    ['/api/method2', (req) => ({
        user,
        url: req.url,
        cookie: req.headers.cookie
    })]
])

const types = {
    object: JSON.stringify,
    string: (s) => s,
    number: (n) => n,
    function: (fn, req, res) => JSON.stringify(fn(req, res)),
    undefined: () => 'not found'
}

http.createServer((req, res) => {
    const data = routing.get(req.url);
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data, req, res);
    res.end(result);

}).listen(3020);