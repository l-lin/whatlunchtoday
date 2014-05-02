Meteor.publish('voteList', function () {
    return VoteList.find();
});

Meteor.publish('mostVote', function(groupName) {
    var sub = this;
    // This works for Meteor 0.6.5
    var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

    // Your arguments to Mongo's aggregation. Make these however you want.
    var pipeline = [{$match: {groupName: groupName}}, {$group: {_id: '$restoName', restoName: {$sum: 1}}}];

//    db.collection('voteList').aggregate(
//        [],
    db.collection('voteList').aggregate(
        pipeline,
        // Need to wrap the callback so it gets called in a Fiber.
        Meteor.bindEnvironment(
            function(err, result) {
                console.log(result);
                // Add each of the results to the subscription.
                _.each(result, function(e) {
                    // Generate a random disposable id for aggregated documents
                    sub.added('voteList', Random.id(), {
                        key: e._id.restoName,
                        count: e.count
                    });
                });
                sub.ready();
            },
            function(error) {
                Meteor._debug( 'Error doing aggregation: ' + error);
            }
        )
    );
});
