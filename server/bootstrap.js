Meteor.startup(function() {
    // code to run on server at startup
    if (RestoList.find().count() === 0) {
        var restoList = [{
            name: 'McDo'
        }, {
            name: 'Quick'
        }, {
            name: 'Super Nature'
        }, {
            name: 'Bien Bien'
        }, {
            name: 'Chez Gr\u00e9goire'
        }, {
            name: 'Kurde'
        }, {
            name: 'Japonais'
        }, {
            name: 'Pizza'
        }, {
            name: 'Turc'
        }, {
            name: 'Bulma'
        }, {
            name: 'Wok'
        }, {
            name: 'Me kong'
        }];
        for (var i = 0; i < restoList.length; i++) {
            RestoList.insert({name: restoList[i].name});
        }
    }
});