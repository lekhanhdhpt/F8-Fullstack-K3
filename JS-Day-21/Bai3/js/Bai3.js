function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
  this.role = "user";
}

function register(name, password, email) {
  if (name === "" || password === "" || email === "") {
    console.log("Thông tin không đầy đủ.");
    process.exit();
  }

  const user = new User(name, password, email);
  data.push(user);

  return user;
}

function login(email, password) {
  const user = data.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return user;
  } else {
    console.log("Thông tin đăng nhập không hợp lệ.");
  }
}
const data = [];

const user1 = register("Nguyen Van A", "123456", "nguyenvana@email.com");
const user2 = register("Nguyen Van B", "1234567", "nguyenvanb@email.com");

const userLogin = login("Nguyen Van B", "1234567");

console.log(user1);

console.log(userLogin);
