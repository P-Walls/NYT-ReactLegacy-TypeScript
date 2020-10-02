import React from 'react';
import './App.css';
import NYTApp from './Components/NYTApp';

function App() {
  return (
    <div className="App">
      <NYTApp />
    </div>
  );
}

export default App;

// handlechange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//  ...this.state,
//  [event.target.name]: event.target.value
//  })
// }