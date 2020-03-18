import { ChartDataSets } from "chart.js";
import { CovidData, CovidDataEntry } from '../covid-store/covid-data-model';
import { SubsetSelections } from "../covid-store/covid-store";

export function getChartConfigFromCovidData(data: CovidData, subsetSelection: SubsetSelections): Chart.ChartConfiguration{
    const dataEntries: CovidDataEntry[] = subsetSelection.selectedRegions
        .map(region => {
            const dataSlice = data.regions[region.country];
            if(!dataSlice) {
                return undefined;
            }
            if(region.state && dataSlice.stateData){
                return dataSlice.stateData[region.state];
            } else if (dataSlice.stateData) {
                const allCasesForCountry = Object.values(dataSlice.stateData)
                    .map(slice => slice.cases);
                const dataSummation = allCasesForCountry[0].map((stateCases, index) => 
                    allCasesForCountry
                        .map(cases => cases[index])
                        .reduce((previous, current) => previous + current)
                );
                return {
                    country: dataSlice.country,
                    cases: dataSummation
                }
            }
            return dataSlice.data
        })
        .filter(Boolean) as CovidDataEntry[];

    return {
        type: 'bar',
        data: {
            labels: generateLabels(dataEntries),
            datasets: dataEntries.map(entry => getDataSetFromRegions(entry))
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
}

function generateLabels(entries: CovidDataEntry[]): string[] {
    const labelLength = Math.max(0, ...entries.map(entry => entry.cases.length));
    return Array(labelLength).fill(undefined).map((value, index) => (index).toFixed());
}

function getDataSetFromRegions(dataEntry: CovidDataEntry): ChartDataSets {
    return {
        label: dataEntry.state ? `${dataEntry.state}, ${dataEntry.country}` : dataEntry.country,
        data: dataEntry.cases,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }
}