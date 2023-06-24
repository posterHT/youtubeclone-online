<?php
    $video_url = $_GET["video_url"];
    $format = $_GET["format"];

    $vr = file_get_contents("https://loader.to/ajax/download.php?button=1&start=1&end=1&format=$format&url=$video_url");
    //https://loader.to  Youtube video converter tool
    echo $vr;
?>