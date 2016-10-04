var NavBar = React.createClass({
  generateItem: function(item){
    return <NavBarItem name={item.name} url={item.url} submenu={item.submenu} />
  },
  render: function() {
    var items = this.props.items.map(this.generateItem);
    return (
      <ul className="styleguide-mainmenu-list">
      {items}
      </ul>
    );
  }
});

var NavBarItem = React.createClass({
  generateLink: function(){
    return <NavBarLink url={this.props.url} name={this.props.name} />;
  },
  generateSubmenu: function(){
    return <NavBar items={this.props.submenu} />
  },
  generateContent: function(){
    var content = [this.generateLink()];
    if(this.props.submenu){
      content.push(this.generateSubmenu());
    }
    return content;
  },
  render: function() {
    var content = this.generateContent();
    return (
      <li className="styleguide-mainmenu-item">
        {content}
      </li>
    );
  }
});

var NavBarLink = React.createClass({
  render: function() {
    return (
      <a className="styleguide-mainmenu-link" href={this.props.link}>{this.props.name}</a>
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
      this.setState({data: data.mainmenu});
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this));
  },
  render: function() {
    console.log(this.state);
    return (
      <nav className="styleguide-mainmenu">
        <NavBar items={this.state.data} />
      </nav>
    );
  }
});

ReactDOM.render(
  <Sections url="modules/config.json" />,
  document.getElementById('styleguide-sidebar')
);
