RestoList = new Meteor.Collection('restoList');

Meteor.publish('restoList', function(name) {
    check(name, String);
    return RestoList.find({name: name});
});
