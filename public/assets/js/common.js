$('#logout').on('click', function () {
    // 确认
    var bool = confirm('是否确定退出?');
    if (bool) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                // 跳转到登录页面
                location.href = 'login.html';
            }
        })
    }
})