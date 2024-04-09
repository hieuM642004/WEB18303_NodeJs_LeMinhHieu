import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import { publicRoutes, adminRoutes } from './routes';
import DefaultLayout from './Components/Layouts/DefaultLayout';
import AdminLayouts from './admin/Layouts';
import NotFound from './Components/NotFound/NotFound';

function App() {
    function checkAdminRole() {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken.isAdmin;
            } catch (error) {
                console.error('Invalid token:', error);
                return false;
            }
        }
        return false;
    }
    const isAdmin = checkAdminRole();
    console.log(isAdmin);
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <DefaultLayout>
                                <Helmet>
                                    <title>{route.title}</title>
                                </Helmet>
                                <route.component />
                            </DefaultLayout>
                        }
                    />
                ))}
                {isAdmin &&
                    adminRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <AdminLayouts>
                                    <Helmet>
                                        <title>{route.title}</title>
                                    </Helmet>
                                    <route.component />
                                </AdminLayouts>
                            }
                        />
                    ))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;