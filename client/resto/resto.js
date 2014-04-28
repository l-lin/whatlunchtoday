RestoList = new Meteor.Collection('restoList');

var restoListHandle = Meteor.subscribe('restoList', function() {});

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
    'click .wlt-form-button': function() {
        $('.wlt-form').show();
        $('.wlt-form input[name="name"]').focus();
        return false;
    },
    'click .wlt-form .wlt-cancel': function() {
        $('.wlt-form').hide();
        return false;
    },
    'submit': function() {
        var $form = $('.wlt-form'),
            $name = $('.wlt-form input[name="name"]'),
            name = $name.val();
        if (name) {
            RestoList.insert({
                name: name,
                score: 0
            });
            $name.val('');
        }
        $form.hide();
        return false;
    }
});
