class VisibilityToggle extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggleVisbility = this.handleToggleVisbility.bind(this);
    this.state = { visibility: false };
  }

  handleToggleVisbility() {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisbility}>
          {this.state.visibility ? 'Hide Details' : 'Show Details'}
        </button>
        {this.state.visibility && (
          <div>
            <p>These are some details you can now see.</p>
          </div>
        )}
      </div>
    );
  }
}

const appRoot =   document.getElementById('app');
ReactDOM.render(<VisibilityToggle/>, appRoot);
