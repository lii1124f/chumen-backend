const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json({limit: '50mb'}));

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({version:2,users:[],goods:[],orders:[],chats:[],circles:[],posts:[],wallets:{},notices:[],comments:[],favorites:[],wants:[]}, null, 2));
}

app.get('/api/health', (req, res) => {
  res.json({code:0, ok:true});
});

app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    res.json(data);
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

app.post('/api/data', (req, res) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(req.body, null, 2));
    res.json({ok:true});
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

app.listen(PORT, () => {
  console.log('Backend running on port ' + PORT);
});
