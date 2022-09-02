// Category section dynamic add
fetch("https://openapi.programming-hero.com/api/news/categories")
  .then((res) => res.json())
  .then((data) => displayCategory(data.data.news_category));

//   display category Selection
const displayCategory = (categories) => {
  categories.forEach((category) => {
    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.innerText = category.category_name;
    document.getElementById("categoryContainer").appendChild(a);
  });
};
