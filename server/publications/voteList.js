Meteor.publish('voteList', function () {
    return VoteList.find();
});

Meteor.publish('voteByGroupName', function (groupName) {
    return VoteList.find({groupName: groupName});
});
