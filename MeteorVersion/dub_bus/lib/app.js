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
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      infowindow = new google.maps.InfoWindow({});            

      console.log('The maps is loaded');
      // stops_obj.ini_all_markers();

  };


  // Makes the stop bus icon appears or desappears on the map
  this.toogle_stop_show = function(stop_info, next_state) {


      var stop = bus_stops.findOne({num: stop_info.stop_num});


      if (!next_state) {

        // Look up the marker
        all_markers.forEach(function(elem) {
            console.log(elem);
            if (stop._id == elem.bus_stop_id) {
              // if ( map.getBounds().contains(elem.getPosition()) ) 
              elem.setMap(null);
            }
        });

      } else {

        // Create and show the mark of the stop
        var stop_marker = 
            new google.maps.Marker({
                position   : stop.pos,
                title      : stop.num + ' - ' + stop.name,
                icon       : 'pole4.png',
                // animation  : google.maps.Animation.DROP,
                stop_index : 0,
                bus_stop_id: stop._id
            });

        stop_marker.setMap(map);
        stop_marker.addListener('click', function() { 
          // open_stop_infowindow(this); 
          console.log('open info window');
        });

        all_markers.push(stop_marker);

        
      }
  }






  
  
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
  


  
  return this;
  
}());  // <-- End app

