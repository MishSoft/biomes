const originalFills = {
  'path2235': { fill: '#f7ec6f', wikicolor: '#F6EA64', correctName: 'Temperate steppe' },
  'path2233': { fill: '#9fd6c9', wikicolor: '#96D1C3', correctName: 'Tundra' },
  'path2231': { fill: '#c0c0c0', wikicolor: '#B9B9B9', correctName: 'Ice sheet and polar desert' },
  'path2229': { fill: '#deb887', wikicolor: '#DAB17D', correctName: 'Semiarid desert' },
  'path2227': { fill: '#a7bddb', wikicolor: '#9EB6D7', correctName: 'Alpine tundra' },
  'path2225': { fill: '#cdc954', wikicolor: '#C7C349', correctName: 'Grass savanna' },
  'path2223': { fill: '#a4e05d', wikicolor: '#9BDC52', correctName: 'Temperate broadleaf and mixed forest' },
  'path2221': { fill: '#907699', wikicolor: '#866B90', correctName: 'Mediterranean vegetation' },
  'path2219': { fill: '#b97553', wikicolor: '#B26A48', correctName: 'Xeric shrubland' },
  'path2217': { fill: '#3c9798', wikicolor: '#328D8E', correctName: 'Montane forest' },
  'path2215': { fill: '#6f956f', wikicolor: '#648B64', correctName: 'Tropical and subtropical moist broadleaf forests' },
  'path2213': { fill: '#aca719', wikicolor: '#A49E13', correctName: 'Tree savanna' },
  'path2211': { fill: '#9b8447', wikicolor: '#927A3D', correctName: 'Dry steppe' },
  'path2209': { fill: '#768e34', wikicolor: '#6B842B', correctName: 'Tropical and subtropical dry forest' },
  'path2207': { fill: '#95583c', wikicolor: '#8B4D32', correctName: 'Arid desert' },
  'path2205': { fill: '#006d64', wikicolor: '#006259', correctName: 'Taiga' },
  'path2203': { fill: '#0d7e0d', wikicolor: '#097309', correctName: 'Subtropical moist forest' },
  'path2201': { fill: '#005c00', wikicolor: '#005100', correctName: 'Tropical rainforest' }
};

const currentBiomes = {
  'path2235': 'Desert / Sand Dunes',
  'path2233': 'Tundra / Cold Coast',
  'path2231': 'Ice Caps / Glaciers',
  'path2229': 'Temperate Grassland',
  'path2227': 'Taiga / Boreal Forest',
  'path2225': 'Temperate Deciduous Forest',
  'path2223': 'Tropical Rainforest',
  'path2221': 'Chaparral / Shrubland',
  'path2219': 'Semi-Desert / Scrub',
  'path2217': 'Wetlands / Swamps',
  'path2215': 'Temperate Rainforest',
  'path2213': 'Dry Tropical Forest',
  'path2211': 'Savanna / Grassland',
  'path2209': 'Mediterranean Forest',
  'path2207': 'Tropical Monsoon Forest',
  'path2205': 'Mangrove Forest',
  'path2203': 'Subtropical Moist Forest',
  'path2201': 'Equatorial Rainforest'
};

console.log('| Path ID | SVG Fill | Current Mapped Name | Correct Wikipedia Biome Name |');
console.log('|---|---|---|---|');
for (const [id, info] of Object.entries(originalFills)) {
  console.log(`| ${id} | ${info.fill} | ${currentBiomes[id]} | ${info.correctName} |`);
}
