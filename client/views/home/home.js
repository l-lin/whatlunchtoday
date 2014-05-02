Template.home.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        $('.wlt-resto-search').find('input[type="text"]').focus();
    }
};

Template.home.helpers({
    show: function() {
        var me = Router.current().data().currentUser;
        if (!me || !me.groupName) {
            Router.go('login');
        } else {
            var myGroup = GroupList.find({name: me.groupName});
            if (!myGroup) {
                Router.go('groupList');
            }
        }
        return true;
    },
    currentUser: function() {
        return Router.current().data().currentUser;
    },
    userList: function() {
        var me = Router.current().data().currentUser;
        return me ? UserList.find({groupName: me.groupName, name: {$ne: me.name}}, {sort: {name: 1}}) : null;
    },
    currentGroup: function() {
        var me = Router.current().data().currentUser;
        return me ? GroupList.findOne({name: me.groupName}) : null;
    },
    restoList: function() {
        var me = Router.current().data().currentUser,
            searchRestoName = Session.get(SESSION_SEARCH_RESTO_KEY);
        if (me) {
            if (searchRestoName) {
                var regex = new RegExp(searchRestoName, 'i');
                return RestoList.find({groupName: me.groupName, name: regex}, {sort: {score: -1}});
            }
            return RestoList.find({groupName: me.groupName}, {sort: {score: -1}});
        }
        return null;
    },
    nbVotesLeft: function() {
        var me = Router.current().data().currentUser;
        return me ? NB_MAX_VOTES - VoteList.find({userName: me.name, groupName: me.groupName, date: today()}).count() : 0;
    }
});

Template.home.events({
    'click .wlt-resto': function(event) {
        var restoName = this.name,
            me = Router.current().data().currentUser;
        if (restoName && me) {
            var resto = RestoList.findOne({groupName: me.groupName, name: restoName});
            if (resto) {
                if (NB_MAX_VOTES - VoteList.find({userName: me.name, groupName: me.groupName, date: today()}).count() > 0) {
                    VoteList.insert({
                        userName: me.name,
                        groupName: me.groupName,
                        restoName: restoName,
                        date: today()
                    });
                }
            }
        }
        event.preventDefault();
    },
    'click .wlt-resto .wlt-remove': function(event) {
        var restoName = this.name;
        if (restoName) {
            var resto = RestoList.findOne({name: restoName});
            if (resto) {
                RestoList.remove(resto._id);
            }
        }
        event.stopPropagation();
        event.preventDefault();
    },
    'click .wlt-resto .wlt-edit': function(event) {
        var restoName = this.name;
        if (restoName) {
            var $restoForm = $('.wlt-resto-form'),
                $restoFormName = $restoForm.find('input[type="text"]'),
                $restoFormType = $restoForm.find('input[name="formType"]'),
                $restoFormPrevValue = $restoForm.find('input[name="prevValue"]');
            $restoForm.show();
            $restoFormName.val(restoName);
            $restoFormPrevValue.val(restoName);
            $restoFormType.val(FORM_TYPE_MODIFY);
            $restoFormName.focus();
        }
        event.stopPropagation();
        event.preventDefault();
    },
    'click .wlt-resto-create': function(event) {
        var $restoForm = $('.wlt-resto-form'),
            $restoFormName = $restoForm.find('input[type="text"]'),
            $restoFormType = $restoForm.find('input[name="formType"]'),
            $restoFormPrevValue = $restoForm.find('input[name="prevValue"]');
        $restoFormPrevValue.val('');
        $restoFormType.val(FORM_TYPE_CREATE);
        $restoForm.show();
        $restoFormName.val('');
        $restoFormName.focus();
        event.preventDefault();
    },
    'submit': function() {
        var $restoForm = $('.wlt-resto-form'),
            $restoFormName = $restoForm.find('input[type="text"]'),
            $restoFormType = $restoForm.find('input[name="formType"]'),
            $restoFormPrevValue = $restoForm.find('input[name="prevValue"]'),
            me = Router.current().data().currentUser;;
        var restoName = $restoFormName.val();
        if (restoName && me) {
            var resto = RestoList.findOne({name: restoName});
            if (!resto) {
                switch ($restoFormType.val()) {
                    case FORM_TYPE_MODIFY:
                        var prevResto = RestoList.findOne({name: $restoFormPrevValue.val()});
                        if (prevResto) {
                            RestoList.update(prevResto._id, {$set: {name: restoName}});
                        }
                        break;
                    case FORM_TYPE_CREATE:
                        RestoList.insert({name: restoName, score: 0, groupName: me.groupName});
                        break;
                }
                $restoFormName.val('');
                $restoForm.hide();
            } else {
                $restoFormName.focus();
            }
        }
        return false;
    },
    'click .wlt-resto-form .wlt-cancel': function(event) {
        var $restoForm = $('.wlt-resto-form'),
            $restoFormName = $restoForm.find('input[type="text"]');
        $restoForm.hide();
        $restoFormName.val('');
        event.preventDefault();
    },
    'keyup .wlt-resto-search input[type=text]': function(event) {
        Session.set(SESSION_SEARCH_RESTO_KEY, event.target.value);
    }
});
