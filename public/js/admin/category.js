layui.use('table', function(){
    var $ = layui.jquery;
    var table = layui.table;

    //第一个实例
    table.render({
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

    $("#addCategory").on('click',function(){
        layer.open({
            type: 2,
            title: '添加类别',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['400px', '300px'],
            content: '/admin/category/add',
            end:function(){
                //第一个实例
                table.render({
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
            }
        });
    });
});