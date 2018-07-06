
class IndecisionApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: props.options
    }
  }

  componentDidMount() {
    // console.log('IndecisionApp componentDidMount');
    try {
      const jsonOptions = localStorage.getItem('options');
      const options = JSON.parse(jsonOptions);
      console.log('componentDidMount options', options);
      if (options) {
        this.setState( () => ({ options }));
      }
    } catch (e) {
      // Do Nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('IndecisionApp componentDidUpdate prevProps', prevProps);
    // console.log('IndecisionApp componentDidUpdate prevState', prevState);
    // console.log('IndecisionApp componentDidUpdate currState', this.state);

    if (prevState.options.length !== this.state.options.length) {
      console.log('saving');
      const optionsJson = JSON.stringify(this.state.options);
      localStorage.setItem('options', optionsJson)
    }
  }

  componentWillUnmount() {
    console.log('IndecisionApp componentWillUnmount');
  }

  handleAddOption(option) {
    // console.log('handleAddOption', option);
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState( (prevState) => ({
      options: [...prevState.options, option]
    })); //shorthand v
    // this.setState( (prevState) => {
    //   return {
    //     options: [...prevState.options, option]
    //   };
    // });
  }

  handleDeleteOption(option) {
    // console.log('handleDeleteOption', option);
    this.setState( (prevState) => ({
      options: prevState.options.filter( opt => opt !== option )
    }));
    // const index = this.state.options.indexOf(option);
    // if (index > -1) {
    //   this.setState( (prevState) => ({
    //     options: prevState.options.splice(index, 1)
    //   }));
    // }
  }

  handleDeleteOptions() {
    // console.log('handleDeleteOptions');
    this.setState( () => ({ options: [] }));  // shorthand for below implicitly returning an object
    // this.setState( () => {
    //   return {
    //     options: []
    //   };
    // });
  }

  handlePick() {
    const rand = Math.floor(Math.random() * this.state.options.length);
    console.log('handlePick', this.state.options[rand]);
  }

  render() {
    const subTitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header
          subTitle={subTitle}
        />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          optionList={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subTitle && <p>{props.subTitle}</p>}
    </div>
  );
};
Header.defaultProps = {
  title: 'Indecision App'
};

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.optionList.length === 0 && <p>Please Add an Option to get started!</p>}
      <table>
        <tbody>
          {
            props.optionList.map( opt => (
              <Option
                key={opt}
                value={opt}
                handleDeleteOption={props.handleDeleteOption}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

const Option = (props) => {
  return (
    <tr key={props.value}>
      <td width="135px">{props.value}</td>
      <td>
        <button
          onClick={ (e) => {
            props.handleDeleteOption(props.value)
          }}
        >
          remove
        </button>
      </td>
    </tr>
  );
};

class AddOption extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption(event) {
    event.preventDefault();
    const option = event.target.elements.option.value.trim();
    const error =  this.props.handleAddOption(option);
    this.setState( () => ({ error }));  //set implicitly
    if (!error) {
      event.target.elements.option.value = '';
    }
  };

  render() {
    return (
      <div>
        { this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

const appRoot =   document.getElementById('app');
ReactDOM.render(<IndecisionApp />, appRoot);
