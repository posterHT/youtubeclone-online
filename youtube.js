// API'nin yüklenmesini bekleyin
// API'nin yüklenmesini bekleyin
// API'nin yüklenmesini bekleyin

function _(id) {
    return document.getElementById(id);
}
function search() {
    var q = _("searchTextBox").value;
    list_kw = q;
    _("vidlist").innerHTML = "";
    start();
}
gapi.load('client', start);

var list_kw = "";
var api_key_list =
    ["YOUR-API-KEY"];
// API LIST

var api_key_select = 0; // var sayılan anahtar
var maxResults = 10;// yineleme başına atacak video sayısı


function start() {
    // API istemcisini yükleyin
    gapi.client.init({
        apiKey: api_key_list[api_key_select], // YouTube Data API v3 için API anahtarınızı buraya girin
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(function () {
        // API başarıyla yüklendi
        // Aranan kelimeyle videoları listelemek için API isteğini yapın
        console.log("API SELECTED:" + api_key_select);
        return gapi.client.youtube.search.list({
            part: 'snippet',
            q: list_kw, // Aranacak kelimeyi buraya girin
            maxResults: maxResults, // Alınacak sonuç sayısı
        });
    }).then(function (response) {
        // Yanıtı işleyin
        if (api_key_select >= api_key_list.length)
            return;
        VideoListLoad(response);
    }, function (error) {
        // Hata durumunda işleyin
        api_key_select++;
        if (api_key_select >= api_key_list.length) {
            //alert("You have exceeded your quota or key not found. \nPlease check your API keys \n");
            console.log(error);

            let erromsg = '';
            try {
                erromsg = error.result.error.message;
            } catch {
                erromsg = error.error.message;
            }

            _("startDiv").innerHTML = "<h1>" + erromsg + "<br> Selected Key: " + api_key_list[api_key_select - 1] + "</h1>";

        }
        else
            setTimeout("start()", 1000);
    });
}
var pageToken = "";

function NextPage() {

    gapi.client.youtube.search.list({
        part: 'snippet',
        q: list_kw,
        maxResults: maxResults,
        pageToken: pageToken,// sayfa tokeni eskisinin yenisini çağırır
    }).then(function (response) {
        // Yanıtı işleyin
        console.log("----------NEXT PAGE STARTED------------");
        VideoListLoad(response);

    }).catch(function (error) {
        // Hata durumunda işleyin
        api_key_select++;

        setTimeout("start()", 1000);
    });
}

var videoIdList = [];


var responseFinished = false;
window.addEventListener("scroll", function () {
    // Sayfa her scroll olduğunda çağrılacak kodları buraya yazın
    if ((window.innerHeight + window.pageYOffset) + 15 >= document.body.offsetHeight) {
        // Sayfa en alta gelindiğinde handleScroll fonksiyonunu çağırın
        if (responseFinished) {
            responseFinished = false;
            NextPage(); // yeni sayfa başlat
        }
    }
});

function VideoListLoad(response) {
    new_page_loaded_video_count = 0;
    var videos = response.result.items;
    // Video ID'leri toplayın
    var videoIds = videos.map(function (video) {
        return video.id.videoId;
    });

    // Video ID'lerini kullanarak tek bir API isteği yapın
    var st_videos;
    // Sayfadaki videoların id leri alınır ve bilgiler işlebir
    gapi.client.youtube.videos.list({
        'part': 'snippet,statistics',
        'id': videoIds.join(',')
    }).then(function (st_response) {
        st_videos = st_response.result.items;

        st_videos.forEach(function (item) {
            let title, channelId, channelTitle, description;
            let thumbnail_url;
            let id = item.id;

            var snippet = item.snippet;
            var statistic = item.statistics;

            title = snippet.title;
            channelId = snippet.channelId;
            channelTitle = snippet.channelTitle;
            description = snippet.description;
            thumbnail_url = snippet.thumbnails.medium.url;


            let commentCount, likeCount, viewCount;
            commentCount = statistic.commentCount;
            likeCount = statistic.likeCount;
            viewCount = statistic.viewCount;

            if (videoIdList.indexOf(id) == -1) {
                newVideo(title, viewCount, channelTitle, thumbnail_url, id, likeCount);
                videoIdList.push(id);
                new_page_loaded_video_count++;
            }
        });
        if (_("startDiv") != null)
            _("startDiv").style.display = "none";
        responseFinished = true;
        console.log("----------NEXT PAGE ENDED------------");
        if (new_page_loaded_video_count < 4) {
            responseFinished = false;
            NextPage();
        }
    }, function (eror) {
        api_key_select++;
        setTimeout("start()", 1000);
    });
    pageToken = response.result.nextPageToken;
}

let new_page_loaded_video_count = 0;