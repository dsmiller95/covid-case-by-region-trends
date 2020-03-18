import { observer } from 'mobx-react';
import React from 'react';
import './App.css';
import BarChart from './bar-chart/bar-chart';
import { ObservableCovidStore } from './covid-store/covid-store';
import logo from './logo.svg';
import DataSliceSelector from './data-slice-selector/data-slice-selector';

@observer
class App extends React.Component {
  private dataStore: ObservableCovidStore;
  constructor(props: {}){
    super(props);
    this.dataStore = new ObservableCovidStore();
  }

  public render(){
    return (
      <div className="App">
        <header className="App-header">
          <DataSliceSelector dataStore={this.dataStore}></DataSliceSelector>
          <BarChart dataStore={this.dataStore}></BarChart>
        </header>
      </div>
    );
  }
}

export default App;
