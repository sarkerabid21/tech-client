import useAuth from '../hooks/useAuth';
import loadingLottie from '../assets/loading.json';
import Lottie from 'lottie-react';
import { Navigate } from 'react-router';
import useUserRole from '../hooks/useUserRole';

const ModeratorRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole(); // ✅ Use role loading too

  const isLoading = authLoading || roleLoading; // ✅ Combined loading state

  if (isLoading) {
    return <Lottie className='my-10' animationData={loadingLottie} loop={true} />;
  }

  if (!user || role !== 'moderator') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ModeratorRoute;
