layui.use(['form'], function(){
    var $ = layui.jquery;
    var form = layui.form;

    //监听提交
    form.on('submit(addArchive)', function(data) {
        $.ajax({
            type: 'POST',
            url:'/admin/archive/add',
            data: data.field,
            success: function(res) {
                console.log(res);
            }
        });
        return false;
    });
});
