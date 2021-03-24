import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from '@Components/Pages/LandingPage/LandingPage';
import Navs from '@Components/Navs/Navs';
import City from '@Components/Pages/City/City';
import AllSpot from '@Components/Pages/AllSpot/AllSpot';

function App() {
  return (
    <>
      <Router>
        <Navs />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/city" component={City} />
          <Route exact path="/allspot" component={AllSpot} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
