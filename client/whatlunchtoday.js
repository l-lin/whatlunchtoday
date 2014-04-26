if (Meteor.isClient) {
    var APP_NAME = 'What lunch today';
    Template.header.appName = function() {
        return APP_NAME;
    };
    
    Template.restoList.restoList = function() {
        return [{
            name: 'foo'
        }, {
            name: 'bar'
        }];
    };
}
