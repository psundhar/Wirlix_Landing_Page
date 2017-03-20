function update() {
    $.ajax({
        type: 'get',
        url: '/localhost/users/:id',
        success: function (data) {
            // use data
        }
    });
}
