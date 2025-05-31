const fs = require('fs');

// Load the JSON file
const rawData = fs.readFileSync('chat.json', 'utf-8');
const messages = JSON.parse(rawData);

// Sort by timestamp DESC (newest first)
messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

// Extract content and username
const simplified = messages.map(msg => ({
  content: msg.content,
  username: msg.author.username,
}));

// Save result
fs.writeFileSync('simplifiedChat.json', JSON.stringify(simplified, null, 2), 'utf-8');

console.log('done ✅');
