import { observer } from 'mobx-react';
import React from 'react';
import './App.css';
import BarChart from './bar-chart/bar-chart';
import { ObservableCovidStore } from './covid-store/covid-store';
import logo from './logo.svg';

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
          <img src={logo} className="App-logo" alt="logo" />
          <BarChart dataStore={this.dataStore}></BarChart>
        </header>
      </div>
    );
  }
}

export default App;
