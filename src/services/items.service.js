const fetchItems = async (sid = 1) => {
  let fd = new FormData();
  fd.append("store", sid);
  return await fetch("https://openme.click/api/items.php", {
    method: "POST",
    body: fd,
  })
    .then((response) => response.json())
    .catch((error) => {
      alert(error.toString());
    });
};

// /**
//  * Real Fetching of single item
//  * @param {number} id
//  */
const fetchItem = async (id) => {
  let fd = new FormData();
  fd.append("id", id);
  try {
    const response = await fetch("https://openme.click/api/items.php", {
      method: "POST",
      body: fd,
    });
    if (response.ok) {
      const item = await response.json();
      return item;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
//
const createItem = async (item) => {
  let fd = new FormData();
  fd.append("category", item.category);
  fd.append("description", item.description);
  fd.append("image", item.image);
  fd.append("ingredients", item.ingredients);
  fd.append("name", item.name);
  fd.append("price", item.price);
  fd.append("token", item.token);
  fd.append("uid", item.uid);
  fd.append("store", item.store);
  return await fetch("https://openme.click/api/add_item.php", {
    method: "POST",
    body: fd,
  })
    .then(async (r) => {
      const response = await r.json();
      if (response.res == "succeeded") {
        return true;
      } else {
        console.log(response.text);
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

/**
 * Real Deleting of single item
 * @param {number} id
 */
const deleteItem = async (id) => {
  try {
    const response = await fetch(
      `https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu/${id}`,
      { method: "DELETE" }
    );
    if (response) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const updateItem = async (item) => {
  return await fetch(
    `https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu/${item.id}`,
    {
      method: "PUT",
      body: JSON.stringify(item),
    }
  )
    .then(async (response) => {
      if (response) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export { fetchItem, fetchItems, createItem, updateItem, deleteItem };
