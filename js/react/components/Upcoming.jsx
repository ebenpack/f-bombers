var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Movie = require('./Movie.jsx');


var Upcoming = React.createClass({
    mixins: [
        Reflux.connect(AppStore, 'upcomingData')
    ],
    handleClick: function(id, e){
        AppActions.removeUpcoming(id);
    },
    render: function() {
        return (
            <div>
                {this.state.upcomingData.upcoming.map(function(movie){
                    return (
                        <div className="upcoming">
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

module.exports = Upcoming;