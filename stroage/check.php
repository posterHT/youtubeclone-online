<?php
  $file = $_GET["file"];
  
  if(file_exists("$file.mp4")){
    echo "true";
   }else{
    echo "false".$file;
  }
?>
