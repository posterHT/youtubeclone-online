<?php


    $id = $_GET["id"];
    $link = $_GET["link"];
    
   $content = file_get_contents($link);
   file_put_contents("$id.mp4",$content);
    //link , dosya adı
    echo "success";
?>