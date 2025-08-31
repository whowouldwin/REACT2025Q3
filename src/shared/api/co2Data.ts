import { type CountryData } from '@/entities/countries';
import { createResource } from '@/shared/lib';

let dataCache: Record<string, CountryData> | null = null;
let dataPromise: Promise<Record<string, CountryData>> | null = null;

export function fetchCO2Data(): Promise<Record<string, CountryData>> {
  if (dataCache) {
    return Promise.resolve(dataCache);
  }

  if (!dataPromise) {
    dataPromise = fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch CO2 data: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data: CountryData) => {
        const processedData: Record<string, CountryData> = {};

        for (const [key, countryData] of Object.entries(data)) {
          processedData[key] = {
            name: countryData.name || key,
            iso_code: countryData.iso_code,
            data: countryData.data || [],
          };
        }

        dataCache = processedData;
        return processedData;
      });
  }

  return dataPromise;
}

export const co2DataResource = createResource(fetchCO2Data());
