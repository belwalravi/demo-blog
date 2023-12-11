import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute';
import Home from "./components/GeneralScreens/Home"
import AddStory from './components/StoryScreens/AddStory';
import DetailStory from './components/StoryScreens/DetailStory';
import Header from './components/GeneralScreens/Header';
import Footer from './components/GeneralScreens/Footer';
import Profile from './components/ProfileScreens/Profile';
import EditProfile from './components/ProfileScreens/EditProfile';
import NotFound from './components/GeneralScreens/NotFound';
import EditStory from './components/StoryScreens/EditStory';
import ReadListPage from './components/ProfileScreens/ReadListPage';
import Unauthorized from './components/GeneralScreens/Unauthorized';

const App = () => {

      return (
            <Router>

                  <div className="App">

                        <Routes>
                              <Route path="/" element={<LayoutsWithHeader />}>

                                    <Route path='*' element={<NotFound />} />
                                    <Route path='/unauthorized' element={<Unauthorized />} />                                    

                                    <Route exact path='/' element={<PrivateRoute />}>
                                          <Route exact path='/' element={<Home />} />
                                    </Route>

                                    <Route exact path="/story/:slug" element={<DetailStory />} />

                                    <Route exact path='/addstory' element={<PrivateRoute />}>
                                          <Route exact path='/addstory' element={<AddStory />} />
                                    </Route>

                                    <Route exact path='/profile' element={<PrivateRoute />}>
                                          <Route exact path='/profile' element={<Profile />} />
                                    </Route>

                                    <Route exact path='/edit_profile' element={<PrivateRoute />}>
                                          <Route exact path='/edit_profile' element={<EditProfile />} />
                                    </Route>

                                    <Route exact path='/story/:slug/like' element={<PrivateRoute />}>
                                          <Route exact path='/story/:slug/like' element={<DetailStory />} />
                                    </Route>

                                    <Route exact path='/story/:slug/edit' element={<PrivateRoute />}>
                                          <Route exact path='/story/:slug/edit' element={<EditStory />} />
                                    </Route>

                                    <Route exact path='/story/:slug/delete' element={<PrivateRoute />}>
                                          <Route exact path='/story/:slug/delete' element={<DetailStory />} />
                                    </Route>
                                    <Route exact path='/story/:slug/addComment' element={<PrivateRoute />}>
                                          <Route exact path='/story/:slug/addComment' element={<DetailStory />} />
                                    </Route>

                                    <Route exact path='/readList' element={<PrivateRoute />}>
                                          <Route exact path='/readList' element={<ReadListPage />} />
                                    </Route>

                              </Route>

                        </Routes>

                  </div>

            </Router>

      );

}

const LayoutsWithHeader = () => {
      return (
            <>
                  <Header />
                  <Outlet />
                  <Footer />
            </>
      );
}

export default App;
