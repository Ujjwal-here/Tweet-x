import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeScreen} from "./screens/HomeScreen";
import {UsersScreen} from "./screens/UsersScreen";
import {FeedScreen} from "./screens/FeedScreen"
import {ProfileScreen} from "./screens/ProfileScreen";
import {FollowersScreen} from "./screens/FollowersScreen";
import {FollowingScreen} from "./screens/FollowingScreen";
import {PostsScreen} from "./screens/PostsScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {SignupScreen} from "./screens/SignupScreen";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/login' element={<LoginScreen/>}/>
              <Route path='/signup' element={<SignupScreen/>}/>
              <Route element={<HomeScreen/>}>
                  <Route path="/users" element={<UsersScreen/>}/>
                  <Route path="/feed" element={<FeedScreen/>}/>
                  <Route path="/profile" element={<ProfileScreen/>}>
                      <Route path="posts" element={<PostsScreen/>}/>
                      <Route path="followers" element={<FollowersScreen/>}/>
                      <Route path="following" element={<FollowingScreen/>}/>
                  </Route>
              </Route>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
