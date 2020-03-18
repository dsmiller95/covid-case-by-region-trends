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
    describe('when chrunching many rows with multiple data points and some states', () => {
        beforeEach(() => {
            inputData = [{
                Country: 'USA',
                State: 'WI',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '3',
                ['1/22/21']: '4',
                ['1/22/22']: '5'
            },{
                Country: 'USA',
                State: 'CA',
                Lat: '4',
                Long: '42.4',
                ['1/22/20']: '20',
                ['1/22/21']: '25',
                ['1/22/22']: '40'
            },{
                Country: 'Italy',
                State: '',
                Lat: '3299',
                Long: '4444.4',
                ['1/22/20']: '100',
                ['1/22/21']: '333',
                ['1/22/22']: '666'
            },{
                Country: 'China',
                State: 'Wuhan',
                Lat: '662',
                Long: '4433.1',
                ['1/22/20']: '1000',
                ['1/22/21']: '2000',
                ['1/22/22']: '33'
            },{
                Country: 'China',
                State: 'Bejing',
                Lat: '663',
                Long: '77.4',
                ['1/22/20']: '320',
                ['1/22/21']: '420',
                ['1/22/22']: '4269'
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
                                cases: [3, 4, 5]
                            },
                            CA: {
                                country: 'USA',
                                state: 'CA',
                                lat: 4,
                                long: 42.4,
                                cases: [20, 25, 40]
                            }
                        }
                    },
                    Italy: {
                        country: 'Italy',
                        data: {
                            country: 'Italy',
                            lat: 3299,
                            long: 4444.4,
                            cases: [100, 333, 666]
                        }
                    },
                    China: {
                        country: 'China',
                        stateData: {
                            Wuhan: {
                                country: 'China',
                                state: 'Wuhan',
                                lat: 662,
                                long: 4433.1,
                                cases: [1000, 2000, 33]
                            },
                            Bejing: {
                                country: 'China',
                                state: 'Bejing',
                                lat: 663,
                                long: 77.4,
                                cases: [320, 420, 4269]
                            }
                        }
                    },
                }
            })
        });
    });
    describe('when chrunching a row with no cases', () => {
        beforeEach(() => {
            inputData = [{
                Country: 'USA',
                State: 'WI',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '0',
                ['1/22/21']: '0',
                ['1/22/22']: '0'
            },{
                Country: 'USA',
                State: 'CA',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '1',
                ['1/22/21']: '2',
                ['1/22/22']: '4'
            },{
                Country: 'China',
                State: 'none',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '0',
                ['1/22/21']: '0',
                ['1/22/22']: '0'
            },{
                Country: 'China',
                State: 'more none',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '0',
                ['1/22/21']: '0',
                ['1/22/22']: '0'
            },{
                Country: 'thailand',
                State: '',
                Lat: '3',
                Long: '44.4',
                ['1/22/20']: '0',
                ['1/22/21']: '0',
                ['1/22/22']: '0'
            }]
        });

        it('should omit areas with no cases', () => {
            const result = crunchNumbers(inputData);
            expect(result).toEqual({
                regions: {
                    USA: {
                        country: 'USA',
                        stateData: {
                            CA: {
                                country: 'USA',
                                state: 'CA',
                                lat: 3,
                                long: 44.4,
                                cases: [1, 2, 4]
                            }
                        }
                    }
                }
            })
        });
    });
});