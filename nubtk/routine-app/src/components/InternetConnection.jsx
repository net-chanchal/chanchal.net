import React from 'react';

class InternetConnection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: window.navigator.onLine
        }
    }

    // Event handler for online event
    handleOnline = () => {
        this.setState({
            isOnline: true
        });
    }

// Event handler for offline event
    handleOffline = () => {
        this.setState({
            isOnline: false
        });
    }

    componentDidMount() {
        // Add event listeners for online and offline events
        window.addEventListener('online', this.handleOnline);
        window.addEventListener('offline', this.handleOffline);
    }

    componentWillUnmount() {
        // Remove the event listeners when the component is unmounted
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
    }

    render() {
        const {isOnline} = this.state;
        return (
            <div className={'internet-connection ' + (isOnline ? 'internet-connected' : 'internet-disconnected')}>{isOnline ? 'Back online' : 'No connection'}</div>
        );
    }
}

export default InternetConnection;