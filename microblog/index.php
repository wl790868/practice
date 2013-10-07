<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>microblog</title>
	<link title="green" media='screen' href='css/green.css' type='text/css' rel='stylesheet' charset='gb2312'>
	<script type='text/javascript' src='http://libs.baidu.com/jquery/1.9.0/jquery.js'></script>
</head>
<body>
 <div id='top1'>
    <form >
    <tr>
	<td>用户名：<input type='text' id='username' ></td>&nbsp;
	<td>密码 <input type='password' id='password'></td>
	<td><input type='submit' id='login' value='登录'><input type='button' id='register' value='注册'></td>
	</form>
 </div>
 <div id='top2'>
 </div>
 <div id='wrapper'>
	   <h1> jQuery Playground</h1> 
	   <ul id='nav'>
	    <li><a class='current' href='index.php'>jQuery实现的微博客网站</a></li>
		<li><a href='#'></a></li>
	   </ul>
	   <div id='content'>
	      <form id='commentForm'>
		    <fieldset>
			   <legend>共输入了<span id='counter'></span>字</legend>
			       <textarea id='cmessage' name='message'></textarea>
				   <input name='btnSign' class='submit' type='submit' id='submit' value='提交'/>
			</fieldset>
		   </form>
		  <div id='messagewindow'>
		  <?php 
		    include('config.php');
			$sql="select id, message,date_format(date,'%Y-%m-%d')
			      from message
				  order by id desc";
			$result=mysql_query($sql,$con);
			mysql_close($con);
			if(mysql_num_rows($result)==0){
			  echo "<h3 id='comm'>暂时没有更新。</h3>";
			  echo "<ul id='comments'></ul>";
			  }
			else{
			  echo "<h3 id='comm'>最近更新</h3>";
			  echo "<ul id='comments'>";
			  while($rows=mysql_fetch_array($result)){
			    list($id,$message,$date)=$rows;
				$message=htmlspecialchars($message);
				$message=nl2br($message);
				echo "<li><p class='info'>chenke在$date 更新:</p>";
				echo "<div class='body'><p>".$message."</p>";
				echo "</div></li>";
		       }
			echo "</ul>";
		    }
		?>
		</div>
		</div>
		<div id='foot'>chenke.联系方式：13277057020 邮箱：chenkehxx@126.com</div>
  </div>
  	<script type='text/javascript'>
	  $(document).ready(function(){
	    $('#commentForm').submit(function(){
		if($('#cmessage').val().length>0){
		  $.post('backend.php',{
		    message:$('#cmessage').val(),
			action: "postmsg"},
		  function(xml){
		   $('#comm').html('最近更新');
		   addMessages(xml);
		   });
	    }
		else{
		  alert("你还未输入任何内容！");
		  }
		return false;
		  });
	  $('#counter').html($('#cmessage').val().length+" ");
	  $("#cmessage").keyup(function(){
	    $("#counter").html($(this).val().length);
		});
	 $("#register").click(function(){
	    window.open("register.php","register","height=400,width=400,top=80px,left=400px","_blank");
		});
	});
	function addMessages(xml){
	    message=$("message",xml).get(0);
		$("#comments").prepend("<li><p class='info'>chenke在今天更新：</p> <div class='body'>"
		   +$("test",message).text()+"</div></li>");
	}
	var login = $('#login');
	login.on('click', function(){
		var username = $('#username');
		var password = $('#password');
		$.post(
			'userLogin.php',
			{name: username.val(), password : password.val()},
		 function(data){
			if(data == 'success'){
				alert(data);
			}else{
				alert(data);
			}
		});
	})
	</script>
</body>
</html>