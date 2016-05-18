var MainMenu = React.createClass({
  render: function() {
    var mainMenuNodes = this.props.data.map(function (section, i) {
      return (
        <li className="styleguide-mainmenu-item" key={i}>
          <a className="styleguide-mainmenu-link" href={section.link}>{section.name}</a>
        </li>
      );
    });
    return (
      <nav className="styleguide-mainmenu">
        <ul className="styleguide-mainmenu-list">
          {mainMenuNodes}
        </ul>
      </nav>
    );
  }
});

var Sections = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.getJSON( this.props.url, function() {
      console.log( "success" );
    })
    .done(function(data) {
      this.setState({data: data.sections});
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this));
  },
  render: function() {
    return (
      <MainMenu data={this.state.data} />
    );
  }
});

ReactDOM.render(
  <Sections url="config.json" />,
  document.getElementById('styleguide-sidebar')
);
