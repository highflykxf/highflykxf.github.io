
		function loadXMLDoc(xmlUrl) 
		{
			try //Internet Explorer
			{
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			}
			catch(e)
			{
			  try //Firefox, Mozilla, Opera, etc.
				{
				  xmlDoc=document.implementation.createDocument("","",null);
				}
			  catch(e) {alert(e.message)}
			}
			
			try 
			{
				  xmlDoc.async=false;
				  xmlDoc.load(xmlUrl);
			}
			catch(e) {
				try //Google Chrome  
				  {  
					var chromeXml = new XMLHttpRequest();
					chromeXml.open("GET", xmlUrl, false);
					chromeXml.send(null);
					xmlDoc = chromeXml.responseXML.documentElement; 				
					//alert(xmlDoc.childNodes[0].nodeName);
					//return xmlDoc;    
				  }  
				  catch(e)  
				  {  
					  alert(e.message)  
				  }  		  	
			}
			return xmlDoc; 
		}
		// if (window.XMLHttpRequest)
		// {// code for IE7+, Firefox, Chrome, Opera, Safari
		//     xmlhttp=new XMLHttpRequest();
		// }
		// else
		// {// code for IE6, IE5
		//     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		// }
		// xmlhttp.open("GET","https://images-1256429518.cos.ap-chengdu.myqcloud.com",false);
		// xmlhttp.send();
		xmllink="https://album-1300776923.file.myqcloud.com";
		xmlDoc=loadXMLDoc(xmllink);
		var urls=xmlDoc.getElementsByTagName('Key');
		var date=xmlDoc.getElementsByTagName('LastModified');
		var showNum=12; //每个相册一次展示多少照片
		if ((window.innerWidth)>1200) {wid=(window.innerWidth*3)/18;}
		var box=document.getElementById('box');
		var i=0;
		var content=new Array();
		var tmp=0;
		var kkk=-1;
		for (var t = 0; t < urls.length ; t++) {
			var bucket=urls[t].innerHTML;
			var length=bucket.indexOf('/');
			if(length===bucket.length-1){
				kkk++;
				content[kkk]=new Array();
				content[kkk][0]={'url':bucket,'date':date[t].innerHTML.substring(0,10)};
				tmp=1;
			}
			else {
				content[kkk][tmp++]={'url':bucket.substring(length+1),'date':date[t].innerHTML.substring(0,10)};
			}
		}
		for (var i = 0; i < content.length; i++) {
			var conBox=document.createElement("div");
			conBox.id='conBox'+i;
			conBox.style='display: inline-block;';
			box.appendChild(conBox);
			var item=document.createElement("div");
			var title=content[i][0].url;
			item.innerHTML="<div class=title style=margin-top:20px;><h2>"+title.substring(0,title.length-1)+"</h2><hr/></div>";
			conBox.appendChild(item);
			for (var j = 1; j < content[i].length && j < showNum+1; j++) {
				var con=content[i][j].url;
				var item=document.createElement("li");
				item.innerHTML="<div class=imgbox id=imgbox><img class=imgitem src="+xmllink+'/'+title+con+" alt="+con+"></div><span>"+con.substring(0,con.length-4)+"</span><p>上传于"+content[i][j].date+"</p>";
				conBox.appendChild(item);
			}
			if(content[i].length > showNum){
				var moreItem=document.createElement("button");
				moreItem.className="btn-more-posts";
				moreItem.id="more"+i;
				moreItem.value=showNum+1;
				let cur=i;
				moreItem.onclick= function (){
					moreClick(this,cur,content[cur],content[cur][0].url);
				}
				moreItem.innerHTML="<span style=display:inline;><strong style=color:#f0f3f6;>加载更多</strong></span>";
				conBox.appendChild(moreItem);
			}
		}
		function moreClick(obj,cur,cont,title){
			var parent=obj.parentNode;
			parent.removeChild(obj);
			var j=obj.value;
			var begin=j;
			for ( ; j < cont.length && j < Number(showNum) + Number(begin); j++) {
				var con=cont[j].url;
				var item=document.createElement("li");
				item.innerHTML="<div class=imgbox id=imgbox><img class=imgitem src=https://photos.idealli.com/"+title+con+" alt="+con+"></div><span>"+con.substring(0,con.length-4)+"</span><p>上传于"+cont[j].date+"</p>";
				parent.appendChild(item);
				var v=item.getElementsByTagName('img');
				v[0].id=imgid;
				imgid++;
				v[0].addEventListener("click",function(e){ // 注册事件
					// 记录小图的位置个大小
					x=e.target.offsetLeft;
					y=e.target.offsetTop;
					w=e.target.offsetWidth;
					h=e.target.offsetHeight;
					src=e.target.src;
					id=e.target.id;
					// 创建遮罩层
					div=document.createElement("div");
					div.style.cssText=`
						position:fixed;
						left:0;
						top:0;
						bottom:0;
						right:0;
						background-color: rgba(25,25,25,0.8);
						z-index:99999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
					`;
					document.body.appendChild(div);
					setTimeout(function(){
						div.style.opacity=1;
					},0);
					// (此处可以加loading)
					// 创建副本
					img=new Image();
					btnright=document.createElement("button");
					btnleft=document.createElement("button");
					img.src=src;
					btnleft.style.cssText=`
						position:fixed;
						border-radius: 50%;;
						left:${x - 20}px;
						top:${y - container.scrollTop + h/2}px;
						width:50px;
						height:50px;
						border: 0px;
						background-color: rgba(200,200,200,0.8);
						font-size: 20px;
						z-index: 999999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
					`;
					btnright.style.cssText=`
						position:fixed;
						border-radius: 50%;
						left:${x + w + 20}px;
						top:${y - container.scrollTop + h/2}px;
						width:50px;
						border: 0px;
						height:50px;
						font-size: 20px;
						background-color: rgba(200,200,200,0.8);
						z-index: 999999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
					`;
					btnleft.innerText="<";
					btnright.innerText=">";
					img.style.cssText=`
						position:fixed;
						border-radius: 12px;
						left:${x}px;
						top:${y - container.scrollTop}px;
						width:${w}px;
						height:${h}px;
						z-index: 999999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
						opacity:0;
					`;
					btnleft.onclick=function(){
						if(id===0){
							alert("已经是第一张了！");
							return;
						}
						var left=document.getElementById(id-1);
						img.src=left.src;
						x=left.offsetLeft;
						y=left.offsetTop;
						w=left.offsetWidth;
						h=left.offsetHeight;
						id--;
					}
					btnright.onclick=function(){
						id++;
						if(id>=imgid){
							alert("已经是最后一张了！");
							return;
						}
						var right=document.getElementById(id);
						img.src=right.src;
						x=right.offsetLeft;
						y=right.offsetTop;
						w=right.offsetWidth;
						h=right.offsetHeight;
					}
					img.onload=function(){
						document.body.appendChild(img);
						document.body.appendChild(btnright);
						document.body.appendChild(btnleft);
						// 浏览器宽高
						wh=window.innerHeight;
						ww=window.innerWidth;
						// 目标宽高和坐标
						if(w/h<ww/wh){
							th=wh-80;
							tw=w/h*th >> 0;
							tx=(ww - tw) / 2;
							ty=40;	            	
						}
						else{
							tw=ww*0.8;
							th=h/w*tw >> 0;
							tx=ww*0.1;
							ty=(wh-th)/2;
						}
						// 延迟写入否则不会有动画
						setTimeout(function(){
							img.style.opacity=1;
							img.style.height=th+"px";
							img.style.width=tw+"px";
							img.style.left=tx+"px";
							img.style.top=ty+"px";
							btnleft.style.left=(tx-90)+"px";
							btnleft.style.top=(ty+th/2)+"px";
							btnright.style.left=(tx+tw+40)+"px";
							btnright.style.top=(ty+th/2)+"px";
							// 点击隐藏
							div.onclick=img.onclick=closeMove;
						},10);
					};
				});//end event
			}
			if(cont.length > j){
				obj.value=j;
				parent.appendChild(obj);
			}
		}
		let container = document.documentElement||document.body;
		let img,div,src,btnleft,btnright;
		var imgid=0;
		let x,y,w,h,tx,ty,tw,th,ww,wh;
		let closeMove=function(){
			if(div==undefined){
				return false;
			}
			div.style.opacity=0;
			img.style.height=h+"px";
			img.style.width=w+"px";
			img.style.left=x+"px";
			img.style.top=(y - container.scrollTop)+"px";
			// 延迟移除dom
			setTimeout(function(){
				div.remove();
				img.remove();
				btnright.remove();
				btnleft.remove();
			},100);
		};
		let closeFade=function(){
			if(div==undefined){
				return false;
			}
			div.style.opacity=0;
			img.style.opacity=0;
			// 延迟移除dom
			setTimeout(function(){
				div.remove();
				img.remove();
				btnright.remove();
				btnleft.remove();
			},100);
		};
		// 监听滚动关闭层
		document.addEventListener("scroll",function(){
			closeFade();
		});
		document.querySelectorAll("img").forEach(v=>{
			if (v.parentNode.localName!='a') {
				v.id=imgid;
				imgid++;
					v.addEventListener("click",function(e){ // 注册事件
					// 记录小图的位置个大小
					x=e.target.offsetLeft;
					y=e.target.offsetTop;
					w=e.target.offsetWidth;
					h=e.target.offsetHeight;
					src=e.target.src;
					id=e.target.id;
					// 创建遮罩层
					div=document.createElement("div");
					div.style.cssText=`
						position:fixed;
						left:0;
						top:0;
						bottom:0;
						right:0;
						background-color: rgba(25,25,25,0.8);
						z-index:99999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
					`;
					document.body.appendChild(div);
					setTimeout(function(){
						div.style.opacity=1;
					},0);
					// (此处可以加loading)
					// 创建副本
					img=new Image();
					btnright=document.createElement("button");
					btnleft=document.createElement("button");
					img.src=src;
					btnleft.style.cssText=`
						position:fixed;
						border-radius: 50%;;
						left:${x - 20}px;
						top:${y - container.scrollTop + h/2}px;
						width:50px;
						height:50px;
						border: 0px;
						background-color: rgba(200,200,200,0.8);
						font-size: 20px;
						z-index: 999999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
					`;
					btnright.style.cssText=`
						position:fixed;
						border-radius: 50%;
						left:${x + w + 20}px;
						top:${y - container.scrollTop + h/2}px;
						width:50px;
						border: 0px;
						height:50px;
						font-size: 20px;
						background-color: rgba(200,200,200,0.8);
						z-index: 999999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
					`;
					btnleft.innerText="<";
					btnright.innerText=">";
					img.style.cssText=`
						position:fixed;
						border-radius: 12px;
						left:${x}px;
						top:${y - container.scrollTop}px;
						width:${w}px;
						height:${h}px;
						z-index: 999999999;
						transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
						opacity:0;
					`;
					btnleft.onclick=function(){
						if(id<=0){
							alert("已经是第一张了！");
							return;
						}
						id--;
						var left=document.getElementById(id);
						img.src=left.src;
						x=left.offsetLeft;
						y=left.offsetTop;
						w=left.offsetWidth;
						h=left.offsetHeight;
					}
					btnright.onclick=function(){
						
						if(id>=imgid-1){
							alert("已经是最后一张了！");
							return;
						}
						id++;
						var right=document.getElementById(id);
						img.src=right.src;
						x=right.offsetLeft;
						y=right.offsetTop;
						w=right.offsetWidth;
						h=right.offsetHeight;
					}
					img.onload=function(){
						document.body.appendChild(img);
						document.body.appendChild(btnright);
						document.body.appendChild(btnleft);
						// 浏览器宽高
						wh=window.innerHeight;
						ww=window.innerWidth;
						// 目标宽高和坐标
						if(w/h<ww/wh){
							th=wh-80;
							tw=w/h*th >> 0;
							tx=(ww - tw) / 2;
							ty=40;	            	
						}
						else{
							tw=ww*0.8;
							th=h/w*tw >> 0;
							tx=ww*0.1;
							ty=(wh-th)/2;
						}
						// 延迟写入否则不会有动画
						setTimeout(function(){
							img.style.opacity=1;
							img.style.height=th+"px";
							img.style.width=tw+"px";
							img.style.left=tx+"px";
							img.style.top=ty+"px";
							btnleft.style.left=(tx-90)+"px";
							btnleft.style.top=(ty+th/2)+"px";
							btnright.style.left=(tx+tw+40)+"px";
							btnright.style.top=(ty+th/2)+"px";
							// 点击隐藏
							div.onclick=img.onclick=closeMove;
						},10);
					};
				});//end event
			}
		});//end forEach
		layui.use('flow', function(){
			var flow = layui.flow;
			  flow.lazyimg(); 
			});