require('../configs/db')

const landings = require('../seeds/landings.json')
const neas = require('../seeds/neas.json')

const LandingsModel = require('../models/Landings')
const NeasModel = require('../models/Neas')

const landingsMapped = landings.map(meteorite => ({
  ...meteorite,
  mass: meteorite.mass && Number(meteorite.mass),
  year: meteorite.year && new Date(meteorite.year)
}))

const neasMapped = neas.map(nea => ({
  ...nea,
  discovery_date: nea.discovery_date && new Date(nea.discovery_date),
  h_mag: nea.h_mag && Number(nea.h_mag),
  moid_au: nea.moid_au && Number(nea.moid_au),
  q_au_1: nea.q_au_1 && Number(nea.q_au_1),
  q_au_2: nea.q_au_2 && Number(nea.q_au_2),
  period_yr: nea.period_yr && Number(nea.period_yr),
  i_deg: nea.i_deg && Number(nea.i_deg)
}))

const landingsInsertions = async () => {
  for await (let meteorite of landingsMapped) {
    await LandingsModel.create(meteorite)
  }
  console.info('> meteorite landings added!')
}

const neasInsertions = async () => {
  for await (let nea of neasMapped) {
    await NeasModel.create(nea)
  }
  console.info('> neas added!')
}

const main = async () => {
  await landingsInsertions()
  await neasInsertions()
  process.exit(0)
}

main()