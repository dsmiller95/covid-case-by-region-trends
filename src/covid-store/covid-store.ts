
import { observable } from "mobx";
import { CovidData } from "./covid-data-model";

export class ObservableCovidStore {
    @observable covidData: CovidData | undefined;
    @observable loaded: boolean = true;
    
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
    }

}