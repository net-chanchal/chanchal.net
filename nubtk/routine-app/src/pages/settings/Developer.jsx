import React from 'react';
import Nav from '../../components/Nav';
import Helper from "../../Helper";
import {Navigate} from "react-router-dom";

class Developer extends React.Component {
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
                    <h3 className="page-title" style={{backgroundImage: 'url("/images/code.svg")'}}>Developer</h3>

                    <div className="developer">
                        <img src={"/images/chanchal.jpg"} width="200" height="200" alt="Chanchal Biswas"/>

                        <div className="developer-info">
                            <p><b>Name </b>Md. Chanchal Biswas</p>
                            <p><b>University </b>NUBTK</p>
                            <p><b>Department </b>CSE</p>
                            <p><b>Student ID </b>11210320654</p>
                            <p><b>Email </b>mchanchalbd@gmail.com</p>
                            <p><b>Website </b><a href="https://chanchal.net">chanchal.net</a></p>
                        </div>
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Developer;