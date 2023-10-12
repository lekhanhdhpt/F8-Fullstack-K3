let currentPage = 1;
let isFetching = false;
let hasMore = true;

let root = document.querySelector(".root");

async function fetchData() {
  isFetching = true;

  let response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`
  );

  const data = await response.json();

  console.log(data);

  isFetching = false;

  if (data.length === 0) {
    hasMore = false;
    return;
  }
  for (let post of data) {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        `;
    root.appendChild(div);
  }
  currentPage++;
}

window.addEventListener("scroll", () => {
  if (isFetching || !hasMore) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    fetchData();
  }
});

fetchData();
