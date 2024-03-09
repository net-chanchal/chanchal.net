import React from 'react';
import Nav from '../../components/Nav';
import Helper from "../../Helper";
import {Navigate} from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";

class Network extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            local: null,
            signupName: null,
            isSubmitted: false,
            isDownload: false,
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

        const local = Helper.getLocalStorageData();
        this.setState({
            local: local['signup'],
            signupName: local['name'],
            isDownload: !!(local['download'])
        })
    }

    fetchData() {
        this.setState({
            isSubmitted: true
        });

        const data = Helper.getLocalStorageData();
        const queryParameters = new URLSearchParams(data['signup']).toString()

        let url = '';

        if (data.name === 'teacher') {
            // Teacher Routine API URL
            url = process.env.REACT_APP_API_URL + 'teacher-routine.php?' + queryParameters;
        } else {
            // Student Routine API URL
            url = process.env.REACT_APP_API_URL + 'student-routine.php?' + queryParameters;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    isLoaded: true,
                    isSubmitted: false,
                    isDownload: true
                });

                Helper.setLocalStorageData({download: data['data']});
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isLoading: false,
                    isSubmitted: false
                });
            });
    }

    handleClickOfflineDownload() {
        if (!window.navigator.onLine) {
            return;
        }

        this.fetchData();
    }

    handleClickRemoveDownloadedRoutine() {
        const local = Helper.getLocalStorageData();
        if (local.hasOwnProperty('download')) {
            Helper.removeLocalStorage('download');
            this.setState({
                isDownload: false
            })
        }
    }

    removeOfflineRoutine() {
        const local = Helper.getLocalStorageData();

        return (
            local['download'] ?
                <div className="form-group">
                    <button onClick={() => this.handleClickRemoveDownloadedRoutine()}
                            style={{backgroundColor: '#d5d5d5', color: '#3a3a3a'}} className="save">Remove
                    </button>
                </div> : ''
        )
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/student-signup" replace={true}/>
        }

        const {local, signupName, isSubmitted, isDownload} = this.state;

        let willDownload = '';

        if (local) {
            if (signupName === 'teacher') {
                willDownload = local['semester'] + ', ' + local['teacher'];
            } else {
                willDownload = local['semester'] + ', ' + local['department'] + ' '
                    + local['section'] + ', ' + local['shift_name'];
            }
        }

        return (
            <>
                <main className="p-x bg-light">
                    <h3 className="page-title" style={{backgroundImage: 'url("/images/wifi.svg")'}}>Network
                        Environment</h3>

                    <div className="network">
                        <p>If you want to access routines without internet connection then you can download
                            offline.<br/><br/>
                            But if the internet is on, the routine will be managed online.</p>

                        <p className="download">
                            <b>{isDownload ? <span style={{color: "green"}}>Already downloaded:</span> :
                                <span>Will be download:</span>} </b>
                            {willDownload}
                        </p>

                        <div className="form-group">
                            {isSubmitted ? <ButtonLoading/> : <button onClick={() => this.handleClickOfflineDownload()}
                                                                      className="save">{(isDownload) ? 'Update Routine' : 'Download Offline'}</button>}
                        </div>

                        {this.removeOfflineRoutine()}
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Network;