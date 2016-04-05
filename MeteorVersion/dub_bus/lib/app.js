






this.app = (function() {
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
  this.all_markers = [];    // Array to store each marker on the map
  
  // this.map_loaded = false;

  
  // ------------- Private functions ------------------

  
  // ------------- Public functions ------------------
  this.ini = function() {
      console.log('Ini app');
      // compile_templates();
      menu.build_menu();
      // stops_obj.ini_all_stops_user_lines();
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
  
  
  // Handler to manage the Google Map API library loading
  var gmap_library;
  this.Mapa = function(src) {
    var handle;
    var that = this;
    
    if (!this.gmap_library) {
      this.gmap_library = {
        src: src,
        ready: false,
        readyDeps: new Deps.Dependency
      };

      // Load the library
      // Meteor.setTimeout(function() {
      $.getScript(src, function() {
          console.log('Ok, the library is loaded');
          var lib;
          lib = that.gmap_library;
          lib.ready = true;
          return lib.readyDeps.changed();
      });
      // }, 5000);


    }
    handle = {
      ready: function() {
        var lib;
        lib = that.gmap_library;
        lib.readyDeps.depend();
        return lib.ready;
      }
    };
    return handle;
  };


  // this.initMap = function() {};
  // this.isMapLoaded = function() { return this.map_loaded; }
  
  this.loadMap = function() {


      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.338612161783750, lng: -6.2230440974235535},
        zoom: 15,
        draggable: true,
        scrollwheel: true,
        disableDefaultUI: false,
        // keyboardShortcuts: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      infowindow = new google.maps.InfoWindow({});

      // stops_obj.ini_all_markers();
      this.stop_markers.ini_markers();
      this.stop_markers.ini_tracks();

      console.log('The maps is loaded');
  };




/*
  // Makes the stop bus icon appears or desappears on the map
  this.toogle_stop_show = function(stop_info, next_state) {


      var stop = bus_stops.findOne({num: stop_info.stop_num});


      if (!next_state) {

        console.log('delete stop_info');
        console.log(stop_info);

        if (stop_info.marker_index) {
          all_markers[stop_info.marker_index].setMap(null);
        } else {
          // Look up the marker
          all_markers.forEach(function(elem) {
              // console.log(elem);
              if (elem.stop_info.stop_id == stop._id) {
                // if ( map.getBounds().contains(elem.getPosition()) )  
                  elem.setMap(null);
              }
          });
          
        }

        return 0;

      } else {

        // Create and show the mark of the stop
        var stop_marker = 
            new google.maps.Marker({
                position   : stop.pos,
                title      : stop.num + ' - ' + stop.name,
                icon       : 'pole4.png',
                // animation  : google.maps.Animation.DROP,
                stop_info  : {
                  stop_id   : stop._id,
                  stop_num  : stop_info.stop_num,
                  line_num  : stop_info.line_num,
                  direction : stop_info.direction
                }
            });

        stop_marker.setMap(map);
        stop_marker.addListener('click', function() { 
          open_stop_infowindow(this); 
          // console.log('open info window');
        });

        all_markers.push(stop_marker);
        return all_markers.length -1;
        
      }
  };
*/





  
  /*
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
  */
  
  



  
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
  









  /// DATA NORMALIZATION / REPLICATION




/*

  // This is to replicate the data of the DB Collections, crossing bus_stops and bus_tracks
  this.data_replication = function() {

      // Truncate all replicated data
      bus_stops.find({}).forEach(function(bus_stop) {
        bus_stop.user_lines = new Array(0);
        bus_stops.update({ _id : bus_stop._id }, bus_stop);
      });


      bus_tracks.find({}).forEach(function(bus_line) {

        bus_line.from_route.stops = new Array(0);
        bus_line.to_route.stops = new Array(0);


        // Loop all track points, seeking the stops ones

        // From track
        bus_line.from_route.track.forEach(function(track_point) {
          fun_set_stop_on_track_point(track_point, bus_line.from_route, bus_line, 'from');
        });

        // To track
        bus_line.to_route.track.forEach(function(track_point) {
          fun_set_stop_on_track_point(track_point, bus_line.to_route, bus_line, 'to');
        });


        // Set stop_ini / stop_end
        if (bus_line.from_route.stops.length > 0) {
          bus_line.from_route.stop_ini = bus_line.from_route.stops[0].stop_num;
          bus_line.from_route.stop_end = bus_line.from_route.stops[bus_line.from_route.stops.length - 1].stop_num;
        }

        if (bus_line.to_route.stops.length > 0) {
          bus_line.to_route.stop_ini = bus_line.to_route.stops[0].stop_num;
          bus_line.to_route.stop_end = bus_line.to_route.stops[bus_line.to_route.stops.length - 1].stop_num;
        }        

        // Save the line
        bus_tracks.update({ _id : bus_line._id }, bus_line);

      })

      console.log('data replication done!');

  };


  var fun_set_stop_on_track_point = function(track_point, route, bus_line, direction) {

    if (track_point.hasOwnProperty('stop_num')) {

      var bus_stop = bus_stops.findOne({ num: track_point.stop_num });
      if (bus_stop) {

        // Set the same position (stop <- track)
        bus_stop.pos.lat = track_point.lat;
        bus_stop.pos.lng = track_point.lng;

        // Add the stop to the line
        route.stops.push({
            stop_num   : bus_stop.num,
            stop_name  : bus_stop.name
          });

        // Add the line to the stop
        bus_stop.user_lines.push({
          line_num  : bus_line.line_num, 
          direction : direction
        });
        bus_stops.update({ _id : bus_stop._id }, bus_stop);
      }
    }
  };

*/


// Object to control markers on the map
this.stop_markers = (function() {

  this.marker_list = [];    // Array to store each stop marker on the map

  // Return the marker bound to the stop which has this ID
  this.get_marker_by_id = function(stop_id) {
    for (var t = 0; t < this.marker_list.length; t++) {
      if (this.marker_list[t].stop_info.stop_id == stop_id) { return this.marker_list[t]; break; }
    }
    return null;
  };


  // Return the marker bound to the stop which has this stop NUM
  this.get_marker_by_num = function(stop_num) {
    for (var t = 0; t < this.marker_list.length; t++) {
      if (this.marker_list[t].stop_info.stop_num == stop_num) { return this.marker_list[t]; break; }
    }
    return null;
  };


  // Return the marker in the ind position
  this.get_marker_by_index = function(ind) {
    if (this.marker_list[ind]) return this.marker_list[ind];
    else return null;
  };


  // Return the marker index of the marker bound to the stop which has this stop NUM
  this.get_marker_index_by_num = function(stop_num) {
    for (var t = 0; t < this.marker_list.length; t++) {
      if (this.marker_list[t].stop_info.stop_num == stop_num) { return t; break; }
    }
    return null;
  };

  this.show_marker_by_index = function(ind) {
    if (this.marker_list[ind]) this.marker_list[ind].setMap(map);
  };

  this.hide_marker_by_index = function(ind) {
    if (this.marker_list[ind]) this.marker_list[ind].setMap(null);
  };


  this.ini_markers = function() {
    console.log('ini stop_markers');
 
    bus_stops.find({}, { num: 1 }).forEach(function(stop) {

      // Create and show the mark of the stop
      var stop_marker = 
          new google.maps.Marker({
              position   : stop.pos,
              title      : stop.num + ' - ' + stop.name,
              icon       : 'pole4.png',
              animation  : google.maps.Animation.DROP,
              stop_info  : {
                stop_id   : stop._id,
                stop_num  : stop.num
              }
          });

      // stop_marker.setMap(map);
      stop_marker.addListener('click', function() { 
        app.stop_markers.open_stop_infowindow(this); 
        // console.log('open info window');
      });

      this.marker_list.push(stop_marker);

    });

  };

  // Create the info window for the stop marker
  this.open_stop_infowindow = function(that) {
      // console.log(that);

      var stop = bus_stops.findOne({num: that.stop_info.stop_num});

      var lines_info = '';
      for (var t = 0; t < stop.user_lines.length; t++) {
        if (t > 0) lines_info += ', ';
        lines_info += stop.user_lines[t].line_num;
      }

      var temp = 
          '<div>'
            + '<h4>' + stop.name + '</h4>'
            + '<p>' + stop.gname + '</p>'
            + '<p> <b>Stop lines:</b> ' + lines_info + '</p>'
            +   '<a target="_blank" href="' + that.gmaps_url + '">View on google maps</a>'
            +'</p>'
          + '</div>';

      app.infowindow.setContent(temp);
      app.infowindow.open(app.map, that); 
  };  

  return this;

}());  // <-- End stop_markers




// ---------------------------------------------------------------------



// Object to control lines (tracks) on the map
this.map_polylines = (function() {

  this.tracks = [];    // Array to store each line track on the map

  // Return the marker bound to the line which has this ID
  this.get_track_by_id = function(line_id) {
    for (var t = 0; t < this.tracks.length; t++) {
      if (this.tracks[t].track_info.line_id == line_id) { return this.tracks[t]; break; }
    }
    return null;
  };


  // Return the marker bound to the stop which has this stop NUM
  this.get_track_by_num = function(line_num) {
    for (var t = 0; t < this.tracks.length; t++) {
      if (this.tracks[t].track_info.line_num == line_num) { return this.tracks[t]; break; }
    }
    return null;
  };


  // Return the marker in the ind position
  this.get_track_by_index = function(ind) {
    if (this.tracks[ind]) return this.tracks[ind];
    else return null;
  };


  // Return the track index of the from route bound to the line which has this line_id
  this.get_from_track_index_by_id = function(line_id) {
    for (var t = 0; t < this.tracks.length; t++) {
      if (this.tracks[t].track_info.direction == 'from') {
        if (this.tracks[t].track_info.line_id == line_id) { return t; break; }
      }
    }
    return null;
  };
  this.get_to_track_index_by_id = function(line_id) {
    for (var t = 0; t < this.tracks.length; t++) {
      if (this.tracks[t].track_info.direction == 'to') {
        if (this.tracks[t].track_info.line_id == line_id) { return t; break; }
      }
    }
    return null;
  };

  this.show_track_by_index = function(ind) {
    if (this.tracks[ind]) this.tracks[ind].setMap(map);
  };

  this.hide_track_by_index = function(ind) {
    if (this.tracks[ind]) this.tracks[ind].setMap(null);
  };


  this.ini_tracks = function() {
    console.log('ini tracks');
 
    bus_tracks.find({}, { num: 1 }).forEach(function(bus_track) {

      // Create the polyline for the track
      track_obj = new google.maps.Polyline({
          path          : bus_track.from_route.track,
          geodesic      : true,
          strokeColor   : '#0000FF',
          strokeOpacity : 0.8,
          strokeWeight  : 4,
          track_info    : {
            line_id   : bus_track._id,
            line_num  : bus_track.line_num,
            direction : 'from',
            name      : bus_track.from_route.name
          }
        });
      this.tracks.push(track_obj);

      track_obj = new google.maps.Polyline({
          path          : bus_track.to_route.track,
          geodesic      : true,
          strokeColor   : '#0000FF',
          strokeOpacity : 0.8,
          strokeWeight  : 4,
          track_info    : {
            line_id   : bus_track._id,
            line_num  : bus_track.line_num,
            direction : 'to',
            name      : bus_track.to_route.name
          }
        });
      this.tracks.push(track_obj);

    });

  };


  return this;

}());  // <-- End map_polylines






  
  return this;
  
}());  // <-- End app




