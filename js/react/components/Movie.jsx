var React = require('react');

var Movie = React.createClass({
    render: function() {
        return (
            <div>
                <div>Title: {this.props.title}</div>
                <div>Year: {this.props.year}</div>
                <img src={this.props.img} />
            </div>
        );
    }
});

module.exports = Movie;