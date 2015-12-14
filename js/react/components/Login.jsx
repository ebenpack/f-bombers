var React = require('react');

var AppActions = require('../actions/AppActions');

var App = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            pass: '',
            loginOpen: false,
            loginWaiting: false,
            warn: false,
        };
    },
    handleEmailChange: function(event) {
        this.setState({
            email: event.target.value,
            warn: false,
        });
    },
    handlePassChange: function(event) {
        this.setState({
            pass: event.target.value,
            warn: false,
        });
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.authData === null) {
            if (this.state.openLogin && this.state.loginWaiting) {
                this.setState({
                    loginWaiting: false,
                    warn: true,
                });
            }
        } else if (nextProps.authData) {
            this.setState({
                email: '',
                pass: '',
                openLogin: false,
                loginWaiting: false,
                warn: false,
            });
        }
    },
    submitLogin: function() {
        AppActions.submitLogin(
            this.state.email,
            this.state.pass
        );
        this.setState({
            loginWaiting: true,
        });
    },
    closeLogin: function(){
        this.setState({
            openLogin: false,
        });
    },
    openLogin: function() {
        this.setState({
            openLogin: true,
        });
    },
    logout: function() {
        AppActions.logout();
    },
    render: function() {
        var inputClasses = this.state.warn ? 'warning' : '';
        var modal = (this.state.openLogin) ? (
            <div className="modal" id="modal-one" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-header">
                        <h2>LOGIN</h2>
                        <button className="btn-close" aria-hidden="true" onClick={this.closeLogin}>×</button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label htmlFor="loginEmail">Email</label><br />
                            <input className={inputClasses} id="loginEmail" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                        </div>
                        <div>
                            <label htmlFor="loginPass">Password</label><br />
                            <input className={inputClasses} id="loginPass" type="password" value={this.state.pass} onChange={this.handlePassChange} />
                        </div>
                        <button onClick={this.submitLogin}>Submit</button>
                    </div>
                </div>
            </div>
        ) : '';

        var login = (
            (this.props.authData) ?
            (<div>
                    <button onClick={this.logout}>Logout</button>
                </div>) :
            (<div>
                    <button onClick={this.openLogin}>Login</button>
                    {modal}
                </div>)
        );
        return login;
    }
});

module.exports = App;