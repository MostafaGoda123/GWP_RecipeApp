// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// https://www.themealdb.com/api/json/v1/1/filter.php?i=Seafood

let search = document.querySelector(".search")
let searchInput = document.querySelector(".search input")
let searchBtn = document.querySelector(".search button")
let result = document.querySelector(".result")

searchBtn.onclick = function () {
   let sInp = searchInput.value
   let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${sInp}`
   fetch(apiUrl)
   .then(res => { if (res.ok) return res.json() })
   .then(data => {
      if (data.meals == null) {
         result.innerHTML = `<h1>No recipes !!!!</h1>`
      }else {
         result.innerHTML = ``
         data.meals.map(meal => {
            result.innerHTML += `
            <div class="box">
               <img src='${meal.strMealThumb}' >
               <h2>${meal.strMeal}</h2>
               <button class='getDetails' data-id=${meal.idMeal}>Get Details</button>
            </div>
         `
         })
      }
   })
}
result.addEventListener("click",function (e) {
   if (e.target.classList.contains("getDetails") ) {
      let id = e.target.getAttribute("data-id")
      let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      fetch(apiUrl)
      .then(res => res.json())
      .then(data => { showDetails(data.meals[0]) })
   }
})
function showDetails(item) {
   search.innerHTML = `
      <div class="details">
         <i class="fa-solid fa-xmark"></i>
         <h2>${item.strMeal}</h2>
         <p>Instruction : </p>
         <p>${item.strInstructions}</p>
         <a href="${item.strYoutube}" target="_blank">Youtube video</a>
      </div>
   `
}
search.addEventListener("click" , function (e) {
   if(e.target.classList.contains("fa-xmark")){
      search.innerHTML =`
         <h1>Find Recipes</h1>
         <div>
            <input type="text" placeholder="Enter the recipe">
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
         </div>
      `
   }
})
