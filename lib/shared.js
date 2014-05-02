FORM_TYPE_CREATE = 'Create';
FORM_TYPE_MODIFY = 'Modify';
SESSION_SEARCH_RESTO_KEY = 'searchRestoName';
NB_MAX_VOTES = 5;

today = function() {
    return new Date(new Date().setHours(0,0,0,0));
};

buildMapVotes = function(groupName) {
    var voteListByGroupName = VoteList.find({groupName: groupName}).fetch(),
        mapVotes = {};
    _.each(voteListByGroupName, function(vote) {
        if (!mapVotes[vote.restoName]) {
            mapVotes[vote.restoName] = 1;
        } else {
            mapVotes[vote.restoName]++;
        }
    });
    return mapVotes;
};