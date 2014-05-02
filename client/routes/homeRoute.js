var HomeController = RouteController.extend({
    template: 'home'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        controller: HomeController,
        waitOn: function () {
            return [
                Meteor.subscribe('userList'),
                Meteor.subscribe('user'),
                Meteor.subscribe('groupList'),
                Meteor.subscribe('group'),
                Meteor.subscribe('restoList'),
                Meteor.subscribe('resto'),
                Meteor.subscribe('voteList'),
                Meteor.subscribe('voteByGroupName')
            ];
        },
        data: function () {
            return {
                step: 'HOME',
                currentUser: UserList.currentUser.get()
            };
        }
    });
});
