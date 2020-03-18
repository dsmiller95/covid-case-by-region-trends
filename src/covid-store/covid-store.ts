
import { observable, action, computed } from "mobx";
import { CovidData } from './covid-data-model';
import { stringify } from "querystring";

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
        this.covidData = {
            regions: {
                China: {
                    country: 'China',
                    stateData: {
                        Beijing: {
                            state: 'Beijing',
                            country: 'China',
                            cases: [100, 120, 150, 500, 600]
                        },
                        Wuhan: {
                            state: 'Wuhan',
                            country: 'China',
                            cases: [0, 50, 100, 120, 150]
                        }
                    }
                }
            }
        };
        this.selectedDataSet = {
            country: "China"
        }
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
    
}