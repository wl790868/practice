<?php
   $username=$_POST['username'];
   $pwd=$_POST['password'];
   $errmsg="";
  if(!empty($username)){
    if(empty($username)){
    $errmsg='数据输入不完整';
    }
 if(empty($errmsg)){
  $con=mysql_connect("localhost","root","root");
  if(!$con){
    $errmsg="数据库连接失败<br>\n";
    }
  else{
  mysql_select_db("microblog",$con);
  $sql="SELECT * FROM t_user WHERE f_username='$username' AND f_password='$pwd'";
  $rs=mysql_query($sql,$con);
  if($rs&&mysql_num_rows($rs)>0){
  session_start();
  $_SESSION['uid']=$username;
  $errmsg="登录成功";
  $ip=$_SERVER['REMOTE_ADDR'];
  $sql="UPDATE t_user SET f_logintimes=f_logintimes+1,";
  $sql.="f_lasttime=now(),f_loginip='$ip'";
  $ql.=" WHERE f_username='$username'";
  mysql_query($sql,$con);
  }
  else{
    $errmsg="用户名或密码不正确，登录失败！";
    }
 mysql_close($con);
  }
 }
}
?>
<html>
   <head>
    <title> User login</title>
    <style type="text/css">
    .alert {color:red}
    .textinput {width:160px}
    .btn {width:80px}
    table {border:3px double; background-color:#eeeeee;}
    </style>
  <script language="javascript">
    function doCheck(){
      if(document.frmlogin.username.value==""){
        alert('请输入你的用户名！');
        return false;
        }
      if(document.frmlogin.password.value==""){
        alert('请输入你的密码！');
        return false;
        }
    }
  </script>
  </head>
  <body>
    <form name='frmlogin' method="post" action="login.php" onSubmit="return doCheck();">
    <table border="0" cellpadding="8" width="350" align="center">
    <tr><td colspan="2" align="center" class="alert"><? echo $errmsg;?></td></tr>
    <tr><td>用户名：</td>
        <td> <input name="username" type="text" id="username" class="textinput" value="<? echo $username;?>" /></td>
    </tr>
    <tr><td>密码：</td>
        <td><input name="password" type="password" id="password" class="textinput"/></td>
    </tr>
    <tr><td colspan="2" align="center">
        <input type="submit" class="btn" value="登录">&nbsp; &nbsp;
        <input type="reset" class="btn" value="重置">
        </td>
    </tr>
    </form>
    </body>
</html>