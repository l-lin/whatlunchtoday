RestoList = new Meteor.Collection2('restoList', {
    schema : new SimpleSchema({
        name: {
            type: String
        },
        score: {
            type: Number
        },
        groupName: {
            type: String
        }
    })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
RestoList.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});

var DUMMY_RESTO_LIST = [
    {name: 'McDo'},
    {name: 'Quick'},
    {name: 'Super Nature'},
    {name: 'Bien Bien'},
    {name: 'Chez Gr\u00e9goire'},
    {name: 'Kurde'},
    {name: 'Japonais'},
    {name: 'Pizza'},
    {name: 'Turc'},
    {name: 'Bulma'},
    {name: 'Wok'},
    {name: 'Me kong'},
    {name: 'Love pasta'},
    {name: 'Big fernand'},
    {name: 'Mamy burger'},
    {name: 'Noodle king'},
    {name: 'Boulangerie'}
];

function insertDummyRestoList(restoList, groupName) {
    for (var i = 0; i < restoList.length; i++) {
        RestoList.insert({
            name: restoList[i].name,
            score: 0,
            groupName: groupName
        });
    }
}

Meteor.methods({
    createDummyRestoListIfNotExist: function(groupName) {
        if(!RestoList.findOne({groupName: groupName})) {
            insertDummyRestoList(DUMMY_RESTO_LIST, groupName);
        }
    },
    removeRestoListByGroupName: function(groupName) {
        RestoList.remove({groupName: groupName});
    }
});
