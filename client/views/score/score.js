Template.score.helpers({
    score: function() {
        var mapVotes = buildMapVotes(this.groupName);
        if (mapVotes) {
            var vote = mapVotes[this.name];
            return vote ? vote : 0;
        }
        return 0;
    }
});

Template.score.events({
});

