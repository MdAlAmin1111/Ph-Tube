function loadCategory() {
    // data fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // convert promise to json
        .then((response) => response.json())
        .then(data => {
            displayCategory(data.categories);
        })
}
function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => {
            displayVideos(data.videos);
        })
}
/*
{category_id: '1001', video_id: 'aaaa', thumbnail: 'https://i.ibb.co/L1b6xSq/shape.jpg', title: 'Shape of You', authors: Array(1), …}
authors
: 
[{…}]
category_id
: 
"1001"
description
: 
"Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
others
: 
{views: '100K', posted_date: '16278'}
thumbnail
: 
"https://i.ibb.co/L1b6xSq/shape.jpg"
title
: 
"Shape of You"
video_id
: 
"aaaa"
[[Prototype]]
: 
Object
*/

const loadCategoryVideos = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    
    fetch(url)
    .then(res=>res.json())
    .then((data=>{
        displayVideos(data.category);
    }))
}

const displayVideos = (videos) => {

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    videos.forEach(element => {
        // console.log(element);
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
                    <h2 class="font-semibold text-sm">something</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${element.authors[0].profile_name} <img class="w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
                    <p class="text-sm text-gray-400">${element.others.views} views</p>
                </div>
            </div>
        </div>
        `
        // append
        videoContainer.append(videoCard)
    });
}

function displayCategory(data) {
    const categoryContainer = document.getElementById("category-container");
    for (let i = 0; i < Date.length; i++) {
        categoryContainer.innerHTML += `<button onclick="loadCategoryVideos(${data[i].category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${data[i].category}</button>`
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
