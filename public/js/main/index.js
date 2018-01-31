layui.use('form',function(){
    var $ = layui.jquery;
    var form = layui.form;

    $(function(){
        var $loginBox = $("#loginBox");
        var $registerBox = $("#registerBox");
        var $welcomBox = $("#welcomeBox");

        $("#linkRegiter").on('click',function(){
            $loginBox.hide();
            $registerBox.show();
        });

        $("#linkLogin").on('click',function(){
            $registerBox.hide();
            $loginBox.show();
        });


        //监听登录
        form.on('submit(login)', function(data) {
            $.ajax({
                type: 'POST',
                url:'/api/user/login',
                data: data.field,
                success:function(res){
                $loginBox.find('.message').html(res.message);
                if(!res.code){
                    window.location.reload();
                }else{
                    var $selector=null;
                    switch (res.code){
                        case 1:
                           $selector=$loginBox.find('[name=username]');
                           break;
                        case 2:
                            $selector=$loginBox.find('[name=password]');
                            break;
                        case 3:
                            $selector=$loginBox.find('[name=username]');
                            break;
                        default:
                            $selector=$loginBox.find('[name=username]');
                            break;
                    }
                    layer.tips(res.message, $selector, {
                        tips: [1, '#3595CC'],
                        time: 2000
                    });
                }
            }
            });
            return false;
        });

        //监听注册
        form.on('submit(register)', function(data) {
            $.ajax({
                type: 'POST',
                url:'/api/user/register',
                data: data.field,
                success:function(res){
                    $registerBox.find('.message').html(res.message);
                    if(!res.code){
                        setTimeout(function(){
                            $registerBox.hide();
                            $loginBox.show();
                        },1000)
                    }else{
                        var $selector=null;
                        switch (res.code){
                            case 1:
                                $selector=$registerBox.find('[name=username]');
                                break;
                            case 2:
                                $selector=$registerBox.find('[name=password]');
                                break;
                            case 3:
                                $selector=$registerBox.find('[name=repassword]');
                                break;
                            case 4:
                                $selector=$registerBox.find('[name=repassword]');
                                break;
                            case 5:
                                $selector=$registerBox.find('[name=username]');
                                break;
                            default:
                                $selector=$registerBox.find('[name=username]');
                                break;
                        }
                        layer.tips(res.message, $selector, {
                            tips: [1, '#3595CC'],
                            time: 2000
                        });
                    }
                }
            });
            return false;
        });

        //退出
        $("#btn_logout").on('click',function(){
            layer.confirm('确定退出？', function(index) {
                layer.close(index);
                $.ajax({
                    url:'/api/user/logout',
                    success:function(res){
                        if(!res.code){
                            window.location.reload();
                        }
                    }
                });
            });

        });

    });

})

function clearText(field)
{
    if (field.defaultValue == field.value) field.value = '';
    else if (field.value == '') field.value = field.defaultValue;
}
function pageScroll(){
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
    window.scrollBy(0,-1000);
    //延时递归调用，模拟滚动向上效果
    var scrolldelay = setTimeout('pageScroll()',100);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
    if(sTop==0) clearTimeout(scrolldelay);
}
