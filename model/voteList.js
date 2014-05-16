VoteList = new Meteor.Collection2('voteList', {
    schema: new SimpleSchema({
        userName: {
            type: String
        },
        groupName: {
            type: String
        },
        restoName: {
            type: String
        },
        date: {
            type: Date
        }
    })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
VoteList.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

Meteor.methods({
    updateVoteListByGroupName: function(prevGroupName, newGroupName) {
        VoteList.update(
            {groupName: prevGroupName},
            {$set: {groupName: newGroupName}},
            {multi: true}
        );
    },
    removeVoteListByGroupName: function(groupName) {
        VoteList.remove({groupName: groupName});
    },
    updateVoteListByRestoName: function(groupName, prevRestoName, newRestoName) {
        VoteList.update(
            {restoName: prevRestoName,groupName: groupName},
            {$set: {restoName: newRestoName}},
            {multi: true}
        );
    },
    removeVoteListByRestoName: function(groupName, restoName) {
        VoteList.remove({
            groupName: groupName,
            restoName: restoName
        });
    },
    removeVoteListByUserName: function(userName) {
        VoteList.remove({
            userName: userName,
            date: today()
        });
    },
    removeVoteListByUserNameAndNotInGroupName: function(userName, groupName) {
        VoteList.remove({
            groupName: {$nin: [groupName]},
            userName: userName,
            date: today()
        });
    }
});
