import Papa from "papaparse";

export interface TimeSeriesDataRow {
    State: string;
    Country: string;
    Lat: string;
    Long: string;
    [date: string]: string;
}
export const dataRowProps: string[] = [
    'State',
    'Country',
    'Lat',
    'Long'
]

export async function getRawCovidTimeSeriesData(): Promise<TimeSeriesDataRow[]> {
    const confirmedCovidCasesUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';
    const result = await fetch(confirmedCovidCasesUrl);
    if(result.status === 200){
        const rawCSV = await result.text();
        if(!rawCSV){
            return [];
        }
        const resultJSON = Papa.parse(rawCSV, {
            delimiter: ',',
            header: true,
            transformHeader: (header) => {
                switch(header){
                    case 'Province/State': return 'State';
                    case 'Country/Region': return 'Country';
                    default: return header;
                }
            }
        });
        return resultJSON.data;
    }
    return [];
}