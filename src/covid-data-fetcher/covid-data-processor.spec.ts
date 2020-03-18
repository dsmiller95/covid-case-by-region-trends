import { TimeSeriesDataRow } from "./covid-data-service";
import { crunchNumbers } from "./covid-data-processer";
import { useAsObservableSource } from "mobx-react";

describe('when chrunching numbers', () => {
    let inputData: TimeSeriesDataRow[];
    describe('when chrunching one row with one data point with a state', () => {
        beforeEach(() => {
            inputData = [{
                Country: 'USA',
                State: 'WI',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '3'
            }]
        });

        it('should extract the data with a state', () => {
            const result = crunchNumbers(inputData);
            expect(result).toEqual({
                regions: {
                    USA: {
                        country: 'USA',
                        stateData: {
                            WI: {
                                country: 'USA',
                                state: 'WI',
                                lat: 3,
                                long: 44.4,
                                cases: [3]
                            }
                        }
                    }
                }
            })
        });
    });
    describe('when chrunching one row with one data point without a state', () => {
        beforeEach(() => {
            inputData = [{
                Country: 'USA',
                State: '',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '3'
            }]
        });

        it('should extract the data', () => {
            const result = crunchNumbers(inputData);
            expect(result).toEqual({
                regions: {
                    USA: {
                        country: 'USA',
                        data: {
                            country: 'USA',
                            lat: 3,
                            long: 44.4,
                            cases: [3]
                        }
                    }
                }
            })
        });
    });
});