import React from 'react';
import "../../styles/Modal.css";
import start from './start.png';
import next from './next.png';
import chain from './chain.png';

const HelpModal = () => {

    return (
        <div
			className="modal fade"
			id="help"
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
							How to play
						</h2>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="container">
                            <div className="row justify-content-center">
								<div className="col text-center">
									<p className='lead'>You are an estate agent and your goal is to sell houses by completing the housing chain.</p>
                                    <p>1. You start on the purple square - first house and owner. That owner wants to sell their house and buy a new house. You must find the owner a house to buy and later sell their house to complete the chain.</p>
                                    <img className="border border-light" src={start} alt='start' width="100%"/>
                                    <p><br/>2. The house you choose must have a <strong>lower or equal</strong> price to the owner's <strong>house price and savings combined.</strong></p>
                                    <p>3. Choose the house by clicking or tapping on it. When it goes orange, it means it is in the chain and in the process of being sold. You cannot undo this.</p>
                                    <img className="border border-light" src={next} alt='next'  width="100%"/>
                                    <p><br/>4. Now you have moved to that new square - next house and next owner. Their savings will be revealed.</p>
                                    <p>5. You must find the new owner a house to buy.</p>
                                    <p>6. Repeat steps 2, 3, 4 and 5 until the housing chain is complete.</p>
                                    <img className="border border-light" src={chain} alt='chain'  width="100%"/>
                                    <p><br/>All of the orange houses are only sold, when the <strong>first house you started with is also sold</strong> to complete the housing chain.</p>
                                    <p>The more chains you complete, the bigger the grid gets.</p>
                                    <p>If no more houses can be bought because your latest buyer does not have enough funds and the first house in your chain is not sold, then the chain is broken and none of the houses are sold. The grid goes back to the smallest size.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default HelpModal;