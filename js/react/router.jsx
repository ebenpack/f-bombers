var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = require('./components/App.jsx');
var Authenticate = require('./components/Authenticate.jsx');

var Route = React.createClass({
    render: function(){
        return (
            <Router>
                <Route
                    path="/"
                    component={App}
                >
                    <Route
                        path="authenticate"
                        component={Authenticate}
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