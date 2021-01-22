const get = require('lodash/get');
const noop = require('lodash/noop');
const chunk = require('lodash/chunk');
const difference = require('lodash/difference');
const shuffle = require('lodash/shuffle');
const last = require('lodash/last');
const mapValues = require('lodash/mapValues');
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');
const invoke = require('lodash/invoke');

const mainCharacter = {
  username: 'Currito el perro',
  level: 99,
  weapon: 'sword',
  stats: {
    atk: {
      physical: {
        points: 100,
        bash: () => mainCharacter.stats.atk.physical.points,
        superBash: () => mainCharacter.stats.atk.physical.points * 2,
      },
      magical: 20,
    },
  },
  inventory: [
    'potion',
    'dagger',
    'bandage',
    'stone',
    'crystal',
    'axe',
    'stone',
    'crystal',
    'stone',
  ],
  vault: ['dagger', 'stone', 'crystal', 'axe'],
  skills: {
    jump: 3,
    crawl: 1,
    bend: 2,
    run: 6,
  },
};

mainCharacter.skills = mapValues(mainCharacter.skills, (points) => points * 2);
console.log(mainCharacter.skills);

const bashFn = get(mainCharacter, 'stats.atk.physical.bash', noop);
const attackFn = get(mainCharacter, 'stats.atk.physical.superBash', bashFn);
attackFn();

invoke(mainCharacter, 'stats.atk.physical.superBash');

const chunkInventory = chunk(mainCharacter.inventory, 2);
console.log(chunkInventory);

const vaultDiff = difference(mainCharacter.inventory, mainCharacter.vault);
console.log(vaultDiff);

const shuffledInventory = shuffle(mainCharacter.inventory);
console.log(shuffledInventory);

const lastElement = last(mainCharacter.inventory);
console.log(lastElement);

const nonCamelized = {
  no_camel: 1,
  really_not_camel: 2,
  lol_haha_2: 3,
  'now-normal-dashes': 4,
};

const camelizedObj = mapKeys(nonCamelized, (_, key) => camelCase(key));
console.log(camelizedObj);
