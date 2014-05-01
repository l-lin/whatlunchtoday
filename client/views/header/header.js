var LOGIN_QUOTE = 'What\'s my name again?',
    GROUP_QUOTE = 'Who should I eat with?',
    QUOTE = 'Mmm... Donuts?';
Template.header.helpers({
    quote: function () {
        if (Router.current().data()) {
            if (!Router.current().data().currentUser) {
                return LOGIN_QUOTE;
            }
            if (!Router.current().data().currentGroup) {
                return GROUP_QUOTE;
            }
            return QUOTE;
        }
        return LOGIN_QUOTE;
    }
});
