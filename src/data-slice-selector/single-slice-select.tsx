import { observer } from 'mobx-react';
import React from 'react';
import ChartJS from '../chart-js-shim/chart-js';
import { ObservableCovidStore, SubsetSelection } from '../covid-store/covid-store';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, WithStyles, Theme, withStyles } from '@material-ui/core';

export interface IProps extends WithStyles<typeof styles> {
    dataSlice: SubsetSelection;
    countryChanged: (country: string) => void;
    stateChanged: (state: string) => void;
    dataSelectionOptions: {[country: string]: string[]};
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
class SingleSliceSelect extends React.Component<IProps, IState> {
    public render(){
        const selected = this.props.dataSlice;
        const options = this.props.dataSelectionOptions;

        return (
            <span className="select-container">
                <FormControl className={this.props.classes.formControl}>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                        labelId="country-select-label"
                        id="country-select"
                        value={selected?.country ?? 'None'}
                        onChange={(event) => this.props.countryChanged(event.target.value as string)}
                    >
                        {Object.keys(options).map(country => (
                            <MenuItem value={country} key={country}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {
                    selected.country && options[selected.country] && options[selected.country].length > 0 &&
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel id="state-select-label">State</InputLabel>
                        <Select
                            labelId="state-select-label"
                            id="state-select"
                            value={selected.state ?? 'None'}
                            onChange={(event) => this.props.stateChanged(event.target.value as string)}
                        >
                            <MenuItem value={'None'}>Whole Country</MenuItem>
                            {selected.country && options[selected.country]?.map(state =>(
                                <MenuItem value={state} key={state}>{state}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
            </span>
        );
    }
}

export default withStyles(styles)(SingleSliceSelect);
