Meteor.publish('restoList', function () {
    return RestoList.find();
});

Meteor.publish('resto', function(restoName) {
    return RestoList.find({name: restoName});
});
