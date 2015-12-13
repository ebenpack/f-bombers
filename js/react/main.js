var Router = require('./router.jsx');

window.fbombers = {
    init: function(opts) {
        var el = opts.el;
        Router.start(el);
    }
};