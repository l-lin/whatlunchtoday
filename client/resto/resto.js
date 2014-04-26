RestoList = new Meteor.Collection('restoList');

var restoListHandle = Meteor.subscribe('restoList', function() {});

Template.restoList.loading = function() {
    return !restoListHandle.ready();
};

Template.restoList.restoList = function() {
    return RestoList.find({}, {sort: {name: 1}});;
};

Template.resto.events({
    'click': function() {
        if (typeof this.score === 'undefined') {
            this.score = 1;
        } else {
            this.score++;
        }
        RestoList.update(this._id, {$set: {score: this.score}});
        return false;
    }
});