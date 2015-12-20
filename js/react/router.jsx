var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = require('./components/App.jsx');
var History = require('./components/History.jsx');
var Upcoming = require('./components/Upcoming.jsx');
var AddMovie = require('./components/AddMovie.jsx');

var Route = React.createClass({
    render: function(){
        return (
            <Router>
                <Route
                    path="/"
                    component={App}
                >
                    <Route
                        path="history"
                        component={History}
                    />
                    <Route
                        path="upcoming"
                        component={Upcoming}
                    />
                    <Route
                        path="addmovie"
                        component={AddMovie}
                    />
                </Route>
            </Router>
        );
    }
});

exports.start = function(el) {
    ReactDOM.render(
        <Route />,
        document.querySelector(el)
    );
};