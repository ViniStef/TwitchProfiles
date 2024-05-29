import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const token = process.env.AUTH_TOKEN;
const clientID = process.env.CLIENT_ID;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Expose environment variables to the client via an API endpoint
app.get('/api/env', (req, res) => {
  res.json({
    authToken: token,
    clientId: clientID
  });
});

// Serve static files from the src directory
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/favico', express.static(path.join(__dirname, 'favico')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

// Serve the index.html on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve the profile.html on the profile route
app.get('/:profile', (req, res) => {
  const profileName = req.params.profile;
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

export const tokens = () => {
  return { token, clientID };
};
