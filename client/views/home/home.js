Template.home.events({
});

Template.home.helpers({
    show: function() {
        var me = Router.current().data().currentUser;
        if (!me) {
            Router.go('login');
        }
        var myGroup = Router.current().data().currentGroup;
        if (!myGroup) {
            Router.go('groupList');
        }
        return true;
    },
    userList: function() {
        return UserList.find({}, {sort: {name: 1}});
    },
    groupList: function() {
        return GroupList.find({}, {sort: {name: 1}});
    },
    restoList: function() {
        return RestoList.find({}, {sort: {score: -1}});
    }
});
