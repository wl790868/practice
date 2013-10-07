<?php
  $server='localhost';
  $username='root';
  $password='root';
  $con=mysql_connect($server,$username,$password);
  mysql_query("CREATE DATABASE microblog",$con);
  mysql_select_db('microblog',$con);
  mysql_query("set names gb2312");
  $sql="CREATE TABLE message(
         'id' int(10) unsigned NOT NULL auto_increment,
		 'message' text NOT NULL,
		 'date' datetime NOT NULL,
		 PRIMARY KEY ('id')
		);";
   mysql_query($sql,$con);
   $sql="CREATE TABLE t_user(
         'id' int(10) unsigned NOT NULL AUTO_INCREMENT,
		 'username' char(20) NOT NULL,
		 'password' char(50) NOT NULL,
		 PRIMARY KEY ('username')
		 );";
   mysql_query($sql,$con);
   mysql_close($con);
 ?>