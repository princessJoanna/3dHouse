/*

 File: vr_spinner.js
 
*/
var Rotate;
var RotateX;
var fov=520;
var scale=1;
var begins=0;
var x=1;
function Spinner(elementX, rotorX, elementY, rotorY, container, horizontal) {
    this.elementX = elementX;
    this.rotorX = rotorX;
    this.elementY = elementX;
    this.rotorY = rotorY;
    this.container = container;
    this.startX = 0;
    this.startY = 0;
    this.startRotationX = 0;
    this.startRotationY = 0;
    this.staticRotationX = 0;
    this.staticRotationY = 0;
    this.trackingPoints = [];
    this.tracking = false;
	var retus=1;
	
	Spinner.prototype.Get=function(){
		Rotate=this.staticRotationY;
		RotateX=this.staticRotationX;
	};
	Spinner.prototype.init=function(val){
		this.staticRotationY = val;
    	this.elementX.style.webkitAnimationName = 'none';
    	this.elementY.style.webkitAnimationName = 'none';
   		var curXTransform = window.getComputedStyle(this.elementX).webkitTransform;
    	var matrix = new WebKitCSSMatrix(curXTransform);
    	var angleX = Math.atan2(matrix.m13, matrix.m11);
    	if (matrix.m11 < 0) angleX += Math.PI;
    	this.staticRotationX -= angleX;
    	var curYTransform = window.getComputedStyle(this.elementY).webkitTransform;
    	var matrix = new WebKitCSSMatrix(curYTransform);
    	var angleY = Math.atan2(matrix.m23, matrix.m22);
    	if (matrix.m22 < 0) angleY += Math.PI;
    	this.staticRotationY += angleY;
    	this.startRotationX = this.staticRotationX;
    	this.startRotationY = this.staticRotationY;
    	this.setRotation(this.staticRotationX, this.staticRotationY);
    	matrix = null;
	};
    var _self = this;
	
    this.mousedownHandler = function(e) {
        _self.mouseDown(e)
    };
    this.mousemoveHandler = function(e) {
        _self.mouseMove(e)
    };
    this.mouseupHandler = function(e) {
        _self.mouseUp(e)
    };
    this.mouseoutHandler = function(e) {
        _self.mouseOut(e)
    };
    this.touchstartHandler = function(e) {
        _self.touchStart(e)
    };
    this.touchmoveHandler = function(e) {
        _self.touchMove(e)
    };
    this.touchendHandler = function(e) {
        _self.touchEnd(e)
    };
    this.webkitAnimationStartHandler = function(e) {
        _self.animationStarted(e)
    };
    this.webkitAnimationEndStartHandler = function(e) {
        _self.animationEnded(e)
    };
    this.container.addEventListener('mousedown', this.mousedownHandler, false);
    this.container.addEventListener('mousemove', this.mousemoveHandler, false);
    this.container.addEventListener('mouseup', this.mouseupHandler, false);
    this.container.addEventListener('mouseout', this.mouseoutHandler, false);
	this.container.addEventListener('touchstart', this.touchstartHandler, false);
    this.container.addEventListener('touchmove', this.touchmoveHandler, false);
    this.container.addEventListener('touchend', this.touchendHandler, false);
    this.container.addEventListener('webkitAnimationStart', this.webkitAnimationStartHandler, false);
    this.container.addEventListener('webkitAnimationEnd', this.webkitAnimationEndStartHandler, false);
};
Spinner.prototype.recycle = function() {
    delete this.elementX;
    delete this.rotorX;
    delete this.elementY;
    delete this.rotorY;
    this.container.removeEventListener('mousedown', this.mousedownHandler, false);
    this.container.removeEventListener('mousemove', this.mousemoveHandler, false);
    this.container.removeEventListener('mouseup', this.mouseupHandler, false);
    this.container.removeEventListener('mouseout', this.mouseoutHandler, false);
    this.container.removeEventListener('touchstart', this.touchstartHandler, false);
    this.container.removeEventListener('touchmove', this.touchmoveHandler, false);
    this.container.removeEventListener('touchend', this.touchendHandler, false);
    this.container.removeEventListener('webkitAnimationStart', this.webkitAnimationStartHandler, false);
    this.container.removeEventListener('webkitAnimationEnd', this.webkitAnimationEndStartHandler, false);
    delete this.container;
}

Spinner.prototype.startAnimating = function() {
    return false;
    if (this.trackingPoints.length < 3) return false;
    var releaseDelay = this.trackingPoints[2].date - this.trackingPoints[1].date;
    var timeDelta = (this.trackingPoints[1].date - this.trackingPoints[0].date);
    var deltaDist;
    if (this.horizontal) deltaDist = this.trackingPoints[1].xPos - this.trackingPoints[0].xPos;
    else deltaDist = this.trackingPoints[1].yPos - this.trackingPoints[0].yPos;
    if (Math.abs(deltaDist) < 0.5 || releaseDelay > 35) {
        return false;
    }
    var angleDelta = Math.atan(deltaDist / kRingRadius);
    var direction;
    if (this.horizontal) direction = (angleDelta < 0) ? 'left' : 'right';
    else direction = (angleDelta < 0) ? 'up' : 'down';
    var animName = direction + '-spin';
    this.element.style.webkitAnimationName = animName;
    return true;
};
Spinner.prototype.mouseDown = function(event) {
	if(!AC.Detector.isiPhone() && !AC.Detector.isiPad()){
    this.interactionStart(event.clientX, event.clientY);}
	NoTouch=false;
    event.preventDefault();
};
Spinner.prototype.mouseMove = function(event) {
	
	if(!AC.Detector.isiPhone() && !AC.Detector.isiPad()){
    this.interactionMove(event.clientX, event.clientY);
	}
	
    event.preventDefault();
};
Spinner.prototype.mouseUp = function(event) {
	if(!AC.Detector.isiPhone() && !AC.Detector.isiPad()){
    this.interactionEnd(event.clientX, event.clientY);
	NoTouch=true;
	}
    event.preventDefault();
};
Spinner.prototype.mouseOut = function(event) {};
Spinner.prototype.touchStart = function(event) {
	NoTouch=false;
	water.stop();
	if(event.touches.length==2){
	scale=Math.sqrt(Math.pow(event.touches[1].clientX-event.touches[0].clientX,2)+Math.pow(event.touches[1].clientY-event.touches[0].clientY,2));
	scale=Math.abs(scale);
	begins=1;
	}else{
	this.interactionStart(event.touches[0].clientX, event.touches[0].clientY);
	begins=0;
	}
	event.preventDefault();
};
Spinner.prototype.touchMove = function(event) {
    NoTouch=false;
	water.stop();//停止水面贴图动画
	if(event.touches.length==2 && scale>0){
	var Tmp	=Math.sqrt(Math.pow(event.touches[1].clientX-event.touches[0].clientX,2)+Math.pow(event.touches[1].clientY-event.touches[0].clientY,2));
	Tmp=Math.abs(Tmp);
	var s=Tmp/scale;
	x=fov*s;
	if(x>1800){x=1800;fov=1800};
	if(x<300){x=300;fov=300};
	var s=x;
	$("vr-position").style.webkitTransform="translateZ("	+s +"px)";
	$("vr-container").style.webkitPerspective=x;
	}else{
		if(!begins){
			this.interactionMove(event.touches[0].clientX, event.touches[0].clientY);	
		}
	}
    event.preventDefault();
};
Spinner.prototype.touchEnd = function(event) {
	NoTouch=true;
	if(WaterBool){
	VirtualTour.WaterDo();//开始水面动画。
	}
    this.interactionEnd(0, 0);
	fov=x;
};
Spinner.prototype.interactionStart = function(x, y) {
    this.startX = x;
    this.startY = y;
    this.tracking = true;
    this.trackingPoints = [];
    this.elementX.style.webkitAnimationName = 'none';
    this.elementY.style.webkitAnimationName = 'none';
    var curXTransform = window.getComputedStyle(this.elementX).webkitTransform;
    var matrix = new WebKitCSSMatrix(curXTransform);
    var angleX = Math.atan2(matrix.m13, matrix.m11);
    if (matrix.m11 < 0) angleX += Math.PI;
    this.staticRotationX -= angleX;
    var curYTransform = window.getComputedStyle(this.elementY).webkitTransform;
    var matrix = new WebKitCSSMatrix(curYTransform);
    var angleY = Math.atan2(matrix.m23, matrix.m22);
    if (matrix.m22 < 0) angleY += Math.PI;
    this.staticRotationY += angleY;
    this.startRotationX = this.staticRotationX;
    this.startRotationY = this.staticRotationY;
    this.setRotation(this.staticRotationX, this.staticRotationY);
    matrix = null;
};
Spinner.prototype.interactionMove = function(x, y) {
    var deltaX = x - this.startX;
    var deltaY = y - this.startY;
    if (this.tracking) {
        this.storeEventLocation(x, y);
        var xDisplacement = Math.atan(deltaX / kRingRadius);
        var yDisplacement = Math.atan(-deltaY / kRingRadius);
        var angleXDelta = yDisplacement * Math.cos(this.staticRotationX);
        var angleYDelta = xDisplacement * Math.cos(this.staticRotationX);
        this.staticRotationX = this.startRotationX + angleXDelta;
        this.staticRotationY = this.startRotationY + angleYDelta;
        this.setRotation(this.staticRotationX, this.staticRotationY);
    }
};
Spinner.prototype.interactionEnd = function(x, y) {
    if (this.tracking) {
        if (!this.startAnimating()) {
            this.setRotation(this.staticRotationX, this.staticRotationY);
        }
        this.tracking = false;
    }
};
Spinner.prototype.storeEventLocation = function(x, y) {
    var newDatum = {
        xPos: x,
        yPos: y,
        date: new Date()
    };
    this.trackingPoints.push(newDatum);
    if (this.trackingPoints.length > 3) this.trackingPoints.shift();
};
Spinner.prototype.animationStarted = function(event) {};
Spinner.prototype.animationEnded = function(event) {
    if (event.animationName == 'none') return;
    this.element.style.webkitAnimationName = 'none';
    this.setRotation(this.staticRotationX, this.staticRotationY);
    window.console.log('animation end: setting rotation to ' + this.staticRotationX + ' ' + this.staticRotationY);
};
Spinner.prototype.setRotation = function(angleX, angleY) {
    this.rotorX.style.webkitTransform = 'rotateX(' + angleX + 'rad)';
    this.rotorY.style.webkitTransform = 'rotateY(' + angleY + 'rad)';
	
	
};
