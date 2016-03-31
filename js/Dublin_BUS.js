var app = (function() {
  // Mètodes i variables privades globals de l'aplicació
  var _version = 1;
  var _author = 'Joel Barba';
  var _max_id_car = 0;

  // Handlebar Templates
  this.temp_menu       = null;
  this.temp_stop_table = null;
  this.temp_mark_info  = null;
  
  this.get_app_version = function() { return _version; };
  this.get_app_author  = function() { return _author;  };

  this.map = null;          // Google Map object
  this.infowindow  = null;  // info window attatched to each marker of the map
  this.stop_marker = [];    // Array to store each bus stop marker on the map

  
  // ------------- Private functions ------------------

  
  // ------------- Public functions ------------------
  this.ini = function() {
      compile_templates();
      build_menu();
      stops_obj.ini_all_stops_user_lines();
  };
  
  
  this.compile_templates = function () {
      temp_menu       = Handlebars.compile($("#menu-template").html());
      temp_stop_table = Handlebars.compile($("#menu-stop-table-template").html());
      temp_mark_info  = Handlebars.compile($("#stop-marler-info-template").html());
    
      Handlebars.registerHelper('ifNotPrimer', function (ind) {
          if (ind == 0) return "" 
          else return ",";
      });    
  };
  
  
  this.initMap = function() {

      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.338612161783750, lng: -6.2230440974235535},
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      infowindow = new google.maps.InfoWindow({});            

      stops_obj.ini_all_markers();

  }; // <-- End initMap()
  

  
  
  // Return the line index position into the bus_tracks array (of the line_num)
  this.get_line_index = function(line_num) {
    var ind = -1;
    for (var t = 0; t < bus_tracks.length; t++) {
      if (bus_tracks[t].line_num == line_num) { ind = t; t = bus_tracks.length + 1; }
    }
    if (ind == -1) return null;
    else           return ind;
  }

  // Return the line element position into the bus_tracks array (of the line_num)
  this.get_line_element = function(line_num) {
    var ind = get_line_index(line_num);
    if (ind != null)  return bus_tracks[ind];
    else              return null;
  }
  
  
  



  
  // Show or hide polylines routes on the map
  this.show_route = function(line_num, direction, show) {
      var ind = get_line_index(line_num);
    
      if (show) {
          if (direction == 'from') {
              bus_tracks[ind].from_route.map_polyline = new google.maps.Polyline({
                  path: bus_tracks[ind].from_route.track,
                  geodesic: true,
                  strokeColor: '#0000FF',
                  strokeOpacity: 0.8,
                  strokeWeight: 4
                });
              bus_tracks[ind].from_route.map_polyline.setMap(map);

          } else {
              bus_tracks[ind].to_route.map_polyline = new google.maps.Polyline({
                  path: bus_tracks[ind].to_route.track,
                  geodesic: true,
                  strokeColor: '#0000FF',
                  strokeOpacity: 0.8,
                  strokeWeight: 4
                });
              bus_tracks[ind].to_route.map_polyline.setMap(map);
          }        
      } else {
          if (direction == 'from')  bus_tracks[ind].from_route.map_polyline.setMap(null);
          if (direction == 'to')    bus_tracks[ind].to_route.map_polyline.setMap(null);
      }
  };
  
  
  // Menu elements
  

  this.build_menu = function() {
      var tdata = {}; tdata.bus_tracks = bus_tracks;


      $('#id_left_menu').html( temp_menu(tdata) );

      $('.menu-stops-content').each(function(ind) {
          var num = $(this).data('line-num');
          var dir = $(this).data('direction');

          $(this).html( temp_stop_table(generate_line_stops(num, dir)) );
      });
    
      set_menu_collapse_events();
      bind_menu_table_events();    
  }
  
  
  // Return ttdata.stops[] an array with all stops of the line
  // Used on menu-stop-table-template
  this.generate_line_stops = function(line_num, direction) {
        var ttdata = {}; 
        ttdata.stops = [];
        ttdata.line_num = line_num;
        ttdata.direction = direction;
    
        var ind = get_line_index(line_num);
        if (ind != null) {
          
          var bus_line = bus_tracks[ind];
          
          if (direction == 'from') var track = bus_line.from_route.track;
          else                     var track = bus_line.to_route.track;
          
          // Loop all track points, seeking the stops ones
          for (var t = 0; t < track.length; t++) {
            if (track[t].hasOwnProperty('stop_num')) {
              var bus_stop = stops_obj.get_bus_stop( track[t].stop_num );
              if (bus_stop != null) {
                // Add stop
                ttdata.stops.push({
                  num   : bus_stop.num,
                  name  : bus_stop.name
                });
              }
            }
          }
        }
        return ttdata;
  };  
  
  
  this.set_menu_collapse_events = function() {

      // Assign arrow changing after trigger menu item collapsing
      $('.menu-custom-item')
          .on('show.bs.collapse', function(e) {
              var collapser_id = $(e.currentTarget).data('collapse-controler-id');
              $(collapser_id).find('span.glyphicon')
                  .toggleClass('glyphicon-triangle-bottom', true)
                  .toggleClass('glyphicon-triangle-right',  false);
              e.stopPropagation();
          })
          .on('hidden.bs.collapse', function(e) {
              var collapser_id = $(e.currentTarget).data('collapse-controler-id');
              $(collapser_id).find('span.glyphicon')
                  .toggleClass('glyphicon-triangle-bottom', false)
                  .toggleClass('glyphicon-triangle-right',  true); 
              e.stopPropagation();

          });

      // Assing toggle collapsing to menu item controllers
      $('.menu-custom-collapsator').click(function(event) {
          var line_num = $(event.currentTarget).data('line-num');

          if (event.target.type == 'checkbox') {
  //            app.show_route(line_num - 1, direction, $(event.target).prop('checked'));          
          } else {
              var item_to_collapse = $(event.currentTarget).data('item-to-collapse-id');
              $(item_to_collapse).collapse('toggle');
          }
      });

      $('.submenu-custom-collapsator').click(function(event) {
          var line_num = $(event.currentTarget).data('line-num');
          var direction = $(event.currentTarget).data('line-direction');

          if (event.target.type == 'checkbox') {
              app.show_route(line_num, direction, $(event.target).prop('checked'));          
          } else {
  //            toogle_menu_item("#line_" + line_num + "_menu_" + direction, event.currentTarget);
              var item_to_collapse = $(event.currentTarget).data('item-to-collapse-id');
              $(item_to_collapse).collapse('toggle');
          }
      });      


  };
  
  
  
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





$(document).ready(function() {

    app.ini();
  
});