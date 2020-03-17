import { CovidData } from "../covid-store/covid-data-model";
import { SubsetSelections, getChartConfigFromCovidData } from "./bar-chart-config-generator";
import moment from "moment";
import { ChartData, ChartDataSets } from "chart.js";


describe('when testing the generator', () => {
    let inputData: CovidData;
    let subsets: SubsetSelections;

    describe('when providing minimal data', () => {
        beforeEach(() => {
            inputData = {
                regions: {}
            };
            subsets = {selectedRegions: []}; 
        });
        it('should return empty chart configuration', () => {
            const result = getChartConfigFromCovidData(inputData, subsets);
            expect(result.type).toBe('bar');
        });
    });
    
    describe('when providing multi region data', () => {
        beforeEach(() => {
            inputData = {
                regions: {
                    china: [{
                        state: 'Beijing',
                        country: 'China',
                        cases: [100, 120, 150, 500, 600]
                    }, {
                        state: 'Wuhan',
                        country: 'China',
                        cases: [0, 50, 100, 120, 150]
                    }]
                }
            };
        });
        describe('when selecting one region out of multi region data', () => { 
            beforeEach(() => {
                subsets = {
                    selectedRegions: [{
                        country: 'China',
                        state: 'Wuhan'
                    }]
                };
            });

            it('should setup grid config for one data set', () => {
                const result = getChartConfigFromCovidData(inputData, subsets);
                const chartData = result.data as ChartData;
                expect(chartData.labels).toEqual(['0', '1', '2', '3', '4']);
                const datasets = chartData.datasets as ChartDataSets[];
                expect(datasets.length).toBe(1);
                expect(datasets[0].label).toBe('Wuhan, China');
                expect(datasets[0].data).toEqual([0, 50, 100, 120, 150]);
            });
        }); 
    });

});