import { CovidData, CovidDataEntry } from "../covid-store/covid-data-model";
import { ChartDataSets } from "chart.js";

export interface SubsetSelections {
    selectedRegions: {country: string, state?: string}[];
}

export function getChartConfigFromCovidData(data: CovidData, subsetSelection: SubsetSelections): Chart.ChartConfiguration{

    // const dataEntries: CovidDataEntry[] = subsetSelection.selectedRegions
    //     .map()

    return {
        type: 'bar',
        data: {
            labels: generateLabels(data, subsetSelection),
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
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

function generateLabels(data: CovidData, subsets: SubsetSelections): string[] {
    return ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
}

function getDataSetFromRegions(dataEntry: CovidDataEntry): ChartDataSets {
    return {
        label: dataEntry.country + dataEntry.state ? ': ' + dataEntry.state : '',
        data: dataEntry.cases,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }
}