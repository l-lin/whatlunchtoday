var FORM_TYPE_CREATE = 'Create',
    FORM_TYPE_MODIFY = 'Modify';

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
                $groupFormName = $groupForm.find('input[type="text"]'),
                $groupFormType = $groupForm.find('input[name="formType"]'),
                $groupFormPrevValue = $groupForm.find('input[name="prevValue"]');
            $groupForm.show();
            $groupFormName.val(groupName);
            $groupFormPrevValue.val(groupName);
            $groupFormType.val(FORM_TYPE_MODIFY);
            $groupFormName.focus();
        }
    },
    'click .wlt-group-create': function(event) {
        var $groupForm = $('.wlt-group-form'),
            $groupFormName = $groupForm.find('input[type="text"]'),
            $groupFormType = $groupForm.find('input[name="formType"]'),
            $groupFormPrevValue = $groupForm.find('input[name="prevValue"]');
        $groupFormPrevValue.val('');
        $groupFormType.val(FORM_TYPE_CREATE);
        $groupForm.show();
        $groupFormName.val('');
        $groupFormName.focus();
        event.preventDefault();
    },
    'submit': function() {
        var $groupForm = $('.wlt-group-form'),
            $groupFormName = $groupForm.find('input[type="text"]'),
            $groupFormType = $groupForm.find('input[name="formType"]'),
            $groupFormPrevValue = $groupForm.find('input[name="prevValue"]');
        var groupName = $groupFormName.val();
        if (groupName) {
            var group = GroupList.findOne({name: groupName});
            if (!group) {
                switch ($groupFormType.val()) {
                    case FORM_TYPE_MODIFY:
                        var prevGroup = GroupList.findOne({name: $groupFormPrevValue.val()});
                        if (prevGroup) {
                            GroupList.update(prevGroup._id, {$set: {name: groupName}});
                        }
                        break;
                    case FORM_TYPE_CREATE:
                        GroupList.insert({name: groupName});
                        break;
                }
                $groupFormName.val('');
                $groupForm.hide();
            } else {
                $groupFormName.focus();
            }
        }
        return false;
    },
    'click .wlt-group-form .wlt-cancel': function(event) {
        var $groupForm = $('.wlt-group-form'),
            $groupFormName = $groupForm.find('input[type="text"]');
        $groupForm.hide();
        $groupFormName.val('');
        event.preventDefault();
    }
});
