//timer class
var NoTouch = true;
var ImgContainer = new Array;
var ImgAll = new Array;
var Count = 0;
var ImgSerie = new Array(2, 4, 1, 3, 5, 6);
console.log(ImgSerie[2]);
var Timer = function (obj) {
    var t = null;
    var interval = 1000;
    var start = function (period, callback) {
        if (t) clearTimeout(t);
        t = setTimeout(function () {
            if (callback) callback.call(obj);
        }, period);
    }
    var stop = function () {
        clearTimeout(t);
    }
    var repeat = function (period, callback) {
        if (t) clearTimeout(t);
        t = setTimeout(function () {
            if (callback) callback.call(obj);
            repeat(period, callback);
        }, period);
    }

    this.start = start;
    this.stop = stop;
    this.repeat = repeat;
}

var s2 = "000"
//init water Anim
var WaterBool = false;//make water demo
var WalkBool = true;//if the script for walk

var WM = 0;
var Pictures = new Array;
var i = 0;
var InitAngle = -1.56;
var TmpAngle;
var add = 1;
var TPi = Math.PI * 2;
var obj = {
    name: "Go"
};
var tim = new Timer(obj);
var water = new Timer();
function SubM(a, b) {
    return b - a;
}
function Prev() {
    window.parent.ShowB();
}

function Next() {
    VirtualTour._gSpinner.Get();
    var x = window.parent.add;
    //standard Pi for auto back;
    Rotate = StandardPi(Rotate);
    if (x == 1) {
        TmpAngle = StandardPi(InitAngle);
    }
    if (x == -1) {
        TmpAngle = StandardPi(-InitAngle);
    }
    x *= ConfirmDirect(Rotate, 0.7);
    console.log(x);
    window.parent.add = x;
    window.parent.ShowA();
}

function StandardPi(Rotate) {
    var Rnd = Math.floor(Rotate / TPi);
    if (Rnd <= 0) {
        Rotate -= Rnd * TPi;
    } else {
        Rotate -= Rnd * TPi;
    }
    return Rotate;
}

function ConfirmDirect(Rotate, Scope) {
    var Direct, Tmp;
    Direct = 1;
    Tmp = Math.abs(TmpAngle - StandardPi(Rotate));
    console.log(Tmp);
    if (Math.abs(Tmp - Math.PI) < Scope) {
        Direct = -1;
    }
    return Direct;
}

function Cycle(a) {
    if (a > 3)return 0;
    if (a < 0)return 3;
    return a;
}

VirtualTour = {
    init: function (a) {
        if (isTransform3DAvailable()) {

            this.container = document.getElementById('vr-container');
            this.cube = document.getElementById('cube');
            this.ImagePath = a;
            window.kRingRadius = 100;
            this.setup();
            if (WaterBool) {
                this.WaterDo();
            }

        }
    },
    didShow: function () {
        this.init();
    },
    willHide: function () {
        recycleObjectValueForKey(this, "_gSpinner");
        this._gSpinner = null;
    },

    setup: function () {

        if (!AC.Detector.isiPhone()) {
            var images = this._imageSrcs,
                imagesWidth = 512,
                imagesHeight = 512;
        } else {
            var images = this._iPhoneImageSrcs,
                imagesWidth = 500,
                imagesHeight = 500;
        }
        ;
        if (WaterBool) {
            for (var j = 0; j < 4; j++) {
                var tmp = document.createElement("div");
                tmp.id = j + "3D";
                tmp.style.opacity = 0;
                if (j == 0) {
                    tmp.style.opacity = 1;
                }
                this.imageDocumentFragment = document.createDocumentFragment();
                for (var i = 0; i < 6; i++) {
                    img = new Image;
                    if (WalkBool) {
                        img.src = s + ImgSerie[i] + "/" + ss + (i + 1) + s2 + (j + 1) + ".jpg";
                    } else {
                        img.src = s + ss + (i + 1) + s2 + (j + 1) + ".jpg";
                    }
                    img.id = "face" + (i + 1);
                    img.className = "face";
                    img.width = imagesWidth;
                    img.height = imagesHeight;
                    img.onload = this.Load(img);
                    this.imageDocumentFragment.appendChild(img);
                }
                tmp.appendChild(this.imageDocumentFragment);
                this.cube.appendChild(tmp);
            }
        } else {
            this.imageDocumentFragment = document.createDocumentFragment();
            for (var i = 0; i < 6; i++) {
                img = new Image;
                if (WalkBool) {
                    img.src = s + ImgSerie[i] + "/" + ss + ".jpg";
                } else {
                    img.src = s + ss + i + ".jpg";
                }
                img.id = "face" + (i + 1);
                img.className = "face";
                img.width = imagesWidth;
                img.height = imagesHeight;
                img.onload = this.Load(img);
                this.imageDocumentFragment.appendChild(img);
            }
            this.cube.appendChild(this.imageDocumentFragment);
        }
        this._gSpinner = new Spinner(document.getElementById('rotateX'), document.getElementById('rotor-x'), document.getElementById('rotateY'), document.getElementById('rotor-y'), this.container);
        //init cubemap Angle;
        console.log(window.parent.add);
        if (window.parent.add != "undefined") {
            if (window.parent.add == 1) {
                this._gSpinner.init(StandardPi(InitAngle));
            } else if (window.parent.add == -1) {
                this._gSpinner.init(StandardPi(-InitAngle));
            } else {
                this._gSpinner.init(StandardPi(InitAngle));
            }
        } else {
            console.log("Hello");
            this._gSpinner.init(StandardPi(InitAngle));
        }
        this.container = null;
        this.imageDocumentFragment = null;
    },
    Load: function (a) {
        if (a.complete == true) {
            Count++;
        }
    },
    returns: function () {
        var tRotate;
        this._gSpinner.Get();
        var x = window.parent.add;
        //standard Pi for auto back;

        if (x == 1) {
            InitAngle = StandardPi(InitAngle);
        }
        if (x == -1) {
            InitAngle = StandardPi(-InitAngle);
        }
        tRotate = StandardPi(Rotate);
        i = 0;
        var s = this._gSpinner;
        tim.repeat(50, function () {
                if (i < 10) {
                    i += 1;
                    var Angle;
                    var tmp = SubM(0, RotateX) * (10 - i) / 10;
                    var TmpRotate = StandardPi(-tRotate + InitAngle);
                    console.log(tRotate);
                    if (TmpRotate > Math.PI) {
                        TmpRotate = TPi - TmpRotate;
                        Angle = tRotate - TmpRotate * i / 10;
                        s.setRotation(tmp, tRotate - TmpRotate * i / 10);
                    } else {
                        Angle = tRotate + TmpRotate * i / 10;
                        s.setRotation(tmp, tRotate + TmpRotate * i / 10);
                    }
                }
                if (i == 10) {
                    i = 10;
                    return 0;
                }
                tim.stop();
            }
        );
    },

    WaterDo: function () {
        if (WaterBool) {
            water.repeat(100, function () {
                    if (NoTouch && img.complete == true) {
                        WM++;
                        WM = Cycle(WM);
                        $(Cycle(WM - 1) + "3D").style.opacity = 0;
                        $(WM + "3D").style.opacity = 1;
                        $(Cycle(WM + 1) + "3D").style.opacity = 0;
                    }
                }
            );
        }
    }
}


