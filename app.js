// Category section dynamic add
fetch("https://openapi.programming-hero.com/api/news/categories")
  .then((res) => res.json())
  .then((data) => displayCategory(data.data.news_category))
  .catch((error) =>
    console.error(error, '"error occured when try to fetch api of categories"')
  );

//   display category Selection
const displayCategory = (categories) => {
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a class="nav-link" onclick="categoryClickHandle('${
          category.category_id
        }','${this}')" href="#"
            >${
              category.category_name
                ? category.category_name
                : "Ctgry not found"
            }</a
        >
    `;
    document.getElementById("categoryContainer").appendChild(div);
  });
};

// category click handle and fetch api
const categoryClickHandle = (id, cat) => {
  console.log(cat);
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("itemFound").innerText = data.data.length;
      cardDisplayByCategory(data.data);
    })
    .catch((error) =>
      console.log(error, `api with id ('${id}') cousing error`)
    );
};
// category wise card display
const cardDisplayByCategory = (posts) => {
  document.getElementById("cardContainer").innerHTML = ``;
  posts.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="row g-5 align-items-center mb-4">
            <div class="cardImg col-12 col-md-4">
              <img
                class="w-100"
                src='${post.thumbnail_url}'
                alt=""
              />
            </div>
            <div class="cardDescription col-12 col-md-8">
              <h4 class="fw-bold">
                ${post.title}
              </h4>
              <p class="mt-5">
                ${post.details.slice(0, 600)}...
              </p>
              <div
                class="mt-5 row row-cols-4 g-2 justify-content-between align-items-center"
              >
                <div class="col row align-items-center text-center">
                  <img
                    class="col-4 rounded-circle"
                    src='${post.author.img}'
                    alt=""
                  />
                  <div class="col-8">
                    <p class="fs-custom">${post.author.name}</p>
                    <p class="text-muted fs-custom">${
                      post.author.published_date
                    }</p>
                  </div>
                </div>
                <div class="col text-center">
                  <i class="fa-regular fa-eye"></i>
                  <span>${post.total_view}</span>
                </div>
                <div class="col text-center">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
                <div class="col text-center">
                  <a onclick="cardModalShow('${
                    post._id
                  }')" href=""><i class="fa-solid fs-1 fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
    `;
    document.getElementById("cardContainer").appendChild(div);
  });
};
