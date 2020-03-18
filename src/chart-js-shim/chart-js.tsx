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
    private chartReference?: Chart;

    constructor(props: IProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        if(this.canvasRef.current) {
            this.chartReference = new Chart(
                this.canvasRef.current,
                this.props.chartConfig)
        }
    }

    public render(){
        if(this.chartReference && this.props.chartConfig.data){
            this.chartReference.data = this.props.chartConfig.data;
            this.chartReference.update();
        }
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
