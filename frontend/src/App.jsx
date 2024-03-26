import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';

import { publicRoutes, adminRoutes } from './routes';
import DefaultLayout from './Components/Layouts/DefaultLayout';
import AdminLayouts from './admin/Layouts';
import NotFound from './Components/NotFound/NotFound';

function App() {
  
  const isAdmin = window.location.pathname.startsWith('/admin');
  return (
    <Router>
      <div className="App">
        <Routes>
          {isAdmin ? (
            adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<AdminLayouts><Helmet><title>{route.title}</title></Helmet><route.component /></AdminLayouts> } />
            ))
          ) : (
            publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Helmet><title>{route.title}</title></Helmet>
                    <route.component />
                  </DefaultLayout>
                }
              />
            ))
          )}
           {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
