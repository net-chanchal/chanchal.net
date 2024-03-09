import React from 'react';

class ButtonLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="save" style={{opacity: '0.5'}} disabled>
                <img src={"/images/loading.svg"} alt="Loading"/>
            </button>
        );
    }
}

export default ButtonLoading;