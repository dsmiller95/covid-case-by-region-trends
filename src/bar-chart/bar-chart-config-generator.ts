import { ChartDataSets } from "chart.js";
import { CovidData, CovidDataEntry } from '../covid-store/covid-data-model';

export interface SubsetSelections {
    selectedRegions: {country: string, state?: string}[];
}

export function getChartConfigFromCovidData(data: CovidData, subsetSelection: SubsetSelections): Chart.ChartConfiguration{

    const dataEntries: CovidDataEntry[] = subsetSelection.selectedRegions
        .map(region => {
            const dataSlice = data.regions[region.country];
            if(!dataSlice){
                return undefined;
            }
            if(region.state && dataSlice.stateData){
                return dataSlice.stateData[region.state];
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