import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faHouseUser, faHouseChimney, faHouseChimneyUser } from '@fortawesome/free-solid-svg-icons'
import "./House.css"


const House = ({ price, savings, current, bought, col, row, start, onSelect }) => {

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div className={(bought ? "house col bought text-center btn btn-dark" : "house col canBuy text-center btn btn-dark") + (start ? " start" : "")} onClick={() => onSelect(col, row)}>
            <FontAwesomeIcon icon={current && start ? faHouseChimneyUser : current ? faHouseUser : start ? faHouseChimney : faHouse} size="5x" />
            <p>For sale: £{numberWithCommas(price)}</p>
            <p>{current || bought || start ? "Savings: £" + numberWithCommas(savings) : "???"}</p>
        </div>
    )
}





export default House;




