var LOGIN_QUOTE = 'What\'s my name again?',
    GROUP_QUOTE = 'Who should I eat with?',
    QUOTE = 'Mmm... Donuts?';
Template.header.helpers({
    quote: function () {
        if (Router.current().data()) {
            var step = Router.current().data().step;
            switch(step) {
                case 'LOGIN':
                    return LOGIN_QUOTE;
                case 'GROUP':
                    return GROUP_QUOTE;
                case 'HOME':
                    var me = Router.current().data().currentUser;
                    if (me) {
                        var chosenResto = RestoList.findOne({groupName: me.groupName}, {sort: {score: -1}});
                        return chosenResto ? chosenResto.name : QUOTE;
                    }
                    return QUOTE;
            }
        }
        return LOGIN_QUOTE;
    },
    showButtons: function() {
        if (Router.current().data()) {
            return Router.current().data().step !== 'LOGIN';
        }
        return false;
    },
    cssHeader: function() {
        if (Router.current().data()) {
            var step = Router.current().data().step;
            return step === 'HOME' ? 'wlt-header-home' : '';
        }
        return '';
    }
});

Template.header.events({
    'click .wlt-logout': function(event) {
        UserList.currentUser.unregister();
        Router.go('login');
        event.preventDefault();
    },
    'click .wlt-group-change': function(event) {
        Router.go('groupList');
        event.preventDefault();
    }
});
