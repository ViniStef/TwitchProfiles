import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(__dirname));  

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'index.html'));  
});

app.get('/:profile', (req, res) => {
  const profileName = req.params.profile;
  res.sendFile(path.join(__dirname, 'views', 'profile.html')); 
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
