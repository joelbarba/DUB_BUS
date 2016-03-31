// ---------- TEMPLATES DATA LOAD ---------------- //


// helper function to return all tracks and build the left menu
Template.menu_left.helpers({
    tracks : function() {
        console.log("Bulding left menu");
        return bus_tracks.find({}, { sort: { line_num: 1 }});
    }
});




// helper function to return all the stops of a line to build the stop table in the left menu
Template.menu_stop_table.helpers({
    stops : function() {

        var ttdata = {}; 

        ttdata.line_stops = new Array(0);
        ttdata.line_num = Template.parentData(1).line_num;
        ttdata.direction = this.direction;

        
        if (this.direction == 'from') var track = Template.parentData(1).from_route.track;
        else                          var track = Template.parentData(1).to_route.track;


        // Loop all track points, seeking the stops ones
        track.forEach(function(elem) {
          // console.log(elem);
          if (elem.hasOwnProperty('stop_num')) {

            var bus_stop = bus_stops.findOne({num: elem.stop_num});
            if (bus_stop != null) {
              // Add stop
              // console.log(bus_stops.findOne({num: elem.stop_num}).name);
              ttdata.line_stops.push({
                num   : bus_stop.num,
                name  : bus_stop.name
              });
            }


          }
        });

        return ttdata;
    }
});




/*
*/

// ---------- TEMPLATES EVENT HANDLING ---------------- //

Template.menu_left.events({

  // Assign arrow changing after trigger menu item collapsing
  'click .js-menu-custom-collapsator': function (event) {
      var line_num = $(event.currentTarget).data('line-num');

      if (event.target.type == 'checkbox') {
  //            app.show_route(line_num - 1, direction, $(event.target).prop('checked'));          
      } else {
          var item_to_collapse = $(event.currentTarget).data('item-to-collapse-id');
          $(item_to_collapse).collapse('toggle');
      }    
  },

  // Assing toggle collapsing to menu item controllers
  'click .js-submenu-custom-collapsator': function (event) {
      var line_num = $(event.currentTarget).data('line-num');
      var direction = $(event.currentTarget).data('line-direction');

      if (event.target.type == 'checkbox') {
          app.show_route(line_num, direction, $(event.target).prop('checked'));          
      } else {
  //            toogle_menu_item("#line_" + line_num + "_menu_" + direction, event.currentTarget);
          var item_to_collapse = $(event.currentTarget).data('item-to-collapse-id');
          $(item_to_collapse).collapse('toggle');
      }
  },

  // Assign arrow changing after trigger menu item collapsing
  'show.bs.collapse .menu-custom-item': function(e) {
      var collapser_id = $(e.currentTarget).data('collapse-controler-id');
      $(collapser_id).find('span.glyphicon')
          .toggleClass('glyphicon-triangle-bottom', true)
          .toggleClass('glyphicon-triangle-right',  false);
      e.stopPropagation();
  },
  'hidden.bs.collapse .menu-custom-item': function(e) {
      var collapser_id = $(e.currentTarget).data('collapse-controler-id');
      $(collapser_id).find('span.glyphicon')
          .toggleClass('glyphicon-triangle-bottom', false)
          .toggleClass('glyphicon-triangle-right',  true); 
      e.stopPropagation();
  }

});




Template.menu_stop_table.events({

  // Show or hide bus stop
  'click .js_stop_check': function (event) {

      var stop_info = {
        stop_num  : this.num,
        line_num  : $(Template.instance().firstNode).data('line-num'),
        direction : Template.instance().data.direction    // $(Template.instance().firstNode).data('direction')
      };
      app.toogle_stop_show(stop_info, $(event.currentTarget).prop('checked'));
  
  },

  // Show or hide all bus stops of the line
  'click .js_stop_check_all': function (event) {
      
      var line_num  = $(Template.instance().firstNode).data('line-num');
      var direction = $(Template.instance().firstNode).data('direction');   // = Template.instance().data.direction;
      

      // Loop all line stops and check each one
      $('#menu_stop_table_' + line_num + '_' + direction + ' tbody input.js_stop_check').each(
          function(index, elem) {
              var chk_val   = $(event.target).prop('checked');
              var stop_info = {
                stop_num  : $(elem).parentsUntil('tr').parent().data("stop-num"),
                line_num  : $(elem).parentsUntil('table').parent().data("line-num"),
                direction : $(elem).parentsUntil('table').parent().data("direction")
              };                
              $(elem).prop('checked', chk_val);
              app.toogle_stop_show(stop_info, chk_val);
          });      
  }


/*

      $('.js_stop_link').click(function(event) {
          var stop_info = {
            stop_num  : $(this).parentsUntil('tr').parent().data("stop-num"),
            line_num  : $(this).parentsUntil('table').parent().data("line-num"),
            direction : $(this).parentsUntil('table').parent().data("direction"),
          };
//          var stop_num = $(this).parent().parent().data("stop-num");
          var chk = $(this).parentsUntil('tr').siblings().find('input.js_stop_check')[0];
          $(chk).prop('checked', true); // do not toggle, always set true

          stops_obj.toogle_stop_show(stop_info, $(chk).prop('checked'));
          if ($(chk).prop('checked')) {
              map.panTo( stops_obj.get_bus_stop(stop_info.stop_num).pos );
//              open_stop_infowindow(stop_marker[i]);
          }
          return false;
      });
      $('.js_stop_check_all').click(function(event) {
          var stop_info = {
            stop_num  : null,
            line_num  : $(this).parentsUntil('table').parent().data("line-num"),
            direction : $(this).parentsUntil('table').parent().data("direction"),
          };
          var chk_val = $(this).prop('checked');
          $('#menu_stop_table_' + stop_info.line_num + '_' + stop_info.direction + ' tbody input.js_stop_check').each(
              function(index, elem) { 
                  var stop_info = {
                    stop_num  : $(elem).parentsUntil('tr').parent().data("stop-num"),
                    line_num  : $(elem).parentsUntil('table').parent().data("line-num"),
                    direction : $(elem).parentsUntil('table').parent().data("direction")
                  };                
                  $(elem).prop('checked', chk_val);
                  stops_obj.toogle_stop_show(stop_info, chk_val);
              });
      }); 


*/



});







/*
*/

this.menu = (function() {

  
  // ------------- Private functions ------------------

  
  // ------------- Public functions ------------------


  this.build_menu = function() {
      console.log('build_menu');
      /*
      var tdata = {}; tdata.bus_tracks = bus_tracks.find().fetch();


      $('#id_left_menu').html( temp_menu(tdata) );

      $('.menu-stops-content').each(function(ind) {
          var num = $(this).data('line-num');
          var dir = $(this).data('direction');

          $(this).html( temp_stop_table(generate_line_stops(num, dir)) );
      });
    
      set_menu_collapse_events();
      bind_menu_table_events();    
      */
  }
  
  

  

  
  
  
  // Link events to the menu table stops
  this.bind_menu_table_events = function() {
    
      $('.js_stop_check').click(function(event) {
          var stop_info = {
            stop_num  : $(this).parentsUntil('tr').parent().data("stop-num"),
            line_num  : $(this).parentsUntil('table').parent().data("line-num"),
            direction : $(this).parentsUntil('table').parent().data("direction")
          };
          stops_obj.toogle_stop_show(stop_info, $(this).prop('checked'));
      });
      $('.js_stop_link').click(function(event) {
          var stop_info = {
            stop_num  : $(this).parentsUntil('tr').parent().data("stop-num"),
            line_num  : $(this).parentsUntil('table').parent().data("line-num"),
            direction : $(this).parentsUntil('table').parent().data("direction"),
          };
//          var stop_num = $(this).parent().parent().data("stop-num");
          var chk = $(this).parentsUntil('tr').siblings().find('input.js_stop_check')[0];
          $(chk).prop('checked', true); // do not toggle, always set true

          stops_obj.toogle_stop_show(stop_info, $(chk).prop('checked'));
          if ($(chk).prop('checked')) {
              map.panTo( stops_obj.get_bus_stop(stop_info.stop_num).pos );
//              open_stop_infowindow(stop_marker[i]);
          }
          return false;
      });
      $('.js_stop_check_all').click(function(event) {
          var stop_info = {
            stop_num  : null,
            line_num  : $(this).parentsUntil('table').parent().data("line-num"),
            direction : $(this).parentsUntil('table').parent().data("direction"),
          };
          var chk_val = $(this).prop('checked');
          $('#menu_stop_table_' + stop_info.line_num + '_' + stop_info.direction + ' tbody input.js_stop_check').each(
              function(index, elem) { 
                  var stop_info = {
                    stop_num  : $(elem).parentsUntil('tr').parent().data("stop-num"),
                    line_num  : $(elem).parentsUntil('table').parent().data("line-num"),
                    direction : $(elem).parentsUntil('table').parent().data("direction")
                  };                
                  $(elem).prop('checked', chk_val);
                  stops_obj.toogle_stop_show(stop_info, chk_val);
              });
      });    
  };
    

  
  return this;
  
}());  // <-- End app

