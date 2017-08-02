let myurl = window.location.href.split("?id=");
axios.get('/getMovie/'+myurl[1]).then(function (ans) {
    console.log(ans.data[0]);
    $('.panel-heading-title').html(ans.data[0].name+`<small>(${ans.data[0].release})</small>`);
    $('.movie-img').attr('src',ans.data[0].movieimg);
    $('.gyf-directors').html(`导演：`+ans.data[0].directors);
    $('.gyf-score').html(`评分：`+ans.data[0].score);
    $('.gyf-comment').html(`所属类别：`+ans.data[0].comment);

});