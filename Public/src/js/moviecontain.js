let myurl = window.location.href.split("?id=");
axios.get('/getMovie/'+myurl[1]).then(function (ans) {
    console.log(ans.data[0]);
    $('.panel-heading-title').html(ans.data[0].name+`<small>(${ans.data[0].release})</small>`);
    $('.movie-img').attr('src',ans.data[0].movieimg);
    $('.gyf-directors').html(`导演：`+ans.data[0].directors);
    $('.gyf-score').html(`评分：`+ans.data[0].score);
    $('.gyf-comment').html(`所属类别：`+ans.data[0].comment);
    $('.gyf-casts').html(`主演：`+ans.data[0].casts);
    $('.gyf-detail').html(`  `+ans.data[0].detail);
    $('.gyf-origin_title').html(`原著名称：`+ans.data[0].origin_title);
});
$(document).ready(function () {
    $(".btn").on('click', function () {
        let str = '<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=e0024d8adt2&auto=0" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
        bootbox.confirm({
            title: "Destroy planet?",
            message: str,
            callback: function (result) {
                console.log('This was logged in the callback: ' + result);
            }
        });
    });
});