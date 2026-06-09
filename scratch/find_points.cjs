const fs = require('fs');
const { biomesData } = require('../src/data/biomes.ts');

// We want to test a few key regions in the world map (3177x1664 coordinates)
// Let's find the path containing points in:
// 1. Greenland interior (Ice cap): roughly x = 1100 to 1300, y = 150 to 250
// 2. Siberia (Taiga): roughly x = 2000 to 2400, y = 300 to 450
// 3. Sahara Desert: roughly x = 1450 to 1600, y = 750 to 850
// 4. Amazon Rainforest: roughly x = 900 to 1050, y = 1000 to 1150
// 5. Australian Desert (Interior): roughly x = 2650 to 2800, y = 1250 to 1350

const regions = {
  GreenlandIceCap: { minX: 1100, maxX: 1300, minY: 150, maxY: 250 },
  SiberiaTaiga: { minX: 2000, maxX: 2400, minY: 300, maxY: 450 },
  SaharaDesert: { minX: 1450, maxX: 1600, minY: 750, maxY: 850 },
  AmazonRainforest: { minX: 900, maxX: 1050, minY: 1000, maxY: 1150 },
  AustralianDesert: { minX: 2650, maxX: 2800, minY: 1250, maxY: 1350 }
};

biomesData.forEach(b => {
  const cleanD = b.d.replace(/[A-Za-z]/g, ' ');
  const parts = cleanD.trim().split(/[\s,]+/);
  const nums = parts.map(p => parseFloat(p)).filter(p => !isNaN(p));
  
  const counts = {
    GreenlandIceCap: 0,
    SiberiaTaiga: 0,
    SaharaDesert: 0,
    AmazonRainforest: 0,
    AustralianDesert: 0
  };
  
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i+1];
    
    for (const [rName, rBounds] of Object.entries(regions)) {
      if (x >= rBounds.minX && x <= rBounds.maxX && y >= rBounds.minY && y <= rBounds.maxY) {
        counts[rName]++;
      }
    }
  }
  
  console.log(`Path: ${b.id} (${b.name}) | fill: ${b.fill}`);
  for (const [rName, count] of Object.entries(counts)) {
    if (count > 0) {
      console.log(`  - Points in ${rName}: ${count}`);
    }
  }
});
