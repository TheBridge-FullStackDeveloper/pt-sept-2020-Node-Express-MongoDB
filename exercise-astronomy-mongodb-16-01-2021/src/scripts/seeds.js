require('../configs/db');
const { camelize } = require('../utils/common.utils');

const landings = require('../seeds/landings.json');
const neas = require('../seeds/neas.json');

const LandingsModel = require('../models/Landings');
const NeasModel = require('../models/Neas');

const landingsMapped = landings.map((meteorite) => {
  const transformedValues = {
    ...meteorite,
    mass: meteorite.mass && Number(meteorite.mass),
    year: meteorite.year && new Date(meteorite.year),
  };

  // TODO: Crear una función en common.utils.js que haga esto mismo para no repetirlo dos veces.
  const transformedCamelized = Object.keys(transformedValues).reduce(
    (acc, next, index) => {
      const camelizedKey = camelize(next);

      return {
        ...acc,
        [camelizedKey]: transformedValues[next],
      };
    },
    {}
  );

  return transformedCamelized;
});

const neasMapped = neas.map((singleNeas) => {
  const transformedValues = {
    ...singleNeas,
    discovery_date:
      singleNeas.discovery_date && new Date(singleNeas.discovery_date),
    h_mag: singleNeas.h_mag && Number(singleNeas.h_mag),
    moid_au: singleNeas.moid_au && Number(singleNeas.moid_au),
    q_au_1: singleNeas.q_au_1 && Number(singleNeas.q_au_1),
    q_au_2: singleNeas.q_au_2 && Number(singleNeas.q_au_2),
    period_yr: singleNeas.period_yr && Number(singleNeas.period_yr),
    i_deg: singleNeas.i_deg && Number(singleNeas.i_deg),
  };

  const transformedCamelized = Object.keys(transformedValues).reduce(
    (acc, next, index) => {
      const camelizedKey = camelize(next);

      return {
        ...acc,
        [camelizedKey]: transformedValues[next],
      };
    },
    {}
  );

  return transformedCamelized;
});

const landingsInsertions = async () => {
  await LandingsModel.deleteMany({});
  console.info('> old meteorite landings removed!');

  await LandingsModel.insertMany(landingsMapped);
  console.info('> meteorite landings added! 🔥');
};

const neasInsertions = async () => {
  await NeasModel.deleteMany({});
  console.info('> old neas removed!');

  await NeasModel.insertMany(neasMapped);
  console.info('> neas added! 🔥');
};

const main = async () => {
  await landingsInsertions();
  await neasInsertions();
  process.exit(0);
};

main();
