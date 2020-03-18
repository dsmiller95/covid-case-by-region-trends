import { observer } from 'mobx-react';
import React from 'react';
import ChartJS from '../chart-js-shim/chart-js';
import { ObservableCovidStore } from '../covid-store/covid-store';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, WithStyles, Theme, withStyles } from '@material-ui/core';

export interface IProps extends WithStyles<typeof styles> {
    dataStore: ObservableCovidStore;
}

interface IState {
}

const styles = (theme: Theme) => createStyles(
{
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
});

@observer
class DataSliceSelector extends React.Component<IProps, IState> {
    public render(){
        const covidStore = this.props.dataStore;
        const options = covidStore.validDataSelection;
        const selected = covidStore.selectedDataSet;
        
        function countryChanged(country: string){
            if(covidStore.selectedDataSet){
                covidStore.setSelectedDataSet({...covidStore.selectedDataSet, country});
            } else {
                covidStore.setSelectedDataSet({state: undefined, country});
            }
        }
        function stateChanged(state: string){
            if(covidStore.selectedDataSet){
                covidStore.setSelectedDataSet({...covidStore.selectedDataSet, state});
            }
        }

        return (
            <div className="select-container">
                <FormControl className={this.props.classes.formControl}>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                        labelId="country-select-label"
                        id="country-select"
                        value={selected?.country ?? ''}
                        onChange={(event) => countryChanged(event.target.value as string)}
                    >
                        {Object.keys(options).map(country => (
                            <MenuItem value={country} key={country}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={this.props.classes.formControl}>
                    <InputLabel id="state-select-label">State</InputLabel>
                    <Select
                        labelId="state-select-label"
                        id="state-select"
                        value={selected?.state ?? ''}
                        onChange={(event) => stateChanged(event.target.value as string)}
                    >
                        <MenuItem value={undefined}>Whole Country</MenuItem>
                        {selected?.country && options[selected.country].map(state =>(
                            <MenuItem value={state} key={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(DataSliceSelector);
