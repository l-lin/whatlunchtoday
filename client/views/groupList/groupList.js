Template.groupList.helpers({
    show: function() {
        var me = Router.current().data();
        if (!me) {
            Router.go('login');
        }
        return true;
    },
    groupList: function() {
        return GroupList.find();
    }
});

Template.groupList.events({
    'click .wlt-group': function() {
        debugger;
        var groupName = $('.wlt-group').data('name');
        if (groupName) {
            GroupList.currentGroup.save();
            Router.go('home');
        }
        return false;
    }
});
