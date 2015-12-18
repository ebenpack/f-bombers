var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var Movie = require('./Movie.jsx');

var History = React.createClass({
    mixins: [
        Reflux.connect(AppStore, 'historyData')
    ],
    render: function() {
        return (
            <div>
                {this.state.historyData.history.map(function(movie){
                    return (
                        <Movie
                            title={movie.title}
                            year={movie.year}
                            img={movie.img}
                        />
                    );
                })}
            </div>
        );
    }
});

module.exports = History;