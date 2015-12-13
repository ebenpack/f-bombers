var React = require('react');

var AppActions = require('../actions/AppActions');

var App = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            pass: '',
            loginOpen: false,
        };
    },
    handleEmailChange: function(event) {
        this.setState({
            email: event.target.value
        });
    },
    handlePassChange: function(event) {
        this.setState({
            pass: event.target.value
        });
    },
    submitLogin: function() {
        AppActions.submitLogin(
            this.state.email,
            this.state.pass
        );
        this.setState({
            email: '',
            pass: ''
        });
    },
    openLogin: function(){
        this.setState({openLogin: true});
    },
    logout: function(){
        AppActions.logout();
    },
    render: function() {
        var login = (
            (this.props.authData) ?
            <button onClick={this.logout}>Logout</button>:
                (!this.state.openLogin) ?
                <button onClick={this.openLogin}>Login</button> :
                <div>
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    <input type="text" value={this.state.pass} onChange={this.handlePassChange} />
                    <button onClick={this.submitLogin}>Submit</button>
                </div>
        );

        return login;
    }
});

module.exports = App;