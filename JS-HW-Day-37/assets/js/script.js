import { client } from "./client.js";
import { requestRefresh } from "./token.js";

client.setUrl("https://api-auth-two.vercel.app");

let currentPage = 1;
let isFetching = false;
let hasMore = true;

const setPostScheduleInfo = function () {
  const postBtn = document.querySelector("#post-option");
  postBtn.classList.add("btn-info");
  postBtn.classList.remove("btn-warning");
};

const setPostScheduleWarning = function () {
  const postBtn = document.querySelector("#post-option");
  postBtn.classList.remove("btn-info");
  postBtn.classList.add("btn-warning");
};

const formatBlogTime = (check) => {
  const minutes = Math.floor((check / (1000 * 60)) % 60);
  const hours = Math.floor((check / (1000 * 60 * 60)) % 24);
  const days = Math.floor((check / (1000 * 60 * 60 * 24)) % 30);

  return days > 0 && days < 31
    ? `${days} ngày`
    : days === 0 && hours > 0
    ? ` ${hours} giờ` + (minutes > 0 ? ` ${minutes} phút` : "")
    : days === 0 && hours === 0 && minutes > 0
    ? `${minutes} phút`
    : days === 0 && hours === 0 && minutes === 0
    ? `vài giây`
    : false;
};

const formatScheduleTime = (today, schedule) => {
  const remaining = schedule - today;
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor((remaining / (1000 * 60 * 60 * 24)) % 30);
  const years = Math.floor((remaining / (1000 * 60 * 60 * 24 * 30)) % 365);

  const timeUnits = [];
  if (years > 0) timeUnits.push(`${years} năm`);
  if (days > 0) timeUnits.push(`${days} ngày`);
  if (hours > 0) timeUnits.push(`${hours} giờ`);
  if (minutes > 0) timeUnits.push(`${minutes} phút`);

  return timeUnits.join(" ");
};

const showLoading = () => {
  document.getElementById("loading").style.display = "block";
};

const hideLoading = () => {
  document.getElementById("loading").style.display = "none";
};

const fetchData = async () => {
  showLoading();
  const list = document.querySelector(".block-list");
  isFetching = true;

  try {
    const response = await client.get(`/blogs?page=${currentPage}`);
    const data = response.data.data;
    console.log(data);

    isFetching = false;
    if (!data) {
      hasMore = false;
      hideLoading();
      return;
    }

    currentPage++;

    for (const post of data) {
      const postElement = createPostElement(post);
      const separator = document.createElement("hr");

      list.appendChild(separator);
      list.appendChild(postElement);
    }

    hideLoading();

    window.addEventListener("scroll", handleScroll);
  } catch (error) {
    console.error(error);
    hideLoading();
  }
};

const createPostElement = (post) => {
  const { createdAt } = post;
  const date = new Date(createdAt);
  const today = new Date();
  const check = today.getTime() - date.getTime();

  let timeUp = formatBlogTime(check);
  if (!timeUp) {
    const diffYears = today.getFullYear() - date.getFullYear();
    timeUp =
      diffYears > 0
        ? `${diffYears} năm`
        : `${today.getMonth() - date.getMonth()} tháng`;
  }

  const dateString = `${date.getDate()} - ${
    date.getMonth() + 1
  } - ${date.getFullYear()}`;
  const hoursString = `${date.getHours()} giờ ${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  } phút`;

  const postElement = document.createElement("div");
  postElement.innerHTML = `<section>
    <p>Date: ${dateString}</p>
    <p>Name: ${post.userId.name}</p>
    <p>Title: ${post.title}</p>
    <p>Content: ${post.content}</p>
    <p class="date">Thời gian: ${timeUp} trước</p>
  </section>`;
  return postElement;
};

const handleScroll = () => {
  if (isFetching || !hasMore) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchData();
  }
};

const renderDefault = () => {
  root.innerHTML = `<h1>Blogger</h1>
      <button type="submit" class="btn btn-primary">Login</button>
      <div class="block-list"></div>`;
  currentPage = 1;
  fetchData();
};

const renderRegister = () => {
  root.innerHTML = `<div class="container py-3">
  <div class="row justify-content-center">
    <div class="col-md-4">
      <h2 class="text-center mb-4">Register</h2>

      <form class="register">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Enter your name" required>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your email" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm password</label>
          <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm your password" required>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>

      <div class="msg text-danger"></div>

      <div class="mt-3">
        <span>Already have an account?</span> <a class="login-button" href="#!">Login</a>
      </div>

      <a class="default" href="#!">Back to home</a>
    </div>
  </div>
</div>
`;
  const login = document.querySelector(".login-button");
  login.addEventListener("click", function (e) {
    e.preventDefault;
    renderLogin();
    app.eventLogin();
  });
  const defaultButton = document.querySelector(".default");
  defaultButton.addEventListener("click", function (e) {
    e.preventDefault();
    app.render();
  });
};

const renderLogin = () => {
  root.innerHTML = `<div class="container py-3">
  <div class="row justify-content-center">
    <div class="col-md-4">
      <h2 class="text-center mb-4">Login</h2>

      <form class="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Enter email" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Enter password" required>
        </div>

        <div class="mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe">
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>

      <div class="msg text-danger"></div>

      <div class="mt-3">
        <span>Don't have an account?</span> <a class="register-button" href="#!">Register</a>
      </div>

      <a class="default" href="#!">Back to home</a>
    </div>
  </div>
</div>

`;
  const register = document.querySelector(".register-button");
  register.addEventListener("click", function (e) {
    e.preventDefault;
    renderRegister();
    app.eventRegister();
  });
  const defaultButton = document.querySelector(".default");
  defaultButton.addEventListener("click", function (e) {
    e.preventDefault();
    app.render();
  });
};
const app = {
  render: function () {
    const root = document.querySelector("#root");
    if (this.isLogin()) {
      root.innerHTML = `<div class="container py-3">
      <h2 class="text-center">Welcome Back</h2>
      <hr />
      <ul class="list-unstyled d-flex gap-3 profile">
        <li>Hello, <b class="name">Loading...</b></li>
        <li><a href="#" class="logout">Logout</a></li>
      </ul>
    
      <div class="form-wrapper">
        <form class="post container w-90 mx-auto">
          <div class="form-group">
            <label for="title">Post Title</label>
            <input type="text" id="title" placeholder="Enter post title" />
          </div>
    
          <div class="form-group">
            <label for="content">Post Content</label>
            <textarea id="content" cols="30" rows="10"></textarea>
          </div>
    
          <div class="form-group">
            <label for="date">Schedule Post Time</label>
            <input type="datetime-local" id="date" />
          </div>
    
          <button type="submit" class="btn btn-primary text-left w-100 my-3">Publish Post</button>
        </form>
      </div>
    
      <div class="msgTwo text-danger"></div>
    </div>
    
    <div class="block-list"></div>
    `;
      currentPage = 1;
      fetchData();
      const profileName = document.querySelector(".profile .name");
      this.getProfile(profileName);
      this.eventLogout();
      this.eventPost();
    } else {
      renderDefault();
      const btn = root.querySelector("button");
      btn.addEventListener("click", function () {
        renderLogin();
        app.eventLogin();
      });
    }
  },
  isLogin: function () {
    if (localStorage.getItem("login_tokens")) {
      return true;
    }
    return false;
  },
  handleLogin: async function (data, msg) {
    msg.innerText = "";
    this.addLoading();
    const { data: tokens, response } = await client.post("/auth/login", data);
    this.removeLoading();
    if (!response.ok) {
      msg.innerText = `${tokens.message}`;
    } else {
      localStorage.setItem(`login_tokens`, JSON.stringify(tokens));
      this.render();
    }
  },
  handleRegister: async function (data, msg) {
    msg.innerText = "";
    this.addLoadingRegister();
    const { data: tokens, response } = await client.post(
      "/auth/register",
      data
    );
    this.removeLoadingRegister();
    if (!response.ok) {
      msg.innerText = `${tokens.message}`;
    } else {
      this.render();
    }
  },
  getToken: function () {
    let loginTokens = localStorage.getItem(`login_tokens`);
    loginTokens = JSON.parse(loginTokens);
    const { data: _data } = loginTokens;
    if (_data.accessToken === undefined) {
      const { token } = _data;
      const { accessToken, refreshToken } = token;
      return { accessToken, refreshToken };
    } else {
      const { accessToken, refreshToken } = _data;
      return { accessToken, refreshToken };
    }
  },
  getProfile: async function (el) {
    if (this.isLogin()) {
      const { accessToken, refreshToken } = this.getToken();
      client.setToken(accessToken);
      const { response, data } = await client.get("/users/profile");
      if (response.ok) {
        el.innerText = data.data.name;
      } else {
        const newToken = await requestRefresh(refreshToken);
        localStorage.removeItem("login_tokens");
        if (!newToken) {
          this.handleLogout();
        } else {
          localStorage.setItem(`login_tokens`, JSON.stringify(newToken));
        }
        this.render();
      }
    }
  },
  addLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },
  removeLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Login`;
    btn.disabled = false;
  },
  addLoadingRegister: function () {
    const form = document.querySelector(".register");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },
  removeLoadingRegister: function () {
    const form = document.querySelector(".register");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Register`;
    btn.disabled = false;
  },
  addLoadingPost: function () {
    const form = document.querySelector(".post");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },
  removeLoadingPost: function () {
    const form = document.querySelector(".post");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Post`;
    btn.disabled = false;
  },
  eventLogin() {
    const form = document.querySelector(".login");
    const msg = document.querySelector(".msg");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = e.target.querySelector(".email").value;
      const password = e.target.querySelector(".password").value;

      this.handleLogin({ email, password }, msg);
    });
  },

  eventRegister() {
    const form = document.querySelector(".register");
    const msg = document.querySelector(".msg");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = e.target.querySelector(".name").value;
      const email = e.target.querySelector(".email").value;
      const password = e.target.querySelector(".password").value;

      // Validate user input before calling handleRegister
      if (!validateName(name)) {
        msg.innerText = "Invalid name format";
        return;
      }

      if (!validateEmail(email)) {
        msg.innerText = "Invalid email format";
        return;
      }

      if (!validatePassword(password)) {
        msg.innerText = "Invalid password format";
        return;
      }

      this.handleRegister({ name, email, password }, msg);
    });
  },

  handleLogout: async function (data) {
    const { data: tokens, response } = await client.post("/auth/logout", data);
    localStorage.removeItem("login_tokens");
    this.render();
  },
  eventLogout: function () {
    const logout = document.querySelector(".profile .logout");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      let loginTokens = localStorage.getItem(`login_tokens`);
      loginTokens = JSON.parse(loginTokens);
      const { data: _data } = loginTokens;
      const { accessToken, refreshToken } = _data;
      this.handleLogout({ accessToken, refreshToken });
    });
  },
  handlePost: async function (data, timePost, msg) {
    if (msg.classList.contains("text-success")) {
      msg.classList.add("text-danger");
      msg.classList.remove("text-success");
    }
  
    msg.innerText = "";
    app.addLoadingPost();
  
    if (timePost === "") {
      const { data: tokens, response } = await client.post("/blogs", data);
  
      if (!response.ok && response.status === 400) {
        msg.innerText = "Please enter a title and content for the post";
        app.removeLoadingPost();
      } else if (!response.ok && response.status === 401) {
        msg.innerText = "Refreshing token...";
        const { refreshToken } = this.getToken();
        const newToken = await requestRefresh(refreshToken);
  
        if (!newToken) {
          this.handleLogout();
        } else {
          localStorage.setItem("login_tokens", JSON.stringify(newToken));
          const { accessToken } = this.getToken();
          client.setToken(accessToken);
  
          this.handlePost(data, timePost, msg);
          app.removeLoadingPost();
        }
      } else {
        // Post successful
        msg.classList.remove("text-danger");
        msg.classList.add("text-success");
        msg.innerText = "Post published successfully! Refreshing...";
  
        setTimeout(() => {
          app.removeLoadingPost();
          app.render();
        }, 2000);
      }
    } else {
      const { refreshToken } = this.getToken();
      const newToken = await requestRefresh(refreshToken);
  
      if (!newToken) {
        this.handleLogout();
      } else {
        localStorage.setItem("login_tokens", JSON.stringify(newToken));
        const { accessToken } = this.getToken();
        client.setToken(accessToken);
      }
  
      const { title, content } = data;
      const postBtn = document.querySelector("#post-option");
  
      if (!title || !content) {
        msg.innerText = "Please enter a title and content for the scheduled post";
        app.removeLoadingPost();
        postBtn.innerText = "Schedule";
      } else {
        const today = new Date();
        const schedule = new Date(timePost);
  
        if (today > schedule) {
          msg.innerText = "Scheduled time has passed, please select a future time";
          app.removeLoadingPost();
          postBtn.innerText = "Schedule";
        } else if (+today + 300000 > +schedule) {
          msg.innerText = "Schedule post at least 5 minutes in advance";
          app.removeLoadingPost();
          postBtn.innerText = "Schedule";
        } else {
          msg.classList.remove("text-danger");
          msg.classList.add("text-success");
          waitingTime = changeTimeSchedule(today, schedule);
          msg.innerText = `Post will be published in ${waitingTime}`;
  
          setTimeout(() => {
            RemovePostSchedule();
            app.removeLoadingPost();
            app.render();
          }, 2000);
        }
      }
    }
  },
  
  eventPost() {
    const post = document.querySelector(".post");
    const titleEl = post.querySelector("#title");
    const contentEl = post.querySelector("#content");
    const timeEl = post.querySelector("#date");
    const postBtn = post.querySelector("#post-option");
    const msg = document.querySelector(".msgTwo");
  
    // Handle schedule selection
    timeEl.addEventListener("change", () => {
      if (timeEl.value !== "") {
        AddPostSchedule();
        postBtn.innerText = "Schedule";
      } else {
        RemovePostSchedule();
        postBtn.innerText = "Post";
        msg.innerText = "";
      }
    });
  
    // Handle post submission
    post.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleEl.value;
      const content = contentEl.value;
      const timePost = timeEl.value;
  
      app.handlePost({ title, content }, timePost, msg);
    });
  },
}; 

app.render();
