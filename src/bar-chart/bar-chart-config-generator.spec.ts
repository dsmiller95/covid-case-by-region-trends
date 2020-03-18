import { ChartData, ChartDataSets } from "chart.js";
import { CovidData } from "../covid-store/covid-data-model";
import { SubsetSelections } from "../covid-store/covid-store";
import { getChartConfigFromCovidData } from "./bar-chart-config-generator";


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

            it('should setup grid config for one data set, indexed by first known case', () => {
                const result = getChartConfigFromCovidData(inputData, subsets);
                const chartData = result.data as ChartData;
                const datasets = chartData.datasets as ChartDataSets[];
                expect(datasets.length).toBe(1);
                expect(datasets[0].label).toBe('Wuhan, China');
                expect(datasets[0].data).toEqual([50, 100, 120, 150]);
                
                expect(chartData.labels).toEqual(['0', '1', '2', '3']);
            });
        }); 
    });

});