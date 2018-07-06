
class IndecisionApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: props.options
    }
  }

  handleAddOption(option) {
    console.log('handleAddOption', option);
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

  handleDeleteOptions() {
    console.log('handleDeleteOptions');
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
      <ol>
        {
          props.optionList.map( opt => <Option key={opt} value={opt} />)
        }
      </ol>
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      <li key={props.value}>{props.value}</li>
    </div>
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
    this.setState( () => ({ error }));  //shorthand v
    // this.setState( () => {
    //   return { error };
    // });
    event.target.elements.option.value = '';
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
