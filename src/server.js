import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from "helmet";
import { makeAPIRequest } from './server/api-request/api-request.js';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

let token = "";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src': ["'self'", 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.min.js'],
      'connect-src': ["'self'", "https://twitchprofiles-2.onrender.com", "https://api.twitch.tv", "https://api.betterttv.net", "https://cdn.frankerfacez.com"],
      'img-src': ["'self", "https://static-cdn.jtvnw.net", "https://static-cdn.jtvnw.net/jtv", "https://twitchprofiles-2.onrender.com", "https://api.twitch.tv", "https://www.w3.org/2000/svg", "https://cdn.betterttv.net", "https://cdn.frankerfacez.com", "data:"]
    }
  }
}));

export const modifyToken = (newToken) => {
  token = newToken
}

app.use(express.json());

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/favico', express.static(path.join(__dirname, 'favico')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/404', async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', '404.html'));
})


app.get('/:profile', async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});


app.post('/twitch-data', async (req, res) => {
  const { endpoint, method, params, headers } = req.body;
  
  if (!endpoint || !method) {
    return res.status(400).json({ error: 'Endpoint and method are required' });
  }

  try {
    const twitchApiUrl = "https://api.twitch.tv/helix";
    
    const result = await makeAPIRequest(twitchApiUrl, endpoint, method, params, headers, token, clientId, clientSecret);
    
    res.json(result);

  } catch (error) {
    console.error('Error fetching data from Twitch:', error);
  }
})


app.post('/ffz-data', async(req, res) => {
  const { endpoint, method, data, params, headers } = req.body;

  if (!endpoint || !method) {
    return res.status(400).json({ error: 'Endpoint and method are required' });
  }
  
  try {
    const ffzApiUrl = "https://api.frankerfacez.com/v1/room/id";
    const result = await makeAPIRequest(ffzApiUrl, endpoint, method, params, data, headers, token, clientId, clientSecret);
    res.json(result);

  } catch (error) {
    console.error('Error fetching data from FrankerFaceZ:', error);
    res.status(500).json({ error: 'Failed to fetch data from FrankerFaceZ' });
  }
})


app.post('/bttv-data', async(req, res) => {
  const { endpoint, method, data, params, headers } = req.body;

  if (!endpoint || !method) {
    return res.status(400).json({ error: 'Endpoint and method are required' });
  }
  
  try {
    const bttvApiUrl = "https://api.betterttv.net/3/cached/users/twitch";
    const result = await makeAPIRequest(bttvApiUrl, endpoint, method, params, data, headers, token, clientId, clientSecret);
    res.json(result);

  } catch (error) {
    console.error('Error fetching data from BetterTwitchTV:', error);
    res.status(500).json({ error: 'Failed to fetch data from BetterTwitchTV' });
  }
})


// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
