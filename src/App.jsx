import { Route, Routes } from 'react-router-dom'
import { Header } from './Components'
import { Home, Login, MyEvents, CalendarEvents, Event, SignUp, User, ChangePassword, Create, Edit } from './pages'
import { EventProvider } from '/src/Components/AuthContext/EventContext.jsx';
import { AuthProvider } from '/src/Components/AuthContext/AuthContext.jsx';

function App() {

  return (
    <>
      <AuthProvider>
        <EventProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/event' element={<Event />} />
            <Route path='/login' Component={Login} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/myevents' Component={MyEvents} />
            <Route path='/calendar' element={<CalendarEvents />} />

            <Route path='/user' element={<User />} />
            <Route path='/changepassword' Component={ChangePassword} />
            <Route path='/create' Component={Create} />
            <Route path='/edit' Component={Edit} />
            {/*<Route path='/delete' Component={Delete}/>
        */}
          </Routes>
        </EventProvider>
      </AuthProvider>
    </>
  )
}

export default App
