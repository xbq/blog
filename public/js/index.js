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



    $("#btn_register").on('click',function(){
        var username = $registerBox.find('[name=username]').val();
        var password = $registerBox.find('[name=password]').val();
        var repassword = $registerBox.find('[name=repassword]').val();
        $.ajax({
            url:'/api/user/register',
            type:'post',
            data:{
              username:username,
              password:password,
              repassword:repassword
            },
            success:function(res){
                $registerBox.find('.message').html(res.message);
                if(!res.code){
                    setTimeout(function(){
                        $registerBox.hide();
                        $loginBox.show();
                    },1000)
                }
            }
        });
    });

    $("#btn_login").on('click',function(){
        var username = $loginBox.find('[name=username]').val();
        var password = $loginBox.find('[name=password]').val();
        $.ajax({
            url:'/api/user/login',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function(res){
                $loginBox.find('.message').html(res.message);
                if(!res.code){
                    window.location.reload();
                }
            }
        });
    });

    //退出
    $("#btn_logout").on('click',function(){
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

function clearText(field)
{
    if (field.defaultValue == field.value) field.value = '';
    else if (field.value == '') field.value = field.defaultValue;
}