import { useEffect, useState } from 'react';
import useAuth from './useAuth'; // your auth context
import useAxiosSecure from './useAxiosSecure';

const useDashboardData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/api/dashboard/${user.email}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return { data, loading };
};

export default useDashboardData;
