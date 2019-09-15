import React, { Component } from 'react';
import MyFiles from "./MyFiles"
import Profile from "./Profile"

function Conditional(props) {

    console.log(props.renderFiles)
    if (props.renderFiles === 2) {
        return (
            <div>
                <div className="new-status">
                    <div className="col-md-12">

                        Name of Medicine:
                                  <input type="text" value={props.status1} onChange={e => props.handleNewStatusChange(e, 'status1')} />
                        Dosage:
                                  <input type="text" value={props.status2} onChange={e => props.handleNewStatusChange(e, 'status2')} />
                        Experienced Side Effects:
                                  <input type="text" value={props.status3} onChange={e => props.handleNewStatusChange(e, 'status3')} />

                        <div className="col-md-12 statuses">
                            {props.isLoading && <span>Loading...</span>}
                            {(Array.from(props.statuses || [])).map((status) => (
                                <div className="status" key={status.id}>
                                    {status.text}
                                </div>
                            )
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <br />
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={e => props.handleNewStatusSubmit(e)}
                        >
                            Submit
                                  </button>
                    </div>
                </div>
            </div>
        )
    } else if (props.renderFiles === 2) {
        return (
            <div>
                ADD ALL THE SEND FILES STUFF HERE
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
    this.setState({ renderFiles: 0 })
}
export default Conditional