var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Movie = require('./Movie.jsx');

var History = React.createClass({
    mixins: [
        Reflux.connect(AppStore, 'historyData')
    ],
    handleClick: function(id, e){
        AppActions.removeHistory(id);
    },
    render: function() {
        return (
            <div>
                {this.state.historyData.history.map(function(movie){
                    return (
                        <div className="history">
                            <Movie
                                key={movie.id}
                                title={movie.title}
                                year={movie.year}
                                img={movie.img}
                            />
                            <button onClick={this.handleClick.bind(this, movie.id)}>Remove</button>
                        </div>
                    );
                }, this)}
            </div>
        );
    }
});

module.exports = History;