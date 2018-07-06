import React from "react";
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {

  state = {
    options: [],
    selectedOption: null,
  };

  // We can use this style and not bind this because
  // we are using babel-plugin-transform-class-properties
  handleAddOption = (option) => {
    // console.log('handleAddOption', option);
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState( (prevState) => ({
      options: [...prevState.options, option]
    }));
  };

  handleClearSelectedOption = () => {
    console.log('handleCloseModal');
    this.setState( () => ({ selectedOption: undefined }));
  };

  handleDeleteOption = (option) => {
    // console.log('handleDeleteOption', option);
    this.setState( (prevState) => ({
      options: prevState.options.filter( opt => opt !== option )
    }));
  };

  handleDeleteOptions = () => {
    // console.log('handleDeleteOptions');
    this.setState( () => ({ options: [] }));  // implicitly returning an object
  };

  handlePick = () => {
    const rand = Math.floor(Math.random() * this.state.options.length);
    const selectedOption = this.state.options[rand];
    console.log('handlePick', selectedOption);
    this.setState( () => ({
      selectedOption,
      modalIsOpen: true
    }));
  };

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
    if (prevState.options.length !== this.state.options.length) {
      console.log('saving');
      const optionsJson = JSON.stringify(this.state.options);
      localStorage.setItem('options', optionsJson)
    }
  }

  componentWillUnmount() {
    console.log('IndecisionApp componentWillUnmount');
  }

  render() {
    const subTitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header
          subTitle={ subTitle}
        />
        <div className='container'>
          <Action
            hasOptions={ this.state.options.length > 0 }
            handlePick={ this.handlePick }
          />
          <div className="widget">
            <Options
              optionList={ this.state.options }
              handleDeleteOption={ this.handleDeleteOption }
              handleDeleteOptions={ this.handleDeleteOptions }
            />
            <AddOption
              handleAddOption={ this.handleAddOption }
            />
          </div>
        </div>
        <OptionModal
          selectedOption={ this.state.selectedOption }
          handleClearSelectedOption={ this.handleClearSelectedOption }
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

