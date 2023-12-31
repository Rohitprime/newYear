const funForUsers = async () => {
  const res = await fetch(
    "https://new-year-eb216-default-rtdb.firebaseio.com/userArray.json"
  );
  const users = await res.json();
  let array = [];
  for (let key in users) {
    array.push({
      name: users[key].name,
      password: users[key].password,
    });
  }
  return array;
};

export default funForUsers;
