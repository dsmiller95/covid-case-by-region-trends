import { Chart } from 'chart.js';
import { observer } from 'mobx-react';
import React from 'react';

export interface IProps{
    chartConfig: Chart.ChartConfiguration;
}

interface IState {
}

@observer
class ChartJS extends React.Component<IProps, IState> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: IProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        console.log('component did update');
        if(this.canvasRef.current) {
            console.log('making a chart');
            new Chart(this.canvasRef.current, this.props.chartConfig)
        }
    }

    public render(){
        return (
            <canvas
                id="covid-chart-canvas"
                width="400"
                height="400"
                ref={this.canvasRef}></canvas>
        );
    }
}

export default ChartJS;
