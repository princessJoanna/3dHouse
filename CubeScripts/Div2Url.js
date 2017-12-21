var idname=new Array;
var idUrl=new Array;
var TipInfo=new Array;
function Init(path,Tip){
	var TipLayer=document.createElement('div');
	TipLayer.id="Tip";
	TipLayer.innerHTML="";
	$('menu').appendChild(TipLayer);
	TipInfo=Tip;
	var TipsNum=TipInfo.length+1;
	for(i=1;i<TipsNum;i++){
		idUrl[i]=path+i+".html";
		idname[i]='m_'+i;
		$(idname[i]).addEventListener('touchstart',Ts,false);
		$(idname[i]).addEventListener('touchmove',Ts,false);
		$(idname[i]).addEventListener('touchend',Ts,false);
		$(idname[i]).addEventListener('click',Ts,false);
	}
	
};

var tc=0;
function Ts(e){
	var name=e.target.parentNode.id;
	var namesplit=name.split('_');
	var SelectNum=eval(namesplit[1]);
	//
	console.log(e.type);
			if(e.type=='touchstart'){
				tc=1;
				$("Tip").innerHTML=TipInfo[SelectNum-1];
				$("Tip").style.visibility="visible";
				}
			if(e.type=='touchmove'){
				tc=0;
				}
			
			if(e.type=='touchend'){
				if(tc)window.location.href=idUrl[SelectNum];
				$("Tip").style.visibility="hidden";
				tc=0;
				}	
			if(e.type=='click'){
				window.location.href=idUrl[SelectNum];
				$("Tip").style.visibility="hidden";
				tc=0;
			}
	e.preventDefault();
}
