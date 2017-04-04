function update() {
    $.ajax({
        type: 'get',
        url: '/localhost/users/:id',
        success: function(data) {
            // use data
        }
    });
}

function registerUser(user) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/registerUser",
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
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

function loginUser(user) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/loginUser",
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        data: user,
        success: function(data) {
            var user = JSON.parse(data);
            //show content
            if(user != null && user.email.length > 0) {
                //alert('Successfully authenticated user!!!');
                $.jStorage.set('user', user);
                window.open('./debateroom.html', '_self');
            } else {
                alert('Error authenticating user. Please try again!!!');
            }
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('Error:'+textStatus+', err '+err)
        }
    });
}

function debate(user) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/debate",
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        data: user,
        success: function(data) {
            //show content
            if(data != null && data == 'SUCCESS') {
                alert('TRIGGER ROOM API');
            } else {
                alert('Error creating debate topic. Please try again!!!');
            }
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('Error:'+textStatus+', err '+err)
        }
    });
}
