/**
 * Fake Fetching of single item
 * @param {string} email
 * @param {string} password
 */
const loginUser = (email, password) => {
  let fd = new FormData();
  fd.append("email", email);
  fd.append("password", password);
  return fetch("https://openme.click/api/login.php", {
    method: "POST",
    body: fd,
  })
    .then(async (r) => {
      const response = await r.json();
      console.log(response);
      if (response.res == "succeeded") {
        console.log(response.id);
        return response;
      } else {
        console.log(response.text);
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

/**
 * Fake Fetching of single item
 * @param {string} concode
 * @param {string} uid
 */
const verifyUser = (concode, uid) => {
  let fd = new FormData();
  fd.append("concode", concode);
  fd.append("uid", uid);
  return fetch("https://openme.click/api/verify.php", {
    method: "POST",
    body: fd,
  })
    .then(async (r) => {
      const response = await r.json();
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

/**
 * Fake Fetching of single item
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 * @param {string} image
 *
 */
const signupUser = (fullName, email, password, image, address, mobile) => {
  let fd = new FormData();
  fd.append("fullName", fullName);
  fd.append("email", email);
  fd.append("password", password);
  fd.append("image", image);
  fd.append("address", address);
  fd.append("mobile", mobile);
  return fetch("https://openme.click/api/signup.php", {
    method: "POST",
    body: fd,
  })
    .then(async (r) => {
      const response = await r.json();
      return response;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export { loginUser, signupUser, verifyUser };
