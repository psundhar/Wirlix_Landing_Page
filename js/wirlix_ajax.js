function update() {
    $.ajax({
        type: 'get',
        url: '/localhost/users/:id',
        success: function(data) {
            // use data
        }
    });
}

function postUser(user) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/createUser",
        timeout: 20000,
        data: user,
        success: function(data) {
            //show content
            if(data) {
                alert('Successfully created user!!!');
            } else {
                alert('Error creating user. Please try again!!!');
            }
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('Error:'+textStatus+', err '+err)
        }
    });
}
