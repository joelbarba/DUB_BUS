var edit_app = (function() {
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
      edit_stops_obj.ini_all_stops_user_lines();
      
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

      edit_stops_obj.ini_all_markers();

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
  this.show_route = function(ind, direction, show) {
    
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
  
  this.print_stops_obj = function() {
      var s = '<br/>';
      var s = '\n';
      var cont = '';
      cont += '<button id="bhide_obj" >BACK TO THE MENU</button>'
      cont += '<textarea rows="40" cols="70" style="font-family: \'monospace\'; font-size: 8px" >';
    
//      JSON.stringify(edit_stops_obj.bus_stops);
    
      cont += '  this.bus_stops = [' + s;
      
      var stops = edit_stops_obj.bus_stops;
    
      for (var t = 0; t < stops.length; t++) {
        cont += '    { num          : '   + stops[t].num   +   ',' + s;
        cont += '      name         : \'' + stops[t].name.replace(/'/g, '\\\'') + '\',' + s;
        cont += '      user_lines   : [ ';
        for (var q = 0; q < stops[t].user_lines.length; q++) {
            if (q > 0) cont += '                       ';
            cont += '{ num: '   + stops[t].user_lines[q].num;
            cont += ', dir: \'' + stops[t].user_lines[q].dir + '\'';
            cont += ', show: false }';
            if (q < stops[t].user_lines.length - 1) cont += ',';
            cont += s;
        }
        cont += '                     ],' + s;
        cont += '      gname        : \'' + stops[t].gname.replace(/'/g, '\\\'') + '\',' + s;
        cont += '      pos          : { lat: ' + stops[t].pos.lat + ', ';
        cont +=                        'lng: ' + stops[t].pos.lng + '},' + s;
        cont += '      stop_marker  : null,' + s;
        cont += '      gmaps_url    : \'' + stops[t].gmaps_url.replace(/'/g, '\\\'') + '\'' + s;
        cont += '    }';
        if (t < stops.length - 1) cont += ',';
        cont += s;
      }
      cont += '];';
      cont += '</textarea>';


      $('#id_left_menu').html( cont );

      $('#bhide_obj').click(edit_app.build_menu);
  }   
  
  
  
  this.print_bus_tracks = function() {
      var s = '<br/>';
      var s = '\n';
      var c = ',';
      var cont = '';
      cont += '<button id="bhide_obj" >BACK TO THE MENU</button>'
      cont += '<textarea rows="40" cols="70" style="font-family: \'monospace\'; font-size: 8px" >';
    
//      JSON.stringify(bus_tracks);
    
      cont += 'var bus_tracks = [' + s;

    
      for (var t = 0; t < bus_tracks.length; t++) {
        cont += '{ line_num   :'   + bus_tracks[t].line_num + c + s;
        cont += '  name       :\'' + bus_tracks[t].name.replace(/'/g, '\\\'') + '\',' + s;
        cont += '  from_route : {' + s;
        cont += '    name         : \'' + bus_tracks[t].from_route.name.replace(/'/g, '\\\'') + '\',' + s;
        cont += '    dub_bus_url  : \'' + bus_tracks[t].from_route.dub_bus_url.replace(/'/g, '\\\'') + '\',' + s;
        cont += '    stop_ini     : '   + bus_tracks[t].from_route.stop_ini + c + s;
        cont += '    stop_end     : '   + bus_tracks[t].from_route.stop_end + c + s;
        cont += '    map_polyline : '   + bus_tracks[t].from_route.stop_ini + c + s;
        cont += '    track        : [' + s;
        for (var q = 0; q < bus_tracks[t].from_route.track.length; q++) {
            cont += '    { lat: ' + edit_stops_obj.trim_coord(bus_tracks[t].from_route.track[q].lat);
            cont +=     ', lng: ' + edit_stops_obj.trim_coord(bus_tracks[t].from_route.track[q].lng);
            if (bus_tracks[t].from_route.track[q].hasOwnProperty('stop_num')) {
                cont += ',  stop_num: ' + bus_tracks[t].from_route.track[q].stop_num;
            }
            cont += ' }';
            if (q < bus_tracks[t].from_route.track.length - 1) cont += c;
            cont += s;
        }
        cont += '    ]' + s;
        cont += '  },' + s;
        
        cont += '  to_route       : {' + s;
        cont += '    name         : \'' + bus_tracks[t].to_route.name.replace(/'/g, '\\\'') + '\',' + s;
        cont += '    dub_bus_url  : \'' + bus_tracks[t].to_route.dub_bus_url.replace(/'/g, '\\\'') + '\',' + s;
        cont += '    stop_ini     : '   + bus_tracks[t].to_route.stop_ini + c + s;
        cont += '    stop_end     : '   + bus_tracks[t].to_route.stop_end + c + s;
        cont += '    map_polyline : '   + bus_tracks[t].to_route.stop_ini + c + s;
        cont += '    track        : [' + s;
        for (var q = 0; q < bus_tracks[t].to_route.track.length; q++) {
            cont += '    { lat: ' + edit_stops_obj.trim_coord(bus_tracks[t].to_route.track[q].lat);
            cont +=     ', lng: ' + edit_stops_obj.trim_coord(bus_tracks[t].to_route.track[q].lng);
            if (bus_tracks[t].to_route.track[q].hasOwnProperty('stop_num')) {
                cont += ',  stop_num: ' + bus_tracks[t].to_route.track[q].stop_num;
            }
            cont += ' }';
            if (q < bus_tracks[t].to_route.track.length - 1) cont += c;
            cont += s;
        }
        cont += '    ]' + s;
        cont += '  }' + s;
        
        cont += '}';
        if (t < bus_tracks.length - 1) cont += c;
        cont += s;
      }
      cont += '];';
      cont += '</textarea>';


      $('#id_left_menu').html( cont );

      $('#bhide_obj').click(edit_app.build_menu);
  }  
  

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
    
      $('#bshow_obj').click(edit_app.print_stops_obj);
      $('#bshow_obj2').click(edit_app.print_bus_tracks);
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
              var bus_stop = edit_stops_obj.get_bus_stop( track[t].stop_num );
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
  //            edit_app.show_route(line_num - 1, direction, $(event.target).prop('checked'));          
          } else {
              var item_to_collapse = $(event.currentTarget).data('item-to-collapse-id');
              $(item_to_collapse).collapse('toggle');
          }
      });

      $('.submenu-custom-collapsator').click(function(event) {
          var line_num = $(event.currentTarget).data('line-num');
          var direction = $(event.currentTarget).data('line-direction');

          if (event.target.type == 'checkbox') {
              edit_app.show_route(line_num - 1, direction, $(event.target).prop('checked'));          
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
          edit_stops_obj.toogle_stop_show(stop_info, $(this).prop('checked'));
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

          edit_stops_obj.toogle_stop_show(stop_info, $(chk).prop('checked'));
          if ($(chk).prop('checked')) {
              map.panTo( edit_stops_obj.get_bus_stop(stop_info.stop_num).pos );
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
                  edit_stops_obj.toogle_stop_show(stop_info, chk_val);
              });
      });    
  };
    

  
  return this;
  
}());  // <-- End edit_app











var edit_stops_obj = (function() {
  
  // Return the stop element of the array corresponding to the num
  this.get_bus_stop = function(stop_num) {
    var ind = get_bus_stop_index(stop_num);
    if (ind != null)  return bus_stops[ind];
    else              return null;
  }
  
  
  // Return the stop index of the array corresponding to the num
  this.get_bus_stop_index = function(stop_num) {
    var ind = -1;
    for (var t = 0; t < bus_stops.length; t++) {
      if (bus_stops[t].num == stop_num) { ind = t; t = bus_stops.length + 1; }
    }
    if (ind == -1) return null;
    else           return ind;
  }
  
  
  // Set the marker into the stop element
  this.set_stop_marker = function(stop_num) {
    
    var ind = get_bus_stop_index(stop_num);
    if (ind != null)  {
      
      stop.stop_marker = 
        new google.maps.Marker({
            position   : bus_stops[ind].pos,
            title      : bus_stops[ind].num + ' - ' + bus_stops[ind].name,
            icon       : './pole4.png',
            animation  : google.maps.Animation.DROP,
            stop_index : ind
        });

      stop.stop_marker.addListener('click', function() { open_stop_infowindow(this); });
      
    }
  };
  
  
  // Initialization of all markers
  this.ini_all_markers = function() {
      for (var t = 0; t < bus_stops.length; t++) {
        bus_stops[t].stop_marker = 
          new google.maps.Marker({
              position   : bus_stops[t].pos,
              title      : bus_stops[t].num + ' - ' + bus_stops[t].name,
              icon       : './pole4.png',
              draggable  : true,
              animation  : google.maps.Animation.DROP,
              stop_index : t
          });
        
        // Set the listener to open the info window
        bus_stops[t].stop_marker.addListener('click', function() { open_stop_infowindow(this); });
        bus_stops[t].stop_marker.addListener('dragend', function(elem) {
            console.log(this.getPosition().lat() + ', ' + this.getPosition().lng());
          
            var stop = edit_stops_obj.bus_stops[this.stop_index];
            stop.pos.lat = this.getPosition().lat();
            stop.pos.lng = this.getPosition().lng();
          
            // loop all lines with this stop
            for (var t = 0; t < stop.user_lines.length; t++) {
                
                var line_ind = get_line_index(stop.user_lines[t].num);
                var line = bus_tracks[line_ind].from_route;
              
                for (var q = 0; q < line.track.length; q++) {
                    if (line.track[q].hasOwnProperty('stop_num')) {
                      if (line.track[q].stop_num == stop.num) {
                          line.track[q].lat = stop.pos.lat;
                          line.track[q].lng = stop.pos.lng;
                      }
                    }
                }         
            }
          
        });        
      }
  };
  

  
  // Create the info window for the stop marker
  this.open_stop_infowindow = function(that) {
      console.log(that);
      var ind = that.stop_index;

      var ttdata = {}; 
      ttdata.title        = that.title;
      ttdata.gname        = edit_stops_obj.bus_stops[ind].gname;
      ttdata.dub_bus_url  = edit_stops_obj.bus_stops[ind].dub_bus_url;
      ttdata.gmaps_url    = edit_stops_obj.bus_stops[ind].gmaps_url;
      ttdata.line_stops   = [ {num: 1}, {num: 16}, {num: 47}, {num: 98} ];

      edit_app.infowindow.setContent(temp_mark_info(ttdata));
      edit_app.infowindow.open(edit_app.map, that);        
    
    
  };
  
  
  // Initialization of all edit_stops_obj.bus_stops[].user_lines[] from bus_tracks object
  this.ini_all_stops_user_lines = function() {
      var ind = 0;
      
      // Loop all tracks
      for (var t = 0; t < bus_tracks.length; t++) {
        
          // Loop al from track points
          for (var q = 0; q < bus_tracks[t].from_route.track.length; q++) {
              if (bus_tracks[t].from_route.track[q].hasOwnProperty('stop_num')) {
                  ind = get_bus_stop_index(bus_tracks[t].from_route.track[q].stop_num);
                  if (ind != null) bus_stops[ind].user_lines.push({ num: bus_tracks[t].line_num, dir: 'from', show: false })

              }
          }
          // Loop al from track points
          for (var q = 0; q < bus_tracks[t].to_route.track.length; q++) {
              if (bus_tracks[t].to_route.track[q].hasOwnProperty('stop_num')) {
                  ind = get_bus_stop_index(bus_tracks[t].to_route.track[q].stop_num);
                  if (ind != null) bus_stops[ind].user_lines.push({ num: bus_tracks[t].line_num, dir: 'to', show: false })

              }
          }
      }
      
  }
  
  
  
  // Return the index of the line position into the stop.user_line array
  this.get_stop_line_index = function(stop, line_num, direction) {
      var ind = -1;
      for (var t = 0; t < stop.user_lines.length; t++) {
        if (stop.user_lines[t].num == line_num && stop.user_lines[t].dir == direction) { ind = t; break; }
      }
      if (ind == -1) return null;
      else           return ind;
  };
  
  
  // Check if all the stop line checks of the stop are unchecked
  this.is_all_stop_line_unchecked = function(stop) {
      var is_unchecked = true;
      for (var t = 0; t < stop.user_lines.length; t++) {
        if (stop.user_lines[t].show) is_unchecked = false;
      }
      return is_unchecked;
  };
  
  
  // Makes the stop bus icon appears or desappears on the map
  this.toogle_stop_show = function(stop_info, next_state) {
      
      var stop = get_bus_stop(stop_info.stop_num);
    
      // Get the index of the array edit_stops_obj.bus_stops[].user_lines[ind]
      var ind = get_stop_line_index(stop, stop_info.line_num, stop_info.direction);

      if (next_state) { // show
          stop.stop_marker.setMap(edit_app.map);
          if (ind != null) stop.user_lines[ind].show = true;
        
      } else { // hide (if all are unchecked)
          if (ind != null) stop.user_lines[ind].show = false;
          if (is_all_stop_line_unchecked(stop)) stop.stop_marker.setMap(null);
//          infowindow.close();
      }
  };
  
  
  this.trim_coord = function(val) {
    
    var tmp = val.toString().split('.');
    if (tmp.length == 2) {
      var int_fill = (2  - tmp[0].length < 0) ? 0 :  2 - tmp[0].length;
      var dec_fill = (15 - tmp[1].length < 0) ? 0 : 15 - tmp[1].length;
      var edit_val = '0'.repeat(int_fill) + tmp[0] + '.' + tmp[1] + '0'.repeat(dec_fill);
      
      return edit_val;
    } else {
      return '0';
    }
  }
  
  
  
  
  
  
  
  
  
  

    this.bus_stops = [
    { num          : 226,
      name         : 'Shanard Road',
      user_lines   : [ { num: 1, dir: 'from', show: false },
                       { num: 1, dir: 'to', show: false },
                       { num: 2, dir: 'from', show: false },
                       { num: 2, dir: 'to', show: false }
                     ],
      gname        : 'Shanard Rd',
      pos          : { lat: 53.39118278978061, lng: -6.262185573577881},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanard+Road+(Shanard+Avenue)/@53.391444,-6.2648159,16.25z/data=!4m7!1m4!3m3!1s0x48670e930f92561d:0x09aac3c4c4057e0e!2sGrand+Canal+Dock,+Pearse+Square!3b1!3m1!1s0x48670e1ae35c9377:0x39229e9a1ebf6a98'
    },
    { num          : 228,
      name         : 'Shanliss Rd',
      user_lines   : [                      ],
      gname        : 'Shanliss Road',
      pos          : { lat: 53.391806602334235, lng: -6.259803771972656},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanliss+Road/@53.3879977,-6.2592368,16z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e1bb5cf1a5f:0xe769a53dff25b16a'
    },
    { num          : 229,
      name         : 'Shanliss Rd',
      user_lines   : [                      ],
      gname        : 'Shanliss Road',
      pos          : { lat: 53.39135233973839, lng: -6.256536841392517},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanliss+Road/@53.3879977,-6.2592368,16z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e199bf5e4c1:0xc90da21512ef2109'
    },
    { num          : 227,
      name         : 'Shanliss Rd',
      user_lines   : [                      ],
      gname        : 'Shanliss Road',
      pos          : { lat: 53.39114760008209, lng: -6.251263618469238},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanliss+Avenue/@53.3894501,-6.2551598,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e186ef6c3a3:0x491c56eb7a8ac32d'
    },
    { num          : 230,
      name         : 'Shanliss Rd',
      user_lines   : [                      ],
      gname        : 'Shanliss Road',
      pos          : { lat: 53.389880751560284, lng: -6.249133944511414},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanliss+Road/@53.3894501,-6.2551598,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e22b6cd5427:0x959281ddc1ab92f7'
    },
    { num          : 231,
      name         : 'Swords Road',
      user_lines   : [                      ],
      gname        : 'Swords Road #1',
      pos          : { lat: 53.389234516328, lng: -6.2459635734558105},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Swords+Road+%231/@53.3893158,-6.2462978,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3cd1f5a8d9:0xd3cfc09236f90939'
    },
    { num          : 1641,
      name         : 'Swords Road',
      user_lines   : [                      ],
      gname        : 'Swords Road',
      pos          : { lat: 53.38652470039568, lng: -6.242417693138123},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Swords+Road/@53.3870379,-6.2458257,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3b87ac5ae7:0x9c3e32d5c25b54e6'
    },
    { num          : 1642,
      name         : 'Swords Road',
      user_lines   : [                      ],
      gname        : 'Whitehall',
      pos          : { lat: 53.38390110150979, lng: -6.243581771850586},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Whitehall+(Church+Collins+Ave)/@53.3841391,-6.2445704,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3ea3cbcb43:0x90b78d21d91188f1'
    },
    { num          : 213,
      name         : 'Swords Road',
      user_lines   : [                      ],
      gname        : 'Whitehall, Iveragh Road',
      pos          : { lat: 53.381501326818174, lng: -6.244933605194092},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Whitehall,+Iveragh+Road/@53.380741,-6.2447206,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3efffc011d:0xbcc9c30f1fe81657'
    },
    { num          : 214,
      name         : 'Swords Road',
      user_lines   : [                      ],
      gname        : 'Whitehall, Highfield Hospital',
      pos          : { lat: 53.379584609614604, lng: -6.246618032455444},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Whitehall,+Highfield+Hospital/@53.3786995,-6.2462656,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3fec2f1f91:0x85971ef08bcfbee5'
    },
    { num          : 4432,
      name         : 'Swords Road',
      user_lines   : [                      ],
      gname        : 'Swords Road (Griffith Downs)',
      pos          : { lat: 53.37720699243314, lng: -6.248495578765869},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Swords+Road+(Griffith+Downs)/@53.3763954,-6.2489693,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6a97cdc16b:0x3ac2a34ec80bbf9e'
    },
    { num          : 119,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'Upper Drumcondra Road (Griffith Avenue)',
      pos          : { lat: 53.37511406746041, lng: -6.250823736190796},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Upper+Drumcondra+Road+(Griffith+Avenue)/@53.3763954,-6.2489693,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6bb2738843:0xd6e56f2ba7575d98'
    },
    { num          : 44,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'Homefarm Road',
      pos          : { lat: 53.3729890353523, lng: -6.2522318959236145},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/37+Drumcondra+Rd+Upper,+Dublin,+Ireland/@53.3730373,-6.254448,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6be2047b2b:0xe2208c7ef9fc91ca'
    },
    { num          : 7603,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'St. Patrick\'s College',
      pos          : { lat: 53.371692841723906, lng: -6.253098249435425},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/90+Drumcondra+Rd+Upper,+Dublin+9,+Ireland/@53.3716276,-6.2542149,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e694a74faf1:0x38bd62dcf97e9f1c'
    },
    { num          : 45,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'Upper Drumcondra Road',
      pos          : { lat: 53.37000293005668, lng: -6.254090666770935},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Upper+Drumcondra+Road/@53.3697096,-6.2539232,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6f26ad1d3b:0x473bf87e231b5940'
    },
    { num          : 46,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'Botanic Avenue',
      pos          : { lat: 53.36717025729598, lng: -6.255364716053009},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Botanic+Avenue/@53.366547,-6.2548435,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e658146d421:0x15d9d58e7cfcacd4'
    },
    { num          : 47,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'Near Train Station',
      pos          : { lat: 53.363914851595645, lng: -6.25733882188797},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Near+Train+Station/@53.3639118,-6.2570674,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e64c4b60625:0xdf605599b7b63ef7'
    },
    { num          : 48,
      name         : 'Drumcondra Rd',
      user_lines   : [                      ],
      gname        : 'Lower Drumcondra Road',
      pos          : { lat: 53.36234147640061, lng: -6.258768439292908},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Lower+Drumcondra+Road/@53.3623048,-6.2583755,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7b51072fe3:0xc71023cb8c78fbac'
    },
    { num          : 49,
      name         : 'Dorset St',
      user_lines   : [                      ],
      gname        : 'Lower Dorset Street',
      pos          : { lat: 53.35877195613071, lng: -6.262236535549164},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/51+R132,+Dublin,+Ireland/@53.3594866,-6.2611143,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670c2941195343:0xd6311f5ce5885af8'
    },
    { num          : 51,
      name         : 'Dorset St',
      user_lines   : [                      ],
      gname        : 'Upper Dorset St (Temple Street)',
      pos          : { lat: 53.35783550780724, lng: -6.263271868228912},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Upper+Dorset+St+(Temple+Street)/@53.3574083,-6.2630089,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7ddcad9a41:0x7764cff6a4047c28'
    },
    { num          : 52,
      name         : 'Dorset St',
      user_lines   : [                      ],
      gname        : 'Upper Dorset St (St.Joseph\'s Parade)',
      pos          : { lat: 53.35665091121904, lng: -6.26458078622818},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Upper+Dorset+St+(St.Joseph\'s+Parade)/@53.3574083,-6.2630089,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7e0507b487:0x5c835988be495577'
    },
    { num          : 265,
      name         : 'Parnell Square',
      user_lines   : [                      ],
      gname        : 'Gate Theatre',
      pos          : { lat: 53.354217582515815, lng: -6.28067672252655},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Dublin+(Parnell+Square)/@53.3537726,-6.2622927,19z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e872888c3a7:0x860145c78860b84a'
    },
    { num          : 271,
      name         : 'O\'Connell St',
      user_lines   : [                      ],
      gname        : 'Lower O\'Connell Street',
      pos          : { lat: 53.35541185198908, lng: -6.2485747039318085},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Lower+O\'Connell+Street/@53.3485165,-6.2595073,20z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e845a262729:0xdd6dbbc55120f6cf'
    },
    { num          : 340,
      name         : 'Townsend St',
      user_lines   : [                      ],
      gname        : 'Pearse Street Garda Station',
      pos          : { lat: 53.34594162450155, lng: -6.25614121556282},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Pearse+Street+Garda+Station/@53.3467138,-6.2570981,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e854a0af273:0x41a994032ecdbbc9'
    },
    { num          : 350,
      name         : 'Townsend Street',
      user_lines   : [                      ],
      gname        : 'Dublin City South, Lower Sandwith Street',
      pos          : { lat: 53.34562618089132, lng: -6.249732077121735},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Dublin+City+South,+Lower+Sandwith+Street/@53.3463584,-6.2514594,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e91da39a097:0xc535db2ff73adeed'
    },
    { num          : 351,
      name         : 'Pearse Street',
      user_lines   : [                      ],
      gname        : 'Pearse Station',
      pos          : { lat: 53.34302568373126, lng: -6.243774890899658},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/130+Pearse+St,+Dublin+2,+Ireland/@53.3428719,-6.2459828,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e93a5a08915:0xa1e7a7c651e28b35'
    },
    { num          : 352,
      name         : 'Pearse Street',
      user_lines   : [                      ],
      gname        : 'Grand Canal Dock, Pearse Square',
      pos          : { lat: 53.3429328058993, lng: -6.242412328720093},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Saint+Andrew\'s+Resource+Centre/@53.3428719,-6.2459828,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e93119bb3f5:0x55bd6300b04ed85f'
    },
    { num          : 353,
      name         : 'Pearse Street',
      user_lines   : [                      ],
      gname        : 'Pearse Street',
      pos          : { lat: 53.342593319688916, lng: -6.239655017852783},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Pearse+Street/@53.3425068,-6.2400497,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e9335374cd7:0x6b6cb3b4172b4f48'
    },
    { num          : 354,
      name         : 'Ringsend Road',
      user_lines   : [                      ],
      gname        : 'Barrow Street',
      pos          : { lat: 53.34219297870368, lng: -6.236361265182495},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Barrow+Street/@53.3425068,-6.2400497,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eec89328961:0x329a5395c4ec53bd'
    },
    { num          : 355,
      name         : 'Ringsend Road',
      user_lines   : [                      ],
      gname        : 'Ringsend Garage',
      pos          : { lat: 53.34175580205452, lng: -6.232850253582001},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Ringsend+Garage/@53.3417926,-6.2329955,18z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eec03375df7:0xed231ba108de6f41'
    },
    { num          : 356,
      name         : 'Bridge Street',
      user_lines   : [                      ],
      gname        : 'Ringsend, Bridge Street',
      pos          : { lat: 53.3418855142752, lng: -6.226683855056763},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Ringsend,+Bridge+Street/@53.3419559,-6.2277169,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eef4b5cfb6b:0x228b6722a8f1990b'
    },
    { num          : 357,
      name         : 'Irishtown Rd',
      user_lines   : [                      ],
      gname        : 'Irishtown Road',
      pos          : { lat: 53.33861216178375, lng: -6.2230440974235535},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Irishtown+Rd,+Dublin,+Ireland/@53.339166,-6.2237597,19z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ee7cb03ae6b:0x71bbd254b4394b71'
    },
    { num          : 390,
      name         : 'Tritonville Road',
      user_lines   : [                      ],
      gname        : 'Tritonville Road',
      pos          : { lat: 53.337551951679416, lng: -6.222335994243622},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Tritonville+Road/@53.3376702,-6.2227789,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ee793bf8361:0x066a464f76036517'
    },
    { num          : 372,
      name         : 'Sandymount Rd',
      user_lines   : [                      ],
      gname        : 'Star Of The Sea Church',
      pos          : { lat: 53.33548750925169, lng: -6.219702064990997},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Sandymount+Road/@53.3354912,-6.2200633,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edda2e64df1:0x9415c86e37227a5e'
    },
    { num          : 373,
      name         : 'Sandymount Rd',
      user_lines   : [                      ],
      gname        : 'Sandymount, Farney Park',
      pos          : { lat: 53.33426224985359, lng: -6.217931807041168},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Sandymount,+Farney+Park/@53.3346831,-6.2192378,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eddcc9c0469:0x36251c5fb06ef542'
    },
    { num          : 374,
      name         : 'Sandymount Rd',
      user_lines   : [                      ],
      gname        : 'Sandymount Road',
      pos          : { lat: 53.33316829570927, lng: -6.216394901275635},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Sandymount+Road/@53.3333229,-6.2168392,19z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edc20a722f5:0x7f5dda6e9f2519df'
    },
    { num          : 375,
      name         : 'Seafort Ave',
      user_lines   : [                      ],
      gname        : 'Sandymount, Seafort Avenue',
      pos          : { lat: 53.33399637192497, lng: -6.2143537402153015},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Sandymount,+Seafort+Avenue/@53.3333893,-6.215345,18z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edef3f77295:0xebd109e2b3f7837b'
    },
    { num          : 2804,
      name         : 'Strand Road',
      user_lines   : [                      ],
      gname        : 'Newgrove Avenue',
      pos          : { lat: 53.33275985761325, lng: -6.21077299118042},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/5+N+Strand+Rd,+North+Strand,+Dublin+1,+Ireland/@53.3305309,-6.2134549,16.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e8a5bcbb90d:0x933c50d3055edf2'
    },
    { num          : 376,
      name         : 'Strand Road',
      user_lines   : [                      ],
      gname        : 'Sandymount, Strand Road (Lea Road)',
      pos          : { lat: 53.33070319224562, lng: -6.209308505058289},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Sandymount,+Strand+Road+(Lea+Road)/@53.3305228,-6.2103243,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x0000000000000000:0xbe2e0f7055ab5896'
    },
    { num          : 377,
      name         : 'Strand Road',
      user_lines   : [                      ],
      gname        : 'Strand Road (Gilford Road)',
      pos          : { lat: 53.32859516752275, lng: -6.208847165107727},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Strand+Road+(Gilford+Road)/@53.3271989,-6.2093527,16.75z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ed87a6225f1:0x0eda47b6cb8fd5d6'
    },
    { num          : 378,
      name         : 'Strand Road',
      user_lines   : [                      ],
      gname        : 'Sandymount, Sandymount Tower',
      pos          : { lat: 53.32567323457003, lng: -6.207339763641357},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Sandymount,+Sandymount+Tower/@53.3255567,-6.2079045,17.75z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670f281c39bca1:0xe8ba5d879f15e735'
    },
    { num          : 380,
      name         : 'St. John\'s Road',
      user_lines   : [                      ],
      gname        : 'Saint John\'s Road East',
      pos          : { lat: 53.32470722259064, lng: -6.209214627742767},
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Saint+John\'s+Road+East/@53.3247164,-6.2093105,80m/data=!3m1!1e3!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2101811!2d53.3245516!3e3!3m1!1s0x48670ed7b89aa90f:0x0167d1d01f99f0d4!6m1!1e1'
    }
];
  
  
  
/*
  
  this.bus_stops = [
    { num          :  226, 
      name         : 'Shanard Road',
      user_lines   : [
                      { num: 1, dir: 'from', show: false }, 
                      { num: 1, dir:   'to', show: false },
                      { num: 2, dir: 'from', show: false },
                      { num: 2, dir:   'to', show: false }
                     ],
      gname        : 'Shanard Rd',
      pos          : { lat: 53.391182789780610, lng: -6.2621855735778810 }, 
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanard+Road+(Shanard+Avenue)/@53.391444,-6.2648159,16.25z/data=!4m7!1m4!3m3!1s0x48670e930f92561d:0x09aac3c4c4057e0e!2sGrand+Canal+Dock,+Pearse+Square!3b1!3m1!1s0x48670e1ae35c9377:0x39229e9a1ebf6a98'
    },
    { num:  228, name: 'Shanliss Rd',       user_lines: [], gname: 'Shanliss Road',                             pos: { lat: 53.391806602334235, lng: -6.2598037719726560 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Road/@53.3879977,-6.2592368,16z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e1bb5cf1a5f:0xe769a53dff25b16a' },
    { num:  229, name: 'Shanliss Rd',       user_lines: [], gname: 'Shanliss Road',                             pos: { lat: 53.391352339738390, lng: -6.2565368413925170 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Road/@53.3879977,-6.2592368,16z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e199bf5e4c1:0xc90da21512ef2109' },
    { num:  227, name: 'Shanliss Rd',       user_lines: [], gname: 'Shanliss Road',                             pos: { lat: 53.391147600082090, lng: -6.2512636184692380 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Avenue/@53.3894501,-6.2551598,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e186ef6c3a3:0x491c56eb7a8ac32d' },
    { num:  230, name: 'Shanliss Rd',       user_lines: [], gname: 'Shanliss Road',                             pos: { lat: 53.389880751560284, lng: -6.2491339445114140 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Road/@53.3894501,-6.2551598,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e22b6cd5427:0x959281ddc1ab92f7' },
    { num:  231, name: 'Swords Road',		user_lines: [], gname: 'Swords Road #1',                            pos: { lat: 53.389234516328000, lng: -6.2459635734558105 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Swords+Road+%231/@53.3893158,-6.2462978,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3cd1f5a8d9:0xd3cfc09236f90939' },
    { num: 1641, name: 'Swords Road',		user_lines: [], gname: 'Swords Road',                               pos: { lat: 53.386524700395680, lng: -6.2424176931381230 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Swords+Road/@53.3870379,-6.2458257,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3b87ac5ae7:0x9c3e32d5c25b54e6' },
    { num: 1642, name: 'Swords Road',		user_lines: [], gname: 'Whitehall',                                 pos: { lat: 53.383901101509790, lng: -6.2435817718505860 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Whitehall+(Church+Collins+Ave)/@53.3841391,-6.2445704,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3ea3cbcb43:0x90b78d21d91188f1' },
    { num:  213, name: 'Swords Road',		user_lines: [], gname: 'Whitehall, Iveragh Road',                   pos: { lat: 53.381501326818174, lng: -6.2449336051940920 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Whitehall,+Iveragh+Road/@53.380741,-6.2447206,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3efffc011d:0xbcc9c30f1fe81657' },
    { num:  214, name: 'Swords Road',		user_lines: [], gname: 'Whitehall, Highfield Hospital',             pos: { lat: 53.379584609614604, lng: -6.2466180324554440 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Whitehall,+Highfield+Hospital/@53.3786995,-6.2462656,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3fec2f1f91:0x85971ef08bcfbee5' },
    { num: 4432, name: 'Swords Road',		user_lines: [], gname: 'Swords Road (Griffith Downs)',              pos: { lat: 53.377206992433140, lng: -6.2484955787658690 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Swords+Road+(Griffith+Downs)/@53.3763954,-6.2489693,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6a97cdc16b:0x3ac2a34ec80bbf9e' },
    { num:  119, name: 'Drumcondra Rd',     user_lines: [], gname: 'Upper Drumcondra Road (Griffith Avenue)',   pos: { lat: 53.375114067460410, lng: -6.2508237361907960 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Drumcondra+Road+(Griffith+Avenue)/@53.3763954,-6.2489693,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6bb2738843:0xd6e56f2ba7575d98' },
    { num:   44, name: 'Drumcondra Rd',     user_lines: [], gname: 'Homefarm Road',                             pos: { lat: 53.372989035352300, lng: -6.2522318959236145 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/37+Drumcondra+Rd+Upper,+Dublin,+Ireland/@53.3730373,-6.254448,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6be2047b2b:0xe2208c7ef9fc91ca' },
    { num: 7603, name: 'Drumcondra Rd',     user_lines: [], gname: 'St. Patrick\'s College',                    pos: { lat: 53.371692841723906, lng: -6.2530982494354250 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/90+Drumcondra+Rd+Upper,+Dublin+9,+Ireland/@53.3716276,-6.2542149,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e694a74faf1:0x38bd62dcf97e9f1c' },
    { num:   45, name: 'Drumcondra Rd',     user_lines: [], gname: 'Upper Drumcondra Road',                     pos: { lat: 53.370002930056680, lng: -6.2540906667709350 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Drumcondra+Road/@53.3697096,-6.2539232,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6f26ad1d3b:0x473bf87e231b5940' },
    { num:   46, name: 'Drumcondra Rd',     user_lines: [], gname: 'Botanic Avenue',                            pos: { lat: 53.367170257295980, lng: -6.2553647160530090 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Botanic+Avenue/@53.366547,-6.2548435,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e658146d421:0x15d9d58e7cfcacd4' },
    { num:   47, name: 'Drumcondra Rd',     user_lines: [], gname: 'Near Train Station',                        pos: { lat: 53.363914851595645, lng: -6.2573388218879700 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Near+Train+Station/@53.3639118,-6.2570674,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e64c4b60625:0xdf605599b7b63ef7' },
    { num:   48, name: 'Drumcondra Rd',     user_lines: [], gname: 'Lower Drumcondra Road',                     pos: { lat: 53.362341476400610, lng: -6.2587684392929080 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Lower+Drumcondra+Road/@53.3623048,-6.2583755,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7b51072fe3:0xc71023cb8c78fbac' },
    { num:   49, name: 'Dorset St',			user_lines: [], gname: 'Lower Dorset Street',                       pos: { lat: 53.358771956130710, lng: -6.2622365355491640 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/51+R132,+Dublin,+Ireland/@53.3594866,-6.2611143,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670c2941195343:0xd6311f5ce5885af8' },
    { num:   51, name: 'Dorset St',			user_lines: [], gname: 'Upper Dorset St (Temple Street)',           pos: { lat: 53.357835507807240, lng: -6.2632718682289120 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Dorset+St+(Temple+Street)/@53.3574083,-6.2630089,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7ddcad9a41:0x7764cff6a4047c28' },
    { num:   52, name: 'Dorset St',			user_lines: [], gname: 'Upper Dorset St (St.Joseph\'s Parade)',     pos: { lat: 53.356650911219040, lng: -6.2645807862281800 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Dorset+St+(St.Joseph\'s+Parade)/@53.3574083,-6.2630089,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7e0507b487:0x5c835988be495577' },
    { num:  265, name: 'Parnell Square',	user_lines: [], gname: 'Gate Theatre',                              pos: { lat: 53.353654055004775, lng: -6.2623947858810425 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Dublin+(Parnell+Square)/@53.3537726,-6.2622927,19z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e872888c3a7:0x860145c78860b84a' },
    { num:  271, name: 'O\'Connell St',     user_lines: [], gname: 'Lower O\'Connell Street',                   pos: { lat: 53.348597983438990, lng: -6.2595610320568085 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Lower+O\'Connell+Street/@53.3485165,-6.2595073,20z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e845a262729:0xdd6dbbc55120f6cf' },
    { num:  340, name: 'Townsend St',       user_lines: [], gname: 'Pearse Street Garda Station',               pos: { lat: 53.345941624501550, lng: -6.2561412155628200 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Pearse+Street+Garda+Station/@53.3467138,-6.2570981,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e854a0af273:0x41a994032ecdbbc9' },
    { num:  350, name: 'Townsend Street',   user_lines: [], gname: 'Dublin City South, Lower Sandwith Street',  pos: { lat: 53.345626180891320, lng: -6.2497320771217350 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Dublin+City+South,+Lower+Sandwith+Street/@53.3463584,-6.2514594,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e91da39a097:0xc535db2ff73adeed' },
    { num:  351, name: 'Pearse Street',		user_lines: [], gname: 'Pearse Station',                            pos: { lat: 53.343025683731260, lng: -6.2437748908996580 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/130+Pearse+St,+Dublin+2,+Ireland/@53.3428719,-6.2459828,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e93a5a08915:0xa1e7a7c651e28b35' },
    { num:  352, name: 'Pearse Street',		user_lines: [], gname: 'Grand Canal Dock, Pearse Square',           pos: { lat: 53.342932805899300, lng: -6.2424123287200930 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Saint+Andrew\'s+Resource+Centre/@53.3428719,-6.2459828,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e93119bb3f5:0x55bd6300b04ed85f' },
    { num:  353, name: 'Pearse Street',		user_lines: [], gname: 'Pearse Street',                             pos: { lat: 53.342593319688916, lng: -6.2396550178527830 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Pearse+Street/@53.3425068,-6.2400497,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e9335374cd7:0x6b6cb3b4172b4f48' },
    { num:  354, name: 'Ringsend Road',     user_lines: [], gname: 'Barrow Street',                             pos: { lat: 53.342192978703680, lng: -6.2363612651824950 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Barrow+Street/@53.3425068,-6.2400497,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eec89328961:0x329a5395c4ec53bd' },
    { num:  355, name: 'Ringsend Road',     user_lines: [], gname: 'Ringsend Garage',                           pos: { lat: 53.341755802054520, lng: -6.2328502535820010 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Ringsend+Garage/@53.3417926,-6.2329955,18z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eec03375df7:0xed231ba108de6f41' },
    { num:  356, name: 'Bridge Street',		user_lines: [], gname: 'Ringsend, Bridge Street',                   pos: { lat: 53.341885514275200, lng: -6.2266838550567630 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Ringsend,+Bridge+Street/@53.3419559,-6.2277169,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eef4b5cfb6b:0x228b6722a8f1990b' },
    { num:  357, name: 'Irishtown Rd',      user_lines: [], gname: 'Irishtown Road',                            pos: { lat: 53.338612161783750, lng: -6.2230440974235535 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Irishtown+Rd,+Dublin,+Ireland/@53.339166,-6.2237597,19z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ee7cb03ae6b:0x71bbd254b4394b71' },
    { num:  390, name: 'Tritonville Road',  user_lines: [], gname: 'Tritonville Road',                          pos: { lat: 53.337551951679416, lng: -6.2223359942436220 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Tritonville+Road/@53.3376702,-6.2227789,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ee793bf8361:0x066a464f76036517' },
    { num:  372, name: 'Sandymount Rd',     user_lines: [], gname: 'Star Of The Sea Church',                    pos: { lat: 53.335487509251690, lng: -6.2197020649909970 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount+Road/@53.3354912,-6.2200633,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edda2e64df1:0x9415c86e37227a5e' },
    { num:  373, name: 'Sandymount Rd',     user_lines: [], gname: 'Sandymount, Farney Park',                   pos: { lat: 53.334262249853590, lng: -6.2179318070411680 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Farney+Park/@53.3346831,-6.2192378,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eddcc9c0469:0x36251c5fb06ef542' },
    { num:  374, name: 'Sandymount Rd',     user_lines: [], gname: 'Sandymount Road',                           pos: { lat: 53.333168295709270, lng: -6.2163949012756350 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount+Road/@53.3333229,-6.2168392,19z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edc20a722f5:0x7f5dda6e9f2519df' },
    { num:  375, name: 'Seafort Ave',		user_lines: [], gname: 'Sandymount, Seafort Avenue',                pos: { lat: 53.333996371924970, lng: -6.2143537402153015 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Seafort+Avenue/@53.3333893,-6.215345,18z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edef3f77295:0xebd109e2b3f7837b' },
    { num: 2804, name: 'Strand Road',		user_lines: [], gname: 'Newgrove Avenue',                           pos: { lat: 53.332759857613250, lng: -6.2107729911804200 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/5+N+Strand+Rd,+North+Strand,+Dublin+1,+Ireland/@53.3305309,-6.2134549,16.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e8a5bcbb90d:0x933c50d3055edf2' },
    { num:  376, name: 'Strand Road',		user_lines: [], gname: 'Sandymount, Strand Road (Lea Road)',        pos: { lat: 53.330703192245620, lng: -6.2093085050582890 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Strand+Road+(Lea+Road)/@53.3305228,-6.2103243,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x0000000000000000:0xbe2e0f7055ab5896' },
    { num:  377, name: 'Strand Road',		user_lines: [], gname: 'Strand Road (Gilford Road)',                pos: { lat: 53.328595167522750, lng: -6.2088471651077270 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Strand+Road+(Gilford+Road)/@53.3271989,-6.2093527,16.75z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ed87a6225f1:0x0eda47b6cb8fd5d6' },
    { num:  378, name: 'Strand Road',		user_lines: [], gname: 'Sandymount, Sandymount Tower',              pos: { lat: 53.325673234570030, lng: -6.2073397636413570 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Sandymount+Tower/@53.3255567,-6.2079045,17.75z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670f281c39bca1:0xe8ba5d879f15e735' },
    { num:  380, name: 'St. John\'s Road',  user_lines: [], gname: 'Saint John\'s Road East',                   pos: { lat: 53.324707222590640, lng: -6.2092146277427670 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Saint+John\'s+Road+East/@53.3247164,-6.2093105,80m/data=!3m1!1e3!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2101811!2d53.3245516!3e3!3m1!1s0x48670ed7b89aa90f:0x0167d1d01f99f0d4!6m1!1e1' }
  ];
*/
  return this;
  
}());  // <-- End edit_bus_stops




$(document).ready(function() {

    edit_app.ini();
  
});








var bus_tracks = [
{ line_num   :1,
  name       :'Santry / Sandymount',
  from_route : {
    name         : 'From Santry Towards Sandymount',
    dub_bus_url  : 'http://www.dublinbus.ie/en/Examples/Google-Map/?routeNumber=1&direction=IO&towards=Sandymount+(St.+John%26%2339%3bs+Church)&from=Santry+(Shanard+Rd.)',
    stop_ini     : 226,
    stop_end     : 3800,
    map_polyline : 226,
    track        : [
    { lat: 53.391182789780610, lng: -6.262185573577881,  stop_num: 226 },
    { lat: 53.391198785088490, lng: -6.262410879135132 },
    { lat: 53.391851388524810, lng: -6.262346506118774 },
    { lat: 53.391889776650636, lng: -6.261563301086426 },
    { lat: 53.391876980612540, lng: -6.260533332824707 },
    { lat: 53.391806602334235, lng: -6.259803771972656,  stop_num: 228 },
    { lat: 53.391633855157780, lng: -6.257786750793457 },
    { lat: 53.391352339738390, lng: -6.256536841392517,  stop_num: 229 },
    { lat: 53.391141201951960, lng: -6.2555015087127686 },
    { lat: 53.391064424315430, lng: -6.254192590713501 },
    { lat: 53.391147600082090, lng: -6.251263618469238,  stop_num: 227 },
    { lat: 53.391096415014170, lng: -6.250619888305664 },
    { lat: 53.390814896040220, lng: -6.249665021896362 },
    { lat: 53.390565366302220, lng: -6.249321699142456 },
    { lat: 53.390232657709454, lng: -6.249225139617920 },
    { lat: 53.389880751560284, lng: -6.249133944511414,  stop_num: 230 },
    { lat: 53.389599224546300, lng: -6.249139308929443 },
    { lat: 53.389775179148245, lng: -6.246247887611389 },
    { lat: 53.389234516328000, lng: -6.2459635734558105,  stop_num: 231 },
    { lat: 53.388866605748830, lng: -6.245909929275513 },
    { lat: 53.388613865334605, lng: -6.245791912078857 },
    { lat: 53.388319532834360, lng: -6.245507597923279 },
    { lat: 53.387734061050146, lng: -6.244472265243530 },
    { lat: 53.387641280629374, lng: -6.244139671325684 },
    { lat: 53.387462117865326, lng: -6.2419939041137695 },
    { lat: 53.387020606406780, lng: -6.242203116416931 },
    { lat: 53.386524700395680, lng: -6.242417693138123,  stop_num: 1641 },
    { lat: 53.385395292889264, lng: -6.242980957031250 },
    { lat: 53.383901101509790, lng: -6.243581771850586,  stop_num: 1642 },
    { lat: 53.381808505526990, lng: -6.244794130325317 },
    { lat: 53.381501326818174, lng: -6.244933605194092,  stop_num: 213 },
    { lat: 53.381366935436220, lng: -6.245078444480896 },
    { lat: 53.379623008802810, lng: -6.246505379676819 },
    { lat: 53.379584609614604, lng: -6.246618032455444,  stop_num: 214 },
    { lat: 53.379466211899690, lng: -6.246634125709534 },
    { lat: 53.377363797654844, lng: -6.248420476913452 },
    { lat: 53.377206992433140, lng: -6.248495578765869,  stop_num: 4432 },
    { lat: 53.377114189070770, lng: -6.2487101554870605 },
    { lat: 53.376378155241440, lng: -6.249654293060303 },
    { lat: 53.375859723778476, lng: -6.250222921371460 },
    { lat: 53.375347686509485, lng: -6.250662803649902 },
    { lat: 53.375114067460410, lng: -6.250823736190796,  stop_num: 119 },
    { lat: 53.374976455639974, lng: -6.251038312911987 },
    { lat: 53.374406801979106, lng: -6.2514567375183105 },
    { lat: 53.373395487946530, lng: -6.252036094665527 },
    { lat: 53.372989035352300, lng: -6.2522318959236145,  stop_num: 44 },
    { lat: 53.372880220613780, lng: -6.252336502075195 },
    { lat: 53.371830464153630, lng: -6.253044605255127 },
    { lat: 53.371692841723906, lng: -6.253098249435425,  stop_num: 7603 },
    { lat: 53.371609627946036, lng: -6.253184080123901 },
    { lat: 53.370591846278770, lng: -6.253784894943237 },
    { lat: 53.370143758589610, lng: -6.254053115844727 },
    { lat: 53.370002930056680, lng: -6.254090666770935,  stop_num: 45 },
    { lat: 53.369574040292930, lng: -6.254439353942871 },
    { lat: 53.368537005409140, lng: -6.255007982254028 },
    { lat: 53.368447383925400, lng: -6.255109906196594 },
    { lat: 53.367711200316705, lng: -6.255442500114441 },
    { lat: 53.367183060760420, lng: -6.255458593368530 },
    { lat: 53.367170257295980, lng: -6.255364716053009,  stop_num: 46 },
    { lat: 53.367090235555860, lng: -6.2554532289505005 },
    { lat: 53.366664517371674, lng: -6.255517601966858 },
    { lat: 53.366344425709640, lng: -6.255619525909424 },
    { lat: 53.365893092380055, lng: -6.255887746810913 },
    { lat: 53.365176070734286, lng: -6.256386637687683 },
    { lat: 53.364583878580035, lng: -6.256858706474304 },
    { lat: 53.364084510150490, lng: -6.257277131080627 },
    { lat: 53.363914851595645, lng: -6.257338821887970,  stop_num: 47 },
    { lat: 53.363902047149004, lng: -6.257416605949402 },
    { lat: 53.363476297106750, lng: -6.2577760219573975 },
    { lat: 53.362618381842920, lng: -6.2585753202438354 },
    { lat: 53.362341476400610, lng: -6.258768439292908,  stop_num: 48 },
    { lat: 53.362199021454680, lng: -6.258961558341980 },
    { lat: 53.361786059481844, lng: -6.259342432022095 },
    { lat: 53.361277054334330, lng: -6.259755492210388 },
    { lat: 53.360607975426090, lng: -6.260377764701843 },
    { lat: 53.359798023744325, lng: -6.261112689971924 },
    { lat: 53.359020071468926, lng: -6.261852979660034 },
    { lat: 53.358771956130710, lng: -6.262236535549164,  stop_num: 49 },
    { lat: 53.358677511848185, lng: -6.262276768684387 },
    { lat: 53.357982779676390, lng: -6.263145804405212 },
    { lat: 53.357835507807240, lng: -6.263271868228912,  stop_num: 51 },
    { lat: 53.357765073255100, lng: -6.263456940650940 },
    { lat: 53.357124753805520, lng: -6.264170408248901 },
    { lat: 53.356804590472980, lng: -6.2644922733306885 },
    { lat: 53.356650911219040, lng: -6.264580786228180,  stop_num: 52 },
    { lat: 53.356519643084130, lng: -6.264803409576416 },
    { lat: 53.355981759674690, lng: -6.265232563018799 },
    { lat: 53.354630617834815, lng: -6.263644695281982 },
    { lat: 53.353810946935210, lng: -6.262679100036621 },
    { lat: 53.353654055004775, lng: -6.2623947858810425,  stop_num: 265 },
    { lat: 53.353410711276290, lng: -6.262196302413940 },
    { lat: 53.353103327738720, lng: -6.261863708496094 },
    { lat: 53.352914413839790, lng: -6.2616705894470215 },
    { lat: 53.352504563858375, lng: -6.261337995529175 },
    { lat: 53.351335829379764, lng: -6.260828375816345 },
    { lat: 53.349968529468480, lng: -6.260190010070801 },
    { lat: 53.348879781548180, lng: -6.259750127792358 },
    { lat: 53.348597983438990, lng: -6.2595610320568085,  stop_num: 271 },
    { lat: 53.348386633634730, lng: -6.259530186653137 },
    { lat: 53.347618080059284, lng: -6.259154677391052 },
    { lat: 53.347016036747746, lng: -6.258816719055176 },
    { lat: 53.346724619112535, lng: -6.258612871170044 },
    { lat: 53.346385163091890, lng: -6.258060336112976 },
    { lat: 53.345869569060206, lng: -6.257293224334717 },
    { lat: 53.345904796180090, lng: -6.256418824195862 },
    { lat: 53.345941624501550, lng: -6.256141215562820,  stop_num: 340 },
    { lat: 53.345888783856470, lng: -6.255630254745483 },
    { lat: 53.345837544380520, lng: -6.253404021263123 },
    { lat: 53.345763887525976, lng: -6.251912713050842 },
    { lat: 53.345722255334486, lng: -6.251156330108643 },
    { lat: 53.345626180891320, lng: -6.250410676002502 },
    { lat: 53.345626180891320, lng: -6.249732077121735,  stop_num: 350 },
    { lat: 53.345562131142290, lng: -6.249375343322754 },
    { lat: 53.345459651343680, lng: -6.248570680618286 },
    { lat: 53.345325146234174, lng: -6.248002052307129 },
    { lat: 53.345155412990440, lng: -6.247696280479431 },
    { lat: 53.345008096797194, lng: -6.247304677963257 },
    { lat: 53.344819147021660, lng: -6.247127652168274 },
    { lat: 53.344582157983844, lng: -6.247009634971619 },
    { lat: 53.344255495259056, lng: -6.246827244758606 },
    { lat: 53.343525298942374, lng: -6.246403455734253 },
    { lat: 53.343237060111970, lng: -6.244922876358032 },
    { lat: 53.343025683731260, lng: -6.243774890899658,  stop_num: 351 },
    { lat: 53.343000062280595, lng: -6.243206262588501 },
    { lat: 53.342932805899300, lng: -6.242412328720093,  stop_num: 352 },
    { lat: 53.342836725170590, lng: -6.241902709007263 },
    { lat: 53.342606130538370, lng: -6.240035891532898 },
    { lat: 53.342593319688916, lng: -6.239655017852783,  stop_num: 353 },
    { lat: 53.342506846354354, lng: -6.239306330680847 },
    { lat: 53.342196181446460, lng: -6.236731410026550 },
    { lat: 53.342192978703680, lng: -6.236361265182495,  stop_num: 354 },
    { lat: 53.342109707306540, lng: -6.236012578010559 },
    { lat: 53.341779822865910, lng: -6.233469843864441 },
    { lat: 53.341755802054520, lng: -6.232850253582001,  stop_num: 355 },
    { lat: 53.341661320065140, lng: -6.2325310707092285 },
    { lat: 53.341491572236290, lng: -6.231238245964050 },
    { lat: 53.341555628100170, lng: -6.230240464210510 },
    { lat: 53.341677333976390, lng: -6.228582859039307 },
    { lat: 53.341815053364760, lng: -6.227359771728516 },
    { lat: 53.341885514275200, lng: -6.226683855056763,  stop_num: 356 },
    { lat: 53.341805445049780, lng: -6.226549744606018 },
    { lat: 53.341651711715530, lng: -6.226276159286499 },
    { lat: 53.341276984391314, lng: -6.225873827934265 },
    { lat: 53.340863819678450, lng: -6.225230097770691 },
    { lat: 53.340085521788495, lng: -6.223824620246887 },
    { lat: 53.339874129785150, lng: -6.223508119583130 },
    { lat: 53.339665939666750, lng: -6.223352551460266 },
    { lat: 53.339313615612570, lng: -6.223239898681641 },
    { lat: 53.338820357046540, lng: -6.223137974739075 },
    { lat: 53.338612161783750, lng: -6.2230440974235535,  stop_num: 357 },
    { lat: 53.338474432051300, lng: -6.2228697538375854 },
    { lat: 53.338173346901160, lng: -6.222639083862305 },
    { lat: 53.337897884157170, lng: -6.2224942445755005 },
    { lat: 53.337551951679416, lng: -6.222335994243622,  stop_num: 390 },
    { lat: 53.337302109811500, lng: -6.222322583198547 },
    { lat: 53.336709530298140, lng: -6.222209930419922 },
    { lat: 53.336148974531880, lng: -6.222102642059326 },
    { lat: 53.336043268904620, lng: -6.221979260444641 },
    { lat: 53.336014440051706, lng: -6.221866607666016 },
    { lat: 53.335918343734640, lng: -6.221179962158203 },
    { lat: 53.335780605302580, lng: -6.220514774322510 },
    { lat: 53.335594817875620, lng: -6.219989061355591 },
    { lat: 53.335487509251690, lng: -6.219702064990997,  stop_num: 372 },
    { lat: 53.335370590592950, lng: -6.219586730003357 },
    { lat: 53.334319909908570, lng: -6.218090057373047 },
    { lat: 53.334262249853590, lng: -6.217931807041168,  stop_num: 373 },
    { lat: 53.334134116118975, lng: -6.217816472053528 },
    { lat: 53.333272406755310, lng: -6.216620206832886 },
    { lat: 53.333168295709270, lng: -6.216394901275635,  stop_num: 374 },
    { lat: 53.333083404975980, lng: -6.2163519859313965 },
    { lat: 53.332731026541060, lng: -6.2159013748168945 },
    { lat: 53.332439511271970, lng: -6.215520501136780 },
    { lat: 53.332324186000160, lng: -6.215488314628601 },
    { lat: 53.332574057028324, lng: -6.215316653251648 },
    { lat: 53.333035353542634, lng: -6.214833855628967 },
    { lat: 53.333160287156730, lng: -6.214699745178223 },
    { lat: 53.333317254512220, lng: -6.214587092399597 },
    { lat: 53.333599153618756, lng: -6.2143027782440186 },
    { lat: 53.333877847495000, lng: -6.214297413825989 },
    { lat: 53.333996371924970, lng: -6.2143537402153015,  stop_num: 375 },
    { lat: 53.334153336203684, lng: -6.2143296003341675 },
    { lat: 53.334422416480550, lng: -6.214383244514465 },
    { lat: 53.334540939397314, lng: -6.2144798040390015 },
    { lat: 53.334608209014360, lng: -6.2143296003341675 },
    { lat: 53.334678681832720, lng: -6.214002370834351 },
    { lat: 53.334758764439530, lng: -6.213836073875427 },
    { lat: 53.334416009827024, lng: -6.213358640670776 },
    { lat: 53.333999575283364, lng: -6.212773919105530 },
    { lat: 53.333865034023370, lng: -6.212521791458130 },
    { lat: 53.333695255161090, lng: -6.212092638015747 },
    { lat: 53.333381322654550, lng: -6.2115561962127686 },
    { lat: 53.333057777551595, lng: -6.211121678352356 },
    { lat: 53.332759857613250, lng: -6.210772991180420,  stop_num: 2804 },
    { lat: 53.332660550504755, lng: -6.210756897926331 },
    { lat: 53.332436307796410, lng: -6.2106335163116455 },
    { lat: 53.332109552025330, lng: -6.210494041442871 },
    { lat: 53.331869288832074, lng: -6.210311651229858 },
    { lat: 53.330844150669535, lng: -6.209469437599182 },
    { lat: 53.330703192245620, lng: -6.209308505058289,  stop_num: 376 },
    { lat: 53.330450106633780, lng: -6.209190487861633 },
    { lat: 53.330120131998780, lng: -6.209013462066650 },
    { lat: 53.328845060393950, lng: -6.208868622779846 },
    { lat: 53.328595167522750, lng: -6.208847165107727,  stop_num: 377 },
    { lat: 53.328169064763934, lng: -6.208766698837280 },
    { lat: 53.327675677305386, lng: -6.208616495132446 },
    { lat: 53.327022090328100, lng: -6.208305358886719 },
    { lat: 53.326317230405905, lng: -6.2078869342803955 },
    { lat: 53.325881492993320, lng: -6.207575798034668 },
    { lat: 53.325673234570030, lng: -6.207339763641357,  stop_num: 378 },
    { lat: 53.325551483020945, lng: -6.207291483879089 },
    { lat: 53.325404099101970, lng: -6.207178831100464 },
    { lat: 53.325183022268950, lng: -6.207103729248047 },
    { lat: 53.325109329736720, lng: -6.207130551338196 },
    { lat: 53.325115737788070, lng: -6.207270026206970 },
    { lat: 53.325038841108540, lng: -6.2077635526657104 },
    { lat: 53.324795334042484, lng: -6.208772063255310 },
    { lat: 53.324707222590640, lng: -6.209214627742767,  stop_num: 3800 }
    ]
  },
  to_route       : {
    name         : 'From Sandymount Towards Santry',
    dub_bus_url  : '',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    { lat: 53.346811083893440, lng: -6.261284351348877,  stop_num: 2804 },
    { lat: 53.345901593715840, lng: -6.2584733963012695 },
    { lat: 53.346452414027640, lng: -6.255512237548828 },
    { lat: 53.347912693900780, lng: -6.252593994140625,  stop_num: 372 },
    { lat: 53.347618080059284, lng: -6.248431205749512 },
    { lat: 53.346913560443760, lng: -6.247272491455078 },
    { lat: 53.345671015658400, lng: -6.2461137771606445 },
    { lat: 53.345184235664380, lng: -6.2448906898498535,  stop_num: 373 },
    { lat: 53.345312336201630, lng: -6.243281364440918 },
    { lat: 53.345658205729780, lng: -6.241950988769531 },
    { lat: 53.346567701099290, lng: -6.2398481369018555 },
    { lat: 53.349436967781216, lng: -6.2422943115234375 },
    { lat: 53.349923699220660, lng: -6.247658729553223,  stop_num: 374 }
    ]
  }
},
{ line_num   :2,
  name       :'Route line 2',
  from_route : {
    name         : 'Route line 2a',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    { lat: 53.346298697447180, lng: -6.256284713745117,  stop_num: 1 },
    { lat: 53.344518106666435, lng: -6.256585121154785 },
    { lat: 53.344095365558300, lng: -6.255812644958496 },
    { lat: 53.342686198260340, lng: -6.253044605255127 },
    { lat: 53.342481224591920, lng: -6.248688697814941 },
    { lat: 53.343442030147070, lng: -6.246006488800049,  stop_num: 32 },
    { lat: 53.344505296391404, lng: -6.243689060211182 },
    { lat: 53.345696635504154, lng: -6.244075298309326 },
    { lat: 53.345914403571360, lng: -6.241242885589600 },
    { lat: 53.346388365519815, lng: -6.238753795623779 },
    { lat: 53.344697450112726, lng: -6.238839626312256 },
    { lat: 53.343403598340540, lng: -6.2378740310668945 },
    { lat: 53.342711819899620, lng: -6.238946914672852 },
    { lat: 53.342135329292205, lng: -6.241779327392578,  stop_num: 3 }
    ]
  },
  to_route       : {
    name         : 'Route line 2b',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    { lat: 53.351319819095920, lng: -6.261026859283447 },
    { lat: 53.347464367681575, lng: -6.259310245513916 },
    { lat: 53.346593320406214, lng: -6.259052753448486 },
    { lat: 53.344659019437735, lng: -6.259202957153320 },
    { lat: 53.344159417510750, lng: -6.260726451873779 },
    { lat: 53.344185038264820, lng: -6.263515949249268,  stop_num: 43 }
    ]
  }
},
{ line_num   :3,
  name       :'Route line 3',
  from_route : {
    name         : 'Route line 3a',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    { lat: 0, lng: 0,  stop_num: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0,  stop_num: 0 }
    ]
  },
  to_route       : {
    name         : 'Route line 3b',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    { lat: 0, lng: 0,  stop_num: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0,  stop_num: 0 }
    ]
  }
},
{ line_num   :4,
  name       :'xxxxxxxxxxx',
  from_route : {
    name         : 'xxxxxxxx',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    ]
  },
  to_route       : {
    name         : 'xxxxxxxx',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    ]
  }
},
{ line_num   :5,
  name       :'xxxxxxxxxxx',
  from_route : {
    name         : 'xxxxxxxx',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    ]
  },
  to_route       : {
    name         : 'xxxxxxxx',
    dub_bus_url  : 'xxxxxxxx',
    stop_ini     : 0,
    stop_end     : 0,
    map_polyline : 0,
    track        : [
    ]
  }
}
];