shared_fun = function() {
    if (Meteor.isServer) {
        console.log('exe shared_fun (server)');
    }
    
    if (Meteor.isClient) {
        console.log('exe shared_fun (client)');        
    }
};


