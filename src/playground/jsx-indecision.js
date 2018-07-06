console.log('App.js is running!');

const app =  {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const mysubmit = (event) => {
  event.preventDefault();
  const option = event.target.elements.option.value;
  if (option) {
    app.options.push(option);
    event.target.elements.option.value = '';
  }

  renderTemplate();
};

const removeAll = () => {
  console.log('removeAll');
  app.options = [];
  renderTemplate();
};

const decide = () => {
  const rand = Math.floor(Math.random() * app.options.length);
  console.log(rand);
  console.log(app.options[rand]);
};

const appRoot =   document.getElementById('app');

const renderTemplate = () => {

  // const renderList = () => {
  //   return options.map( opt => {
  //
  //   }
  // };

  const template = (
    <div>
      <h1>{ app.title }</h1>
      { app.subtitle && <p>{app.subtitle}</p> }
      <p>{ app.options && app.options.length > 0 ? 'Here are your options' : 'No options' }</p>
      <button disabled={ app.options.length == 0 } onClick={decide}>Decide</button>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        {
          app.options.map( option => <li key={option}>{option}</li>)
        }
      </ol>
      <form onSubmit={mysubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);

};

renderTemplate();
