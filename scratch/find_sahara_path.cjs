const fs = require('fs');
const { biomesData } = require('../src/data/biomes.ts');

// Sahara center is roughly around x: 1500, y: 850 in the 3177x1664 coordinate system
// Let's find paths that contain points near there
biomesData.forEach(b => {
  const cleanD = b.d.replace(/[A-Za-z]/g, ' ');
  const parts = cleanD.trim().split(/[\s,]+/);
  const nums = parts.map(p => parseFloat(p)).filter(p => !isNaN(p));
  
  let pointsCount = 0;
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i+1];
    
    // Check if point is inside Sahara rectangle (x: 1300 to 1700, y: 700 to 900)
    if (x >= 1300 && x <= 1700 && y >= 700 && y <= 900) {
      pointsCount++;
    }
  }
  
  if (pointsCount > 0) {
    console.log(`Biome: ${b.name} (${b.id}) has ${pointsCount} points in Sahara area. Fill: ${b.fill}`);
  }
});
