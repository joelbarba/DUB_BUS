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

        ttdata.line_num = Template.parentData(1).line_num;
        ttdata.direction = this.direction;

        
        if (this.direction == 'from') ttdata.line_stops = Template.parentData(1).from_route.stops
        else                          ttdata.line_stops = Template.parentData(1).to_route.stops

        ttdata.line_stops.forEach(function(elem) {
          elem.marker_index = stop_markers.get_marker_index_by_num(elem.stop_num);
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
        stop_num     : this.stop_num,
        marker_index : this.marker_index,
        line_num     : $(Template.instance().firstNode).data('line-num'),
        direction    : $(Template.instance().firstNode).data('direction')  // Template.instance().data.direction
      };
      // app.toogle_stop_show(stop_info, $(event.currentTarget).prop('checked'));

      if ( $(event.currentTarget).prop('checked') ) {
        app.stop_markers.show_marker_by_index(stop_info.marker_index);
      } else {
        app.stop_markers.hide_marker_by_index(stop_info.marker_index);
      }      
  
  },

  // Show or hide all bus stops of the line
  'click .js_stop_check_all': function (event) {
      
      var line_num  = $(Template.instance().firstNode).data('line-num');
      var direction = $(Template.instance().firstNode).data('direction');   // = Template.instance().data.direction;
      
      // if (!$(event.target).prop('checked')) {
      //     // Uncheck all markers of the line
      //     all_markers.forEach(function(elem) {
      //         // console.log(elem);
      //         if (elem.stop_info.line_num == line_num && elem.stop_info.direction == direction) {
      //             elem.setMap(null);
      //         }
      //     });
      //     $('#menu_stop_table_' + line_num + '_' + direction + ' tbody input.js_stop_check').prop('checked', false);

      // } else {

          // Loop all line stops and check each one
          $('#menu_stop_table_' + line_num + '_' + direction + ' tbody input.js_stop_check').each(
              function(index, elem) {
                  var chk_val   = $(event.target).prop('checked');
                  var stop_info = {
                    stop_num     : $(elem).parentsUntil('tr').parent().data("stop-num"),
                    marker_index : $(elem).parentsUntil('tr').parent().data("marker-index"),
                    line_num     : $(elem).parentsUntil('table').parent().data("line-num"),
                    direction    : $(elem).parentsUntil('table').parent().data("direction")
                  };                

                  // app.toogle_stop_show(stop_info, chk_val);

                  if (chk_val) {
                    app.stop_markers.show_marker_by_index(stop_info.marker_index);
                  } else {
                    app.stop_markers.hide_marker_by_index(stop_info.marker_index);
                  }
                  
                  $(elem).prop('checked', chk_val);

              });
      // }

  },

  'click .js_stop_link': function(event) {
      
      var stop_info = {
        stop_num     : this.stop_num,
        marker_index : this.marker_index,
        line_num     : $(Template.instance().firstNode).data('line-num'),
        direction    : $(Template.instance().firstNode).data('direction')
      };

      var chk = $(event.target).parentsUntil('tr').siblings().find('input.js_stop_check')[0];
      $(chk).prop('checked', true); // do not toggle, always set true
      
      // app.toogle_stop_show(stop_info, $(chk).prop('checked'));
      app.stop_markers.show_marker_by_index(stop_info.marker_index);

      if ($(chk).prop('checked')) {

          app.map.panTo( bus_stops.findOne({ num : stop_info.stop_num}).pos );

          var marker = app.stop_markers.get_marker_by_index(stop_info.marker_index);
          app.stop_markers.open_stop_infowindow(marker);

          // // Find the bounded marker
          // all_markers.forEach(function(elem) {
          //     // console.log(Date.now());
          //     if (elem.stop_info.line_num == stop_info.line_num && elem.stop_info.direction == stop_info.direction) {
          //         open_stop_infowindow(elem);
          //         return false;
          //     } else {
          //         return true;
          //     }
          // });          
      }
      return false;

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
  
  

  

  
  /*
  
  // Link events to the menu table stops
  this.bind_menu_table_events = function() {
    
      $('.js_stop_check').click(function(event) {
          var stop_info = {
            stop_num     : $(this).parentsUntil('tr').parent().data("stop-num"),
            line_num     : $(this).parentsUntil('table').parent().data("line-num"),
            direction    : $(this).parentsUntil('table').parent().data("direction"),
            marker_index : $(this).parentsUntil('tr').parent().data("marker-index")
          };
          // stops_obj.toogle_stop_show(stop_info, $(this).prop('checked'));


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
    
*/
  
  return this;
  
}());  // <-- End app

