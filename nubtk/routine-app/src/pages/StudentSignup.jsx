import React from 'react';
import {Link, Navigate} from 'react-router-dom';

import Nav from '../components/Nav';
import FormLoading from '../components/FormLoading';
import ButtonLoading from '../components/ButtonLoading';
import Helper from "../Helper";

class StudentSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            error: null,
            form: {
                shift_name: null,
                department_id: null,
                semester_id: null,
                section_id: null
            },
            formError: null,
            isSubmitted: false,
            redirect: false
        };
    }

    visitorTrack(uuid, data) {
        const formData = new FormData();
        formData.append('uuid', uuid);
        formData.append('name', 'student');
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
        fetch(process.env.REACT_APP_API_URL + 'student-signup.php')
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

        if (!form.shift_name || !form.department_id || !form.semester_id || !form.section_id) {
            this.setState({
                formError: 'Every field is required.'
            });
        } else {
            this.setState({
                formError: null,
                isSubmitted: true
            });

            const queryString = `department_id=${form.department_id}&
            section_id=${form.section_id}&
            semester_id=${form.semester_id}&
            shift_name=${form.shift_name}`;

            // Get the filter data and save it to local storage
            fetch(process.env.REACT_APP_API_URL + 'student-routine-filter.php?' + queryString)
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
                        name: 'student',
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

    shifts(data) {
        return (
            <div className="form-group">
                <label htmlFor="shift_name">
                    <select onChange={(e) => this.handleChangeSelect(e.target)} name="shift_name" id="shift_name"
                            className="form-control">
                        <option value="">Choose Shift</option>
                        {data.map((item, key) => {
                            return (<option value={item['shift_name']} key={key}>{item['shift_name']}</option>);
                        })}
                    </select>
                </label>
            </div>
        );
    }

    departments(data) {
        return (
            <div className="form-group">
                <label htmlFor="department_id">
                    <select onChange={(e) => this.handleChangeSelect(e.target)} name="department_id" id="department_id"
                            className="form-control">
                        <option value="">Choose Department</option>
                        {data.map((item, key) => {
                            return (<option value={item['id']} key={key}>{item['department_short_name']}</option>);
                        })}
                    </select>
                </label>
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

    sections(data) {
        return (
            <div className="form-group">
                <label htmlFor="section_id">
                    <select onChange={(e) => this.handleChangeSelect(e.target)} name="section_id" id="section_id"
                            className="form-control">
                        <option value="">Choose Section</option>
                        {data.map((item, key) => {
                            return (<option value={item['id']} key={key}>{item['section_name']}</option>);
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
        const {items, isLoaded, error, formError, isSubmitted, redirect} = this.state;

       if (error !== null) {
           return <p style={{color: 'red'}}>{error.toString()}</p>
       }


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
                        <h4 className="signup-title">Student Signup</h4>
                        <small className="error">{formError}</small>
                        <div>
                            {isLoaded ? this.shifts(items['data']['shifts']) : this.loading()}
                            {isLoaded ? this.departments(items['data']['departments']) : this.loading()}
                            {isLoaded ? this.semesters(items['data']['semesters']) : this.loading()}
                            {isLoaded ? this.sections(items['data']['sections']) : this.loading()}
                        </div>

                        <div className="form-group">
                            {isSubmitted ? <ButtonLoading/> : this.button(isLoaded)}
                        </div>

                        <p className="signup-link"><Link to="/teacher-signup">Teacher Signup</Link></p>
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default StudentSignup;