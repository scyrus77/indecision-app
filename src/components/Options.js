import React from "react";
import Option from './Option';

const Options = (props) => (
  <div>
    <div className="widger-header">
      <h3 className="widger-header__title">Your Options</h3>
      <button
      className="button button--link"
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>
    </div>
    {props.optionList.length === 0 && <p className="widget__message">Please Add an Option to get started!</p>}
    {
      props.optionList.map( (option, index) => (
        <Option
          key={option}
          optionText={option}
          count={ index + 1 }
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
    }
  </div>
);

export default Options;
