levels={};
levels.load = function(levelCallBack){
    for (i = 0;i<document.getElementsByClassName("row").length;i++){
        document.getElementsByClassName("row")[i].style.height = window.innerHeight + "px";
    }
    smoothScrollTo(document.body.scrollHeight);
    document.getElementsByTagName("body")[0].setAttribute("onscroll",levelCallBack);
};


levels.spreadObjects = function(x,vm,hm,va,ha,p,e){
    for (var i=0;i<x.length;i++){
        x[i].style.position = p;
        x[i].style.top = Math.floor((Math.random()*vm)+va)+e;
        x[i].style.left = Math.floor((Math.random()*hm)+ha)+e;
    }
};


levels.moveRocket = function(rocket){
    rocket.getElementsByTagName("span")[0].style.transform = "rotate(" + (355 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("i")[2].style.transform = "rotate(" + (259 - (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*3) + "deg)";
    rocket.getElementsByTagName("span")[0].style.bottom = 65 * (document.getElementById("rocket").getBoundingClientRect().bottom)/(window.innerHeight*(document.getElementsByClassName("row").length)) + '%';
};

levels.moveEarth = function(earth){
    earth.style.fontSize=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) *100)+"vw";
    earth.style.left=(((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight) + document.getElementsByClassName("row").length*2)+"px";
    earth.style.height = (window.innerHeight*(document.getElementsByClassName("row").length)-window.pageYOffset)/window.innerHeight+.5 + '%';
    earth.getElementsByTagName("i")[0].style.transform = "rotate(" + (15 + (((window.innerHeight*(document.getElementsByClassName("row").length) - document.getElementById("rocket").getBoundingClientRect().bottom)/window.innerHeight))*4) + "deg)";
    earth.getElementsByTagName("i")[0].style.right = (window.pageYOffset/window.innerHeight*45) + '%';
    earth.getElementsByTagName("i")[0].style.bottom = (window.pageYOffset/window.innerHeight*200) + '%';
    earth.getElementsByTagName("i")[0].style.opacity = 1.3-(window.pageYOffset/(window.innerHeight*(document.getElementsByClassName("row").length)));
};


levels.setElementLeftPosition = function(element,increment){
    if(isNaN(parseInt(element.style.left.split("p")[0]))){
        return ((element.getBoundingClientRect().left)+increment)+"px"
    } else {
        return ((Math.abs(parseInt(element.style.left.split("p")[0]))) + increment)+"px";
    }
};

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