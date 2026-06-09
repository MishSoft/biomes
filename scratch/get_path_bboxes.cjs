const fs = require('fs');
const { biomesData } = require('../src/data/biomes.ts');

biomesData.forEach(b => {
  const cleanD = b.d.replace(/[A-Za-z]/g, ' ');
  const parts = cleanD.trim().split(/[\s,]+/);
  const nums = parts.map(p => parseFloat(p)).filter(p => !isNaN(p));
  
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i+1];
    if (x !== undefined && !isNaN(x)) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
    if (y !== undefined && !isNaN(y)) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  
  console.log(`${b.id.padEnd(10)} | ${b.name.padEnd(30)} | fill: ${b.fill.padEnd(8)} | BBox: [${minX.toFixed(0)}, ${minY.toFixed(0)}, ${maxX.toFixed(0)}, ${maxY.toFixed(0)}]`);
});
