var React = require('react');
var Reflux = require('reflux');

var History = require('react-router').History;

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Login = require('./Login.jsx');

var Link = require('react-router').Link;

var App = React.createClass({
    mixins: [
        Reflux.connect(AppStore),
        History
    ],
    getInitialState: function() {
        return {
            email: '',
            pass: '',
            loginOpen: false,
            storeData: {
                authData: null,
                history: [],
                upcoming: [],
            },
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
                <ul>
                    <li><Link to={"/history"}>History</Link></li>
                    <li><Link to={"/upcoming"}>Upcoming</Link></li>
                </ul>
                <Login authData={this.state.storeData.authData} />
            </div>
        );
    }
});

module.exports = App;