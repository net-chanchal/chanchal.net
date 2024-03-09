import React from 'react';

class RestartDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="popup-window" style={{display: this.props.display}}>
                <div className="dialog">
                    <div className="header">
                        <h4>Are you confirm to restart?</h4>
                    </div>
                    <div className="body">
                        If you reset it, it will be a fresh setup.
                    </div>
                    <div className="footer">
                        <button onClick={() => {
                            if (this.props.onClickDialogClose) {
                                this.props.onClickDialogClose();
                            }
                        }}>CANCEL</button>
                        <button onClick={() => {
                            if (this.props.onClickDialogRestart) {
                                this.props.onClickDialogRestart();
                            }
                        }}>CONFIRM</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestartDialog;