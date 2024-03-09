import React from 'react';
import {Link, Navigate} from 'react-router-dom';

import Nav from '../components/Nav';
import Helper from '../Helper';
import RestartDialog from "../components/RestartDialog";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            redirectUrl: "/student-signup",
            name: null,
            signup: null,
            isLoaded: false,
            profile: null,
            redirect: false
        };
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
            signup: local['signup'],
            name: local['name'],
            profile: local.hasOwnProperty('profile') ? local['profile'] : null,
            isLoaded: true
        });
    }

    handleClickRestart() {
        this.setState({
            showDialog: true
        });
    }

    handleClickDialogClose() {
        this.setState({
            showDialog: false
        });
    }

    handleClickDialogRestart() {
        const local = Helper.getLocalStorageData();

        if (local.name === 'teacher') {
            // Set data for teacher
            this.setState({
                redirectUrl: "/teacher-signup"
            });
        } else {
            // Set data for student
            this.setState({
                redirectUrl: "/student-signup"
            });
        }

        if (Helper.removeLocalStorage()) {
            this.handleClickDialogClose();
        }
    }

    goToProfile() {
        return (
            <Link to="/settings/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#5c376a" height="20"
                     viewBox="0 -960 960 960" width="20">
                    <path
                        d="M211-205.346h46.231l372.002-372.002-46.231-46.23L211-251.576v46.23Zm537.653-411.655L622.54-742.691l49.73-49.73q16.808-16.808 40.172-16.558 23.365.25 39.865 16.865l45.961 45.962q16.307 16.499 16.519 39.652.211 23.154-16.096 39.461l-50.038 50.038ZM709-577.04 281.153-149.386H155.04v-126.113l427.847-427.654L709-577.04Zm-103.075-23.615-22.923-22.923 46.231 46.23-23.308-23.307Z"/>
                </svg>
            </Link>
        );
    }


    render() {
        const {redirectUrl, name, signup, isLoaded, profile, redirect} = this.state;

        if (redirect) {
            return <Navigate to={redirectUrl} replace={true}/>
        }

        let profileName;
        let identify;

        if (isLoaded) {
            if (name === 'teacher') {
                profileName = signup['teacher'];
                identify = signup['semester']
            } else {
               if (profile) {
                   profileName = profile['student_name'];
               } else {
                   profileName = "Update Your Profile"
               }

                identify = signup['semester'] + ', ' + signup['department'] + ', ' + signup['section'];
            }
        }

        return (
            <>
                <RestartDialog
                    display={this.state.showDialog ? "flex" : "none"}
                    onClickDialogRestart={() => this.handleClickDialogRestart()}
                    onClickDialogClose={() => this.handleClickDialogClose()}
                />

                <main className="bg-light">
                    <div className="p-x">
                        <h3 className="page-title"
                            style={{backgroundImage: 'url("/images/settings.svg")'}}>Settings</h3>
                        <div className="user-data">
                            <img src={"/images/user.png"} width="128" height="128" alt="User"/>
                            <h4>{profileName}
                                {isLoaded && name !== 'teacher' ? this.goToProfile() : null}
                            </h4>
                            <p>{identify}</p>
                        </div>
                    </div>

                    <div className="setting-options">
                        <Link to="/settings/notification" className="setting-btn">
                            <img src={"/images/notification.svg"} alt=""/>
                            Notification
                            <img src={"/images/arrow-right.svg"} className="arrow" alt=""/>
                        </Link>

                        <Link to="/settings/help" className="setting-btn">
                            <img src={"/images/info.svg"} alt=""/>
                            Help
                            <img src={"/images/arrow-right.svg"} className="arrow" alt=""/>
                        </Link>

                        <Link to="/settings/network" className="setting-btn">
                            <img src={"/images/wifi.svg"} alt=""/>
                            Network Environment
                            <img src={"/images/arrow-right.svg"} className="arrow" alt=""/>
                        </Link>

                        <Link to="/settings/developer" className="setting-btn">
                            <img src={"/images/code.svg"} alt=""/>
                            About Developer
                            <img src={"/images/arrow-right.svg"} className="arrow" alt=""/>
                        </Link>

                        <Link to="" onClick={() => this.handleClickRestart()} className="setting-btn">
                            <img src={"/images/restart.svg"} alt=""/>
                            Restart
                            <img src={"/images/arrow-right.svg"} className="arrow" alt=""/>
                        </Link>
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Settings;