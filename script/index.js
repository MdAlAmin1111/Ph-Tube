function loadCategory() {
    // data fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // convert promise to json
        .then((response) => response.json())
        .then(data => {
            displayCategory(data.categories);
        })
}

function displayCategory(data) {
    console.log(data[0].category);
    const categoryContainer = document.getElementById("category-container");
    for(let i=0; i<Date.length; i++){
        categoryContainer.innerHTML+=`<button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${data[i].category}</button>`
    }
    // const categoryDiv = document.createElement("div");
    // categoryContainer.appendChild(categoryDiv);
    // for (let item of data) {
    //     console.log(item.category);
    //     const categoryDiv = document.createElement("div");
    //     categoryDiv.innerHTML = `
    //     <button class="btn btn-sm">${item.category}</button>
    //     `
    //     categoryContainer.appendChild(categoryDiv);
    // }

}
loadCategory();