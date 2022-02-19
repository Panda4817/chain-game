import React, { useEffect, useState } from 'react';
import GameOverModal from '../GameOverModal/GameOverModal';
import House from '../House/House';
import { Modal } from 'bootstrap'

const MIN_GRID = 3;
const MAX_PRICE = 100;
const MIN_PRICE = 10;
const MAX_SAVINGS = 45;
const MIN_SAVINGS = 2;

const Grid = () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const [longestChain, setLongestChain] = useState(() => {
        const longestChainString = localStorage.getItem('longestChain');
        return JSON.parse(longestChainString) ?? 0;
    })
    const [biggestGrid, setbiggestGrid] = useState(() => {
        const biggestGridString = localStorage.getItem('biggestGrid');
        return JSON.parse(biggestGridString) ?? MIN_GRID-1;
    })
    const [gridSize, setGridSize] = useState(MIN_GRID);
    const [current, setCurrent] = useState({ row: getRandomInt(0, gridSize), col: getRandomInt(0, gridSize) });
    

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
                    bought: false });
            }
            grid.push(currentRow);
        }
        return grid;
    }

    const [houseCount, setHouseCount] = useState(0);
    const [grid, setGrid] = useState(resetGrid());
    const [chain, setChain] = useState(false);

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
            setCurrent({row: row, col: col});
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

    const selected = (col, row) => {
        let currentHouse = grid.at(current.row).at(current.col);
        let chosenHouse = grid.at(row).at(col);
        if (chosenHouse.price <= (currentHouse.price + currentHouse.savings) && chosenHouse.start === false) {
            updateGrid(col, row, chosenHouse, currentHouse);
            if (isGameOver(chosenHouse, col, row)) {
                new Modal(document.getElementById('gameOver')).show();
            }
        } else if (chosenHouse.price <= (currentHouse.price + currentHouse.savings) && chosenHouse.start === true) {
            updateGrid(col, row, chosenHouse, currentHouse);
            setChain(true);
            localStorage.setItem("biggestGrid", JSON.stringify(gridSize));
            setbiggestGrid(gridSize)
            new Modal(document.getElementById('gameOver')).show();
        }
    }

    const checkLongestChain = () => {
        if (houseCount > longestChain) {
            localStorage.setItem("longestChain", JSON.stringify(houseCount));
        }
        setLongestChain(houseCount);

    }

    const reset = () => {
        if (chain) {
            setGridSize(gridSize + 1);
        } else {
            setGridSize(MIN_GRID);
        }
        new Modal(document.getElementById('gameOver')).hide();
    }


    useEffect(() => {
        if (chain) {
            checkLongestChain();
        }
    // eslint-disable-next-line     
    }, [chain])


    useEffect(() => {
        setCurrent({row: getRandomInt(0,gridSize), col: getRandomInt(0, gridSize)});
        setHouseCount(0);
        setChain(false);
    }, [gridSize])

    
    useEffect(() => {
        if (houseCount === 0)  {
            setGrid(resetGrid());
        }
    // eslint-disable-next-line    
    }, [houseCount])


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
                                    onSelect={house.bought === false ? selected : () => {}}
                                    
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