const http = require('http');

exports.handler = async (event) => {
    const ecsHost = '18.202.226.47'; // This can not be changed dynamically (need load balancer attached)
    const ecsPort = 3000;
    const ecsPath = '/convert';

    const isBase64Encoded = event.isBase64Encoded;
    const body = isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;

    const options = {
        hostname: ecsHost,
        port: ecsPort,
        path: ecsPath,
        method: event.requestContext.http.method || 'POST',
        headers: {
            'Content-Type': event.headers['content-type'] || 'application/octet-stream',
            'Content-Length': body.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: {
                        'Access-Control-Allow-Origin': '*',  
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                        'Content-Type': 'application/json'
                    },
                    body: responseBody
                });
            });
        });

        req.on('error', (error) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            });
        });

        req.write(body);
        req.end();
    });
};
