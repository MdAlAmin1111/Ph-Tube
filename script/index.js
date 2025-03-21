function removeActiveClass() {
    const activebtn = document.getElementsByClassName('active');
    for (let i = 0; i < activebtn.length; i++) {
        activebtn[i].classList.remove('active');
    }
}
function loadCategory() {
    // data fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // convert promise to json
        .then((response) => response.json())
        .then(data => {
            displayCategory(data.categories);
        })
}
function loadVideos(searchText='') {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            // removeActiveClass();
            document.getElementById('btn-all').classList.add('active');
            displayVideos(data.videos);
        })
}
function loadVideoDetails(vidoeId) {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${vidoeId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => videoDetails(data.video))
}

const videoDetails = (video) => {
    console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details_container');
    detailsContainer.innerHTML =
        `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
    `;
}
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");

            displayVideos(data.category);
        });
}

const displayVideos = (videos) => {

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center h-[60vh] justify-center">
            <img class="w-[120px]" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops! Sorry, There is no content here</h2>
        </div>
       `;
        return;
    }

    videos.forEach(element => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover" src="${element.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-[#171717] text-sm rounded px-2 py-1 ">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src="${element.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="font-semibold text-sm">${element.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                    ${element.authors[0].profile_name}
                    ${element.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">` : `` }

                     </p>
                    <p class="text-sm text-gray-400">${element.others.views} views</p>
                </div>
            </div>
            <button onclick = loadVideoDetails('${element.video_id}') class="btn btn-block">Show Details</button>
        </div>
        `
        videoContainer.append(videoCard)
    });
}

function displayCategory(data) {
    const categoryContainer = document.getElementById("category-container");
    for (let i = 0; i < Date.length; i++) {
        categoryContainer.innerHTML += `<button id="btn-${data[i].category_id}" onclick="loadCategoryVideos(${data[i].category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${data[i].category}</button>`
    }
}
document.getElementById('search-input').addEventListener("keyup", (e)=>{
    const input = e.target.value;
    loadVideos(input);

});
loadCategory();
