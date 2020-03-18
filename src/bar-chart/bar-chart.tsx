import { observer } from 'mobx-react';
import React from 'react';
import ChartJS from '../chart-js-shim/chart-js';
import { ObservableCovidStore } from '../covid-store/covid-store';
import { getChartConfigFromCovidData } from './bar-chart-config-generator';
import './bar-chart.css';

export interface IProps{
    dataStore: ObservableCovidStore;
}

interface IState {
}
const defaultSubset = {
    country: 'China',
    state: 'Wuhan'
}

@observer
class BarChart extends React.Component<IProps, IState> {
    public render(){
        const covidStore = this.props.dataStore;
        
        if(covidStore.covidData) {
            const chartConfig = getChartConfigFromCovidData(
                covidStore.covidData,
                {selectedRegions: [covidStore.selectedDataSet]})
           
            return (
                <div className="bar-chart">
                    <ChartJS chartConfig={chartConfig}></ChartJS>
                </div>
            ); 
        }

        return (
            <div className="bar-chart">
                Loading data....
            </div>
        );
    }
}

export default BarChart;
