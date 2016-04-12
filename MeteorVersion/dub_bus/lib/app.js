
this.app = (function() {
  // Mètodes i variables privades globals de l'aplicació
  var _version = 1;
  var _author = 'Joel Barba';
  var _max_id_car = 0;
  
  this.get_app_version = function() { return _version; };
  this.get_app_author  = function() { return _author;  };

  this.map = null;          // Google Map object
  this.infowindow  = null;  // info window attatched to each marker of the map
  this.all_markers = [];    // Array to store each marker on the map
  this.mode = 'user';
  this.track_edit = '';
  
  // this.map_loaded = false;

  
  // ------------- Private functions ------------------

  
  // ------------- Public functions ------------------
  this.ini = function() {
      console.log('Ini app');
      // compile_templates();
      menu.build_menu();
      // stops_obj.ini_all_stops_user_lines();
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
        // center: {lat: 53.338612161783750,    lng: -6.2230440974235535},
        center: {lat: 53.346452414027550000, lng: -6.255512237548820000 }, 
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


  // Show the JSON object (bus_stops) on the screen
  this.show_data_stops = function() {

    var stops = bus_stops.find({}, {num:1}).fetch();

    // for (var t = 0; t < col.length; t++) {
    //   delete col[t]._id;
    //   col[t].user_lines = new Array(0); // replicated obj
    // }

    var s = '\n';
    var cont = '';
  
    for (var t = 0; t < stops.length; t++) {
      cont += 'bus_stops.insert(' + s;
      cont += '  { num          : '   + stops[t].num   + ',' + s;
      cont += '    name         : "'  + stops[t].name  + '",' + s;
      cont += '    user_lines   : [],' + s;
      cont += '    gname        : "' + stops[t].gname + '",' + s;
      cont += '    pos          : { lat: ' + stops[t].pos.lat + ', ';
      cont +=                      'lng: ' + stops[t].pos.lng + ' },' + s;
      cont += '    gmaps_url    : "' + stops[t].gmaps_url + '"' + s;
      cont += '  });';
      // if (t < stops.length - 1) cont += ',';
      cont += s;
    }
    // cont += '];';

    // bss = bss.replace(/\n/g, '<br/>');
    // $('#map').css('overflow-y', 'scroll');
    $('#map').html('<textarea style="width: 100%; height: 100%; font-family: monospace; font-size: x-small;">' 
                    // + 'bus_stops = ' + JSON.stringify(col, null, 1)
                    + cont
                    + '</textarea>');
  }
  

  // Show the JSON object (bus_tracks) on the screen
  this.show_data_lines = function() {

    var lines = bus_tracks.find({}, {line_num:1}).fetch();

    var s = '\n';
    var c = ',';
    var cont = '';
    for (var t = 0; t < lines.length; t++) {
      cont += 'bus_tracks.insert(' + s;
      cont += '{ line_num   : '   + lines[t].line_num + c + s;
      cont += '  name       : "' + lines[t].name + '",' + s;
      cont += '  from_route : {' + s;
      cont += '    name         : "' + lines[t].from_route.name + '",' + s;
      cont += '    dub_bus_url  : "' + lines[t].from_route.dub_bus_url + '",' + s;
      cont += '    stop_ini     : '  + lines[t].from_route.stop_ini + c + s;
      cont += '    stop_end     : '  + lines[t].from_route.stop_end + c + s;
      cont += '    stops        : []' + c + s;
      cont += '    track        : [' + s;
      for (var q = 0; q < lines[t].from_route.track.length; q++) {
          cont += '    { lat: ' + this.trim_coord(lines[t].from_route.track[q].lat);
          cont +=     ', lng: ' + this.trim_coord(lines[t].from_route.track[q].lng);
          if (lines[t].from_route.track[q].hasOwnProperty('stop_num')) {
              cont += ',  stop_num: ' + lines[t].from_route.track[q].stop_num;
          }
          cont += ' }';
          if (q < lines[t].from_route.track.length - 1) cont += c;
          cont += s;
      }
      cont += '    ]' + s;
      cont += '  },' + s;
      
      cont += '  to_route       : {' + s;
      cont += '    name         : "' + lines[t].from_route.name + '",' + s;
      cont += '    dub_bus_url  : "' + lines[t].from_route.dub_bus_url + '",' + s;
      cont += '    stop_ini     : '  + lines[t].from_route.stop_ini + c + s;
      cont += '    stop_end     : '  + lines[t].from_route.stop_end + c + s;
      cont += '    stops        : []' + c + s;
      cont += '    track        : [' + s;
      for (var q = 0; q < lines[t].to_route.track.length; q++) {
          cont += '    { lat: ' + this.trim_coord(lines[t].to_route.track[q].lat);
          cont +=     ', lng: ' + this.trim_coord(lines[t].to_route.track[q].lng);
          if (lines[t].to_route.track[q].hasOwnProperty('stop_num')) {
              cont += ',  stop_num: ' + lines[t].to_route.track[q].stop_num;
          }
          cont += ' }';
          if (q < lines[t].to_route.track.length - 1) cont += c;
          cont += s;
      }
      cont += '    ]' + s;
      cont += '  }' + s;
      
      cont += '})' + s;
    }



    $('#map').html('<textarea style="width: 100%; height: 100%; font-family: monospace; font-size: x-small;">' 
                    // + 'bus_stops = ' + JSON.stringify(col, null, 1)
                    + cont
                    + '</textarea>');
  }


  this.trim_coord = function(val) {
    
    var tmp = val.toString().split('.');
    if (tmp.length == 2) {
      var int_fill = (2  - tmp[0].length < 0) ? 0 :  2 - tmp[0].length;
      var dec_fill = (16 - tmp[1].length < 0) ? 0 : 16 - tmp[1].length;
      var edit_val = '0'.repeat(int_fill) + tmp[0] + '.' + tmp[1] + '0'.repeat(dec_fill);
      
      return edit_val;
    } else {
      return '0';
    }
  }








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


  this.toggle_draggable = function(val) {
    for (var t = 0; t < this.marker_list.length; t++) { 
      this.marker_list[t].draggable = val; 
      if (this.marker_list[t].getMap()) this.marker_list[t].setMap(map);
    }
  }


  this.ini_markers = function() {
    console.log('ini stop_markers');
 
    bus_stops.find({}, { num: 1 }).forEach(function(stop) {

      // Create and show the mark of the stop
      var stop_marker = 
          new google.maps.Marker({
              position   : stop.pos,
              title      : stop.num + ' - ' + stop.name,
              icon       : 'pole4.png',
              draggable  : false,
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


      // Function to launch after drag a stop point
      stop_marker.addListener('dragend', function(elem) {
        console.log(this.getPosition().lat() + ', ' + this.getPosition().lng());

        // Update bus stop position in DB
        var stop = bus_stops.findOne({_id: this.stop_info.stop_id});
        stop.pos.lat = this.getPosition().lat();
        stop.pos.lng = this.getPosition().lng();
        bus_stops.update({_id: stop._id}, { $set: { pos: stop.pos }});

        // Loop all lines of the stop, and update each one
        stop.user_lines.forEach(function(elem) { 
          console.log(elem); 
          var point_info = {
            line_id     : elem.line_id,
            line_num    : elem.line_num,
            direction   : elem.direction,
            track_index : elem.track_index
          }
          app.map_polylines.move_point(point_info, stop.pos);
        });
        
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
  this.get_track_by_id = function(line_id, direction) {
    var ind = null;
    if (direction == 'from')  ind = get_from_track_index_by_id(line_id);
    else                      ind = get_to_track_index_by_id(line_id);

    if (ind) return this.tracks[ind];
    else     return null;

  };


  // Return the marker bound to the stop which has this stop NUM
  this.get_track_by_num = function(line_num, direction) {

    for (var t = 0; t < this.tracks.length; t++) {
      if (this.tracks[t].track_info.line_num == line_num && this.tracks[t].track_info.direction == direction) { return this.tracks[t]; break; }
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
    if (this.tracks[ind]) {
      this.tracks[ind].setMap(map);
      this.set_track_markers();
    }
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
            name      : bus_track.to_route.name,
            markers   : []
          }
        });
      this.tracks.push(track_obj);

    });
  };


  this.set_track_markers = function() {

    if (app.track_edit == 'points') {

      var track = this.get_track_by_num(1, 'to');
      // var track = this.tracks[1];
      if (track) { 

        track.getPath().forEach(function(track_point, ind) {

            // Check if it is a bus stop
            // var stop = null;
            // var icon = null;
            var line_point = bus_tracks.findOne({_id: track.track_info.line_id}).to_route.track[ind];
            if (line_point.hasOwnProperty('stop_num')) {
              // stop = line_point.stop_num;
              // icon = 'pole4.png';
            }

            // Create a marker to move the point
            var point = new google.maps.LatLng({ lat: track_point.lat(), lng: track_point.lng() }); 
            var point_marker = 
                new google.maps.Marker({
                    position   : point,
                    title      : 'Point number ' + ind,
                    // icon       : icon,
                    draggable  : true,
                    // animation  : google.maps.Animation.DROP,
                    point_info  : {
                      line_id     : track.track_info.line_id,
                      line_num    : track.track_info.line_num,
                      direction   : track.track_info.direction,
                      track_index : ind
                      // stop_num    : stop
                    }
                });



            // Function to launch after drag a stop point
            point_marker.addListener('dragend', function(elem) {
              console.log(elem);
              console.log(this);
              var pos = {
                lat: elem.latLng.lat(),
                lng: elem.latLng.lng()
              }
              move_point(this.point_info, pos);
            });

            if (!line_point.hasOwnProperty('stop_num')) {
              point_marker.setMap(map);
            }

            track.track_info.markers.push(point_marker)

        });



      }

    }

  };


  // point_info  : {
  //   line_id     : xxx,
  //   line_num    : xxx,
  //   direction   : xxx,
  //   track_index : xxx
  // },
  // pos { lat: 99, lng: 99 }
  this.move_point = function(point_info, pos) {
    var track = this.get_track_by_id(point_info.line_id, point_info.direction);
    if (track) { 

      // Change the polyline in the map
      // var point = path.getAt(track_index);
      var point = new google.maps.LatLng({lat: pos.lat, lng: pos.lng}); 
      var path = track.getPath();
      path.setAt(point_info.track_index, point);

      // Update the position in DB
      var line = bus_tracks.findOne({_id: point_info.line_id});
      if (point_info.direction == 'from') {
        line.from_route.track[point_info.track_index].lat = pos.lat;
        line.from_route.track[point_info.track_index].lng = pos.lng;
        bus_tracks.update({_id: line._id}, { $set: { from_route: line.from_route }});
      } else {
        line.to_route.track[point_info.track_index].lat = pos.lat;
        line.to_route.track[point_info.track_index].lng = pos.lng;
        bus_tracks.update({_id: line._id}, { $set: { to_route: line.to_route }});        
      }


    }
  };

  return this;

}());  // <-- End map_polylines






  
  return this;
  
}());  // <-- End app




