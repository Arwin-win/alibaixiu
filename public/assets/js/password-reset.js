$('#modifyForm').on('submit', function () {
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: $(this).serialize(),
        success: function () {
            // 如果密码修改成功 跳转到登录页面
            location.href = 'login.html';
        }
    })
})