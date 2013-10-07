<?php
   $username=$_POST['username'];
   $pwd=$_POST['password'];
   $repeat_pwd=$_POST['repeat_pwd'];
   $name=$_POST['name'];
   $email=$_POST['email'];
    if(!empty($username)){
    $con=mysql_connect("localhost","root","root");
	mysql_select_db("microblog",$con);
	$sql="SELECT * FROM user WHERE  username='$username'";
	$rs=mysql_query($sql,$con);
	if($rs&&mysql_num_rows($rs)>0){
	  echo  "<script type=\"text/javascript\">alert(\" 此用户名已被注册!\");</script>";
	  }
	else{
	$pwd=md5($pwd);
	$sql="INSERT INTO user (username,password,email) VALUES";
	$sql.="('$username','$pwd','$email')";
	$result=mysql_query($sql,$con);
	if(!result){
	 mysql_close($con);
	 echo "数据记录插入失败!";
	 exit;
	 }
	else{
    echo "<script type=\"text/javascript\">alert(\" 恭喜你注册成功!\");window.close();</script>";
	mysql_close($con);
	}
   }
}
 ?>
<html>
    <head>
	<meta http-equiv="Content_Type" content="text/html; charset=gb2312">
	<title> Registering form</title>
	<script language='javascript'>
	function doCheck(){
	   var username= document.frmregister.username.value;
	   var pwd     = document.frmregister.pwd.value;
	   var repeat_pwd= document.frmregister.repeat_pwd.value;
	   var name    = document.frmregister.name.value;
	   var email   = document.frmregister.email.value;
	if(username==''){
	  alert('请输入用户名！');
	  return false;
	}
	if(pwd==''){
	  alert('请输入密码');
	  return false;
	}
	if(email==''){
	  alert('请输入emial！');
	  return false;
	}
	if(pwd!=repeat_pwd){
	 alert('密码不一致 请重新输入!');
	 return false;
	 }
	if(pwd.length<6||pwd.length>30){
	  alert('密码长度必须为6-30');
	  return false;
	}
	var pattern=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if(!pattern.test(email)){
	alert('email填写不正确!');
	return false;
	}
	return true;
}
</script>
	</head>
 <body>
 <div id='register'>
  <form name="frmregister" method="post" onsubmit="return doCheck();">
    <table width="330" border="0" align="center" cellpadding="5" bgcolor="#eeeeee">
	    <td width="40%">用户名：</td>
		<td><input name="username" type="text" id="username"></td>
	</tr>
	<tr>
	    <td width=>密码：</td>
		<td><input name="pwd" type="password" id="pwd"></td>
	</tr>
	<tr>
	    <td >重复密码：</td>
		<td><input name="repeat_pwd" type="password" id="repeat_pwd"></td>
	</tr>
	<tr>
	    <td >Email:</td>
		<td><input name="email" type="text" id="email"></td>
	</tr>
	<tr>
	   <td colspan="2" align="center">
	    <input type="submit" name="submit" value="提交">
		<input type="reset" name="reset" value="重置">
		</td>
	</tr>
	</table>
	</form>
 </div>
 </body>
 </html>