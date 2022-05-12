import axios from "axios";
import queryString from "query-string";
import firebase from "firebase";

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  // not logged in
  const hasRememberAccount = localStorage.getItem("firebaseui::");
  if (!hasRememberAccount) return null;

  // logged in but current user is not fetched - firebase not init yet => wait (10s)
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
    }, 10000);
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }
        const token = await user.getIdToken();
        console.log("[AXIOS] Logged in user token: ", token);
        resolve(token);
        unregisterAuthObserver(); // this func return an unsubcrible
        clearTimeout(waitTimer);
      });
  });
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //   const currentUser = firebase.auth().currentUser;
  //   if (currentUser) {
  //     const token = await currentUser.getIdToken();
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }

  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
