import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faHouse, faChartColumn } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => (
    <>
        <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-lg">

            <div className="container">
                <h1 className="navbar-brand m-0">
                    <FontAwesomeIcon icon={faHouse} />&nbsp;<strong>Chain Agent</strong>&nbsp;<FontAwesomeIcon icon={faHouse} />
                </h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse container-fluid justify-content-end' id='navbarItems'>
                    <ul className='navbar-nav'>
                        <li className='nav-item m-1'>
                            <span className="btn btn-dark btn-lg nav-link text-white" data-bs-toggle="modal" data-bs-target="#help"><FontAwesomeIcon icon={faCircleQuestion} /></span>
                        </li>
                        <li className='nav-item m-1'>
                            <span className="btn btn-dark btn-lg nav-link text-white" data-bs-toggle="modal" data-bs-target="#stats"><FontAwesomeIcon icon={faChartColumn} /></span>
                        </li>


                    </ul>

                </div>

            </div>
        </nav>

    </>

)

export default Navbar;