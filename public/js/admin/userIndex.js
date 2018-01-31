layui.use(['table','form'], function(){
    var table = layui.table;
    var form = layui.form;

    //第一个实例
    var userTable = table.render({
        elem: '#userList'
        ,height: 600
        ,url: '/admin/user/list' //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {field: '_id', title: 'ID',  sort: true, width:300, fixed: 'left'}
            ,{field: 'username',width:150,  title: '用户名'}
            ,{field: 'password',width:150,  title: '密码', }
            ,{field: 'isAdmin',width:150,  title: '是否是管理员'}
            ,{fixed: 'right', width:600, align:'center', toolbar: '#toolBar',title:'操作'} //这里的toolbar值是模板元素的选择器
        ]],
        limits:[1,10,20,50,100],
        limit:20
    });

    //监听提交
    form.on('submit(searchUser)', function(data) {
        userTable.reload({
            url: '/admin/user/find',
            where: data.field
        });
        return false;
    });
});