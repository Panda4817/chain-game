import React, { useEffect, useState } from 'react';
import GameOverModal from '../GameOverModal/GameOverModal';
import House from '../House/House';
import { Modal } from 'bootstrap';
import { MAX_PRICE, MAX_SAVINGS, MIN_GRID, MIN_PRICE, MIN_SAVINGS } from '../../constants/gameConstants';
import {getRandomInt} from '../../utils/helpers';

const Grid = ({longestChain, setLongestChain, biggestGrid, setbiggestGrid, scores, setScores}) => {

    const resetGrid = () => {
        let grid = [];
        for (let row = 0; row < gridSize; row++) {
            let currentRow = [];
            for (let col = 0; col < gridSize; col++) {
                currentRow.push({
                    price: getRandomInt(MIN_PRICE, MAX_PRICE) * 10000,
                    savings: getRandomInt(MIN_SAVINGS, MAX_SAVINGS) * 10000,
                    current: row === current.row && col === current.col ? true : false,
                    start: row === current.row && col === current.col ? true : false,
                    bought: false
                });
            }
            grid.push(currentRow);
        }
        return grid;
    }
   
    const [gridSize, setGridSize] = useState(MIN_GRID);
    const [current, setCurrent] = useState({ row: getRandomInt(0, gridSize), col: getRandomInt(0, gridSize) });
    const [houseCount, setHouseCount] = useState(0);
    const [grid, setGrid] = useState(resetGrid());
    const [chain, setChain] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const updateGrid = (col, row, chosenHouse, currentHouse) => {
        setHouseCount(houseCount + 1);
        setGrid(() => {
            let newGrid = [];
            for (let r = 0; r < gridSize; r++) {
                let currentRow = [];
                for (let c = 0; c < gridSize; c++) {
                    if (c === col && r === row) {
                        chosenHouse.bought = true;
                        chosenHouse.current = true;
                        currentRow.push(chosenHouse);
                    } else if (c === current.col && r === current.row) {
                        currentHouse.current = false;
                        currentRow.push(currentHouse);
                    } else {
                        currentRow.push(grid.at(r).at(c));
                    }

                }
                newGrid.push(currentRow);
            }
            return newGrid;
        });
        setCurrent({ row: row, col: col });
    }

    const isGameOver = (chosenHouse, col, row) => {
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (row === r && col === c) {
                    continue;
                }
                if (grid.at(r).at(c).bought === true) {
                    continue;
                }
                if (grid.at(r).at(c).price <= (chosenHouse.price + chosenHouse.savings)) {
                    return false;
                }
            }
        }
        return true;
    }

    const showGameOverModal = () => {
        const target = document.getElementById('gameOver');
        const modal = new Modal(target);
        modal.show();
    }

    const notChosenCurrentHouse = (col, row) => {
        return !(current.row === row && current.col === col);
    }

    const selected = (col, row) => {
        let currentHouse = grid.at(current.row).at(current.col);
        let chosenHouse = grid.at(row).at(col);
        if (chosenHouse.price <= (currentHouse.price + currentHouse.savings) && chosenHouse.start === false && notChosenCurrentHouse(col, row)) {
            updateGrid(col, row, chosenHouse, currentHouse);
            if (isGameOver(chosenHouse, col, row)) {
                showGameOverModal();
            }
        } else if (chosenHouse.price <= (currentHouse.price + currentHouse.savings) && chosenHouse.start === true && notChosenCurrentHouse(col, row)) {
            updateGrid(col, row, chosenHouse, currentHouse);
            setChain(true);
            showGameOverModal();
        }
    }

    const checkLongestChain = () => {
        if (houseCount > longestChain) {
            localStorage.setItem('longestChain', JSON.stringify(houseCount));
            setLongestChain(houseCount);
        }

    }

    const checkBiggestChain = () => {
        if (gridSize > biggestGrid) {
            localStorage.setItem('biggestGrid', JSON.stringify(gridSize));
            setbiggestGrid(gridSize);
        }
    }

    const updateScores = () => {
        if (scores.has(gridSize)) {
            scores.set(gridSize, Math.max(scores.get(gridSize), houseCount));
        } else {
            scores.set(gridSize, houseCount);
        }
        localStorage.setItem('scores', JSON.stringify([...scores]));
    }

    useEffect(() => {
        if (chain) {
            checkLongestChain();
            checkBiggestChain();
            updateScores();
        }
        // eslint-disable-next-line     
    }, [chain])

    const reset = () => {
        if (chain) {
            setGridSize(gridSize + 1);
        } else {
            setGridSize(MIN_GRID);
        }
        setGameOver(true);
    }

    useEffect(() => {
        setCurrent({ row: getRandomInt(0, gridSize), col: getRandomInt(0, gridSize) });
        setHouseCount(0);
        setChain(false);
        setGameOver(false)
        setScores(new Map(JSON.parse(localStorage.getItem('scores'))));
        // eslint-disable-next-line 
    }, [gameOver])


    useEffect(() => {
        if (houseCount === 0) {
            setGrid(resetGrid());
        }
        // eslint-disable-next-line    
    }, [current])


    return (
        <div className='container'>
            {grid.map((row, rowId) => {
                return (
                    <div className='row' key={rowId}>
                        {row.map((house, houseId) => {
                            return (
                                <House
                                    price={house.price}
                                    savings={house.savings}
                                    current={house.current}
                                    bought={house.bought}
                                    start={house.start}
                                    key={houseId}
                                    col={houseId}
                                    row={rowId}
                                    onSelect={house.bought === false ? selected : () => { }}

                                />
                            )
                        })}
                    </div>
                )
            })}
            <GameOverModal
                score={houseCount}
                total={gridSize * gridSize}
                chain={chain}
                reset={reset}
                longestChain={longestChain}
                biggestGrid={biggestGrid}
            />
        </div>
    )
}

export default Grid;