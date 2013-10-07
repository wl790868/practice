<?php
  require("config.php");
  header("Content-Type:text/html");
  header("Cache-Control:no-cache");
  foreach($_POST as $key=>$value){
    $$key=mysql_real_escape_string($value);
	}
  if(!get_magic_quotes_gpc()){
    $message=addslashes($message);
	}
  if($action="postmsg"){
    $sql="INSERT INTO message (message,date) VALUES ('$message',current_date)";
	mysql_query($sql) or die('Error,query failed.'.mysql_error());
	}
  echo "<?xml version=\"1.0\"?>\n";
  echo "\t<message>\n";
  echo "\t\t<text>$message</text>\n";
  echo "\t</message>\n";
 ?>