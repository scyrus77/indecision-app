import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const Layaout = (props) => {
  return (
    <div>
      <p>header</p>
      { props.children }
      <p>footer</p>
    </div>
  );
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

