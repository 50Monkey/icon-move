window.onload=function(){
    var div1=document.getElementById('div1');
    var aList=div1.getElementsByTagName("a");
   
    for(var i=0;i<aList.length;i++){
    aList[i].onmouseover=function(){
        var is=this.getElementsByTagName("i")[0];
       move(is,{top:-25,opacity:0},function(){
           is.style.top=30+'px' ;
           move(is,{top:20,opacity:100});
       });
    }

}
    function move(obj,json,fn) {               //采用json遍历实现同时改变多个属性，例如鼠标滑过同时改变宽和高
                                               //本例中json形式为var json={attr:target},本例中的target应改为json[attr]
        clearInterval(obj.timer);                               
        obj.timer = setInterval(function() {
            //1.取当前值
            for(var attr in json){   
            var icur = 0;
            if(attr=='opacity'){
                icur=Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                icur = parseInt(getStyle(obj, attr));
            }
            //2.算速度
            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.检测停止
            if (json[attr] == icur){
                clearInterval(obj.timer);
                if(fn){
                    fn.call(obj);
                }
            }
            else{
                if(attr=='opacity'){
                    obj.style.filter='alpha(opacity:'+(icur+speed)+')';  //IE专用
                    obj.style.opacity=(icur+speed)/100;    //FireFox、Chrome等浏览器
                }
                else{
                    obj.style[attr] = icur + speed + 'px';
                }
            }
               }   
                 }, 20)
    
    }
    function getStyle(obj,attr){
        // IE 浏览器
       if(obj.currentStyle){
           return obj.currentStyle[attr];
       }
       // FireFox
       else{
           return getComputedStyle(obj,false)[attr];
       }
   }
    
}