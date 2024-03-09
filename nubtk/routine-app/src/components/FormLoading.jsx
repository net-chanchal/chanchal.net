import React from 'react';

class FormLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="room skeleton-box load-routine"  style={{height: '40px'}} />
        );
    }
}

export default FormLoading;