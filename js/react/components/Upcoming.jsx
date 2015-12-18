var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');

var Upcoming = React.createClass({
    mixins: [
        Reflux.connect(AppStore, 'upcomingData')
    ],
    render: function() {
        return (
            <div>
                {this.state.upcomingData.upcoming.map(function(movie){
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

module.exports = Upcoming;