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

var SectionsContent = React.createClass({
  render: function() {
    var num = 0;
    var result;
    var sectionsContentNodes = this.props.data.map(function (section, i) {
      num = num + 1;
      if(num < 10){result = '0' + num;}
      else {result = num;}
      return (
        <section className="styleguide-panel" key={i}>
          <header className="styleguide-panel-header">
            <h2 className="styleguide-panel-title"><span className="styleguide-panel-title-number">{result}</span> {section.name}</h2>
          </header>
          <div className="styleguide-panel-content">
          </div>
        </section>
      );
    });
    return (
      <div>
        {sectionsContentNodes}
      </div>
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
      <div>
        <aside className="styleguide-sidebar">
          <MainMenu data={this.state.data} />
        </aside>
        <div className="styleguide-content">
          <SectionsContent data={this.state.data} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Sections url="config.json" />,
  document.getElementById('styleguide-body')
);