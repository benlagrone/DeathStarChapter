level1={};

/*document.getElementById("body").onload = function(){
    for (i = 0;i<document.getElementsByClassName("row").length;i++){
        document.getElementsByClassName("row")[i].style.height = window.innerHeight + "px";
    }
    spreadObjects(document.getElementById("stars").getElementsByTagName("i"),150,100,1,1,"fixed","%");
    spreadObjects(document.getElementById("ground").getElementsByClassName("fa-tree"),0,14,-(window.innerHeight/28),1,"relative","px");
    spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("small"),0,14,-(window.innerHeight/13),1,"relative","px");
    spreadObjects(document.getElementById("ground").getElementsByClassName("right")[0].getElementsByClassName("large"),0,14,-(window.innerHeight/15),1,"relative","px");
    for (var i = 0; i < document.getElementsByClassName("clouds").length; i++){
        spreadObjects(document.getElementsByClassName("clouds")[i].getElementsByTagName("i"),window.innerHeight*.75,window.innerWidth*.75,1,1-(window.innerWidth/2),"relative","px");
    }
    smoothScrollTo(document.body.scrollHeight);
    document.getElementsByTagName("body")[0].setAttribute("onscroll","updateElement()")
};*/

level1.parseAjax = function (xhr,id){
    level1.data = JSON.parse(xhr.responseText);
    console.log(level1.data)

    document.getElementById('p0').innerHTML = '<i class="'+level1.data.objectgroups.moon.objects[0].idclass+' '+level1.data.objectgroups.moon.objects[0].sizeclass+' '+level1.data.objectgroups.moon.objects[0].colorclass+'"></i>';

    var level1StarsHTML = '<div id="stars">';
    for(i=0;i<level1.data.objectgroups.stars.objects.length;i++){
        level1StarsHTML+='<i class="'+level1.data.objectgroups.stars.objects[i].idclass+' '+level1.data.objectgroups.stars.objects[i].colorclass+'"></i>';
    }
    level1StarsHTML += '</div>';
    document.getElementById('p1').innerHTML=level1StarsHTML;


};


level1.spreadObjects = function(x,vm,hm,va,ha,p,e){
    for (var i=0;i<x.length;i++){
        x[i].style.position = p;
        x[i].style.top = Math.floor((Math.random()*vm)+va)+e;
        x[i].style.left = Math.floor((Math.random()*hm)+ha)+e;
    }
};

level1.updateElement = function() {
    level1.getMovingElements(function (theObject,increment){
        theObject.style.position = "relative";
        theObject.style.left = level1.setElementLeftPosition(theObject,increment);
    });
    level1.moveEarth(document.getElementById("earth"));
    level1.moveRocket(document.getElementById("rocket"));
    for (var i =0; i < document.getElementById("stars").getElementsByTagName("i").length; i++){
        document.getElementById("stars").getElementsByTagName("i")[i].style.opacity = (1-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length))) -.3);
    }
}

level1.moveRocket = function(rocket){
    rocket.getElementsByTagName("span")[0].style.transform = "rotate(" + (355 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("i")[2].style.transform = "rotate(" + (259 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("span")[0].style.bottom = 65 * (document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)) + '%';
}

level1.moveEarth = function(earth){
    earth.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    earth.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*2)+"px";
    earth.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    earth.getElementsByTagName("i")[0].style.transform = "rotate(" + (15 + (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*4) + "deg)";
    earth.getElementsByTagName("i")[0].style.right = (window.pageYOffset/window.innerHeight*45) + '%';
    earth.getElementsByTagName("i")[0].style.bottom = (window.pageYOffset/window.innerHeight*200) + '%';
    earth.getElementsByTagName("i")[0].style.opacity = 1.3-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length)));
}

level1.cloudCall = function(clouds){
    for (var k=0;k<clouds.classList.length;k++){
        switch (clouds.classList[k]){
            case 'fa-2x':
                clouds.style.left = level1.setElementLeftPosition(clouds,1);
                break;
            case 'fa-3x':
                clouds.style.left = level1.setElementLeftPosition(clouds,2);
                break;
            case 'fa-4x':
                clouds.style.left = level1.setElementLeftPosition(clouds,3);
                break;
            case 'fa-5x':
                clouds.style.left = level1.setElementLeftPosition(clouds,4);
                break;
            default:
                clouds.style.left = level1.setElementLeftPosition(clouds,.5);
                ;
        }
    }
}

level1.setElementLeftPosition = function(element,increment){
    if(isNaN(parseInt(element.style.left.split("p")[0]))){
        return ((element.getBoundingClientRect().left)+increment)+"px"
    } else {
        return ((Math.abs(parseInt(element.style.left.split("p")[0]))) + increment)+"px";
    }
}

level1.getMovingElements = function(callback){
    for(var i = 0;i<document.getElementsByClassName("row").length;i++){
        if((window.pageYOffset + (window.innerHeight))>document.getElementsByClassName("row")[i].offsetTop && (window.pageYOffset)<(document.getElementsByClassName("row")[i].offsetTop+(window.innerHeight/2*3))){
            for(j=0;j<document.getElementsByClassName("row")[i].getElementsByTagName("i").length;j++){
                for(k=0;k<document.getElementsByClassName("row")[i].getElementsByTagName("i")[j].classList.length;k++){
                    switch(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j].classList[k]){
                        case 'fa-cloud':
                            level1.cloudCall(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j]);
                            break;
                        case 'fa-plane':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],3);
                            break;
                        case 'fa-moon-o':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],6);
                            break;
                        case 'fa-twitter':
                            callback(document.getElementsByClassName("row")[i].getElementsByTagName("i")[j],2)
                            break;
                        default:
                            ;
                    }
                }
            }
        }
    }
}

window.smoothScrollTo = (function () {
    var timer, start, factor;

    return function (target, duration) {
        var offset = window.pageYOffset,
            delta  = target - window.pageYOffset; // Y-offset difference
        duration = duration || 1000;              // default 1 sec animation
        start = Date.now();                       // get start time
        factor = 0;

        if( timer ) {
            clearInterval(timer); // stop any running animations
        }

        function step() {
            var y;
            factor = (Date.now() - start) / duration; // get interpolation factor
            if( factor >= 1 ) {
                clearInterval(timer); // stop animation
                factor = 1;           // clip to max 1.0
            }
            y = factor * delta + offset;
            window.scrollBy(0, y - window.pageYOffset);
        }

        timer = setInterval(step,10);

        return timer;
    };
}());


if(id==='home'){

}else{
    levels.load('level1.updateElement()');
    services.getPage(pageRoute.data,'level1',level1.parseAjax,id);
};
