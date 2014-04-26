if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
        if (RestoList.find().count === 0) {
            var restoList = [{
                name: 'foo'
            }, {
                name: 'bar'
            }];
            for (var i = 0; i < restoList.length; i++) {
                RestoList.insert({})
            }
        }
    });
}