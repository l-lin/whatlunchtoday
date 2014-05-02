var LOGIN_QUOTE = 'What\'s my name again?',
    GROUP_QUOTE = 'Who should I eat with?',
    ABOUT_QUOTE = 'Bite my shiny metal ass!',
    HOME_QUOTE = 'Youhou! ',
    NOT_FOUND_QUOTE = 'I think you are lost...',
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
                case 'ABOUT':
                    return ABOUT_QUOTE;
                case 'HOME':
                    var me = Router.current().data().currentUser;
                    if (me) {
                        var mapVote = buildMapVotes(me.groupName);
                        var chosenResto = _.chain(mapVote).pairs().max(_.last).head().value();
                        return chosenResto ? HOME_QUOTE + chosenResto + '!!!' : QUOTE;
                    }
                    return QUOTE;
            }
        }
        return NOT_FOUND_QUOTE;
    },
    showButtons: function() {
        if (Router.current().data()) {
            return Router.current().data().step !== 'LOGIN' &&
                Router.current().data().step !== 'ABOUT';
        }
        return false;
    },
    cssHeader: function() {
        if (Router.current().data()) {
            var step = Router.current().data().step;
            switch(step) {
                case 'ABOUT':
                    return 'wlt-header-about';
                case 'HOME':
                    return 'wlt-header-home';
            }
            return '';
        }
        return 'wlt-header-not-found';
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
