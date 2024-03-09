import React from 'react';
import {Navigate} from 'react-router-dom';

import Nav from '../components/Nav';
import Helper from "../Helper";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        const local =  Helper.getLocalStorageData();

        if (local && local.name === 'teacher') {
            // Set data for teacher
            this.state = {
                items: [],
                isLoaded: false,
                error: null,
                form: {
                    semester_id: "",
                    teacher_id: "",

                    course_id: "",
                    day: "",
                    time_id: "",
                    room_id: ""
                },
                formError: null,
                isSubmitted: false,
                redirect: false,
            }
        } else {
            // Set data for student
            this.state = {
                items: [],
                isLoaded: false,
                error: null,
                form: {
                    shift_name: "",
                    department_id: "",
                    semester_id: "",
                    section_id: "",

                    course_id: "",
                    day: "",
                    time_id: "",
                    room_id: "",
                    teacher_id: "",
                },
                formError: null,
                isSubmitted: false,
                redirect: false,
                redirectLogin: false
            }
        }

    }

    componentDidMount() {
        if (!Helper.isSignup()) {
            this.setState({
                redirectLogin: true
            });

            return 0;
        }

        const local = Helper.getLocalStorageData();

        if (local.name === 'teacher') {
            // Data set for teacher
            this.setState((prevState) => ({
                items: local['filter'],
                isLoaded: true,
                form: {
                    ...prevState.form,
                    semester_id: local['signup']['semester_id'],
                    teacher_id: local['signup']['teacher_id']
                },
            }));
        } else {
            // Data set for student
            this.setState((prevState) => ({
                items: local['filter'],
                isLoaded: true,
                form: {
                    ...prevState.form,
                    shift_name: local['signup']['shift_name'],
                    department_id: local['signup']['department_id'],
                    semester_id: local['signup']['semester_id'],
                    section_id: local['signup']['section_id']
                },
            }));
        }
    }

    handleChangeSelect(target) {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [target.name]: target.value},
                formError: null
        }));
    }

    handleClickFindRoutine() {
        if (!window.navigator.onLine && !Helper.getLocalStorageData('download')) {
            return;
        }

        Helper.setLocalStorageData({
            find: this.state.form
        });

        this.setState({
            redirect: true
        });

    }

    handleClickReset() {
        const local = Helper.getLocalStorageData();

        if (local.name === 'teacher') {
            // Set data for teacher
            this.setState((prevState) =>({
                form: {
                    ...prevState.form,
                    course_id: "",
                    day: "",
                    time_id: "",
                    room_id: ""
                }
            }));
        } else {
            // Set data for student
            this.setState((prevState) =>({
                form: {
                    ...prevState.form,
                    course_id: "",
                    day: "",
                    time_id: "",
                    room_id: "",
                    teacher_id: ""
                }
            }));
        }

    }


    render() {
        if (this.state.redirectLogin) {
            return <Navigate to="/student-signup" replace={true}/>
        }

        const {items, isLoaded, form, redirect} = this.state;
        const {courses, days, rooms, teachers, times} = items;
        const local = Helper.getLocalStorageData();


        if (redirect) {
            return <Navigate to="/" replace={true}/>
        }

        return (
            <>
                <main className="p-x bg-light">
                    <h3 className="page-title" style={{backgroundImage: 'url("/images/filter.svg")'}}>Filter
                        Routine</h3>
                    <div>
                        <div className="form-group">
                            <label htmlFor="course_id">
                                <select value={form['course_id']} onChange={(e) => this.handleChangeSelect(e.target)} name="course_id"
                                        id="course_id" className="form-control">
                                    <option value="">Choose Course</option>
                                    {isLoaded ?
                                        courses.map((item, key) => {
                                            return <option
                                                value={item['id']}
                                                key={key}>{item['course_code']} - {item['course_title']}</option>
                                        }) : null
                                    }
                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="day">
                                <select value={form['day']} onChange={(e) => this.handleChangeSelect(e.target)} name="day" id="day"
                                        className="form-control">
                                    <option value="">Choose Day</option>
                                    {isLoaded ?
                                        days.map((item, key) => {
                                            return <option
                                                value={item['day']} key={key}>{item['day']}</option>
                                        }) : null
                                    }
                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="time_id">
                                <select value={form['time_id']} onChange={(e) => this.handleChangeSelect(e.target)} name="time_id" id="time_id"
                                        className="form-control">
                                    <option value="">Choose Time</option>
                                    {isLoaded ?
                                        times.map((item, key) => {
                                            return <option
                                                value={item['id']}
                                                key={key}>{item['start_time12']} - {item['end_time12']}</option>
                                        }) : null
                                    }
                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="room_id">
                                <select value={form['room_id']} onChange={(e) => this.handleChangeSelect(e.target)} name="room_id" id="room_id"
                                        className="form-control">
                                    <option value="room_id">Choose Room</option>
                                    {isLoaded ?
                                        rooms.map((item, key) => {
                                            return <option
                                                value={item['id']} key={key}>{item['room_title']}</option>
                                        }) : null
                                    }
                                </select>
                            </label>
                        </div>

                        {isLoaded && local.name === 'student' ? (<div className="form-group">
                            <label htmlFor="teacher_id">
                                <select value={form['teacher_id']} onChange={(e) => this.handleChangeSelect(e.target)} name="teacher_id"
                                        id="teacher_id" className="form-control">
                                    <option value="">Choose Teacher</option>
                                    {isLoaded ?
                                        teachers.map((item, key) => {
                                            return <option
                                                value={item['id']}
                                                key={key}>{item['short_name']} - {item['full_name']}</option>
                                        }) : null
                                    }
                                </select>
                            </label>
                        </div>) : null}

                        <div className="form-group filter-button">
                            <button onClick={() => this.handleClickReset()} className="reset">RESET</button>
                            <button onClick={() => this.handleClickFindRoutine()} className="find">FIND ROUTINE</button>
                        </div>
                    </div>
                </main>
                <Nav/>
            </>
        );
    }
}

export default Filter;