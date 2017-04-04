var OpenTok = require('opentok')

var apiKey = '45812802';
var apiSecret = '6ae1f60a6ccd99465ea86b17b7c45e45e1b96b91';
opentok = new OpenTok(apiKey, apiSecret);

if (!opentok) {
    console.log('wirlix failed to establish connectivity to tokbox');
    process.exit(1);
} else {
    console.log('wirlix established connectivity to tokbox');
    //console.log(opentok);
}

function createSession() {
    //console.log(opentok);
    var sessionId;
    opentok.createSession(function (err, session) {
        if (err) throw err;
        // store the session Id in mongo db here or after the api is called.
        sessionId = session.sessionId;
        console.log('**********>>' + sessionId);
        //return sessionId;
    });
    console.log('**********>>' + sessionId);
    return sessionId;

}


module.exports = {
    createSession: createSession,
    generateToken: function (sessionId) {
        var token = opentok.generateToken(req.params.sessionId);
        console.log(token);
        return token;
    }
};
