import React from 'react';
import './bar-chart.css';

import { Chart } from 'chart.js';

export interface IProps{
}

interface IState {
}

const ChartConfig: Chart.ChartConfiguration = {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}

class BarChart extends React.Component<IProps, IState> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: IProps){
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        console.log('component did update');
        if(this.canvasRef.current) {
            console.log('making a chart');
            const newchart = new Chart(this.canvasRef.current, ChartConfig)
        }
    }

    public render(){
        return (
            <div className="bar-chart">
                <canvas
                    id="covid-chart-canvas"
                    width="400"
                    height="400"
                    ref={this.canvasRef}></canvas>
            </div>
        );
    }
}

export default BarChart;
