var React = require('react');

var Hello = React.createClass({
    render: function() {
        return (<p>Hello World</p>);
    }
});

React.render(<Hello />, document.getElementById('main'));