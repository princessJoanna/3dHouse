function isTransform3DAvailable(){var a=false;if("styleMedia" in window){a=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if("media" in window){a=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!a){var b=document.querySelector(".isTransform3DAvailable");if(!b){b=document.createElement("div");
b.className="isTransform3DAvailable";document.body.appendChild(b)}a=(b.offsetHeight===3)
}return AC.Detector.isiPad()||AC.Detector.isiPhone()||a}function warnTransform3D(){var c,d=this.showWarning=function(){if(!c){c=document.getElementById("warning");
var f=c.querySelector("a.close");f.addEventListener("click",e,false)}c.style.display="block"
},e=this.hideWarning=function(f){if(f){f.preventDefault()}if(c){c.style.display=""
}};this.links=document.querySelectorAll(".requires3d a");for(var b=this.links.length-1;
b>=0;b--){this.links[b].addEventListener("click",d,true)}if(AC.Detector.isChrome()){var a=document.querySelectorAll(".browser");
for(var b=a.length-1;b>=0;b--){a[b].innerHTML="Chrome"}}}function recycleObjectValueForKey(a,b){var c=a[b];
if(c&&typeof c.recycle==="function"){c.recycle()}delete a[b];a[b]=null;c=null}function constrainNumberWithin(c,b,a){return(c<b)?b:((c>a)?a:c)
}if(Array.prototype.indexOf===undefined){Array.prototype.indexOf=function(a){var b=this.length;
var d=-1;for(var c=0;c<b;c++){if(this[c]==a){d=c;break}}return d}}String.prototype.trim=function(){return this.replace(/^\s+|\s+$/,"")
};function addClassName(e,c){if(typeof(e)=="string"){e=document.getElementById(e)
}if(e){var f=e.className;if(f&&(f.length>0)){var a=c.split(" ");if(a.length===1&&((" "+f+" ").lastIndexOf(" "+c+" ")===-1)){e.className=e.className+" "+c
}else{var g=f.split(" "),j=a.length,h,b=[];for(var d=0;d<j;d++){h=a[d];if(g.indexOf(h)===-1){b.push(h)
}}e.className=e.className+" "+((b.length>1)?b.join(" "):b[0]);g=null;h=null;b=null
}}else{e.className=c}f=null;a=null}}function hasClassName(b,a){return((" "+b.className+" ").lastIndexOf(" "+a+" ")>-1)
}function removeClassName(d,e){if(typeof(d)=="string"){d=document.getElementById(d)
}if(d){var g=d.className;if(g&&(g.length>0)){var a=g.split(" "),c=e.split(" "),j=a.length,h,f=[];
for(var b=0;b<j;b++){h=a[b];if(c.indexOf(h)===-1){f.push(h)}}switch(true){case (f.length>1):d.className=f.join(" ");
break;case (f.length==1):d.className=f[0];break;case (f.length==0):d.className="";
break}a=null;c=null;h=null;f=null}g=null}}function setHidden(a,b){if(b){addClassName(a,"hidden")
}else{removeClassName(a,"hidden")}}function setWebKitAnimation(b,a){if(typeof(b)=="string"){b=document.getElementById(b)
}if(b&&b.style){b.style.webkitAnimationName=a}}(function(){var b;var a=function(){if(typeof(b)==="undefined"){if(!AC.Detector.isWebKit()){b=false
}else{if(AC.Detector.isChrome()){var d=navigator.userAgent.toLowerCase();var c=parseInt(parseFloat(d.substring(d.lastIndexOf("chrome/")+7)),10);
b=(c>=5)}else{var d=navigator.userAgent.toLowerCase();var c=parseInt(parseFloat(d.substring(d.lastIndexOf("safari/")+7)),10);
b=(c>=528)}}}return b};if(document.location.toString().match(/\/html5\/showcase\//)){if(!(a()||AC.Detector.isiPad()||AC.Detector.isiPhone())){document.location="/html5/"
}}})();(function(){Event.onDOMReady(function(){if(AC.Detector.isiPad()||AC.Detector.isiPhone()){var a=document.querySelectorAll('a[href*="/html5/showcase/"]');
for(var b=a.length-1;b>=0;b--){a[b].href+="#html5-showcase"}}})})();if(typeof Apple==="undefined"){window.Apple={}
}Apple.browser={FF:(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)),SAFARI:(/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)),SAFARI5:!AC.Detector.isChrome()&&parseFloat(navigator.userAgent.substring(navigator.userAgent.lastIndexOf("Safari/")+7))>=533,IE:(navigator.appName=="Microsoft Internet Explorer")};
Apple.slider={activeSlider:null,defaults:{sliderType:"Linear",minValue:0,maxValue:100,initialValue:0,allowsTickMarkValuesOnly:false,numberOfTickMarks:0,thumbHeight:11,thumbWidth:11,tickMarkPosition:"Above",onSlide:function(){},onSlideComplete:function(){},height:19,width:19},valid:{sliderTypes:["Linear","Circular"],tickMarkPositions:["Above","Below"],minHeight:19,minWidth:19},_sliderObjRecycle:function(){this._track=null;
this._thumb=null;this._ticks=null;this._sliderType=null;this._minValue=null;this._maxValue=null;
this.value=null;this._initialValue=null;this._height=null;this._width=null;this._numberOfTickMarks=null;
this._tickMarkPosition=null;this._allowsTickMarkValuesOnly=null;this._onSlide=null;
this._onSlideComplete=null;this.isVertical=null;this._minSlidePosition=null;this._maxSlidePosition=null;
this._horizontalOffset=null;this._verticalOffset=null;this._valuePerPixel=null;
this._tickValues=null;this._tickLocations=null;this.recycle=null},create:function(a,c){c=c||this.defaults;
var h=document.getElementById(a);h.recycle=this._sliderObjRecycle;if(h){h.id=a;
if(h.getElementsByClassName){h._track=h.getElementsByClassName("sliderTrack")[0];
h._thumb=h.getElementsByClassName("sliderThumb")[0];h._ticks=h.getElementsByClassName("sliderTicks")[0]
}else{h._track=h.childNodes[1];h._thumb=h.childNodes[3];h._ticks=h.childNodes[4]
}h._sliderType=c.sliderType||this.defaults.sliderType;h._minValue=c.minValue||this.defaults.minValue;
h._maxValue=c.maxValue||this.defaults.maxValue;h.value=c.initialValue||this.defaults.initialValue;
h._initialValue=c.initialValue||this.defaults.initialValue;h._height=c.height||this.defaults.height;
h._width=c.width||this.defaults.width;h._numberOfTickMarks=c.numberOfTickMarks||this.defaults.numberOfTickMarks;
h._tickMarkPosition=c.tickMarkPosition||this.defaults.tickMarkPosition;h._allowsTickMarkValuesOnly=c.allowsTickMarkValuesOnly||this.defaults.allowsTickMarkValuesOnly;
h._onSlide=c.onSlide||this.defaults.onSlide;h._onSlideComplete=c.onSlideComplete||this.defaults.onSlideComplete;
h._sliderType=(this.valid.sliderTypes.indexOf(h._sliderType)>-1)?h._sliderType:this.defaults.sliderType;
h._tickMarkPosition=(this.valid.tickMarkPositions.indexOf(h._tickMarkPosition)>-1)?h._tickMarkPosition:this.defaults.tickMarkPosition;
h._width=Math.max(h._width,this.valid.minWidth);h._height=Math.max(h._height,this.valid.minHeight);
h.value=Math.min(h.value,h._maxValue);h.value=Math.max(h.value,h._minValue);h.isVertical=(h._height>h._width);
h._horizontalOffset=(h.isVertical)?0:2;h._verticalOffset=(h.isVertical)?2:0;var f=h._thumb.clientWidth,e=h._thumb.clientHeight;
if(f===0){if(document.defaultView&&document.defaultView.getComputedStyle){f=parseFloat(document.defaultView.getComputedStyle(h._thumb,null).getPropertyValue("width"));
e=parseFloat(document.defaultView.getComputedStyle(h._thumb,null).getPropertyValue("height"))
}else{if(h._thumb.currentStyle){f=parseFloat(h._thumb.currentStyle.width);e=parseFloat(h._thumb.currentStyle.height)
}else{f=parseFloat(h._thumb.style.width);e=parseFloat(h._thumb.style.height)}}if(f===0){f=this.defaults.thumbHeight;
e=this.defaults.thumbHeight}}if(h.isVertical){h._width=this.valid.minWidth;h._track.style.height=(h._height-h._verticalOffset*2)+"px";
h._ticks.style.height=(h._height-h._verticalOffset*2)+"px";h._minSlidePosition=h._track.clientTop;
h._maxSlidePosition=h._height-e}else{h._height=this.valid.minHeight;h._track.style.width=(h._width-h._horizontalOffset*2)+"px";
h._ticks.style.width=(h._width-h._horizontalOffset*2)+"px";h._minSlidePosition=h._track.clientLeft;
h._maxSlidePosition=h._width-f}h._valuePerPixel=(h._maxSlidePosition-h._minSlidePosition)/(h._maxValue-h._minValue);
if(h._numberOfTickMarks>0){h._ticks.className=h._ticks.className+h._tickMarkPosition;
h._ticks.style.display="block";if(h.isVertical){h._ticks.style.width=h._track.style.width;
h._ticks.style.left=h._horizontalOffset+"px";h._ticks.style.top=h._verticalOffset+"px"
}else{h._ticks.style.height=h._track.style.height;h._ticks.style.left=h._horizontalOffset+"px";
h._ticks.style.top=h._verticalOffset+"px"}h._tickValues=[];if(h._numberOfTickMarks==1){h._tickValues.push((h._maxValue-h._minValue)/2)
}else{h._tickValues.push(h._minValue);var g=(h._maxValue-h._minValue)/(h._numberOfTickMarks-1);
for(var d=1;d<h._numberOfTickMarks;d++){h._tickValues.push(h._tickValues[d-1]+g)
}}h._tickLocations=[];var j=(h._maxSlidePosition-h._minSlidePosition)/(h._numberOfTickMarks-1);
h._tickLocations.push(5);for(var d=1;d<h._numberOfTickMarks;d++){h._tickLocations.push(h._tickLocations[d-1]+j)
}for(var d=0;d<h._numberOfTickMarks;d++){var b=document.createElement("div");b.className="tickMark";
if(h.isVertical){b.style.top=h._tickLocations[d]+"px"}else{b.style.left=h._tickLocations[d]+"px"
}h._ticks.appendChild(b)}if(h.isVertical){if(h._tickMarkPosition=="Below"){h._thumb.style.left="0px"
}else{h._thumb.style.left="-6px"}}else{if(h._tickMarkPosition=="Below"){h._thumb.style.height="16px";
h._thumb.style.top="-1px"}else{h._thumb.style.height="16px";h._thumb.style.top="-6px"
}}}h.positionThumbBasedOnValue=function(){if(this._allowsTickMarkValuesOnly){this.value=this.computeValueBasedOnNearestTickMark(this.value)
}if(this.isVertical){this._thumb.style.top=((this.value-this._minValue)*this._valuePerPixel)+"px"
}else{this._thumb.style.left=((this.value-this._minValue)*this._valuePerPixel)+"px"
}};h.computeValueBasedOnNearestTickMark=function(n){var o=n;if(this._numberOfTickMarks>1){var l=Math.abs(this._tickValues[0]-n);
o=this._tickValues[0];for(var m=0;m<this._numberOfTickMarks;m++){var k=Math.abs(this._tickValues[m]-n);
if(k<l){l=Math.abs(this._tickValues[m]-n);o=this._tickValues[m]}}}else{if(this._numberOfTickMarks==1){o=this._tickValues[0]
}}return o};h.computeValueBasedOnThumbPosition=function(){this.value=((this.isVertical)?((parseFloat(h._thumb.style.top)/this._valuePerPixel)+h._minValue):((parseFloat(h._thumb.style.left)/(this._valuePerPixel))+h._minValue))
};h.reset=function(){this.value=this._initialValue;this.positionThumbBasedOnValue();
this._onSlide()};h.finalizeKnobPosition=function(){this.computeValueBasedOnThumbPosition();
if(this._allowsTickMarkValuesOnly){this.value=constrainNumberWithin(this.computeValueBasedOnNearestTickMark(this.value),this._minValue,this._maxValue);
this.positionThumbBasedOnValue()}this._onSlide()};if(Apple.browser.IE){h._thumb.attachEvent("onmousedown",Apple.slider.startSlide);
h._track.attachEvent("onclick",Apple.slider.onTrackClicked)}else{h._thumb.addEventListener("mousedown",Apple.slider.startSlide,false);
h._track.addEventListener("click",Apple.slider.onTrackClicked,false)}h._track.sliderParent=h;
h._thumb.sliderParent=h;h.positionThumbBasedOnValue();return h}},onSlide:function(h){if(h.preventDefault){h.preventDefault()
}var i=Apple.slider.activeSlider;var a=false;var c=(window.getComputedStyle)?window.getComputedStyle(i._thumb,null):i._thumb.style;
var g=h.clientX;var f=h.clientY;var d=parseFloat(c.left);var k=parseFloat(c.top);
var b=i.clientWidth;var m=i.clientHeight;var l=d+g-i._oldX;var j=k+f-i._oldY;if(j<0){j=0
}if(j>i._maxSlidePosition){j=i._maxSlidePosition}if(!i.isVertical){if(l<0){l=0}else{if(l>i._maxSlidePosition){l=i._maxSlidePosition;
if(!i._over){i._oldX=g;i._over=true}}else{if((l>=i._minSlidePosition)&&(l<=i._maxSlidePosition)){i._oldX=g;
i._over=false;a=true}}}i._thumb.style.left=l+"px"}if(i.isVertical&&(j>=i._minSlidePosition)&&(j<=i._maxSlidePosition)){i._thumb.style.top=j+"px";
i._oldY=f;a=true}i.computeValueBasedOnThumbPosition();Apple.utilities.logger.log(i.value,true);
if(a){i._onSlide()}},onTrackClicked:function(e){e.preventDefault();e.defaultPrevented=true;
e.stopPropagation();var a=(Apple.browser.FF)?e.layerX:e.offsetX;var f=(Apple.browser.FF)?e.layerY:e.offsetY;
if(Apple.browser.IE){Apple.slider.activeSlider=e.srcElement.sliderParent}else{Apple.slider.activeSlider=e.target.sliderParent
}var b=(Apple.slider.activeSlider._thumb.clientWidth/2);if(Apple.slider.activeSlider.isVertical){var c=f-b;
if(c<Apple.slider.activeSlider._minSlidePosition){c=Apple.slider.activeSlider._minSlidePosition
}if(c>Apple.slider.activeSlider._maxSlidePosition){c=Apple.slider.activeSlider._maxSlidePosition
}Apple.slider.activeSlider._thumb.style.top=c+"px"}else{var d=a-b;if(d<Apple.slider.activeSlider._minSlidePosition){d=Apple.slider.activeSlider._minSlidePosition
}if(d>Apple.slider.activeSlider._maxSlidePosition){d=Apple.slider.activeSlider._maxSlidePosition
}Apple.slider.activeSlider._thumb.style.left=d+"px"}Apple.slider.activeSlider.finalizeKnobPosition();
Apple.slider.activeSlider._onSlide()},onSlideComplete:function(b){if(b.preventDefault){b.preventDefault()
}var a=Apple.slider.activeSlider;a._onSlideComplete()},startSlide:function(b){var a;
b.preventDefault();b.defaultPrevented=true;b.stopPropagation();if(Apple.browser.IE){a=Apple.slider.activeSlider=b.srcElement.sliderParent;
document.attachEvent("onmouseup",Apple.slider.stopSlide);document.attachEvent("onmousemove",Apple.slider.onSlide);
a._track.detachEvent("onclick",Apple.slider.onTrackClicked,false)}else{a=Apple.slider.activeSlider=b.target.sliderParent;
document.addEventListener("mouseup",Apple.slider.stopSlide,true);document.addEventListener("mousemove",Apple.slider.onSlide,true);
a._track.removeEventListener("click",Apple.slider.onTrackClicked,false)}a._oldX=b.clientX;
a._oldY=b.clientY;a._over=false;if(b.preventDefault){b.preventDefault()}Apple.utilities.disableTextSelection()
},stopSlide:function(a){a.preventDefault();a.defaultPrevented=true;a.stopPropagation();
Apple.slider.onSlide(a);Apple.utilities.enableTextSelection();Apple.slider.onSlideComplete(a);
if(Apple.browser.IE){document.detachEvent("onmouseup",Apple.slider.stopSlide);document.detachEvent("onmousemove",Apple.slider.onSlide);
Apple.slider.activeSlider._track.attachEvent("onclick",Apple.slider.onTrackClicked,false)
}else{document.removeEventListener("mouseup",Apple.slider.stopSlide,true);document.removeEventListener("mousemove",Apple.slider.onSlide,true);
Apple.slider.activeSlider._track.addEventListener("click",Apple.slider.onTrackClicked,false)
}Apple.slider.activeSlider=null}};Apple.utilities={savedValueOf:new Object(),disableTextSelection:function(){switch(true){case (typeof document.onselectstart!="undefined"):this.savedValueOf.onselectstart=document.onselectstart;
document.onselectstart=function(){return false};break;case (typeof document.body.style.MozUserSelect!="undefined"):this.savedValueOf["-moz-user-select"]=document.body.style.MozUserSelect||"text";
document.body.style.MozUserSelect="none";break;case (document.body.style["-khtml-user-select"]!="undefined"):this.savedValueOf["-khtml-user-select"]=document.body.style["-khtml-user-select"];
document.body.style["-khtml-user-select"]="none";break}},enableTextSelection:function(){switch(true){case (typeof document.onselectstart!="undefined"):document.onselectstart=this.savedValueOf.onselectstart;
break;case (typeof document.body.style.MozUserSelect!="undefined"):document.body.style.MozUserSelect=this.savedValueOf["-moz-user-select"];
break;case (document.body.style["-khtml-user-select"]!="undefined"):document.body.style["-khtml-user-select"]=this.savedValueOf["-khtml-user-select"];
break}},logger:{bLoggerEnabled:false,oLogWindow:null,enableOrDisable:function(b,a){this.bLoggerEnabled=b;
if(b&&a!=""){this.oLogWindow=document.getElementById(a);if(!this.oLogWindow){this.bLoggerEnabled=false
}}},log:function(a,b){if(this.bLoggerEnabled){if(b){this.oLogWindow.innerHTML=a
}else{this.oLogWindow.innerHTML=this.oLogWindow.innerHTML+"<br/>"+a}}}}};function randomInteger(a,b){return Math.floor((Math.random()*(b-a+1))+a)
}function touchHandler(d){var e=d.changedTouches,f=e[0],b="",a=arguments.callee;
if(e.length===1){switch(d.type){case"touchstart":b="mousedown";break;a._previousTarget=null;
case"touchmove":b="mousemove";break;case"touchend":b="mouseup";break;default:return
}var c=document.createEvent("MouseEvent");c.initMouseEvent(b,true,true,window,1,f.screenX,f.screenY,f.clientX,f.clientY,false,false,false,false,0,null);
f.target.dispatchEvent(c);if(c.defaultPrevented){d.preventDefault()}if(a._previousEvent&&a._previousEvent.touches){}if(d.type==="touchend"&&!c.defaultPrevented&&a._previousEvent&&a._previousEvent.touches&&a._previousEvent.touches[0].target===f.target&&a._previousEvent.type!=="touchmove"){d.preventDefault();
c=document.createEvent("MouseEvent");c.initMouseEvent("click",true,true,window,1,f.screenX,f.screenY,f.clientX,f.clientY,false,false,false,false,0,null);
f.target.dispatchEvent(c);if(c.defaultPrevented){d.preventDefault()}}a._previousEvent=f
}}if(typeof Touch!=="undefined"){document.addEventListener("touchstart",touchHandler,true);
document.addEventListener("touchmove",touchHandler,true);document.addEventListener("touchend",touchHandler,true);
document.addEventListener("touchcancel",touchHandler,true)};
