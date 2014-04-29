var LOGIN_QUOTE = 'What\'s my name again?',
    GROUP_QUOTE = 'Who should I eat with?',
    QUOTE = 'Mmmh... Donut?';
Template.header.quote = function () {
    if (!user()) {
        return LOGIN_QUOTE;
    }
    if (!group()) {
        return GROUP_QUOTE;
    }
    return QUOTE;
};
