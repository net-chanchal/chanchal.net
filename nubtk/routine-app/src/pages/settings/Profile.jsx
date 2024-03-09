import React from 'react';
import Nav from '../../components/Nav';
import Helper from "../../Helper";
import {Navigate} from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_name: "",
            student_id: "",
            student_email: "",
            isSubmitted: false,
            formError: null,
            signup: null,
            name: null,
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

        const local = Helper.getLocalStorageData();

        this.setState({
            signup: local['signup'],
            name: local['name'],
            student_name: local.hasOwnProperty('profile') ? local['profile']['student_name'] : '',
            student_id: local.hasOwnProperty('profile') ? local['profile']['student_id'] : '',
            student_email: local.hasOwnProperty('profile') ? local['profile']['student_email'] : '',
            isLoaded: true
        });
    }

    handleChangeInput(target) {
        this.setState((prevState) => ({
            ...prevState,
            [target.name]: target.value,
            formError: null
        }));
    }

    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    saveProfileDataLocal(profile) {
        Helper.setLocalStorageData({
            profile: profile
        });
    }

    handleFormSubmit() {
        if (!this.state.student_name || !this.state.student_id || !this.state.student_email) {
            this.setState({
                formError: 'Every field is required.'
            });
        } else {
            if (!this.isValidEmail(this.state.student_email)) {
                this.setState({
                    formError: 'Invalid your email address.'
                });
            } else {
                this.setState({
                    formError: null,
                    isLoading: true,
                    isSubmitted: true
                });

                const signup = Helper.getLocalStorageData('signup');
                let uuid = Helper.getLocalStorageData('uuid');

                // Save Profile Data
                const profile = {
                    student_name: this.state.student_name,
                    student_id: this.state.student_id,
                    student_email: this.state.student_email
                };

                const formData = new FormData();
                formData.append('student_name', profile.student_name);
                formData.append('student_id', profile.student_id);
                formData.append('student_email', profile.student_email);
                formData.append('department_id', signup['department_id']);
                formData.append('section_id', signup['section_id']);
                formData.append('semester_id', signup['semester_id']);
                formData.append('shift_name', signup['shift_name']);
                formData.append('uuid', uuid);

                fetch(process.env.REACT_APP_API_URL + 'student-profile.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.setState({
                            formError: null,
                            profile: profile,
                            isLoading: false,
                            isSubmitted: false
                        });

                        this.saveProfileDataLocal(profile);
                    })
                    .catch(error => {
                        this.setState({
                            error: error,
                            isLoading: false,
                            isSubmitted: false
                        });
                    });
            }
        }
    }

    studentProfile(local) {
        return local['semester'] + ', ' + local['department'] + ', ' + local['section'];
    }

    teacherProfile() {

    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/student-signup" replace={true}/>
        }

        const {
            student_name,
            student_id,
            student_email,
            isSubmitted,
            formError,
            signup,
            name,
            isLoaded,
            error
        } = this.state;

        if (error) {
            console.log(error);
        }

        if (name === 'teacher') {
            return <Navigate to="/settings" replace={true}/>
        }

        let identify;
        if (isLoaded) {
            identify = (name === 'teacher') ? this.teacherProfile(signup) : this.studentProfile(signup);
        }

        return (
            <>
                <main className="bg-light">
                    <div className="profile">
                        <div className="user-data">
                            <img src={"/images/user.png"} style={{marginTop: "25px"}} width="128" height="128"
                                 alt="User"/>
                            <h4>Md. Chanchal Biswas</h4>
                            <p>{identify}</p>
                        </div>
                    </div>

                    <div className="p-x">
                        <small className="error">{formError}</small>
                        <div>
                            <div className="form-group">
                                <label htmlFor="student_name">
                                    <input onInput={(e) => this.handleChangeInput(e.target)} type="text"
                                           value={student_name}
                                           id="student_name" name="student_name"
                                           className="form-control"
                                           placeholder="Your Name" autoFocus/>
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="student_id">
                                    <input onInput={(e) => this.handleChangeInput(e.target)} type="number"
                                           value={student_id}
                                           id="student_id" name="student_id"
                                           className="form-control"
                                           placeholder="Student ID"/>
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="student_email">
                                    <input onInput={(e) => this.handleChangeInput(e.target)} type="email"
                                           value={student_email}
                                           id="student_email" name="student_email"
                                           className="form-control"
                                           placeholder="Email Address"/>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            {isSubmitted ? <ButtonLoading/> : <button onClick={() => this.handleFormSubmit()}
                                                                      className="save">Save</button>}
                        </div>
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Profile;