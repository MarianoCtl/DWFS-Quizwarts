import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from '../pages/Profile/ProfilePage'; 
import UpdateProfile from '../pages/UpdateProfile/UpdateProfilePage'; 
import Register from '../pages/UserRegistration/RegisterPage'
import Login from '../pages/Auth/LoginPage'
import ForgotPassword from '../pages/Auth/ForgotPasswordPage';
import HomePage from '../pages/Home/HomePage';
import HomePlayPage from '../pages/HomePlayPage/HomePlayPage';
import InGame from '../pages/InGame/InGamePage';
import GameLobby from '../pages/GameLobby/GameLobbyPage';
import PlayPage from '../pages/Play/PlayPage';
import GameOver from '../pages/GameOver/GameOverPage';
import Store from '../pages/Store/StorePage';
import ViewArticle from '../pages/ViewArticle/ViewArticlePage';
import Cart from '../pages/Cart/CartPage';
import MyPurchases from '../pages/MyPurchases/MyPurchasesPage';
import WalletPage from '../pages/Wallet/WalletPage'
import CheckoutForm from '../pages/Checkout/CheckoutForm';
import OrderConfirmation from '../pages/Confirmation/OrderConfirmation';
import PurchaseDetail from '../pages/PurchaseDetail/PurchaseDetailPage';
import AboutUs from '../pages/AboutUs/AboutUsPage';
import HelpOutlogged from '../pages/HelpOutlogged/HelpOutloggedPage';
import HelpLogged from '../pages/HelpLogged/HelpLoggedPage';
import ChangeNickname from '../pages/ChangeNickname/ChangeNicknamePage';
import RankingPage from '../pages/Ranking/RankingPage';
import ChangeHouse from '../pages/ChangeHouse/ChangeHousePage';
import MyGamesPage from '../pages/MyGames/MyGamesPage';

// Componente de ruta protegida
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token){
      return <Navigate to="/login"/>;
    }

    return children;
  };

export const AppRoutes = ({ setAuth }) => {
  return(
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage/>} /> 
      <Route path="/register" element={<Register/>} /> 
      <Route path="/login" element={<Login setAuth={setAuth} />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/about-us" element={<AboutUs/>} /> 
      <Route path="/help" element={<HelpOutlogged/>} />

      {/* Rutas privadas */}
      <Route path="/homeplay" element={<PrivateRoute> <HomePlayPage /> </PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
      <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>} />
      <Route path="/in-game/:id" element={<PrivateRoute> <InGame /> </PrivateRoute>} />
      <Route path="/game-lobby/:id" element={<PrivateRoute> <GameLobby /> </PrivateRoute>} />
      <Route path="/play" element={<PrivateRoute> <PlayPage /> </PrivateRoute>} />
      <Route path="/game-over/:id" element={<PrivateRoute> <GameOver /> </PrivateRoute>} />
      <Route path="/store" element={<PrivateRoute> <Store /> </PrivateRoute>} />
      <Route path="/view-article/:id" element={<PrivateRoute> <ViewArticle /> </PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute> <Cart /> </PrivateRoute>} />
      <Route path="/my-purchases" element={<PrivateRoute> <MyPurchases /> </PrivateRoute>} />
      <Route path="/my-wallet" element={<PrivateRoute> <WalletPage /> </PrivateRoute>} />
      <Route path="/checkout" element={<PrivateRoute> <CheckoutForm /> </PrivateRoute>} />
      <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
      <Route path="/purchase-detail/:id" element={<PrivateRoute> <PurchaseDetail /> </PrivateRoute>} />
      <Route path="/help-user" element={<PrivateRoute> <HelpLogged/> </PrivateRoute>} />
      <Route path="/change-nickname" element={<PrivateRoute> <ChangeNickname/> </PrivateRoute>} />
      <Route path="/ranking" element={<PrivateRoute> <RankingPage /> </PrivateRoute>} />
      <Route path="/change-house" element={<PrivateRoute> <ChangeHouse/> </PrivateRoute>} />
      <Route path="/my-games" element={<PrivateRoute> <MyGamesPage /> </PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;