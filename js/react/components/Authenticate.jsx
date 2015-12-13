var React = require('react');

var Authenticate = React.createClass({
    getInitialState: function() {
        return {
            token: '',
            search: '',
            searchFocus: false,
        };
    },
    render: function() {
        return (
            <div className="container">
                HI THERE!
            </div>
        );
    }
});

module.exports = Authenticate;