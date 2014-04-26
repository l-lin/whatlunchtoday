RestoList = new Meteor.Collection('restoList');

Meteor.publish('restoList', function(idList) {
    return RestoList.find({idList: idList});
});
