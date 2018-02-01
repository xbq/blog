layui.use(['table','form','laypage'], function(){
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var laypage = layui.laypage;

    laypage.render({
        elem: 'page'
        ,count: $("#count").val()
        ,limit:10
        ,limits:[5,10,20,50]
        ,layout:['count','prev', 'page', 'next','limit','skip']
        ,curr: location.hash.replace('#!fenye=', '')
        ,hash: 'fenye'
        ,jump: function(obj,first){
            console.log(obj);
            //首次不执行
            if(!first){
                var page = obj.curr;
                var limit = obj.limit;
                window.location = '/admin/archive?page='+page+'&limit='+limit;
            }
        }
    });


    table.on('tool(handler)', function(obj) {
        var data = obj.data,
            layEvent = obj.event;
        var _id = data._id;
        if(layEvent === 'del') {
            layer.confirm('真的删除该行记录？', function(index) {
                obj.del();
                layer.close(index);
                $.ajax({
                    type: 'GET',
                    url: '/admin/archive/delete?_id=' + _id,
                    success: function(data) {
                        layer.msg(data.message, {
                            icon: 1,
                            time: 1000
                        });
                    }
                });
            });
        } else if(layEvent === 'edit') {
            layer.open({
                type: 2,
                area: ['400px', '300px'],
                fix: false,
                resize: false,
                shade: 0.4,
                title: '分类信息编辑',
                content: '/admin/archive/edit?_id=' + _id
            });
        }else if(layEvent === 'detail'){
            layer.open({
                type: 2,
                area: ['400px', '300px'],
                fix: false,
                resize: false,
                shade: 0.4,
                title: '分类信息编辑',
                content: '/admin/archive/detail?_id=' + _id
            });
        }
    });

    form.on('submit(addArchive)',function(){
        layer.open({
            type: 2,
            title: '添加类别',
            shadeClose: true,
            resize: false,
            shade: false,
            area: ['400px', '300px'],
            content: '/admin/archive/add'
        });
        return false
    });

});