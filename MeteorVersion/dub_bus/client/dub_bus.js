
Session.setDefault('counter', 0);

Router.configure({
  layoutTemplate: 'Main_template'
});




Router.route('/', {
  name           : 'Principal',
  layoutTemplate : 'Main_template',
  yieldRegions   : {
    'navbar'          : { to: 'navbar' },
    'loading_screen'  : { to: 'main'   },
    'loading_screen'  : { to: 'menu_left_place' }
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
      
      // Template.principal_screen.rendered = function() {
      Template.principal_screen.rendered = () => { // arrow function to keep the this
        console.log('Loading the Map in the principal screen');
        app.loadMap();
        // app.data_replication();
        this.render('menu_left', { to : "menu_left_place" });
      };
    }
  }

});






// ---------- TEMPLATES DATA LOAD ---------------- //


Template.navbar.helpers({
    admin_mode_on : function() {
        var vm = { am: app.mode };

        return vm;
    }
});







// ---------- TEMPLATES EVENT HANDLING ---------------- //
Template.navbar.events({

  // Assign arrow changing after trigger menu item collapsing
  'click .js-user-toggle': function (event) {
      app.mode = 'user';
      app.track_edit = '';
      $(event.target).parentsUntil('div').find('li').removeClass('active');
      $(event.target).parent().addClass('active');
      app.stop_markers.toggle_draggable(false);
  },

  'click .js-admin-toggle': function (event) {
      app.mode = 'admin';
      app.track_edit = '';
      $(event.target).parentsUntil('div').find('li').removeClass('active');
      $(event.target).parent().addClass('active');

      app.stop_markers.toggle_draggable(true);
  },

  'click .js-admin-route-edit': function (event) {
      app.track_edit = 'points';
      $(event.target).parentsUntil('div').find('li').removeClass('active');
      $(event.target).parent().addClass('active');

  },

  'click .js-admin-show-data-stops': function (event) {
      $(event.target).parentsUntil('div').find('li').removeClass('active');
      $(event.target).parent().addClass('active');

      app.show_data_stops();

  },
  'click .js-admin-show-data-lines': function (event) {
      $(event.target).parentsUntil('div').find('li').removeClass('active');
      $(event.target).parent().addClass('active');

      app.show_data_lines();

  },
  



});



/*
*/

// Initialize APP
app.ini();