import React from 'react';
import {Navigate} from 'react-router-dom';

import Nav from '../components/Nav';
import RoutineItemLoading from '../components/RoutineItemLoading';
import RoutineItem from '../components/RoutineItem';
import Helper from '../Helper';
import RoutineItemTeacher from '../components/RoutineItemTeacher';
import {type} from "@testing-library/user-event/dist/type";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            error: null
        };

    }

    onlineAndOfflineControl() {
        if (Helper.isSignup()) {
            if (window.navigator.onLine) {
                // Internet connected
                this.fetchData();
            } else {
                // Offline
                const local = Helper.getLocalStorageData();

                // Filter Field
                let course_id = '';
                let day = '';
                let room_id = '';
                let teacher_id = '';
                let time_id = '';

                if (local['find']) {
                    course_id = parseInt(local['find']['course_id']);
                    day = local['find']['day'];
                    room_id = parseInt(local['find']['room_id']);

                    if (local['local'] === 'teacher') {
                        teacher_id = parseInt(local['find']['teacher_id']);
                    }

                    time_id = parseInt(local['find']['time_id']);
                } else {
                    day = this.getTodayName();
                }

                let items = [];

                if (local['download']) {
                    local['download'].map(item => {
                        const data_course_id = item['course_id'];
                        const data_day = item['day'];
                        const data_room_id = item['room_id'];
                        const data_teacher_id = item['teacher_id'];
                        const data_time_id = item['time_id'];

                        if (
                            (!course_id || course_id === data_course_id) &&
                            (!day || day === data_day) &&
                            (!room_id || room_id === data_room_id) &&
                            (!teacher_id || teacher_id === data_teacher_id) && // don't need for teacher
                            (!time_id || time_id === data_time_id)
                        ) {
                            items.push(item);
                        }
                    });
                }

                this.setState({
                    items: {data: items},
                    isLoaded: true
                });

                this.timer = setTimeout(function () {
                    Helper.removeLocalStorage('find');
                }, 1000);
            }
        }
    }

    handleHomeButtonClick = () => {
        this.setState({
            items: [],
            isLoaded: false,
            error: null,
        });

        this.onlineAndOfflineControl();
    };

    getTodayName() {
        return new Date().toLocaleString('en-us', {weekday: 'long'});
    }

    fetchData() {
        const local = Helper.getLocalStorageData();
        let queryParameters;

        if (local.hasOwnProperty('find')) {
            queryParameters = new URLSearchParams(local['find']).toString();
        } else {
            queryParameters = new URLSearchParams(local['signup']).toString();
            queryParameters += '&day=' + this.getTodayName()
        }

        let url;

        if (local.name === 'teacher') {
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
                    items: data,
                    isLoaded: true
                });

                this.timer = setTimeout(function () {
                    Helper.removeLocalStorage('find');
                }, 1000);
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        this.onlineAndOfflineControl();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    showRoutine(items) {
        if (!items.length) {
            return <img src={"/images/sleep.gif"} width="200" height="200" className="sleep" alt="Sleep"/>
        }

        const local = Helper.getLocalStorageData();

        if (local.name === 'teacher') {
            // Show Teacher Component
            return items.map((item, key) => {
                return (
                    <RoutineItemTeacher data={item} key={key}/>
                )
            });
        } else {
            // Show Student Component
            return items.map((item, key) => {
                return (
                    <RoutineItem data={item} key={key}/>
                )
            });
        }
    }

    showLoading() {
        return (
            <div style={{overflow: 'hidden', height: '100%'}}>
                <RoutineItemLoading/>
                <RoutineItemLoading/>
                <RoutineItemLoading/>
                <RoutineItemLoading/>
                <RoutineItemLoading/>
                <RoutineItemLoading/>
            </div>
        )
    }

    render() {
        if (!Helper.isSignup()) {
            return <Navigate to="/student-signup" replace={true}/>
        }

        const {items, isLoaded, error} = this.state;

        return (
            <>
                <main>
                    {isLoaded ? this.showRoutine(items.data) : this.showLoading()}
                </main>
                <Nav onHomeButtonClick={this.handleHomeButtonClick}/>
            </>
        );
    }
}

export default Home;