import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./components/Home/Home";
import Ranking from "./components/Nav/Ranking/Ranking";
import Map from './components/Nav/Map/Map'
import FishBoard from "./components/Nav/FishBoard/FishBoard";
import FishData from "./components/Sidebar/FishData";
import ClosedSeason from "./components/Sidebar/ClosedSeason";
import CheckList from "./components/Sidebar/CheckList";
import MyPage from "./components/Sidebar/MyPage";
import ErrorPage from "./ErrorPage";
import Login from './components/Login/Login'
import Signup from "./components/Login/Signup";

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/ranking' element={<Ranking/>}/> 
        <Route exact path='/map' element={<Map/>}/> 
        <Route exact path='/fishboard' element={<FishBoard/>}/>
        <Route exact path='/fishdata' element={<FishData/>}/>
        <Route exact path='/closedseason' element={<ClosedSeason/>}/>     
        <Route exact path='/checklist' element={<CheckList/>}/>
        <Route exact path='/mypage' element={<MyPage/>}/>
        <Route exact path='/errorpage' element={<ErrorPage/>}/>
        <Route exact path='/login' element={<Login />}/>  
        <Route exact path='/signup' element={<Signup />}/>            
      </Routes> 
    </Router>
  </div>);
}


export default App;
