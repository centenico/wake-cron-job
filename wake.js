const https = require('https');

exports.handler = async (event, context) => {
    
  const urlUntappd = 'https://untappd.cente.dev/';
  const urlBeers = 'https://beers.cente.dev/';

  const makeRequest = (url) => new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve({
          statusCode: 200,
          body: 'Server pinged successfully',
        });
      } else {
        reject(
          new Error(`Server ping failed with status code: ${res.statusCode}`)
        );
      }
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });

  try {
    const results = await Promise.all([makeRequest(urlUntappd), makeRequest(urlBeers)]);
    return results;

  }catch (error) {
    console.error(error);
  }
};
