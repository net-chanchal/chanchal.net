import React from 'react';

class RoutineItem extends React.Component {
    constructor(props) {
        super(props);
    }

    isTimeBetween(startTime, endTime, dayOfWeekName) {
        const currentDate = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Check if the current day of the week matches the specified day
        if (daysOfWeek[currentDate.getDay()] === dayOfWeekName) {
            const startDate = new Date(currentDate.toDateString() + " " + startTime);
            const endDate = new Date(currentDate.toDateString() + " " + endTime);

            return currentDate >= startDate && currentDate <= endDate;
        }

        return false;
    }



    render() {
        const {data} = this.props;
        const active = (this.isTimeBetween(data['start_time'], data['end_time'], data['day'])) ? ' active' : '';

        return (
            <div className={'item' + active}>
                <p className="room">Level: {data['level']} Room: {data['room_title']}</p>
                <p className="time">{data['start_time12']} - {data['end_time12']}, {data['day']}</p>
                <h4 className="teacher">{data['short_name']} - {data['full_name']}</h4>
                <p className="designation">{data['designation']}</p>
                <p className="course">{data['course_code']} - {data['course_title']}</p>
            </div>
        );
    }
}

export default RoutineItem;