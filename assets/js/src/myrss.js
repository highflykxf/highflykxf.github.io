//我的rss页面  
$.ajax({
	url:'https://article-1300776923.file.myqcloud.com/json/rss.json',
	type: 'get',
	success:function (res) {
		var data=res.data;
		var post=document.getElementById("posts");
		data.forEach(node=>{
			var section1=document.createElement("section");
			section1.className="row";
			section1.innerHTML='<div class="section-nav"> <span class="section-title">'+node.class_name+'</span> </div>';
			var rss =node.data;
			rss.forEach(element=>{
				var div=document.createElement("div");
				div.className="section-content";
				div.innerHTML='<a href="'+element.url+'" alt="'+element.name+'">'+element.name+'</a>'
				section1.appendChild(div);
			})
			post.insertBefore(section1,post.childNodes[2]);
		})
	}
  });