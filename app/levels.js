levels={};
levels.load = function(levelCallBack){
    for (i = 0;i<document.getElementsByClassName("row").length;i++){
        document.getElementsByClassName("row")[i].style.height = window.innerHeight + "px";
    }
    smoothScrollTo(document.body.scrollHeight);
    document.getElementsByTagName("body")[0].setAttribute("onscroll",levelCallBack);
};