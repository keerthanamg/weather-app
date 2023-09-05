const http = require('http');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/candidates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Candidate model
const Candidate = mongoose.model('Candidate', {
  name: String,
  email: String,
  phone: String,
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Display the form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form method="POST" action="/">
        <label for="name">Candidate Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required>
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
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');

      // Create a new candidate using the Candidate model
      const candidate = new Candidate({ name, email, phone });

      // Save the candidate to the database
      candidate.save()
        .then(savedCandidate => {
          // Display a success message
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(`<h2>Candidate ${savedCandidate.name} saved successfully!</h2>`);
          res.end();
        })
        .catch(error => {
          // Display an error message
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.write(`<h2>Error saving candidate: ${error.message}</h2>`);
          res.end();
        });
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
