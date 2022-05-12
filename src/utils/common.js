export const randomNumber = (min, max) => {
  return min + Math.trunc(Math.random() * (max - min));
};

export const objectToArr = (object) => {
  if (object) {
    return Object.values(object);
  }
};

export const getFirebaseUserId = () => {
  const userDetail = JSON.parse(
    localStorage.getItem("firebaseRememberedAccount")
  );
  return userDetail?.uid;
};

export const getFirebaseUserName = () => {
  const userDetail = JSON.parse(
    localStorage.getItem("firebaseRememberedAccount")
  );
  return userDetail?.displayName;
};
