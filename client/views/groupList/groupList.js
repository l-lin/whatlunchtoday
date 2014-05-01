Template.groupList.helpers({
    show: function() {
        var me = Router.current().data().currentUser;
        if (!me) {
            Router.go('login');
        }
        return true;
    },
    groupList: function() {
        return GroupList.find({}, {sort: {name: 1}});
    }
});

Template.groupList.events({
    'click .wlt-form-name': function(event) {
        var groupName = this.name;
        if (groupName) {
            GroupList.currentGroup.register(groupName);
            Router.go('home');
        }
        event.preventDefault();
    },
    'click .wlt-remove': function(event) {
        var groupName = this.name;
        if (groupName) {
            var group = GroupList.findOne({name: groupName});
            if (group) {
                GroupList.remove(group._id);
            }
        }
        event.preventDefault();
    },
    'click .wlt-edit': function() {
        var groupName = this.name;
        if (groupName) {
            var $groupForm = $('.wlt-group-form'),
                $groupFormName = $groupForm.find('input[type="text"]');
            $groupForm.show();
            $groupFormName.val(groupName);
            $groupFormName.focus();
        }
    },
    'click .wlt-group-create': function(event) {
        var $groupForm = $('.wlt-group-form');
        $groupForm.toggle();
        $groupForm.find('input[type="text"]').focus();
        event.preventDefault();
    },
    'submit': function() {
        var $groupName = $('.wlt-group-form').find('input[type="text"]'),
            groupName = $groupName.val();
        if (groupName) {
            var group = GroupList.findOne({name: groupName});
            if (!group) {
                GroupList.insert({name: groupName});
                $groupName.val('');
            }
        }
        return false;
    }
});
