import React, { Component } from 'react';

function Conditional(props) {
    console.log(props.renderFiles.renderFiles)
    if (props.renderFiles.renderFiles === 1) {
        return (
            <div>
                ADD ALL THE MYFILES STUFF HERE
            </div>
        )
    } else if (props.renderFiles.renderFiles === 2) {
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