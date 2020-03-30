import React from 'react'
import { Line } from 'react-chartjs-2'

const LineGraph = (props) => {
    let { title, x, y, width, height } = props

    const dataSets = {
        labels: x,
        datasets: [
            {
                label: title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                data: y
            }
        ]
    };

    var options = {
        scales: {
            xAxes: [{
                stacked: true,
                id: "bar-x-axis1",
                ticks: {
                    fontColor: 'white',
                    precision: 0,
                    beginAtZero: true
                },
                gridLines: {
                    display: true,
                    color: "#333333"
                }
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    beginAtZero: true,
                    fontColor: 'white',
                },
                gridLines: {
                    display: true,
                    color: "#333333"
                }
            }]
        },
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 30,
                fontColor: 'white'
            }
        },
        responsive: true
    };

    return (
        <Line width={width}
            height={height}
            data={dataSets}
            options={options}
        />
    )

}
export default LineGraph