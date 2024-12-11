import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppRoutes from './routes/Router.jsx';

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return(
    <div className="b-principal">
      <BrowserRouter>
          <AppRoutes setAuth = {setIsAuthenticated}/>
      </BrowserRouter>
    </div>
  );
}

export default App;