import './App.css';
import { Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import { Landing } from './Components/Landing/Landig';
import Details from './Components/Details/Details';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className="App">
      <Route exact path="/"><Landing/></Route>
      <Route exact path= "/pokemon"><Home/></Route>
      <Route exact path="/pokemon/:id"><Details/></Route>
      <Route exact path= "/pokemon/create/newpokemon"><CreatePokemon/></Route>
    </div>
  );
}

export default App;
