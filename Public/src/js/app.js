function myonclickhrf(myid) {
    let myname = $('#showuser').html().split('，')[1];
    if(myname !== '您好'){
        window.location.href = "/moviecontain.html?id="+myid+"&name="+myname
    }else {
        window.location.href = "/moviecontain.html?id="+myid+"&name="
    }
}

axios.post('/allMovies').then(function (ans) {
    let mynum = parseInt((ans.data.length/16))+1;
    let str = '';
    $('.ttx-my-number').jqPaginator({
        totalPages: mynum,
        visiblePages: 20,
        currentPage: 1,
        onPageChange: function (num, type) {
            let str = '';
            let mycurrentnum = (num-1)*16;
            let myendnum = num*16 - 1;
            if(myendnum > ans.data.length - 1){
                myendnum = ans.data.length - 1;
            }
            for (let i = mycurrentnum; i <=myendnum; i++) {
                str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                str += `<a onclick="myonclickhrf(${ans.data[i].id})"><img class="center-block ttx-movie-photo" src="${ans.data[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans.data[i].id})" >${ans.data[i].name}</a><strong>${ans.data[i].score}</strong></p>`;
                str += `</div>`;
            }
            $(".ttx-movie-container").empty().append(str);
        }
    });

});
axios.get('/allClassify').then(function (ans) {
    let str = '';
    for(let i = 0; i<ans.data.length;i++){
            str+=`<span class="label" role="presentation" style="display: inline-block"><a href="#">${ans.data[i].commentcontent}</a></span>`
    }
    $('#ttx-comment-first').after(str);
    let str2='';
    for(let i = 0; i<ans.data.length;i++){
        str2+= `<div class="item">${ans.data[i].commentcontent}</div>`
    }
    $('.cr-menu').append(str2);
});

/*//////////////////////////////////////////////////////////////////////////*/

/*点击主界面的登录*/
$('#login').click(function () {
   $('#loginmodal').modal('show');
});
/*点击模态框的登录*/
$('#ysjlogin').click(function () {
    let username = $('#exampleInputName1').val();
    let password = $('#exampleInputPassword1').val();
    console.log(username,password);
    $.get('/login', {username: username, password: password}, function (data) {
        if (!data) {
            alert("登录失败！");
        } else {
            alert("登录成功！");
            $('#register').empty();
            $('#login').empty();
            let newinfor = ` 你好，${username}!`;
            $('#login').append(`<i class="user icon"></i> 退出`)
            $('#showuser').empty().append(newinfor);
        }
    });
});

/*点击主界面的注册*/
$('#register').click(function () {
    $('#registermodal').modal('show');
});

/*点击模态框的注册*/
$('#ysjregister').click(function () {
    let username = $('#exampleInputName2').val();
    let password = $('#exampleInputPassword2').val();
    $.post('/judgeusername', {username: username}, function (data) {
        if (!data) {
            alert("用户名已存在！");
            return;
        } else {
            $.post('/register', {username: username, password: password, content: '无'}, function (data) {
                if (data) {
                    alert("注册成功");
                } else {
                    alert("注册失败");
                }
            });
        }
    });
});


/*//////////////////////////////////////////////////////////////////////////*/
$(document).ready(function () {
    $('.cr-mysubmit').on('click',function () {
       let myselect = $('.ui.dropdown').dropdown('get text');
       let myinput  = $('.cr-myinput').val();
       if(myinput){
           if(myselect === '全部电影'){
               $.post('/oneSearchResult',{moviename:myinput},function (ans) {
                   if(ans){
                       let str = '';
                       for (let i = 0; i < ans.length; i++) {
                           str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                           str += `<a onclick="myonclickhrf(${ans[i].id})"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                           str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans[i].id})" >${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                           str += `</div>`;
                       }
                       $(".ttx-movie-container").empty().append(str);
                   }
               });
           }else {
               $.post('/searchResult',{comment:myselect,moviename:myinput},function (ans) {
                   if(ans){
                       let str = '';
                      for (let i = 0; i < ans.length; i++) {
                           str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                           str += `<a onclick="myonclickhrf(${ans[i].id})"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                           str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans[i].id})" >${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                           str += `</div>`;
                       }
                       $(".ttx-movie-container").empty().append(str);
                   }
               });
           }
       }else {
           return bootbox.alert("请填写电影名称!");
       }

    });
    $("body").on("click", '.yhx-left-tag-contain>span', function(){
        $(this)[0].className = 'label label-primary ysj-lable-active';
        $(this).siblings().removeClass().addClass('label');
        let myselect = $('.ysj-lable-active>a').html();
        if(myselect === '全部影片'){
            axios.post('/allMovies').then(function (ans) {
                let mynum = parseInt((ans.data.length/16))+1;
                let str = '';
                $('.ttx-my-number').jqPaginator({
                    totalPages: mynum,
                    visiblePages: 20,
                    currentPage: 1,
                    onPageChange: function (num, type) {
                        let str = '';
                        let mycurrentnum = (num-1)*16;
                        let myendnum = num*16 - 1;
                        if(myendnum > ans.data.length - 1){
                            myendnum = ans.data.length - 1;
                        }
                        for (let i = mycurrentnum; i <=myendnum; i++) {
                            str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                            str += `<a onclick="myonclickhrf(${ans.data[i].id})"><img class="center-block ttx-movie-photo" src="${ans.data[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                            str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans.data[i].id})" >${ans.data[i].name}</a><strong>${ans.data[i].score}</strong></p>`;
                            str += `</div>`;
                        }
                        $('.ttx-bread').html(`<li class="active">全部影片</li>`);
                        $(".ttx-movie-container").empty().append(str);
                    }
                });

            });
        }else {
            $.post('/classMovies',{comment:myselect},function (ans) {
                let str = '';
                for (let i = 0; i < ans.length; i++) {
                           str += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ttx-movie">';
                           str += `<a onclick="myonclickhrf(${ans[i].id})"><img class="center-block ttx-movie-photo" src="${ans[i].movieimg}" width="65%" height="100%" alt=""></a>`;
                           str += `<p class="ttx-movie-text"><a onclick="myonclickhrf(${ans[i].id})" >${ans[i].name}</a><strong>${ans[i].score}</strong></p>`;
                           str += `</div>`;
                       }
                $('.ttx-bread').html(` <li>全部影片</li><li class="active">${myselect}</li>`);
                $(".ttx-movie-container").empty().append(str);
            })
        }
    });
    $('body').on('click','.ttx-my-number>li>a',function () {
        alert($(this).html());
    })
});
