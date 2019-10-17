$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        // console.log(res);
        var html = template('usersTpl', { data: res });
        // console.log(html);
        $('#userBox').html(html);
    }
});

//实现添加用户
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,

        success: function (res) {
            location.reload();//刷新当前页面
        }
    })
    // console.log(formData);
    return false;//兼容性最强
});
$('#modifyBox').on('change', "#avatar", function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',

        // jq默认我们传的是一个对象，他会帮我们转换成key=value&key=value的形式
        // 但是我们现在数据文件上传 multipart/form-data 数据分开传
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // jq默认会添加一行代码 xhr.setRequestHeader('content-type',)
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        data: fd,
        success: function (res) {
            console.log(res);
            // 实现头像预览功能
            $('#preview').attr('src', res[0].avatar);
            // 显示用户添加头像后的的头像展示
            $('#hiddenAvatar').val(res[0].avatar);
        }
    })
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    console.log(id);
    //通过id获取当前这一条要编辑的信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            console.log(res);
            var html = template('modifyTpl', res)
            $('#modifyBox').html(html);

        }
    })
});

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    console.log($(this).serialize());
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: $(this).serialize(),
        success: function () {
            location.reload()
        }
    })
    return false;
});

// 当删除按钮被点击的时候
$('#userBox').on('click', '.del', function () {
    if (confirm('确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: /users/ + id,
            success: function () {
                location.reload();
            }
        })
    }
});

// 批量删除功能
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked');
    var checkList = $('#userBox input[type="checkbox"]');
    checkList.prop('checked', bool);
    if (bool == true) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
});

$('#userBox').on('change', 'input[type="checkbox"]', function () {
    if ($('#userBox input[type="checkbox"]').length == $('#userBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    if ($('#userBox input[type="checkbox"]:checked').length > 1) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
});

$('#deleteAll').on('click', function () {
    if (confirm('确定要全部删除吗？')) {
        // 选出来所有打钩的checkbox
        var checkList = $('#userBox input[type="checkbox"]:checked');
        var str = "";
        checkList.each(function (index, item) {
            str += $(item).attr('data-id') + '-';
        })
        str = str.substr(0, str.length - 1);
        // console.log(str);
        $.ajax({
            type: 'delete',
            url: "/users/" + str,
            success: function () {
                location.reload();
            }
        })
    }
})