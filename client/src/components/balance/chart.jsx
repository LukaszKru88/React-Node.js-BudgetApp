import React, { Component } from 'react';
import { PieChart } from 'react-chartkick'
import 'chart.js'

class Chart extends Component {
    getChartData = (chartData) => {
        const categories = [...new Set(chartData.map(data => data.name))];
        const forChart = Object.values(categories).map(name => {
            const sum = chartData.filter(data => data.name === name).reduce((acc, it) => acc + it.amount, 0)
            return [[name], [sum]]
        });
        return forChart;
    }

    render() {
        const { data } = this.props;
        return (
            <PieChart data={this.getChartData(data)} legend="bottom" donut={true} messages={{ empty: "No data" }} />
        );
    }
}

export default Chart;