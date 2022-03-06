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
    const [chartData, setChartData] = useState(updateChartData())

    useEffect(() => {
        setChartData(updateChartData());
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
                                <div className="col text-center">
                                    {scores.size !== 0 ? <Bar
                                        data={chartData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: "Longest housing chain for each grid size completed",
                                                    color: WHITE,
                                                    font: {
                                                        size: 20
                                                    }
                                                },
                                                legend: {
                                                    display: false,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        title: (context) => "Grid size: " + context.at(0).label
                                                    },
                                                    bodyColor: WHITE
                                                }
                                            },
                                            responsive: true,
                                            scales: {
                                                y: {
                                                  title: {
                                                      display: true,
                                                      text: "Chain length",
                                                      color: WHITE,
                                                      font: {
                                                          size: 20
                                                      }
                                                  },
                                                  ticks: {
                                                      color: WHITE,
                                                      font: {
                                                        size: 20
                                                    },
                                                    precision: 0,
                                                  
                                                  },
                                                  grid: {
                                                      color: WHITE,
                                                      borderWidth: 0
                                                  }
                                                },
                                                x: {
                                                    title: {
                                                        display: true,
                                                        text: "Grid size",
                                                        color: WHITE,
                                                        font: {
                                                            size: 20
                                                        }
                                                    },
                                                    ticks: {
                                                        color: WHITE,
                                                        font: {
                                                            size: 20
                                                        }
                                                    },
                                                    grid: {
                                                        display: false,
                                                    }
                                                }
                                              }     
                                        }}
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