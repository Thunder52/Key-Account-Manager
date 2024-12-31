import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // New state to handle loading
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth?.token) {
          console.warn("Token not yet initialized. Waiting...");
          return; // Wait for token to initialize
        }

        const res = await axios.get("http://localhost:5000/api/auth/check", {
          headers: {
            Authorization: auth?.token,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          throw new Error("Invalid Token");
        }
      } catch (error) {
        console.error("Auth Error:", error.message);
        setOk(false);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    authCheck();
  }, [auth?.token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return ok ? <Outlet /> : null;
}