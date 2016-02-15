var news = {};
news.request = function(){

    var apiKey = '24e09a475c690683d9d218c1260a6ca2:5:73536423';
    var section = 'world';
    var responseFormat = 'json';
    var url = 'http://api.nytimes.com/svc/topstories/v1/'+ section + '.' + responseFormat + '?api-key=' + apiKey;
    url2 = 'http://api.feedzilla.com/v1/categories.json';
    //refactor this to send another callback to the parseAjax
    services.getPage(url,'test',news.parseAjax,id);
};

news.parseAjax = function(xhr,id){
    var data = JSON.parse(xhr.responseText);
    var newsHtml = '';
    for(i=0;i<4;i++){
        newsHtml+='<li class="ellipsis"><a href="'+data.results[i].url+'"><h4 class="dark"><i class="fa fa-newspaper-o"></i>&nbsp;'+data.results[i].title+'</h4>'
        +'<p>'+data.results[i].abstract+'</p></a></li>';
    }
    document.getElementById('credits-list').innerHTML=newsHtml;
};

news.request();
