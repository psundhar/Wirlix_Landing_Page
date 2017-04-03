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
        data: user,
        success: function(data) {
            //show content
            if(data) {
                alert('Successfully authenticated user!!!');
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
        data: user,
        success: function(data) {
            //show content
            if(data) {
                alert('Successfully created debate topic!!!');
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
