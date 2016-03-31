var stops_obj = (function() {
  
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
              animation  : google.maps.Animation.DROP,
              stop_index : t
          });
        
        // Set the listener to open the info window
        bus_stops[t].stop_marker.addListener('click', function() { open_stop_infowindow(this); });
        
      }
  };
  

  
  
  // Create the info window for the stop marker
  this.open_stop_infowindow = function(that) {
      console.log(that);
      var ind = that.stop_index;

      var ttdata = {}; 
      ttdata.title        = that.title;
      ttdata.gname        = stops_obj.bus_stops[ind].gname;
      ttdata.gmaps_url    = stops_obj.bus_stops[ind].gmaps_url;
      ttdata.line_stops   = stops_obj.bus_stops[ind].user_lines;

      app.infowindow.setContent(temp_mark_info(ttdata));
      app.infowindow.open(app.map, that);        
    
    
  };
  
  
  // Initialization of all stops_obj.bus_stops[].user_lines[] from bus_tracks object
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
    
      // Get the index of the array stops_obj.bus_stops[].user_lines[ind]
      var ind = get_stop_line_index(stop, stop_info.line_num, stop_info.direction);

      if (next_state) { // show
          stop.stop_marker.setMap(app.map);
          if (ind != null) stop.user_lines[ind].show = true;
        
      } else { // hide (if all are unchecked)
          if (ind != null) stop.user_lines[ind].show = false;
          if (is_all_stop_line_unchecked(stop)) stop.stop_marker.setMap(null);
//          infowindow.close();
      }
  };


  
  this.bus_stops = [
    { num          :  226, 
      name         : 'Shanard Road',
      user_lines   : [{ num: 1, dir: 'from', show: false },
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
  ,
{ num : 5171, name : 'Brehon Field Rd', user_lines : [], gname : '', pos : { lat: 53.271739 , lng: -6.248255 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2976, name : 'Brehon Field Rd', user_lines : [], gname : '', pos : { lat: 53.272028 , lng: -6.25542 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2977, name : 'Brehon Field Rd', user_lines : [], gname : '', pos : { lat: 53.273571 , lng: -6.260242 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2978, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.276992 , lng: -6.265478 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2979, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.278496 , lng: -6.268329 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2980, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.280031 , lng: -6.273081 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2981, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.281284 , lng: -6.277282 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2991, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.283271 , lng: -6.279268 }, stop_marker  : null, gmaps_url    : '' },
{ num : 2992, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.28462 , lng: -6.281187 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1325, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.286503 , lng: -6.282394 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1326, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.288808 , lng: -6.282896 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1327, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.291168 , lng: -6.282505 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1328, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.292207 , lng: -6.282351 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1329, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.295012 , lng: -6.28196 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1330, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.296188 , lng: -6.283981 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1331, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.298501 , lng: -6.28459 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1332, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.300767 , lng: -6.28403 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1333, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.303101 , lng: -6.284045 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1334, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.304844 , lng: -6.283446 }, stop_marker  : null, gmaps_url    : '' },
{ num : 7293, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.306161 , lng: -6.283521 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1335, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.307417 , lng: -6.283988 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1336, name : 'Terenure Rd', user_lines : [], gname : '', pos : { lat: 53.308861 , lng: -6.2841 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1337, name : 'Terenure Village', user_lines : [], gname : '', pos : { lat: 53.311106 , lng: -6.283057 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1338, name : 'Terenure Rd N', user_lines : [], gname : '', pos : { lat: 53.312429 , lng: -6.282572 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1339, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.315023 , lng: -6.282285 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1340, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.316415 , lng: -6.280999 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1341, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.319217 , lng: -6.27898 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1342, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.321263 , lng: -6.279319 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1343, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.32266 , lng: -6.279359 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1344, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.327229 , lng: -6.277562 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1345, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.328785 , lng: -6.276229 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1347, name : 'Clanbrassil St', user_lines : [], gname : '', pos : { lat: 53.33118 , lng: -6.275335 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1348, name : 'South Circular Road', user_lines : [], gname : '', pos : { lat: 53.332248 , lng: -6.273879 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1349, name : 'South Circular Road', user_lines : [], gname : '', pos : { lat: 53.33239 , lng: -6.270873 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1350, name : 'Harrington Street', user_lines : [], gname : '', pos : { lat: 53.332559 , lng: -6.267474 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1352, name : 'Camden Street', user_lines : [], gname : '', pos : { lat: 53.334445 , lng: -6.265387 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1353, name : 'Camden Street', user_lines : [], gname : '', pos : { lat: 53.33601 , lng: -6.265415 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1355, name : 'Aungier Street', user_lines : [], gname : '', pos : { lat: 53.340092 , lng: -6.265835 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1357, name : 'George\'s St', user_lines : [], gname : '', pos : { lat: 53.342586 , lng: -6.264568 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1359, name : 'College Green', user_lines : [], gname : '', pos : { lat: 53.344418 , lng: -6.261423 }, stop_marker  : null, gmaps_url    : '' },
{ num : 320, name : 'Westmoreland Street', user_lines : [], gname : '', pos : { lat: 53.345647 , lng: -6.259275 }, stop_marker  : null, gmaps_url    : '' },
{ num : 278, name : 'O\'Connell St', user_lines : [], gname : '', pos : { lat: 53.351628 , lng: -6.261237 }, stop_marker  : null, gmaps_url    : '' },
{ num : 10, name : 'Parnell Square', user_lines : [], gname : '', pos : { lat: 53.353387 , lng: -6.265384 }, stop_marker  : null, gmaps_url    : '' },
{ num : 12, name : 'Dorset St', user_lines : [], gname : '', pos : { lat: 53.356789 , lng: -6.264623 }, stop_marker  : null, gmaps_url    : '' },
{ num : 14, name : 'Dorset St', user_lines : [], gname : '', pos : { lat: 53.358537 , lng: -6.262724 }, stop_marker  : null, gmaps_url    : '' },
{ num : 15, name : 'Dorset St', user_lines : [], gname : '', pos : { lat: 53.360251 , lng: -6.260973 }, stop_marker  : null, gmaps_url    : '' },
{ num : 17, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.363067 , lng: -6.258398 }, stop_marker  : null, gmaps_url    : '' },
{ num : 18, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.365849 , lng: -6.255931 }, stop_marker  : null, gmaps_url    : '' },
{ num : 19, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.367138 , lng: -6.255493 }, stop_marker  : null, gmaps_url    : '' },
{ num : 21, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.370092 , lng: -6.254291 }, stop_marker  : null, gmaps_url    : '' },
{ num : 7602, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.371739 , lng: -6.25324 }, stop_marker  : null, gmaps_url    : '' },
{ num : 85, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.3739 , lng: -6.251859 }, stop_marker  : null, gmaps_url    : '' },
{ num : 203, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.376396 , lng: -6.24993 }, stop_marker  : null, gmaps_url    : '' },
{ num : 204, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.379587 , lng: -6.246639 }, stop_marker  : null, gmaps_url    : '' },
{ num : 205, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.381411 , lng: -6.245341 }, stop_marker  : null, gmaps_url    : '' },
{ num : 215, name : 'Collins Ave', user_lines : [], gname : '', pos : { lat: 53.381867 , lng: -6.242433 }, stop_marker  : null, gmaps_url    : '' },
{ num : 216, name : 'Beaumont Road', user_lines : [], gname : '', pos : { lat: 53.382329 , lng: -6.238176 }, stop_marker  : null, gmaps_url    : '' },
{ num : 217, name : 'Beaumont Road', user_lines : [], gname : '', pos : { lat: 53.384324 , lng: -6.23678 }, stop_marker  : null, gmaps_url    : '' },
{ num : 218, name : 'Shantalla Road', user_lines : [], gname : '', pos : { lat: 53.385566 , lng: -6.2336 }, stop_marker  : null, gmaps_url    : '' },
{ num : 219, name : 'Shantalla Road', user_lines : [], gname : '', pos : { lat: 53.387858 , lng: -6.238386 }, stop_marker  : null, gmaps_url    : '' },
{ num : 220, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.387935 , lng: -6.244967 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1622, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.390037 , lng: -6.246394 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1623, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.391933 , lng: -6.246234 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1624, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.396075 , lng: -6.245461 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1625, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.40109 , lng: -6.24328 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1626, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.404162 , lng: -6.240322 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1627, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.408245 , lng: -6.237873 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1628, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.413711 , lng: -6.239062 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1629, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.416629 , lng: -6.239163 }, stop_marker  : null, gmaps_url    : '' },
{ num : 1630, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.42163 , lng: -6.231821 }, stop_marker  : null, gmaps_url    : '' },
{ num : 7347, name : 'Dublin Airport', user_lines : [], gname : '', pos : { lat: 53.428019 , lng: -6.242027 }, stop_marker  : null, gmaps_url    : '' },
  
  
  
  ];

  return this;
  
}());  // <-- End bus_stops