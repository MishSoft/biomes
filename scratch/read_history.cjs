const fs = require('fs');
const readline = require('readline');

async function readTranscript() {
  const fileStream = fs.createReadStream('C:\\Users\\misho\\.gemini\\antigravity\\brain\\e771db3b-2b1d-4e57-9c6d-578613b137b9\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const inputs = [];
  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.type === 'USER_INPUT' || parsed.type === 'PLANNER_RESPONSE' && parsed.content) {
        inputs.push({ type: parsed.type, content: parsed.content });
      }
    } catch (e) {
      // ignore
    }
  }
  
  console.log('--- RECENT HISTORY ---');
  inputs.slice(-15).forEach((item, index) => {
    console.log(`[${index}] ${item.type}:`);
    console.log(item.content);
    console.log('--------------------');
  });
}

readTranscript();
