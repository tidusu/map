import React from 'react';
import './App.css';
import Todos from './components/Todos';


class App extends React.Component{
    state = {
        todos:[
            {
                id:1,
                title:'this is one',
                complete: false
            },{
              id:2,
              title:'this is two',
              complete: false
            },{
              id:3,
              title:'this is three',
              complete: false
          }
        ]
    }
    render(){
        return (
            <div className="App">
              <Todos todos={this.state.todos}/>
            </div>
          );
    }
    
}

// function App() {
//   let 

//   return (
//     <div className="App">
//       <Todos todos={this.state.todos}/>
//     </div>
//   );
// }

export default App;
