import React from 'react';

class RoutineItemLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="item">
                <div className="room skeleton-box load-routine" style={{width: '46%', height: '15px'}}/>
                <div className="time skeleton-box load-routine" style={{width: '65%', height: '18px'}}/>
                <div className="teacher skeleton-box load-routine" style={{width: '82%', height: '20px'}}/>
                <div className="designation skeleton-box load-routine" style={{width: '30%', height: '15px'}}/>
                <div className="course skeleton-box load-routine" style={{width: '95%', height: '16px'}}/>
            </div>
        );
    }
}

export default RoutineItemLoading;