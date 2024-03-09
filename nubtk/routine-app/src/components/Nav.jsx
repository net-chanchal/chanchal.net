import React from 'react';

import {Link} from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <Link to="/" onClick={() => {
                    // Call the callback function to trigger the refresh
                    if (this.props.onHomeButtonClick) {
                        this.props.onHomeButtonClick();
                    }
                }} style={{backgroundImage: 'url("/images/home.svg")'}}/>
                <Link to="/filter" style={{backgroundImage: 'url("/images/filter.svg")'}}/>
                <Link to="/settings" style={{backgroundImage: 'url("/images/settings.svg")'}}/>
            </nav>
        );
    }
}

export default Nav;