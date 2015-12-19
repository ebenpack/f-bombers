var React = require('react');
var Reflux = require('reflux');

var History = require('react-router').History;

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Login = require('./Login.jsx');

var Link = require('react-router').Link;

var App = React.createClass({
    mixins: [
        Reflux.connect(AppStore, 'appData'),
        History
    ],
    getInitialState: function() {
        return {
            email: '',
            pass: '',
            loginOpen: false,
        };
    },
    componentDidMount: function() {
        AppActions.getAuth();
    },
    addMovie: function() {
        AppActions.addHistory({
            title: "Home Alone",
            img: "http://foobar.com",
            year: "foo"
        });
    },
    render: function() {
        return (
            <div className="container">
                <nav className="row">
                    <ul>
                        <li><Link to={"/history"}>History</Link></li>
                        <li><Link to={"/upcoming"}>Upcoming</Link></li>
                        <li><Link to={"/addmovie"}>Add Movie</Link></li>
                    </ul>
                    <Login authData={this.state.appData.authData} />
                </nav>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = App;