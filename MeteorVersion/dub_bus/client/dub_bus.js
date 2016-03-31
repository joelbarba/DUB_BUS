
Session.setDefault('counter', 0);

Router.configure({
  layoutTemplate: 'Main_template'
});




Router.route('/', {
  name           : 'Principal',
  layoutTemplate : 'Main_template',
  yieldRegions   : {
    'navbar'          : { to: 'navbar' },
    'loading_screen'  : { to: 'main'   }
  },
  waitOn: function() {
    console.log('waiting for loading dependences');

    // Wait for: 1. Google Maps API library
    //           2. MongoDB Collection: bus_stops
    return [app.Mapa('https://maps.googleapis.com/maps/api/js?key=AIzaSyD-sU_iXfll35fohb_goUYnNyqf8FSP9wg'),
            Meteor.subscribe("all-bus-stops")
           ];
  },
  action: function () {
    this.render();

    if (this.ready() ) {
      console.log('Rendering the principal screen');
      this.render('principal_screen', { to : "main" });
      Template.principal_screen.rendered = function() {
        console.log('Loading the Map in the principal screen');
        app.loadMap();
      };
    }
  }

});

/*

Router.route('/', function () {
  this.render('navbar', { to : "navbar" });    
  // this.render('principal_screen', { to : "main" });

  // add the subscription handle to our waitlist
  this.wait(Meteor.subscribe('all-bus-stops', null));

  // this.ready() is true if all items in the wait list are ready

  if (this.ready()) {
    console.log('reaaaaaady');
    this.render('principal_screen', { to : "main" });
  } else {
    console.log('waaaaiting');
    this.render('loading_screen', { to : "main" });
  }

});


/*
*/

// Router.route("/", {
//   name: "menu",
//   template: "menu_left",
//   waitOn: function(){
//     // waitOn makes sure that this publication is ready before rendering your template
//     return Meteor.subscribe("all-bus-stops");
//   },
//   data: function() {
//     // this will be used as the current data context in your template
//     // return Pushups.find(/*...*/);
//   }
// });




Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});

// Meteor.subscribe('all-bus-stops');


// ---------- TEMPLATES DATA LOAD ---------------- //

// helper function that returns all available websites
Template.prova.helpers({
    tracks : function() {
        return bus_tracks.find();
    }
});





// ---------- TEMPLATES EVENT HANDLING ---------------- //




/*
*/

// Initialize APP
app.ini();