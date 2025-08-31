export const COLUMN_CATEGORIES = {
  Basic: ['year', 'population'],
  'CO2 Emissions': [
    'co2',
    'co2_per_capita',
    'co2_growth_abs',
    'co2_growth_prct',
    'cumulative_co2',
  ],
  'Consumption-based CO2': [
    'consumption_co2',
    'consumption_co2_per_capita',
    'consumption_co2_per_gdp',
  ],
  Energy: ['primary_energy_consumption', 'energy_per_capita', 'energy_per_gdp'],
  Methane: ['methane', 'methane_per_capita'],
  'Nitrous Oxide': ['nitrous_oxide', 'nitrous_oxide_per_capita'],
  'Other Greenhouse Gases': [
    'ghg',
    'ghg_per_capita',
    'ghg_excluding_lucf',
    'ghg_excluding_lucf_per_capita',
  ],
  'Temperature Change': [
    'temperature_change_from_co2',
    'temperature_change_from_ch4',
    'temperature_change_from_n2o',
    'temperature_change_from_ghg',
  ],
  Other: [],
};

export const REQUIRED_COLUMNS = ['year', 'population', 'co2', 'co2_per_capita'];
