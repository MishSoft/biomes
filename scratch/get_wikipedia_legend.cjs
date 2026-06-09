const fs = require('fs');

async function getLegend() {
  try {
    // Let's fetch the wikicode of Commons:File:Vegetation.png
    console.log('Fetching wikicode of File:Vegetation.png...');
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&prop=revisions&titles=File:Vegetation.png&rvslots=*&rvprop=content&format=json';
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId].revisions[0].slots.main['*'];
    
    fs.writeFileSync('c:\\Users\\misho\\Desktop\\biomes\\scratch\\commons_wiki.txt', content, 'utf8');
    console.log('Saved wikicode to scratch/commons_wiki.txt');
    
    // Let's parse templates or table rows in the wikicode
    const lines = content.split('\n');
    console.log('--- WIKICODE SAMPLE ---');
    console.log(lines.slice(0, 100).join('\n'));
  } catch (e) {
    console.error('Error fetching legend:', e);
  }
}

getLegend();
