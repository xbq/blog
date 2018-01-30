layui.use('form', function(){
    var $ = layui.jquery;

    $("#addCategory").on('click',function(){
        alert(123);
        $.ajax({
            url:'/admin/category/add',
            type:'post',
            data:{
                name:$("#name").val()
            },
            success:function(data){
                layer.alert(data.message, {
                    title: '提示信息'
                })
            }
        });
    });
});