layui.use(['table','form'], function(){
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;

    //第一个实例
    var categoryTable = table.render({
        elem: '#categoryList'
        ,height: 600
        ,url: '/admin/category/list' //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {field: '_id', title: 'ID',  sort: true, width:300, fixed: 'left'}
            ,{field: 'name',width:150,  title: '类别'}
            ,{fixed: 'right', width:600, align:'center', toolbar: '#toolBar',title:'操作'} //这里的toolbar值是模板元素的选择器
        ]],
        limits:[1,10,20,50,100],
        limit:20
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
                    url: '/admin/category/delete?_id=' + _id,
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
                content: '/admin/category/edit?_id=' + _id
            });
        }else if(layEvent === 'detail'){
            layer.open({
                type: 2,
                area: ['400px', '300px'],
                fix: false,
                resize: false,
                shade: 0.4,
                title: '分类信息编辑',
                content: '/admin/category/detail?_id=' + _id
            });
        }
    });

    form.on('submit(addCategory)',function(){
        layer.open({
            type: 2,
            title: '添加类别',
            shadeClose: true,
            resize: false,
            shade: false,
            area: ['400px', '300px'],
            content: '/admin/category/add'
        });
        return false
    });

    //监听提交
    form.on('submit(searchCategory)', function(data) {
        categoryTable.reload({
            url: '/admin/category/find',
            where: data.field
        });
        return false;
    });

});