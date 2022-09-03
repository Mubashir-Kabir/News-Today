// Category section dynamic add
const newsPage = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category))
    .catch((error) =>
      console.error(
        error,
        '"error occured when try to fetch api of categories"'
      )
    );
};
newsPage();

//   display category Selection
const displayCategory = (categories) => {
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a class="nav-link" onclick="categoryClickHandle('${
          category.category_id
        }',${true})" href="#"
            >${
              category.category_name
                ? category.category_name
                : "Ctgry not found"
            }</a
        >
    `;
    document.getElementById("categoryContainer").appendChild(div);
    spinnnerToggle(true);
    categoryClickHandle("08");
  });
};

// category click handle and fetch api
const categoryClickHandle = (id, click) => {
  if (click) {
    document.getElementById("itemFoundSection").style.display = "block";
  }
  spinnnerToggle(true);
  document.getElementById("cardContainer").innerHTML = ``;

  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length === 0) {
        document.getElementById("itemFound").innerText = "No";
      } else {
        document.getElementById("itemFound").innerText = data.data.length;
      }
      const sortByView = data.data.sort((a, b) => {
        return b.total_view - a.total_view;
      });
      cardDisplayByCategory(sortByView);
    })
    .catch((error) => console.log(error, `api feching cousing error`));
};
// category wise card display
const cardDisplayByCategory = (posts) => {
  posts.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="row bg-white rounded px-3 py-2 g-5 align-items-center  my-4">
            <div class="cardImg col-12 col-md-4 mt-0">
              <img
                class="w-100"
                src='${post.thumbnail_url}'
                alt="image not found"
              />
            </div>
            <div class="cardDescription col-12 col-md-8">
              <h4 class="fw-bold">
                ${post.title ? post.title : "No tittle found"}
              </h4>
              <p class="mt-5">
                ${
                  post.details ? post.details.slice(0, 600) : "No details found"
                }...
              </p>
              <div
                class="mt-5 row row-cols-4 g-2 justify-content-between align-items-center"
              >
                <div class="col row align-items-center text-center">
                  <img
                    class="col-4 rounded-circle"
                    src='${post.author.img}'
                    alt="not found"
                  />
                  <div class="col-8">
                    <p class="fs-custom">${
                      post.author.name ? post.author.name : "not found"
                    }</p>
                    <p class="text-muted fs-custom">${
                      post.author.published_date
                        ? post.author.published_date
                        : "not found"
                    }</p>
                  </div>
                </div>
                <div class="col text-center">
                  <i class="fa-regular fa-eye"></i>
                  <span>${
                    post.total_view ? post.total_view : "not found"
                  }</span>
                </div>
                <div class="col text-center">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
                <div class="col text-center">
                  <button type="button" data-bs-toggle="modal"
                     data-bs-target="#newsModal" class="border-0 text-primary bg-white" onclick="cardModalShow('${
                       post._id
                     }')" href=""><i class="fa-solid fs-1 fa-arrow-right"></i></button>
                </div>
              </div>
            </div>
          </div>
    `;
    document.getElementById("cardContainer").appendChild(div);
  });
  spinnnerToggle(false);
};

// modal handle
const cardModalShow = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => modalShow(data.data[0]))
    .catch((error) =>
      console.log(error, "Something is wrong please try again")
    );
};

const modalShow = (post) => {
  console.log(post);
  document.getElementById("newsModalLabel").innerText = post.title;
  document.getElementById("modalBody").innerHTML = ``;
  const div = document.createElement("div");
  div.innerHTML = `
     <div class="row g-5 align-items-center mb-4">
            <div class="cardImg col-12">
              <img
                class="w-100"
                src='${post.image_url}'
                alt="image not found"
              />
            </div>
            <div class="cardDescription col-12">
              <p class="mt-5">
                ${post.details ? post.details : "No details found"}
              </p>
              <div
                class="mt-5 row row-cols-3 g-2 justify-content-between align-items-center"
              >
                <div class="col row align-items-center text-center">
                  <img
                    class="col-12 rounded-circle"
                    src='${post.author.img}'
                    alt="not found"
                  />
                  <div class="col-12">
                    <p class="fs-custom">${
                      post.author.name ? post.author.name : "not found"
                    }</p>
                    <p class="text-muted fs-custom">${
                      post.author.published_date
                        ? post.author.published_date
                        : "not found"
                    }</p>
                  </div>
                </div>
                <div class="col text-center">
                  <i class="fa-regular fa-eye"></i>
                  <span>${
                    post.total_view ? post.total_view : "not found"
                  }</span>
                </div>
                <div class="col text-center">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
              </div>
            </div>
          </div>
    `;
  document.getElementById("modalBody").appendChild(div);
};

// spinner toggler
const spinnnerToggle = (status) => {
  if (status) {
    document.getElementById("loadingSpinner").style.display = "block";
  } else {
    document.getElementById("loadingSpinner").style.display = "none";
  }
};
