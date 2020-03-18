import { createStyles, IconButton, Theme, WithStyles, withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { ObservableCovidStore } from '../covid-store/covid-store';
import SingleSliceSelect from './single-slice-select';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
        
        function countryChanged(country: string, index: number){
            covidStore.countrySliceSelected(country === "None" ? undefined : country, index);
        }
        function stateChanged(state: string, index: number){
            covidStore.stateSliceSelected(state === "None" ? undefined : state, index);
        }

        return (
            <div className="select-container">
                <IconButton onClick={() => covidStore.addNewSliceSelection()}>
                    <AddIcon></AddIcon>
                </IconButton>
                {covidStore.selectedDataSets.map((dataSelection, index) =>
                <div key={index}>
                    <IconButton onClick={() => covidStore.removeSliceSelection(index)}>
                        <RemoveIcon></RemoveIcon>
                    </IconButton>
                    <SingleSliceSelect
                        countryChanged={(country) => countryChanged(country, index)}
                        stateChanged={(state) => stateChanged(state, index)}
                        dataSlice={dataSelection}
                        dataSelectionOptions={covidStore.validDataSelection}
                    ></SingleSliceSelect>
                </div>)}
                
            </div>
        );
    }
}

export default withStyles(styles)(DataSliceSelector);
