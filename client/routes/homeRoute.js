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
                Meteor.subscribe('groupList'),
                Meteor.subscribe('restoList'),
                Meteor.subscribe('voteList'),
                Meteor.subscribe('mostVote')
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
