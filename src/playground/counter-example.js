class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.addOne = this.addOne.bind(this);
    this.minusOne = this.minusOne.bind(this);
    this.reset = this.reset.bind(this);

    this.state = { count: props.count }
  }

  componentDidMount() {
    console.log('componentDidMount');
    const count = parseInt(localStorage.getItem('count'), 10);
    console.log('count', count);
    if (!isNaN(count)) {
      this.setState( () => ({ count }));
    }
  }

  componentDidUpdate (prevProp, prevState) {
    console.log('componentDidUpdate');
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
    }
  }

  addOne() {
    // console.log('addOne');
    this.setState((prevState ) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  minusOne() {
    // console.log('minusOne');
    this.setState((prevState ) => {
      return {
        count: prevState.count - 1
      };
    });
  };

  reset() {
    console.log('reset');
    this.setState(() => {
      return {
        count: 0
      };
    });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.addOne}>+1</button>
        <button onClick={this.minusOne}>-1</button>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }

}

Counter.defaultProps = {
  count: 0,
};

const appRoot =   document.getElementById('app');

ReactDOM.render(<Counter  />, appRoot);

