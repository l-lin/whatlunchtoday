var dummyGroupList = [{
    name: 'Monidorks'
}, {
    name: 'Somedudes'
}, {
    name: 'Easynerds'
}, {
    name: 'Adbackdown'
}];

function loadGroupList(groupList) {
    for (var i = 0; i < groupList.length; i++) {
        GroupList.insert({
            name: groupList[i].name
        });
    }
}

Meteor.startup(function () {
    // code to run on server at startup
    if (GroupList.find().count() === 0) {
        loadGroupList(dummyGroupList);
    }
});
