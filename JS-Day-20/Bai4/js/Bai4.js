const data = [
  {
    srcImg: "../Bai4/asset/image/167-500x300.jpg",
    title: "Tiêu đề 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit consequatur fugit natus perspiciatis quia explicabo molestiae veniam, veritatis totam rem cum incidunt hic accusamus vel doloribus nisi eius! Quidem, quisquam",
  },
  {
    srcImg: "../Bai4/asset/image/167-500x300.jpg",
    title: "Tiêu đề 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit consequatur fugit natus perspiciatis quia explicabo molestiae veniam, veritatis totam rem cum incidunt hic accusamus vel doloribus nisi eius! Quidem, quisquam",
  },
  {
    srcImg: "../Bai4/asset/image/167-500x300.jpg",
    title: "Tiêu đề 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit consequatur fugit natus perspiciatis quia explicabo molestiae veniam, veritatis totam rem cum incidunt hic accusamus vel doloribus nisi eius! Quidem, quisquam",
  },
];

const dataContainer = document.getElementById("container");

data.forEach(function (dataItem) {
  const element = document.createElement("div");
  element.className = "dataItem";
  element.innerHTML = `
      <div class="dataImg">
        <img src="${dataItem.srcImg}" alt="Ảnh">
      </div>
      <div class="dataContent"> 
        <h2>${dataItem.title}</h2>
        <p>${dataItem.text}</p>
      </div>
    `;

  dataContainer.appendChild(element);
});
