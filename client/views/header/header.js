var LOGIN_QUOTE = 'What\'s my name again?',
    GROUP_QUOTE = 'Who should I eat with?',
    QUOTE = 'Mmmh... Donut?';
Template.header.quote = function () {
    if (!UserList.currentUser.get()) {
        return LOGIN_QUOTE;
    }
//    if (!WLT.group()) {
//        return GROUP_QUOTE;
//    }
    return QUOTE;
};
