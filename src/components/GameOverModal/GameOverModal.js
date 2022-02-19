import React from 'react';
import "./Modal.css";

const GameOverModal = ({score, total, reset, chain, longestChain, biggestGrid}) => {
    const getWinnerMsg = (score) => {
        if (chain === false) {
            return "You have a broken chain! Maybe you should rethink your career as an estate agent!"
        }
        if (score <= (Math.floor(0.25 * total))) {
            return "At least the chain is complete, even though it is tiny. No bonus for you.";
        } else if (score <= (Math.floor(0.5 * total))) {
            return "Good work! About half the houses are in the chain. You get a small bonus for your effort.";
        } else if (score <= Math.floor(0.75 * total)) {
            return "Amazing work on the long chain! You get a large bonus!";
        } else {
            return "Phenomenal job! You are an estate agent magician! You get a massive bonus and a PROMOTION! Time to celebrate!";
        }
    }
    return (
        <div
			className="modal fade"
			id="gameOver"
			data-backdrop="static"
			data-keyboard="false"
			tabIndex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h2 className="modal-title " id="staticBackdropLabel">
							{chain ? "Chain complete" : "Uh Oh! Broken chain"}
						</h2>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={() => reset()}></button>
					</div>
					<div className="modal-body">
						<div className="container">
                            <div className="row justify-content-center">
								<div className="col text-center">
									<h3>{chain === false ? "You were going to sell " : "You sold "} {score} {score === 1 ? "house" : "houses"} {chain === false ? " however..." : ""}</h3>
									<p className='lead'>
										{getWinnerMsg(score, total)}
									</p>
								</div>
							</div>
                            <div className="row justify-content-center">
								<div className="col text-center">
									<h3>Your longest Chain: <p>{longestChain}</p></h3>
                                    <h3>Biggest grid size completed: <p>{biggestGrid === 2 ? "none yet" : biggestGrid + "x" + biggestGrid}</p></h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default GameOverModal;