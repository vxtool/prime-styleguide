var Sections = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var sections = this.state.data.sections || [];
    return (
      <div>
        <aside class="styleguide-sidebar">
          <nav class="styleguide-mainmenu">
            <ul class="styleguide-mainmenu-list">
              {sections.map(function(section){
                return (
                  <li class="styleguide-mainmenu-item">
                    <a class="styleguide-mainmenu-link" href={section.link}>{section.name}</a>
                  </li>
                );
              })}       
            </ul>
          </nav>
        </aside>
        <div class="styleguide-content">
          {sections.map(function(section){
            return (
              <section class="styleguide-panel">
                <header class="styleguide-panel-header">
                  <h2 class="styleguide-panel-title"><span class="styleguide-panel-title-number">01</span> {section.name}</h2>
                </header>
                <div class="styleguide-panel-content">
                </div>
              </section>
            );
          })}
        </div>
      <div>
    );
  }
});

ReactDOM.render(
  <Sections url="config.json" pollInterval={2000} />,
  document.getElementById('styleguide-body')
);