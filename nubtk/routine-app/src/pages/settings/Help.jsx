import React from 'react';
import Nav from '../../components/Nav';
import Helper from "../../Helper";
import {Navigate} from "react-router-dom";

class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoaded: false,
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

        fetch(process.env.REACT_APP_API_URL + 'help.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    data: data['help'],
                    isLoaded: true
                });
            })
            .catch(error => {
                this.setState({
                    error: error
                });
            });
    }

    loading() {
        return <img style={{
            filter: "brightness(0.5)",
            display: "block",
            margin: "0 auto"
        }} src={"/images/loading.svg"} alt="Loading"/>
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/student-signup" replace={true}/>
        }

        const {isLoaded, data} = this.state;

        return (
            <>
                <main className="p-x bg-light">
                    <h3 className="page-title" style={{backgroundImage: 'url("/images/info.svg")'}}>Notification</h3>

                    <div className="help">
                        {isLoaded ? <div dangerouslySetInnerHTML={{__html: data}}/> : this.loading()}

                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Help;