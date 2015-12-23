var React = require('react');

var Movie = React.createClass({
    render: function() {
        return (
            <div className="movie">
                <div className="title">Title: {this.props.title}</div>
                <div className="year">Year: {this.props.year}</div>
                <img className="poster" src={this.props.img} />
            </div>
        );
    }
});

module.exports = Movie;