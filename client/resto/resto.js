var restoListHandle = Meteor.subscribe('restoList');

Template.restoList.loading = function() {
    return !restoListHandle.ready();
};

Template.restoList.restoList = function() {
    return RestoList.find({}, {sort: {score: -1}});
};

Template.resto.events({
    'click .wlt-resto': function() {
        if (typeof this.score === 'undefined') {
            this.score = 1;
        } else {
            this.score++;
        }
        RestoList.update(this._id, {$set: {score: this.score}});
        return false;
    }
});

Template.restoForm.events({
    'submit': function() {
        var $name = $('.wlt-form').find('input[name="name"]'),
            name = $name.val();
        if (name) {
            RestoList.insert({
                name: name,
                score: 0
            });
            $name.val('');
        }
        return false;
    }
});

Template.restoChoice.show = function() {
    return user();
};
