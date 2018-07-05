!function(e){"use strict";var t,n,i,s,l,o=document,d="getElementsByClassName",c=function(e){return o.querySelectorAll(e)},a={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},y={extend:function(e){var t=JSON.parse(JSON.stringify(a));for(var n in e)t[n]=e[n];return t},timer:{},end:{},touch:function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)}},u=0,p=["layui-m-layer"],r=function(e){this.config=y.extend(e),this.view()};r.prototype.view=function(){var e=this,n=e.config,t=o.createElement("div");e.id=t.id=p[0]+u,t.setAttribute("class",p[0]+" "+p[0]+(n.type||0)),t.setAttribute("index",u);var i,s=(i="object"==typeof n.title,n.title?'<h3 style="'+(i?n.title[1]:"")+'">'+(i?n.title[0]:n.title)+"</h3>":""),l=function(){"string"==typeof n.btn&&(n.btn=[n.btn]);var e,t=(n.btn||[]).length;return 0!==t&&n.btn?(e='<span yes type="1">'+n.btn[0]+"</span>",2===t&&(e='<span no type="0">'+n.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(n.fixed||(n.top=n.hasOwnProperty("top")?n.top:100,n.style=n.style||"",n.style+=" top:"+(o.body.scrollTop+n.top)+"px"),2===n.type&&(n.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(n.content||"")+"</p>"),n.skin&&(n.anim="up"),"msg"===n.skin&&(n.shade=!1),t.innerHTML=(n.shade?"<div "+("string"==typeof n.shade?'style="'+n.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(n.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(n.skin?"layui-m-layer-"+n.skin+" ":"")+(n.className?n.className:"")+" "+(n.anim?"layui-m-anim-"+n.anim:"")+'" '+(n.style?'style="'+n.style+'"':"")+">"+s+'<div class="layui-m-layercont">'+n.content+"</div>"+l+"</div></div></div>",!n.type||2===n.type){var a=o[d](p[0]+n.type);1<=a.length&&layer.close(a[0].getAttribute("index"))}document.body.appendChild(t);var r=e.elem=c("#"+e.id)[0];n.success&&n.success(r),e.index=u++,e.action(n,r)},r.prototype.action=function(e,t){var n=this;e.time&&(y.timer[n.index]=setTimeout(function(){layer.close(n.index)},1e3*e.time));var i=function(){0==this.getAttribute("type")?(e.no&&e.no(),layer.close(n.index)):e.yes?e.yes(n.index):layer.close(n.index)};if(e.btn)for(var s=t[d]("layui-m-layerbtn")[0].children,l=s.length,a=0;a<l;a++)y.touch(s[a],i);if(e.shade&&e.shadeClose){var r=t[d]("layui-m-layershade")[0];y.touch(r,function(){layer.close(n.index,e.end)})}e.end&&(y.end[n.index]=e.end)},e.layer={v:"2.0",index:u,open:function(e){return new r(e||{}).index},close:function(e){var t=c("#"+p[0]+e)[0];t&&(t.innerHTML="",o.body.removeChild(t),clearTimeout(y.timer[e]),delete y.timer[e],"function"==typeof y.end[e]&&y.end[e](),delete y.end[e])},closeAll:function(){for(var e=o[d](p[0]),t=0,n=e.length;t<n;t++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):(n=document.scripts,i=n[n.length-1],s=i.src,l=s.substring(0,s.lastIndexOf("/")+1),i.getAttribute("merge")||document.head.appendChild(((t=o.createElement("link")).href=l+"need/layer.css?2.0",t.type="text/css",t.rel="styleSheet",t.id="layermcss",t)))}(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheWVyLmpzIl0sIm5hbWVzIjpbImEiLCJjIiwiZCIsImUiLCJiIiwiZG9jdW1lbnQiLCJmIiwidHlwZSIsInNoYWRlIiwic2hhZGVDbG9zZSIsImZpeGVkIiwiYW5pbSIsImciLCJleHRlbmQiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ0aW1lciIsImVuZCIsInRvdWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbGwiLCJ0aGlzIiwiaCIsImkiLCJqIiwiY29uZmlnIiwidmlldyIsInByb3RvdHlwZSIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInNldEF0dHJpYnV0ZSIsInRpdGxlIiwiYnRuIiwibGVuZ3RoIiwidG9wIiwiaGFzT3duUHJvcGVydHkiLCJzdHlsZSIsImJvZHkiLCJzY3JvbGxUb3AiLCJjb250ZW50Iiwic2tpbiIsImlubmVySFRNTCIsImNsYXNzTmFtZSIsImsiLCJsYXllciIsImNsb3NlIiwiZ2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtIiwiZWxlbSIsInN1Y2Nlc3MiLCJpbmRleCIsImFjdGlvbiIsInRpbWUiLCJzZXRUaW1lb3V0Iiwibm8iLCJ5ZXMiLCJjaGlsZHJlbiIsInYiLCJvcGVuIiwicmVtb3ZlQ2hpbGQiLCJjbGVhclRpbWVvdXQiLCJjbG9zZUFsbCIsImRlZmluZSIsInNjcmlwdHMiLCJzcmMiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImhlYWQiLCJocmVmIiwicmVsIiwid2luZG93Il0sIm1hcHBpbmdzIjoiQ0FDRSxTQUFTQSxHQUFHLGFBQWEsSUFBaytGQSxFQUFuSkEsRUFBbUJDLEVBQWdCQyxFQUFRQyxFQUF0M0ZDLEVBQUVDLFNBQThCSCxFQUFFLHlCQUF5QkMsRUFBRSxTQUFTSCxHQUFHLE9BQU9JLEVBQUcsaUJBQUVKLElBQUlNLEVBQUUsQ0FBQ0MsS0FBSyxFQUFFQyxPQUFNLEVBQUdDLFlBQVcsRUFBR0MsT0FBTSxFQUFHQyxLQUFLLFNBQVNDLEVBQUUsQ0FBQ0MsT0FBTyxTQUFTYixH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eUMsVUFBVSxHQUFHdEMsRUFBRWtDLEtBQUt1QixZQUFZNUQsR0FBRzZELGFBQWFsRCxFQUFFSyxNQUFNakIsV0FBV1ksRUFBRUssTUFBTWpCLEdBQUcsbUJBQW1CWSxFQUFFTSxJQUFJbEIsSUFBSVksRUFBRU0sSUFBSWxCLFlBQVlZLEVBQUVNLElBQUlsQixLQUFLK0QsU0FBUyxXQUFXLElBQUksSUFBSS9ELEVBQUVJLEVBQUVGLEdBQUdzQixFQUFFLElBQUl2QixFQUFFLEVBQUVFLEVBQUVILEVBQUVrQyxPQUFTakMsRUFBRkUsRUFBSUYsSUFBSTRDLE1BQU1DLE1BQU0sRUFBRTlDLEVBQUUsR0FBRytDLGFBQWEsWUFBWSxtQkFBbUJpQixPQUFPQSxPQUFPLFdBQVcsT0FBT25CLFNBQXVCN0MsRUFBRUssU0FBUzRELFFBQVFoRSxFQUFFRCxFQUFFQSxFQUFFa0MsT0FBTyxHQUFHaEMsRUFBRUQsRUFBRWlFLElBQUkvRCxFQUFFRCxFQUFFaUUsVUFBVSxFQUFFakUsRUFBRWtFLFlBQVksS0FBSyxHQUFHbkUsRUFBRThDLGFBQWEsVUFBVTFDLFNBQVNnRSxLQUFLckIsY0FBMkJoRCxFQUFFSSxFQUFFeUIsY0FBYyxTQUFpQnlDLEtBQUtuRSxFQUFFLHFCQUFxQkgsRUFBRU8sS0FBSyxXQUFXUCxFQUFFdUUsSUFBSSxhQUFhdkUsRUFBRThCLEdBQUcsWUFBWTlCLEtBQWhuRyxDQUEwbkd3RSIsImZpbGUiOiJsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qISBsYXllciBtb2JpbGUtdjIuMCDlvLnlsYLnu4Tku7bnp7vliqjniYggTGljZW5zZSBMR1BMIGh0dHA6Ly9sYXllci5sYXl1aS5jb20vbW9iaWxlIEJ5IOi0pOW/gyAqL1xyXG47IWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPWRvY3VtZW50LGM9XCJxdWVyeVNlbGVjdG9yQWxsXCIsZD1cImdldEVsZW1lbnRzQnlDbGFzc05hbWVcIixlPWZ1bmN0aW9uKGEpe3JldHVybiBiW2NdKGEpfSxmPXt0eXBlOjAsc2hhZGU6ITAsc2hhZGVDbG9zZTohMCxmaXhlZDohMCxhbmltOlwic2NhbGVcIn0sZz17ZXh0ZW5kOmZ1bmN0aW9uKGEpe3ZhciBiPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZikpO2Zvcih2YXIgYyBpbiBhKWJbY109YVtjXTtyZXR1cm4gYn0sdGltZXI6e30sZW5kOnt9fTtnLnRvdWNoPWZ1bmN0aW9uKGEsYil7YS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihhKXtiLmNhbGwodGhpcyxhKX0sITEpfTt2YXIgaD0wLGk9W1wibGF5dWktbS1sYXllclwiXSxqPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7Yi5jb25maWc9Zy5leHRlbmQoYSksYi52aWV3KCl9O2oucHJvdG90eXBlLnZpZXc9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGM9YS5jb25maWcsZj1iLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7YS5pZD1mLmlkPWlbMF0raCxmLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsaVswXStcIiBcIitpWzBdKyhjLnR5cGV8fDApKSxmLnNldEF0dHJpYnV0ZShcImluZGV4XCIsaCk7dmFyIGc9ZnVuY3Rpb24oKXt2YXIgYT1cIm9iamVjdFwiPT10eXBlb2YgYy50aXRsZTtyZXR1cm4gYy50aXRsZT8nPGgzIHN0eWxlPVwiJysoYT9jLnRpdGxlWzFdOlwiXCIpKydcIj4nKyhhP2MudGl0bGVbMF06Yy50aXRsZSkrXCI8L2gzPlwiOlwiXCJ9KCksaj1mdW5jdGlvbigpe1wic3RyaW5nXCI9PXR5cGVvZiBjLmJ0biYmKGMuYnRuPVtjLmJ0bl0pO3ZhciBhLGI9KGMuYnRufHxbXSkubGVuZ3RoO3JldHVybiAwIT09YiYmYy5idG4/KGE9JzxzcGFuIHllcyB0eXBlPVwiMVwiPicrYy5idG5bMF0rXCI8L3NwYW4+XCIsMj09PWImJihhPSc8c3BhbiBubyB0eXBlPVwiMFwiPicrYy5idG5bMV0rXCI8L3NwYW4+XCIrYSksJzxkaXYgY2xhc3M9XCJsYXl1aS1tLWxheWVyYnRuXCI+JythK1wiPC9kaXY+XCIpOlwiXCJ9KCk7aWYoYy5maXhlZHx8KGMudG9wPWMuaGFzT3duUHJvcGVydHkoXCJ0b3BcIik/Yy50b3A6MTAwLGMuc3R5bGU9Yy5zdHlsZXx8XCJcIixjLnN0eWxlKz1cIiB0b3A6XCIrKGIuYm9keS5zY3JvbGxUb3ArYy50b3ApK1wicHhcIiksMj09PWMudHlwZSYmKGMuY29udGVudD0nPGk+PC9pPjxpIGNsYXNzPVwibGF5dWktbS1sYXllcmxvYWRcIj48L2k+PGk+PC9pPjxwPicrKGMuY29udGVudHx8XCJcIikrXCI8L3A+XCIpLGMuc2tpbiYmKGMuYW5pbT1cInVwXCIpLFwibXNnXCI9PT1jLnNraW4mJihjLnNoYWRlPSExKSxmLmlubmVySFRNTD0oYy5zaGFkZT9cIjxkaXYgXCIrKFwic3RyaW5nXCI9PXR5cGVvZiBjLnNoYWRlPydzdHlsZT1cIicrYy5zaGFkZSsnXCInOlwiXCIpKycgY2xhc3M9XCJsYXl1aS1tLWxheWVyc2hhZGVcIj48L2Rpdj4nOlwiXCIpKyc8ZGl2IGNsYXNzPVwibGF5dWktbS1sYXllcm1haW5cIiAnKyhjLmZpeGVkP1wiXCI6J3N0eWxlPVwicG9zaXRpb246c3RhdGljO1wiJykrJz48ZGl2IGNsYXNzPVwibGF5dWktbS1sYXllcnNlY3Rpb25cIj48ZGl2IGNsYXNzPVwibGF5dWktbS1sYXllcmNoaWxkICcrKGMuc2tpbj9cImxheXVpLW0tbGF5ZXItXCIrYy5za2luK1wiIFwiOlwiXCIpKyhjLmNsYXNzTmFtZT9jLmNsYXNzTmFtZTpcIlwiKStcIiBcIisoYy5hbmltP1wibGF5dWktbS1hbmltLVwiK2MuYW5pbTpcIlwiKSsnXCIgJysoYy5zdHlsZT8nc3R5bGU9XCInK2Muc3R5bGUrJ1wiJzpcIlwiKStcIj5cIitnKyc8ZGl2IGNsYXNzPVwibGF5dWktbS1sYXllcmNvbnRcIj4nK2MuY29udGVudCtcIjwvZGl2PlwiK2orXCI8L2Rpdj48L2Rpdj48L2Rpdj5cIiwhYy50eXBlfHwyPT09Yy50eXBlKXt2YXIgaz1iW2RdKGlbMF0rYy50eXBlKSxsPWsubGVuZ3RoO2w+PTEmJmxheWVyLmNsb3NlKGtbMF0uZ2V0QXR0cmlidXRlKFwiaW5kZXhcIikpfWRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZik7dmFyIG09YS5lbGVtPWUoXCIjXCIrYS5pZClbMF07Yy5zdWNjZXNzJiZjLnN1Y2Nlc3MobSksYS5pbmRleD1oKyssYS5hY3Rpb24oYyxtKX0sai5wcm90b3R5cGUuYWN0aW9uPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpczthLnRpbWUmJihnLnRpbWVyW2MuaW5kZXhdPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtsYXllci5jbG9zZShjLmluZGV4KX0sMWUzKmEudGltZSkpO3ZhciBlPWZ1bmN0aW9uKCl7dmFyIGI9dGhpcy5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpOzA9PWI/KGEubm8mJmEubm8oKSxsYXllci5jbG9zZShjLmluZGV4KSk6YS55ZXM/YS55ZXMoYy5pbmRleCk6bGF5ZXIuY2xvc2UoYy5pbmRleCl9O2lmKGEuYnRuKWZvcih2YXIgZj1iW2RdKFwibGF5dWktbS1sYXllcmJ0blwiKVswXS5jaGlsZHJlbixoPWYubGVuZ3RoLGk9MDtoPmk7aSsrKWcudG91Y2goZltpXSxlKTtpZihhLnNoYWRlJiZhLnNoYWRlQ2xvc2Upe3ZhciBqPWJbZF0oXCJsYXl1aS1tLWxheWVyc2hhZGVcIilbMF07Zy50b3VjaChqLGZ1bmN0aW9uKCl7bGF5ZXIuY2xvc2UoYy5pbmRleCxhLmVuZCl9KX1hLmVuZCYmKGcuZW5kW2MuaW5kZXhdPWEuZW5kKX0sYS5sYXllcj17djpcIjIuMFwiLGluZGV4Omgsb3BlbjpmdW5jdGlvbihhKXt2YXIgYj1uZXcgaihhfHx7fSk7cmV0dXJuIGIuaW5kZXh9LGNsb3NlOmZ1bmN0aW9uKGEpe3ZhciBjPWUoXCIjXCIraVswXSthKVswXTtjJiYoYy5pbm5lckhUTUw9XCJcIixiLmJvZHkucmVtb3ZlQ2hpbGQoYyksY2xlYXJUaW1lb3V0KGcudGltZXJbYV0pLGRlbGV0ZSBnLnRpbWVyW2FdLFwiZnVuY3Rpb25cIj09dHlwZW9mIGcuZW5kW2FdJiZnLmVuZFthXSgpLGRlbGV0ZSBnLmVuZFthXSl9LGNsb3NlQWxsOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPWJbZF0oaVswXSksYz0wLGU9YS5sZW5ndGg7ZT5jO2MrKylsYXllci5jbG9zZSgwfGFbMF0uZ2V0QXR0cmlidXRlKFwiaW5kZXhcIikpfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBsYXllcn0pOmZ1bmN0aW9uKCl7dmFyIGE9ZG9jdW1lbnQuc2NyaXB0cyxjPWFbYS5sZW5ndGgtMV0sZD1jLnNyYyxlPWQuc3Vic3RyaW5nKDAsZC5sYXN0SW5kZXhPZihcIi9cIikrMSk7Yy5nZXRBdHRyaWJ1dGUoXCJtZXJnZVwiKXx8ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChmdW5jdGlvbigpe3ZhciBhPWIuY3JlYXRlRWxlbWVudChcImxpbmtcIik7cmV0dXJuIGEuaHJlZj1lK1wibmVlZC9sYXllci5jc3M/Mi4wXCIsYS50eXBlPVwidGV4dC9jc3NcIixhLnJlbD1cInN0eWxlU2hlZXRcIixhLmlkPVwibGF5ZXJtY3NzXCIsYX0oKSl9KCl9KHdpbmRvdyk7Il19