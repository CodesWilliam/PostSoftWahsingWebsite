const oembedContainers=document.getElementsByClassName("oembed_container"),embedContainers=document.getElementsByClassName("embed_container");function loadOEmbed(container){const embedContainer=container,iframeWrapper=embedContainer.querySelector(".iframe_wrapper"),customThumbnail=embedContainer.querySelector(".oembed_custom-thumbnail"),url=iframeWrapper.dataset.embedUrl;if(url){var request=new XMLHttpRequest,requestUrl="/_hcms/oembed?url="+url+"&autoplay=0";request.open("GET",requestUrl,!0),request.onload=function(){if(request.status>=200&&request.status<400){var data=JSON.parse(request.responseText);const maxHeight=void 0===iframeWrapper.dataset.maxHeight||iframeWrapper.dataset.maxHeight?iframeWrapper.dataset.maxHeight:data.height,maxWidth=void 0===iframeWrapper.dataset.maxWidth||iframeWrapper.dataset.maxWidth?iframeWrapper.dataset.maxWidth:data.width,height=void 0===iframeWrapper.dataset.height||iframeWrapper.dataset.height?iframeWrapper.dataset.height:data.height,width=void 0===iframeWrapper.dataset.width||iframeWrapper.dataset.width?iframeWrapper.dataset.width:data.width,el=document.createElement("div");el.innerHTML=data.html;const iframe=el.firstChild;if(iframe.setAttribute("class","oembed_container_iframe"),iframe.setAttribute("title",data.title),customThumbnail?customThumbnail.onclick=function(){const iframeSrc=new URL(iframe.src);iframeSrc.searchParams.append("autoplay",1),iframe.src=iframeSrc.toString(),this.setAttribute("class","oembed_custom-thumbnail--hide"),iframeWrapper.appendChild(iframe)}:iframeWrapper.appendChild(iframe),maxHeight){const maxHeightStr=maxHeight.toString(10)+"px";embedContainer.style.maxHeight=maxHeightStr,iframe.style.maxHeight=maxHeightStr,customThumbnail&&(customThumbnail.style.maxHeight=maxHeightStr)}if(maxWidth){const maxWidthStr=maxWidth.toString(10)+"px";embedContainer.style.maxWidth=maxWidthStr,iframe.style.maxWidth=maxWidthStr,customThumbnail&&(customThumbnail.style.maxWidth=maxWidthStr)}if(height){const heightStr=height.toString(10)+"px";embedContainer.style.height=heightStr,iframe.style.height=heightStr,customThumbnail&&(customThumbnail.style.height=heightStr)}if(width){const widthStr=width.toString(10)+"px";embedContainer.style.width=widthStr,iframe.style.width=widthStr,customThumbnail&&(customThumbnail.style.width=widthStr)}}else console.error("Server reached, error retrieving results.")},request.onerror=function(){console.error("Could not reach the server.")},request.send()}}function loadEmbed(container){const embedContainer=container,iframe=embedContainer.querySelector(".iframe_wrapper iframe"),maxHeight=iframe.getAttribute("height"),maxWidth=iframe.getAttribute("width");if(null!==maxHeight){const heightStr=maxHeight.toString(10)+"px";embedContainer.style.maxHeight=heightStr}else iframe.style.height="100%";if(null!==maxWidth){const widthStr=maxWidth.toString(10)+"px";embedContainer.style.maxWidth=widthStr}else iframe.style.width="100%"}0!==oembedContainers.length&&Array.prototype.forEach.call(oembedContainers,(function(el){loadOEmbed(el)})),0!==embedContainers.length&&Array.prototype.forEach.call(embedContainers,(function(el){loadEmbed(el)}));
//# sourceURL=https://46181478.fs1.hubspotusercontent-na1.net/hub/46181478/hub_generated/template_assets/182853581681/1731705497240/marketplace/Sprocket_Rocket/sr-theme-free/js/video_embed.js