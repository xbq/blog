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
            title: false,
            closeBtn: 0, //不显示关闭按钮
            shade: [0],
            area: ['340px', '215px'],
            offset: 'rb', //右下角弹出
            time: 2000, //2秒后自动关闭
            anim: 2,
            content: ['test/guodu.html', 'no'], //iframe的url，no代表不显示滚动条
            end: function(){ //此处用于演示
                layer.open({
                    type: 2,
                    title: '添加类别',
                    shadeClose: true,
                    shade: false,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['400px', '300px'],
                    content: '/admin/category/add'
                });
            }
        });
    });
});