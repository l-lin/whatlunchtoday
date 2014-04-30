Template.home.events({
});

Template.home.helpers({
    show: function() {
        var me = Router.current().data().user;
        if (!me) {
            Router.go('login');
        }
        var myGroup = Router.current().data().group;
        if (!myGroup) {
            Router.go('groupList');
        }
        return true;
    },
    userList: function() {
        return UserList.find();
    },
    groupList: function() {
        return GroupList.find();
    }
});
