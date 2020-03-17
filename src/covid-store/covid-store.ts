
import { observable } from "mobx";
import { CovidData } from "./covid-data-model";

export class ObservableCovidStore {
    @observable covidData: CovidData | undefined;
    @observable loaded: boolean = false;
    
    constructor(){
        this.covidData = {
            regions: {
                china: [{
                    state: 'bejing',
                    country: 'china',
                    cases: [100, 120, 150, 500, 600]
                }, {
                    state: 'wuhan',
                    country: 'china',
                    cases: [0, 0, 100, 120, 150]
                }]
            }
        }
    }

}