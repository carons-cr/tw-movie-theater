let myurl = window.location.href.split("?id=");
myurl = [myurl[1].split('&name=')[1], myurl[1].split('&name=')[0]];
if (myurl[0]) {
    $('.ysjLogin').html("你好" + myurl[0]);
} else {
    bootbox.alert("您未登录，请去主页进行登录注册！");
    $('.ysjLogin').html("你好,游客！");
}
axios.get('/getMovie/' + myurl[1]).then(function (ans) {
    $('.tt').html(ans.data[0].name + `<small>(${ans.data[0].release})</small>`);
    $('.movie-img').attr('src', ans.data[0].movieimg);
    $('.gyf-directors').html(`导演：` + ans.data[0].directors);
    $('.gyf-score').html(`评分：` + ans.data[0].score);
    $('.gyf-comment').html(`所属类别：` + ans.data[0].comment);
    $('.gyf-casts').html(`主演：` + ans.data[0].casts);
    $('.gyf-detail').html(`  ` + ans.data[0].detail);
    $('.gyf-origin_title').html(`原著名称：` + ans.data[0].origin_title);
    if (ans.data[0].comment) {
        let index=Math.floor(Math.random() * 3 )
        let movieSug = ans.data[0].comment.split(',')[index];
        let movieid=ans.data[0].id
        $.post('/suggestMovies', { comment: movieSug,movieid:movieid }, function (ans) {
            let add = '';

        // <div class="column">
        //         <div class="ui fluid card">
        //         <div class="image">
        //         <img src="/images/avatar/large/daniel.jpg">
        //         </div>
        //         <div class="content">
        //         <a class="header">丹尼尔 路易斯</a>
        //     </div>
        //     </div>
        //     </div>

            for (let i = 0; i < 4; i++) {
                add += `<div class="column Cui">
                                <a class="ui fluid card" href="moviecontain.html?id=${ans[i].id}&name=${myurl[0]}">
                                    <div class="image">
                                        <img src="${ans[i].movieimg}" alt="${ans[i].name}" class="Cui-image"/>
                                    </div>
                                    <div class="content">
                                        <span>${ans[i].name}</span>
                                    </div>
                                </a>
                        </div>`
                if (i === 3) {
                    $('#Cui-movie').append(add);
                }
            }
        });
    }
});
axios.get('/allClassify').then(function (ans) {
    let str2 = '';
    for (let i = 0; i < ans.data.length; i++) {
        str2 += `<option role="presentation"><a href="#">${ans.data[i].commentcontent}</a></option>`
    }
    $('.cr-search-select').append(str2);
});

function comment() {
    console.log('success');
    let all = [], i = 0;
    $.post('/getComment', { movieid: myurl[1] }, function (response) {
        response = JSON.parse(response);
        response.forEach(function (value) {
            all[i] = `<a class="avatar">
                             <img src="../../img/index.png">
                      </a>
                      <div class="content">
                          <a class="author">${value.username}</a>
                             <div class="metadata">
                                 <span class="date">${value.date}</span>
                                 <div class="rating"><i class="star icon"></i> 5 Faves </div>
                             </div>
                             <div class="text">${value.content} </div>
                              <div class="actions">
                                     <a class="reply">Reply</a>
                                     <a class="save">Save</a>
                                     <a class="hide">Hide</a>
                                     <a><i class="expand icon"></i> Full-screen </a>
                               </div>
                        </div>`;
            i++;
        });
        $('#gyf_gundong').append(all);
    });
}


$(document).ready(function () {
    $(".yhx-movie-btn").on('click', function () {
        let str = '<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=e0024d8adt2&auto=0" allowFullScreen="true" quality="high" width="568" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
        bootbox.dialog({
            title: "观看影片",
            message: str
        });
    });
});
$('#commentBottom').on('click', function (e) {
    e.preventDefault();
    if (myurl[0]) {
        let datas = {};
        datas.username = myurl[0];
        alert(myurl[0]);
        datas.content = $('#text').val();
        datas.movieid = myurl[1];
        // datas=JSON.stringify(datas);
        $.post('/commentstorage', datas, function () {
            alert('提交成功');
            comment();
            $('#text').val('');
        });
    } else {
        alert('请登陆！')
    }

});
$('.yhx-login').on('click', function () {
    let str = `<div class="form-group">
    <label for="exampleInputName1">账号</label>
    <input type="text" class="form-control" id="exampleInputName1" placeholder="账号">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
  </div>`;
    bootbox.confirm({
        title: "用户登录",
        message: str,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> 取消'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> 确认'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
        }
    });
});
$('.yhx-signin').on('click', function () {
    let str = `<div class="form-group">
    <label for="exampleInputName2">账号</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="账号">
    </div>
    <div class="form-group">
    <div class="form-group">
    <label for="exampleInputPassword2">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="密码">
    </div>`;
    bootbox.confirm({
        title: "注册账号",
        message: str,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> 取消注册'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> 确认注册'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
        }
    });
});

$('.cr-mysubmit').on('click', function () {
    let myselect = $('.cr-search-select').find("option:selected").html();
    let myinput = $('.cr-myinput').val();
    if (myinput) {
        if (myselect === '全部电影') {
            $.post('/oneSearchResult', { moviename: myinput }, function (ans) {
                if (ans) {
                    let str = '';
                    for (let i = 0; i < ans.length; i++) {
                        str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                        str += `<a href="/moviecontain.html?id=${ans[i].id}"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                        str += `<p class="ttx-movie-text"><a href="/moviecontain.html?id=${ans[i].id}">${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                        str += `</div>`;
                    }
                    $('.panel-heading-title').html("<span class='glyphicon glyphicon-search' style='font-size: 25px;'></span>&nbsp;&nbsp;搜索结果");
                    $(".ttx-search-contain").empty().append(str);
                }
            });
        } else {
            $.post('/searchResult', { comment: myselect, moviename: myinput }, function (ans) {
                if (ans) {
                    let str = '';
                    for (let i = 0; i < ans.length; i++) {
                        str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                        str += `<a href="/moviecontain.html?id=${ans[i].id}"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                        str += `<p class="ttx-movie-text"><a href="/moviecontain.html?id=${ans[i].id}">${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                        str += `</div>`;
                    }
                    $('.panel-heading-title').html("<span class='glyphicon glyphicon-search' style='font-size: 25px;'></span>&nbsp;&nbsp;搜索结果");
                    $(".ttx-search-contain").empty().append(str);
                }
            });
        }
    } else {
        return bootbox.alert("请填写电影名称!");
    }
});

