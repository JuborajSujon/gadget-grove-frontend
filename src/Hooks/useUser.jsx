import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user) {
      axiosPublic
        .get(`/user/${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [axiosPublic, user]);

  return userInfo;
};

export default useUser;
