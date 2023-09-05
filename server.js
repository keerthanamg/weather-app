const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Display the form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form method="POST" action="/">
        <label for="name">Candidate Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <button type="submit">Submit</button>
      </form>
    `);
    res.end();
  } else if (req.method === 'POST') {
    let data = '';

    // Read and parse the form data
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const formData = new URLSearchParams(data);
      const candidateName = formData.get('name');

      // Display the submitted name
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h2>Submitted Name: ${candidateName}</h2>`);
      res.end();
    });
  } else {
    // Handle unsupported HTTP methods
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
