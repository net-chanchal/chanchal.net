import React from 'react';
import Nav from '../../components/Nav';
import Helper from "../../Helper";
import {Navigate} from "react-router-dom";

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        if (!Helper.isSignup()) {
            this.setState({
                redirect: true
            });

            return 0;
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/student-signup" replace={true}/>
        }

        return (
            <>
                <main className="p-x bg-light">
                    <h3 className="page-title" style={{backgroundImage: 'url("/images/notification.svg")'}}>Notification</h3>

                    <div className="notification">
                        <p>If you want to receive an alert notification before the class starts, you can set it.</p>

                        <div className="form-group">
                            <label htmlFor="">
                                <select name="" id="" className="form-control">
                                    <option value="">Off</option>
                                    <option value="">Before 5 minutes</option>
                                    <option value="">Before 10 minutes</option>
                                    <option value="">Before 15 minutes</option>
                                    <option value="">Before 30 minutes</option>
                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <button className="save">SAVE</button>
                        </div>
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Notification;