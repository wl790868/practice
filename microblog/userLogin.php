<?php 
   $username=$_POST['username'];
   $password=$_POST['password'];
   $password=md5($password);
   if(!empty($username)){
    $con=mysql_connect("localhost","root","root");
    mysql_select_db("microblog",$con);
    $sql="SELECT * FROM user WHERE username='$username' and password='$password'";
    $result=mysql_query($sql,$con);
    if($result&&mysql_num_rows($result)){
     echo "success!";
    }
    else{
      echo "fail";
        }
    }
?>