import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faHouse, faChartColumn } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => (
    <>
        <nav className="navbar navbar-dark bg-dark">

            <div className="container-fluid">
                <span className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#help"><FontAwesomeIcon icon={faCircleQuestion} /></span>

                <h1 className="navbar-brand mb-0">
                    <FontAwesomeIcon icon={faHouse} />&nbsp;
                    <FontAwesomeIcon icon={faHouse} />&nbsp;
                    <strong>Chain Agent</strong>
                    &nbsp;<FontAwesomeIcon icon={faHouse} />
                    &nbsp;<FontAwesomeIcon icon={faHouse} />
                </h1>

                <span className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#stats"><FontAwesomeIcon icon={faChartColumn} /></span>
            </div>
        </nav>

    </>

)

export default Navbar;