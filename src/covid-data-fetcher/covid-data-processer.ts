import { CovidData, CovidDataCountry, CovidDataEntry } from "../covid-store/covid-data-model";
import { TimeSeriesDataRow } from "./covid-data-service";

export function crunchNumbers(rawData: TimeSeriesDataRow[]): CovidData {
    const outputData: CovidData = {
        regions: {}
    };
    rawData.forEach(row => {
        if(row.State && row.State.length > 0){
            let countryData: CovidDataCountry =
                outputData.regions[row.Country] =
                outputData.regions[row.Country] ?? {
                    country: row.Country,
                    stateData: {}
                };
            if(!countryData.stateData){
                throw new Error(`processing error: country ${row.Country} has row with state ${row.State} after a row with no state`)
            }
            countryData.stateData[row.State] = convertRowToDataEntry(row);

        } else {
            outputData.regions[row.Country] = {
                country: row.Country,
                data: convertRowToDataEntry(row)
            }
        }
    });

    return outputData;
}

function convertRowToDataEntry(row: TimeSeriesDataRow): CovidDataEntry {
    return {
        country: row.Country,
        state: row.State?.length > 0 ? row.State : undefined,
        lat: Number.parseFloat(row.Lat),
        long: Number.parseFloat(row.Long),
        cases: extractCasesFromDataRow(row)
    }
}

function extractCasesFromDataRow(row: TimeSeriesDataRow): number[] {
    return [];
}