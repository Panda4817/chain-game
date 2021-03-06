import React, { useState, useEffect } from 'react';
import "../../styles/Modal.css";
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import {WHITE, ORANGE} from "../../constants/colours";

const StatsModal = ({ scores }) => {

    const updateChartData = () => {
        return ({
            labels: [...scores.keys()],
            label: "Grid size",
            datasets: [
                {
                    data: [...scores.values()],
                    backgroundColor: ORANGE,
                    label: "Longest chain"
                }
            ]
        })
    }

    const updateOptions = () => {
        return ({
            plugins: {
                title: {
                    display: true,
                    text: ["Longest housing chain", "per grid size completed"],
                    color: WHITE,
                    font: {
                        size: 20,
                    },
                    
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            let size = parseInt(context.at(0).label);
                            let value = context.at(0).raw;
                            let fullChain = value === size * size ? "FULL CHAIN!" : ""
                            return [`Grid size: ${size}`, fullChain];
                        }
                    },
                    bodyColor: WHITE
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                  title: {
                      display: false,
                  },
                  ticks: {
                      color: WHITE,
                      font: {
                        size: 15
                    },
                    precision: 0,
                  
                  },
                  grid: {
                      color: WHITE,
                      borderWidth: 0
                  },
                  min: 0,
                  sugestedMax: Math.max(...scores.values()),
                },
                x: {
                    title: {
                        display: true,
                        text: "Grid size",
                        color: WHITE,
                        font: {
                            size: 15
                        }
                    },
                    ticks: {
                        color: WHITE,
                        font: {
                            size: 15
                        }
                    },
                    grid: {
                        display: false,
                    }
                }
              }     
        })
    }
    const [chartData, setChartData] = useState(updateChartData());
    const [chartOptions, setChartOptions] = useState(updateOptions());
;
    useEffect(() => {
        setChartData(updateChartData());
        setChartOptions(updateOptions);
      // eslint-disable-next-line 
    },[scores])



    return (
        <div
            className="modal fade"
            id="stats"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title " id="staticBackdropLabel">
                            Score Statistics
                        </h2>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col text-center" style={{position: "relative", height:"75vh", width:"80vw"}}>
                                    {scores.size !== 0 ? <Bar
                                        data={chartData}
                                        options={chartOptions}
                                    /> : "Play the game to generate stats"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsModal;