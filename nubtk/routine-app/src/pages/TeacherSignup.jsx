import React from 'react';

import Nav from '../components/Nav';
import {Link, Navigate} from "react-router-dom";
import FormLoading from "../components/FormLoading";
import ButtonLoading from "../components/ButtonLoading";
import Helper from "../Helper";

class TeacherSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            error: null,
            form: {
                semester_id: null,
                teacher_id: null
            },
            formError: null,
            formIsLoaded: false,
            redirect: false
        };
    }

    visitorTrack(uuid, data) {
        const formData = new FormData();
        formData.append('uuid', uuid);
        formData.append('name', 'teacher');
        formData.append('data', JSON.stringify(data));

        fetch(process.env.REACT_APP_API_URL + 'visitor.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                //
            })
            .catch(() => {
                //
            });
    }

    getUniqueId() {
        return Date.now().toString();
    }

    componentDidMount() {
        if (!window.navigator.onLine) {
            return;
        }

        fetch(process.env.REACT_APP_API_URL + 'teacher-signup.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    items: data,
                    isLoaded: true
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isLoading: false
                });
            });
    }

    handleChangeSelect(target) {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [target.name]: target.value,
                [target.name.replace('_id', '')]: target.options[target.selectedIndex].text
            },
            formError: null
        }));
    }

    handleClickGoToRoutine() {
        if (!window.navigator.onLine) {
            return;
        }

        const form = this.state.form;

        if (!form.semester_id || !form.teacher_id) {
            this.setState({
                formError: 'Every field is required.'
            });
        } else {
            this.setState({
                formError: null,
                isSubmitted: true
            });

            const queryString = `semester_id=${form.semester_id}&teacher_id=${form.teacher_id}`;

            // Get the filter data and save it to local storage
            fetch(process.env.REACT_APP_API_URL + 'teacher-routine-filter.php?' + queryString)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const uuid = this.getUniqueId();

                    // Store visitor track data
                    this.visitorTrack(uuid, form);

                    // Save Data in Local Storage
                    Helper.setLocalStorageData({
                        name: 'teacher',
                        signup: form,
                        filter: data['data'],
                        uuid: uuid
                    });

                    this.setState({
                        isSubmitted: false,
                        redirect: true
                    });
                })
                .catch(error => {
                    this.setState({
                        error: error,
                        isLoading: false
                    });
                });
        }
    }

    loading() {
        return (
            <div className="form-group">
                <FormLoading/>
            </div>
        );
    }

    semesters(data) {
        return (
            <div className="form-group">
                <label htmlFor="semester_id">
                    <select onChange={(e) => this.handleChangeSelect(e.target)} name="semester_id" id="semester_id"
                            className="form-control">
                        <option value="">Choose Semester</option>
                        {data.map((item, key) => {
                            return (<option value={item['id']} key={key}>{item['semester_name']}</option>);
                        })}
                    </select>
                </label>
            </div>
        );
    }

    teachers(data) {
        return (
            <div className="form-group">
                <label htmlFor="teacher_id">
                    <select onChange={(e) => this.handleChangeSelect(e.target)} name="teacher_id" id="shift_name"
                            className="form-control">
                        <option value="">Choose Teacher</option>
                        {data.map((item, key) => {
                            return (<option value={item['id']}
                                            key={key}>{item['short_name'] + ' - ' + item['full_name']}</option>);
                        })}
                    </select>
                </label>
            </div>
        );
    }

    button(isLoaded) {
        if (isLoaded) {
            return <button onClick={() => this.handleClickGoToRoutine()} className="save">Go to Routine</button>
        } else {
            return <button className="save" style={{opacity: '0.5'}} disabled>Go to Routine</button>
        }
    }

    render() {
        const {items, isLoaded, error, formError, formIsLoaded, redirect} = this.state;

        if (redirect) {
            return <Navigate to="/" replace={true}/>
        }

        return (
            <>
                <main className="bg-light">
                    <div className="registration">
                        <img src={"/logo192.png"} width="120" height="120" alt="Logo"/>
                        <h3>NUBTK Routine App</h3>
                    </div>

                    <div className="p-x">
                        <h4 className="signup-title">Teacher Signup</h4>
                        <small className="error">{formError}</small>
                        <div>
                            {isLoaded ? this.semesters(items['data']['semesters']) : this.loading()}
                            {isLoaded ? this.teachers(items['data']['teachers']) : this.loading()}
                        </div>

                        <div className="form-group">
                            {formIsLoaded ? <ButtonLoading/> : this.button(isLoaded)}
                        </div>

                        <p className="signup-link"><Link to="/student-signup">Student Signup</Link></p>

                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default TeacherSignup;