Template.groupList.helpers({
    show: function() {
        var me = Router.current().data().currentUser;
        if (!me) {
            Router.go('login');
        }
        return true;
    },
    groupList: function() {
        var searchUser = Session.get(SESSION_SEARCH_USER_KEY);
        if (searchUser) {
            var regex = new RegExp('^' + searchUser, 'i');
            var userList = UserList.find({name: regex}).fetch();
            if (userList) {
                var groupList = [];
                _.each(userList, function(user) {
                    groupList.push(user.groupName);
                });
                return GroupList.find({name: {$in: groupList}});
            }
            return [];
        }
        return GroupList.find({}, {sort: {name: 1}});
    },
    group: function() {
        return this;
    }
});

Template.groupList.events({
    'click .wlt-group': function(event) {
        var groupName = this.name;
        if (groupName) {
            var me = Router.current().data().currentUser;
            UserList.update(me._id, {$set: {groupName: groupName}});
            Meteor.call('createDummyRestoListIfNotExist', groupName);
            Router.go('home');
        }
        event.preventDefault();
    },
    'click .wlt-group .wlt-remove': function(event) {
        var groupName = this.name;
        if (groupName) {
            var group = GroupList.findOne({name: groupName});
            if (group) {
                Meteor.call('removeRestoListByGroupName', groupName);
                Meteor.call('removeVoteListByGroupName', groupName);
                GroupList.remove(group._id);
            }
        }
        event.stopPropagation();
        event.preventDefault();
    },
    'click .wlt-group .wlt-edit': function(event) {
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
        event.stopPropagation();
        event.preventDefault();
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
                            Meteor.call('updateRestoListByGroupName', prevGroup.name, groupName);
                            Meteor.call('updateVoteListByGroupName', prevGroup.name, groupName);
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

Template.groupButton.helpers({
    showButtons: function() {
        var nbVotes = VoteList.find({groupName: this.name, date: today()}).count();
        return nbVotes === 0;
    }
});

Template.searchUser.helpers({
    searchUser: function() {
        return (function() {
            return UserList.find().fetch().map(function (user) {
                return user.name;
            });
        })();
    }
});

Template.searchUser.rendered = function() {
    var $searchUser = $('input.wlt-user-search-input');
    Meteor.typeahead.inject();
    $searchUser.keyup(function(event) {
        Session.set(SESSION_SEARCH_USER_KEY, event.target.value);
        if (event.keyCode ==13) {
            $('input.typeahead').typeahead('close');
        }
    });
    $searchUser.focus();
};

Template.chosenResto.helpers({
    chosenResto: function() {
        var mapVote = buildMapVotes(this.name);
        var chosenResto = _.chain(mapVote).pairs().max(_.last).head().value();
        return chosenResto ? chosenResto : '&nbsp;';
    }
});
