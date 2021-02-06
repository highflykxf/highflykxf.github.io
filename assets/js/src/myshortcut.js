		layui.use('layer', function(){
		  var layer = layui.layer;
		  var $ = layui.jquery;
		  $.ajax({
		  			url:'https://article-1300776923.file.myqcloud.com/json/shortcut.json',
		  			type: 'get',
		  			success:function (res) {
		  				data=res.data;
		  				var post=document.getElementById("posts");
		  				var div=document.createElement("div");
		  				div.className="layui-row layui-col-space10 section-content";
		  				var html="";
		  				data.forEach(node=>{
		  					html=html+'<div class="layui-col-md3 layui-col-xs6" data-id="'+node.id+'"> <div style="background-color: '+node.color+';"> <img class="item-icon nofancybox" height="40px" alt="图标" src="'+node.icon+'"> <div class="workflow-name">'+node.name+'</div>  </div> </div>';
		  				})
		  			div.innerHTML=html;
		  			post.insertBefore(div,post.childNodes[2]);
		  			}
		  		  });
		  $(document).on('click', '.layui-col-md3.layui-col-xs6', function() {
		      var id = $(this).attr('data-id');
				data.forEach(node=>{
					if(node.id==id){
						layer.open({
							type: 1
							,title: false //不显示标题栏
							,closeBtn: false
							,area: '350px;'
							,shade: 0.6
							,shadeClose:true
							,btnAlign: 'c'
							,content: '<div class="layer_header" style="background:'+node.color+'">'
								+'<img class="item-icon pull-left" alt="图标" src="'+node.icon+'">'
								+'<div class="messages"><span>'+node.name+'</span>'
								+'<span class="item-options" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="制作者">'
									+'<p><i class="fa fa-user"></i>'
									+'<span style="padding-left: 5px;">'+node.author+'</span></p>' 
								+'</span></div>'
								+'<div class="share">'
									+'<a class="layui-btn layui-btn-warm layui-btn-sm" href="'+node.url+'">获取该捷径</a>'
								+'</div>'
							+'</div>'
							+'<div class="layer_content">'
							+node.description
							+'</div><hr>'
							+'<p><center>操作演示</center><img src="'+node.images+'" alt="操作演示" title="操作演示"></p>'
							
						  });
						  return;
					}
				})
		    });
		});              
	 