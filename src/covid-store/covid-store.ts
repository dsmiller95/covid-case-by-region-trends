
import { action, computed, observable } from "mobx";
import { CovidData } from './covid-data-model';
import { getRawCovidTimeSeriesData } from "../covid-data-fetcher/covid-data-service";
import { crunchNumbers } from "../covid-data-fetcher/covid-data-processer";

export interface SubsetSelection {
    country: string;
    state?: string;
}
export interface SubsetSelections {
    selectedRegions: SubsetSelection[];
}

export class ObservableCovidStore {
    @observable covidData: CovidData | undefined;
    @observable loaded: boolean = true;
    
    @observable selectedDataSet: SubsetSelection;

    constructor(){
        this.selectedDataSet = {
            country: "China"
        };
        getRawCovidTimeSeriesData()
            .then(data => crunchNumbers(data))
            .then(covidData => this.covidData = covidData)
            .then(data => console.log(data));
    }

    @computed get validDataSelection(): {[country: string]: string[]} {
        const result: Record<string, string[]> = {};
        if(this.covidData){
            for(const country in this.covidData.regions){
                const countryData = this.covidData.regions[country];
                if(countryData.stateData) {
                    result[country] = Object.keys(countryData.stateData);
                } else {
                    result[country] = [];
                }
            }
        }
        return result;
    }

    @action setSelectedDataSet(selection: SubsetSelection){
        this.selectedDataSet = selection;
    }

    @action countrySliceSelected(country?: string){
        if(country && this.selectedDataSet.country !== country){
            this.selectedDataSet = {country}
        }
    }

    @action stateSliceSelected(state?: string){
        if(this.selectedDataSet.state !== state){
            this.selectedDataSet.state = state
        }
    }
    
}