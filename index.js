function getQueryParams() {
    var queryParams = {};
    var queryString = window.location.search.substring(1);
    var keyValues = queryString.split('&');

    for (var i = 0; i < keyValues.length; i++) {
        var keyValue = keyValues[i].split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1] || '');
        queryParams[key] = value;
    }

    return queryParams;
}

var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
var listcontainer = document.querySelector(".list-container");

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar");

    if(innerWidth<900)
        sidebar.style.display = '';

    container.classList.toggle("large-container");
    
    listcontainer.classList.toggle("list-container-large");
}

function showScrollbar() {
    sidebar.style.overflowY = 'scroll';
}
function hideScrollbar() {
    sidebar.style.overflowY = 'hidden';
}

var showMoreBtn = document.getElementById('showMoreBtn');
var hiddenChannels = document.querySelector('.hidden-channels');
var isMoreShown = false;

showMoreBtn.addEventListener('click', function () {
    if (!isMoreShown) {
        hiddenChannels.style.display = 'block';
        showMoreBtn.textContent = 'Daha Az Göster';
        isMoreShown = true;
    } else {
        hiddenChannels.style.display = 'none';
        showMoreBtn.textContent = 'Daha Fazla Göster';
        isMoreShown = false;
    }
});

var listContainer = document.getElementById("vidlist");
var exampleVid = document.getElementById("videxample").innerHTML;
function newVideo(video_title, video_views, channel_title, thumbnail_src, video_id,video_likes) {
    var para = document.createElement("div");
    var x = exampleVid.replace("#VIDEO_TITLE", video_title)
        .replace("#CHANNEL_TITLE", channel_title)
        .replace("#VIDEO_VIEWS", video_views)
        .replace("#THUMBNAIL_SRC", thumbnail_src)
        .replace("#VIDEO_LIKES",video_likes)
        .replace("VIDEOID",video_id);
    para.innerHTML = x;
   // para.setAttribute("onclick", "goToVideo('" + video_id + "')");

    listContainer.appendChild(para);
}
function goToVideo(id){
    window.location.href = "play-video.html?id="+id;
}