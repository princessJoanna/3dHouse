AC.VR=Class.create();AC.VR.SpinIntro=function(k){var e=k.options.fps*k.options.introDuration,d=(typeof k.options.introInitialRow!="undefined")?k.options.introInitialRow:k.options.initialPos[1],j=d-k.options.initialPos[1],g=$A();
for(var f=0;f<e;f++){var h=f/e,c=Math.pow(h-1,4),b=Math.floor(c*k.totalFrames[0]*k.options.introSpins)+k.options.initialPos[0],a=Math.floor(c*j)+k.options.initialPos[1];
if(!g.length||g.last()[0]!=b||g.last()[1]!=a){g.push(k.validatePos([b,a],true))
}}return g};AC.VR.options={imageIndexOffset:1,loaders:3,initialLoad:4,noCache:false,initialPos:[0,0],invert:[false,false],infiniteAxis:[true,false],autoPlay:false,fps:25,grabbable:true,grabRotateDistance:1000,throwable:true,minThrowDuration:0.5,maxThrowDuration:1.5,spinnable:true,minSpinDuration:3,intro:AC.VR.SpinIntro,introSpins:0.5,introDuration:1,mobileTotalFrames:null};
Object.extend(AC.VR.prototype,{convertToArray:function(b,a){return(typeof b[0]=="undefined")?[b,a]:b
},initialize:function(b,a,c,d){this.options=Object.extend(Object.clone(AC.VR.options),d);
if(this.options.noCache){this.random=Math.floor(Math.random()*10000000)}if(this.mobile=((AC.Detector.isMobile()||AC.Detector.isiPad())?true:false)){this.options.intro=null;
this.options.autoPlay=false;this.options.spinnable=false;this.options.throwable=false;
this.mobileStrings={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"}
}this.container=$(b).addClassName("vrcontainer");this.vr=$(document.createElement("div")).addClassName("vr");
this.container.appendChild(this.vr);this.imagePathParts=a.match(/^([^#]*)(#+)([^#]*)$/);
this.numDigits=this.imagePathParts[2].length;this.totalFrames=this.convertToArray(c,1);
if(this.mobile&&this.options.mobileTotalFrames){var f=this.totalFrames;this.totalFrames=this.convertToArray(this.options.mobileTotalFrames,1);
this.frameMultipliers=[f[0]/this.totalFrames[0],f[1]/this.totalFrames[1]]}else{this.frameMultipliers=[1,1]
}this.options.initialPos=this.convertToArray(this.options.initialPos,0);this.options.invert=this.convertToArray(this.options.invert,false);
this.frames=[];for(var e=0;e<this.totalFrames[0];e++){this.frames[e]=[]}this.playIntervalDuration=1000/this.options.fps;
this.minSpinIntervalDuration=(this.options.minSpinDuration*1000)/this.totalFrames[0];
this.minThrowFrames=Math.floor(this.options.minThrowDuration*this.options.fps);
this.maxThrowFrames=Math.floor(this.options.maxThrowDuration*this.options.fps);
this.currentPos;this.playing=false;this.grabbing=false;this.spinning=false;if(this.options.intro){this.introSequence=this.options.intro(this);
this.loader=new AC.VR.LoaderController(this,this.introSequence.slice(0),this.playIntro.bind(this))
}else{this.loadAllFrames();this.gotoPos(this.options.initialPos);this.makeInteractive();
if(this.options.autoPlay){this.play()}}},getStr:function(a){return this.mobile?this.mobileStrings[a]:a
},getEvent:function(a){if(a.touches){if(a.touches.length>1){return false}if(a.touches.length){a.clientX=a.touches[0].clientX;
a.clientY=a.touches[0].clientY}}return a},playIntro:function(){this.introInterval=setInterval(this.gotoNextIntroFrame.bind(this),this.playIntervalDuration);
this.loadAllFrames()},gotoNextIntroFrame:function(){this.gotoPos(this.introSequence.shift());
if(!this.introSequence.length){clearInterval(this.introInterval);this.makeInteractive()
}},isPosLoaded:function(a){return(typeof this.frames[a[0]]!="undefined"&&typeof this.frames[a[0]][a[1]]!="undefined")
},createLoadPlan:function(c,b){if(!b){return[0]}var e=[];do{for(var a=0;a<c;a+=b){var d=Math.floor(a);
if(e.indexOf(d)==-1){e.push(d)}}if(b==1){return e}if((b/=2)<1){b=1}}while(true)
},loadAllFrames:function(){var b=[],f=Math.floor(this.totalFrames[0]/this.options.initialLoad),d=this.createLoadPlan(this.totalFrames[0],f),e=Math.floor(this.totalFrames[1]/this.options.initialLoad),c=this.createLoadPlan(this.totalFrames[1],e);
for(var g=0;g<c.length;g++){for(var a=0;a<d.length;a++){b.push(this.validatePos([d[a]+this.options.initialPos[0],c[g]+this.options.initialPos[1]],true))
}}this.loader=new AC.VR.LoaderController(this,b);b=null;f=null;d=null;e=null;c=null
},getImageSource:function(d){var a=this.options.invert[0]?(this.totalFrames[0]-1)-d[0]:d[0],c=this.options.invert[1]?(this.totalFrames[1]-1)-d[1]:d[1],b=(Math.floor(c*this.totalFrames[0]*this.frameMultipliers[0]*this.frameMultipliers[1])+Math.floor(a*this.frameMultipliers[0])+this.options.imageIndexOffset)+"";
while(b.length<this.numDigits){b="0"+b}return this.imagePathParts[1]+b+this.imagePathParts[3]+(this.options.noCache?"?"+this.random:"")
},makeInteractive:function(){if(this.options.grabbable){this.bindGrabStart=this.onGrabStart.bind(this);
this.bindGrabChange=this.onGrabChange.bind(this);this.bindGrabEnd=this.onGrabEnd.bind(this);
this.vr.observe(this.getStr("mousedown"),this.bindGrabStart);this.onKeyDown.keys={};
this.bindOnClick=this.onClick.bind(this);this.vr.observe("click",this.bindOnClick);
this.bindOnFocus=this.onFocus.bind(this);this.vr.observe("focus",this.bindOnFocus);
this.bindOnBlur=this.onBlur.bind(this);this.vr.observe("blur",this.bindOnBlur);
this.bindKeyDown=this.onKeyDown.bind(this);this.bindKeyUp=this.onKeyUp.bind(this);
this.vr.tabIndex=0}if(this.options.spinnable){this.bindSpinChange=this.onSpinChange.bind(this);
this.bindSpinEnd=this.onSpinEnd.bind(this);var d=[];if(this.totalFrames[1]>1&&this.options.infiniteAxis[1]){d.push("Up","Down")
}if(this.totalFrames[0]>1&&this.options.infiniteAxis[0]){d.push("Left","Right")
}for(var b=0;b<d.length;b++){var a=d[b],c=$(document.createElement("div"));this.container.appendChild(c);
c.className="spinner spin"+a;c.observe("mousedown",this["onSpin"+a+"Start"].bind(this));
this["spin"+a+"Offset"]=c.cumulativeOffset();if(a=="Left"||a=="Right"){c.style.height="0px"
}a=null;c=null}d=null}},unmakeInteractive:function(){if(this.mobile){this.vr.down().stopObserving("touchmove",this.bindGrabChange);
this.vr.down().stopObserving("touchend",this.bindGrabEnd)}if(this.options.grabbable){this.vr.stopObserving(this.getStr("mousedown"),this.bindGrabStart);
this.vr.stopObserving("click",this.bindOnClick);this.vr.stopObserving("focus",this.bindOnFocus);
this.vr.stopObserving("blur",this.bindOnBlur)}},recycle:function(){this.unmakeInteractive();
delete this.frames;delete this.introSequence;delete this.loader},atPosition:function(a){return(this.currentPos&&a[0]==this.currentPos[0]&&a[1]==this.currentPos[1])
},play:function(){if(this.playing){return}this.playing=true;this.playInterval=setInterval(this.gotoNextFrame.bind(this),this.playIntervalDuration)
},pause:function(){if(!this.playing){return}this.playing=false;clearInterval(this.playInterval)
},gotoNextFrame:function(){this.gotoPos([this.currentPos[0]+1,this.currentPos[1]])
},validatePos:function(c,b){for(var a=0;a<2;a++){if(b||this.options.infiniteAxis[a]){while(c[a]>this.totalFrames[a]-1){c[a]-=this.totalFrames[a]
}while(c[a]<0){c[a]+=this.totalFrames[a]}}else{if(c[a]>this.totalFrames[a]-1){c[a]=this.totalFrames[a]-1
}if(c[a]<0){c[a]=0}}}return c},gotoPos:function(b,a){b=this.validatePos(b);if(!a&&this.atPosition(b)){return
}this.currentPos=b;this.frame=this.frames[b[0]][b[1]];if(typeof this.frame!="undefined"&&this.frame.nodeType){if(this.currentFrame){this.vr.removeChild(this.currentFrame)
}this.currentFrame=this.frame;this.vr.appendChild(this.currentFrame)}else{this.loader.loadNow(b)
}delete this.frame},onGrabStart:function(a){if(!(a=this.getEvent(a))){return}this.grabbing=true;
$(document.body).addClassName("grabbing");$(document).observe(this.getStr("mousemove"),this.bindGrabChange);
$(document).observe(this.getStr("mouseup"),this.bindGrabEnd);if(this.mobile){this.vr.down().observe("touchmove",this.bindGrabChange);
this.vr.down().observe("touchend",this.bindGrabEnd)}this.grabHistory=$A([a]);this.onGrabChange.clientX=this.onGrabChange.clientY=null;
this.grabHistoryInterval=setInterval(this.updateGrabHistory.bind(this),10);this.onGrabStart.clientX=a.clientX;
this.onGrabStart.clientY=a.clientY;this.onGrabStart.playing=this.playing;this.onGrabStart.pos=this.currentPos;
this.pause();this.stopThrowing();a.stop()},onGrabChange:function(a){if(!(a=this.getEvent(a))){return
}if(!(a.clientX==this.onGrabStart.clientX&&a.clientY==this.onGrabStart.clientY)){this.onGrabChange.clientX=a.clientX;
this.onGrabChange.clientY=a.clientY;var b=this.getGrabPos(a);if(b){this.gotoPos(b)
}}a.stop()},getGrabPos:function(d){var i=d.clientX-this.onGrabStart.clientX,h=d.clientY-this.onGrabStart.clientY,e=i/this.options.grabRotateDistance,b=h/this.options.grabRotateDistance,g=Math.round(this.totalFrames[0]*e),f=Math.round(this.totalFrames[1]*b),c=this.onGrabStart.pos[0]+g,a=this.onGrabStart.pos[1]+f;
return[c,a]},updateGrabHistory:function(){var a=this.onGrabChange.clientX?this.onGrabChange:this.onGrabStart;
this.grabHistory.unshift({clientX:a.clientX,clientY:a.clientY});if(this.grabHistory.length>3){this.grabHistory.splice(3)
}},onGrabEnd:function(a){if(!(a=this.getEvent(a))){return}this.grabbing=false;$(document.body).removeClassName("grabbing");
$(document).stopObserving(this.getStr("mousemove"),this.bindGrabChange);$(document).stopObserving(this.getStr("mouseup"),this.bindGrabEnd);
clearInterval(this.grabHistoryInterval);if(this.onGrabStart.playing){this.play()
}else{if(this.options.throwable){var m=a.clientX-this.grabHistory.last().clientX,l=a.clientY-this.grabHistory.last().clientY,f=true;
if(m||l){var j=Math.sqrt(Math.pow(m,2)+Math.pow(l,2)),h=Math.floor(j/5),c=this.grabHistory.last().clientX,b=this.grabHistory.last().clientY,o=true,n=true;
if(h<this.minThrowFrames){h=this.minThrowFrames}else{if(h>this.maxThrowFrames){h=this.maxThrowFrames
}}this.throwSequence=$A();for(var e=0;e<h;e++){var g=e/h,d=Math.pow(g-1,2),c=Math.floor(d*m)+c,b=Math.floor(d*l)+b,k=this.validatePos(this.getGrabPos({clientX:c,clientY:b}));
if(!o){k[0]=this.throwSequence.last()[0]}else{if(this.throwSequence.length&&k[0]==this.throwSequence.last()[0]){o=false
}}if(!n){k[1]=this.throwSequence.last()[1]}else{if(this.throwSequence.length&&k[1]==this.throwSequence.last()[1]){n=false
}}if(!this.isPosLoaded(k)){f=false;break}this.throwSequence.push(k)}if(f){this.throwing=true;
this.throwInterval=setInterval(this.throwStep.bind(this),this.playIntervalDuration)
}}}}},throwStep:function(){this.gotoPos(this.throwSequence.shift());if(!this.throwSequence.length){this.stopThrowing()
}},stopThrowing:function(){if(!this.throwing){return}this.throwing=false;clearInterval(this.throwInterval)
},onSpinLeftStart:function(a){this.spinAxis=0;this.spinDirection=-1;this.spinBounds=this.spinLeftOffset[0]+35;
this.onSpinStart(a)},onSpinRightStart:function(a){this.spinAxis=0;this.spinDirection=1;
this.spinBounds=this.spinRightOffset[0];this.onSpinStart(a)},onSpinUpStart:function(a){this.spinAxis=1;
this.spinDirection=-1;this.spinBounds=this.spinUpOffset[1]+35;this.onSpinStart(a)
},onSpinDownStart:function(a){this.spinAxis=1;this.spinDirection=1;this.spinBounds=this.spinRightOffset[1];
this.onSpinStart(a)},onSpinStart:function(a){this.spinning=true;$(document.body).addClassName("spinning"+(this.spinDirection==-1?"Left":"Right"));
$(document).observe(this.getStr("mousemove"),this.bindSpinChange);$(document).observe(this.getStr("mouseup"),this.bindSpinEnd);
this.onSpinStart.clientX=a.clientX;this.onSpinStart.clientY=a.clientY;this.onSpinStart.playing=this.playing;
this.pause();this.spinPosDiff=1;this.onSpinChange(a);this.spin();a.stop()},onSpinChange:function(a){var b=(this.spinAxis==0?a.clientX:a.clientY)-this.spinBounds;
if(b!=this.spinBoundsDist){if((this.spinDirection==-1&&b>0)||(this.spinDirection==1&&b<0)){this.onSpinEnd(a);
this.onGrabStart(a)}else{this.spinBoundsDist=b;this.updateSpinIntervalDuration=true
}}},spin:function(){var b=this.currentPos.slice(0);b[this.spinAxis]+=this.spinDirection*this.spinPosDiff;
this.gotoPos(b);b=null;if(this.updateSpinIntervalDuration){this.updateSpinIntervalDuration=false;
clearInterval(this.spinInterval);var a=2000/Math.abs(this.spinBoundsDist);if(a>this.minSpinIntervalDuration){a=this.minSpinIntervalDuration
}if(a<this.playIntervalDuration){this.spinPosDiff=Math.round(this.playIntervalDuration/a);
a=this.playIntervalDuration}this.spinInterval=setInterval(this.spin.bind(this),a)
}},onSpinEnd:function(a){this.spinning=false;$(document.body).removeClassName("spinning"+(this.spinDirection==-1?"Left":"Right"));
$(document).stopObserving(this.getStr("mousemove"),this.bindSpinChange);$(document).stopObserving(this.getStr("mouseup"),this.bindSpinEnd);
clearInterval(this.spinInterval);if(this.onGrabStart.playing){this.play()}},onClick:function(a){if(this.focussed){return
}this.vr.addClassName("clickfocus");this.vr.focus()},onFocus:function(a){this.focussed=true;
$(document).observe("keydown",this.bindKeyDown);$(document).observe("keyup",this.bindKeyUp)
},onBlur:function(a){this.focussed=false;this.vr.removeClassName("clickfocus");
$(document).stopObserving("keydown",this.bindKeyDown);$(document).stopObserving("keyup",this.bindKeyDown)
},onKeyDown:function(a){if(a.keyCode<37||a.keyCode>40){return}this.onKeyDown.keys["key"+a.keyCode]=true;
var b=this.currentPos.slice(0);if(this.onKeyDown.keys.key37){b[0]--}else{if(this.onKeyDown.keys.key39){b[0]++
}}if(this.onKeyDown.keys.key38){b[1]--}else{if(this.onKeyDown.keys.key40){b[1]++
}}this.gotoPos(b);a.stop()},onKeyUp:function(a){if(a.keyCode<37||a.keyCode>40){return
}this.onKeyDown.keys["key"+a.keyCode]=false;a.stop()}});AC.VR.LoaderController=Class.create({initialize:function(b,a,d){this.vr=b;
this.queue=a;this.onLoad=d;this.retiredLoaders=new Array();for(var c=0;c<this.vr.options.loaders;
c++){this.loadNext(new AC.VR.Loader(this))}},loadNext:function(a){if(this.queue.length){a.load(this.queue.shift())
}else{this.retiredLoaders.push(a);if(this.retiredLoaders.length==this.vr.options.loaders&&typeof this.onLoad=="function"){this.onLoad();
this.onLoad=null}}},loadNow:function(a){if(this.retiredLoaders.length){this.retiredLoaders.shift().load(a)
}else{this.queue.unshift(a)}}});AC.VR.Loader=Class.create({initialize:function(a){this.controller=a;
this.loadNext=this.controller.loadNext.bind(this.controller)},load:function(a){this.pos=a;
if(this.controller.vr.isPosLoaded(a)){this.controller.loadNext(this);return}this.img=new Image();
this.img.onload=this.onLoad.bind(this);this.controller.vr.frames[this.pos[0]][this.pos[1]]=true;
this.img.src=this.controller.vr.getImageSource(this.pos)},onLoad:function(){this.controller.vr.frames[this.pos[0]][this.pos[1]]=this.img;
if(this.controller.vr.atPosition(this.pos)){this.controller.vr.gotoPos(this.pos,true)
}this.loadNext.defer(this)}});
