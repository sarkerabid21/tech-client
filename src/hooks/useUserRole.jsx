import { useEffect, useState } from "react";
import useAuth from "./useAuth"; // ⬅️ Replace path as needed
import useAxiosSecure from "./useAxiosSecure"; // ⬅️ Your provided axios instance

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchUserRole = async () => {
        try {
          const res = await axiosSecure.get(`/api/users/${user.email}/role`);
          setRole(res.data.role || "user");
        } catch (err) {
          console.error("Error fetching role:", err);
          setRole("user"); // fallback
        } finally {
          setLoading(false);
        }
      };

      fetchUserRole();
    }
  }, [user?.email, axiosSecure]);

  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  const isUser = role === "user";

  return { role, loading, isAdmin, isModerator, isUser };
};

export default useUserRole;
