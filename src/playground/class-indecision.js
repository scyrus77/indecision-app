
class IndecisionApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: []
    }
  }

  handleAddOption(option) {
    console.log('handleAddOption', option);
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState( (prevState) => {
      return {
        options: [...prevState.options, option]
      };
    });
  }

  handleDeleteOptions() {
    console.log('handleDeleteOptions');
    this.setState( () => {
      return {
        options: []
      };
    });
  }

  handlePick() {
    const rand = Math.floor(Math.random() * this.state.options.length);
    console.log('handlePick', this.state.options[rand]);
  }

  render() {
    const title = 'Indecision App';
    const subTitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header
          title={title}
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
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.subTitle}</p>
      </div>
    );
  }
}

class Action extends React.Component {

  render() {
    return (
      <div>
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    )
  }
}
class Options extends React.Component {

  render() {
    console.log('Options.render', this.props.optionList);
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        <ol>
          {
            this.props.optionList.map( opt => <Option key={opt} value={opt} />)
          }
        </ol>
      </div>
    )
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <li key={this.props.value}>{this.props.value}</li>
      </div>
    )
  }
}

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
    this.setState( () => {
      return { error };
    });
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
ReactDOM.render(<IndecisionApp/>, appRoot);
