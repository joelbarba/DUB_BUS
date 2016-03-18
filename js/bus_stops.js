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
      }
  }
  


  
  this.bus_stops = [
    { num          :  226, 
      name         : 'Shanard Road',
      user_lines   : [{ num: 1, dir: 'f', show: false }, 
                      { num: 2, dir: 't', show: false }
                     ],
      gname        : 'Shanard Rd',
      pos          : { lat: 53.391182789780610, lng: -6.2621855735778810 }, 
      stop_marker  : null,
      gmaps_url    : 'https://www.google.es/maps/place/Shanard+Road+(Shanard+Avenue)/@53.391444,-6.2648159,16.25z/data=!4m7!1m4!3m3!1s0x48670e930f92561d:0x09aac3c4c4057e0e!2sGrand+Canal+Dock,+Pearse+Square!3b1!3m1!1s0x48670e1ae35c9377:0x39229e9a1ebf6a98'
    },
    { num:  228, name: 'Shanliss Rd',       gname: 'Shanliss Road',                             pos: { lat: 53.391806602334235, lng: -6.2598037719726560 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Road/@53.3879977,-6.2592368,16z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e1bb5cf1a5f:0xe769a53dff25b16a' },
    { num:  229, name: 'Shanliss Rd',       gname: 'Shanliss Road',                             pos: { lat: 53.391352339738390, lng: -6.2565368413925170 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Road/@53.3879977,-6.2592368,16z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e199bf5e4c1:0xc90da21512ef2109' },
    { num:  227, name: 'Shanliss Rd',       gname: 'Shanliss Road',                             pos: { lat: 53.391147600082090, lng: -6.2512636184692380 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Avenue/@53.3894501,-6.2551598,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e186ef6c3a3:0x491c56eb7a8ac32d' },
    { num:  230, name: 'Shanliss Rd',       gname: 'Shanliss Road',                             pos: { lat: 53.389880751560284, lng: -6.2491339445114140 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Shanliss+Road/@53.3894501,-6.2551598,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e22b6cd5427:0x959281ddc1ab92f7' },
    { num:  231, name: 'Swords Road',		gname: 'Swords Road #1',                            pos: { lat: 53.389234516328000, lng: -6.2459635734558105 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Swords+Road+%231/@53.3893158,-6.2462978,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3cd1f5a8d9:0xd3cfc09236f90939' },
    { num: 1641, name: 'Swords Road',		gname: 'Swords Road',                               pos: { lat: 53.386524700395680, lng: -6.2424176931381230 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Swords+Road/@53.3870379,-6.2458257,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3b87ac5ae7:0x9c3e32d5c25b54e6' },
    { num: 1642, name: 'Swords Road',		gname: 'Whitehall',                                 pos: { lat: 53.383901101509790, lng: -6.2435817718505860 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Whitehall+(Church+Collins+Ave)/@53.3841391,-6.2445704,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3ea3cbcb43:0x90b78d21d91188f1' },
    { num:  213, name: 'Swords Road',		gname: 'Whitehall, Iveragh Road',                   pos: { lat: 53.381501326818174, lng: -6.2449336051940920 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Whitehall,+Iveragh+Road/@53.380741,-6.2447206,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3efffc011d:0xbcc9c30f1fe81657' },
    { num:  214, name: 'Swords Road',		gname: 'Whitehall, Highfield Hospital',             pos: { lat: 53.379584609614604, lng: -6.2466180324554440 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Whitehall,+Highfield+Hospital/@53.3786995,-6.2462656,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e3fec2f1f91:0x85971ef08bcfbee5' },
    { num: 4432, name: 'Swords Road',		gname: 'Swords Road (Griffith Downs)',              pos: { lat: 53.377206992433140, lng: -6.2484955787658690 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Swords+Road+(Griffith+Downs)/@53.3763954,-6.2489693,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6a97cdc16b:0x3ac2a34ec80bbf9e' },
    { num:  119, name: 'Drumcondra Rd',     gname: 'Upper Drumcondra Road (Griffith Avenue)',   pos: { lat: 53.375114067460410, lng: -6.2508237361907960 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Drumcondra+Road+(Griffith+Avenue)/@53.3763954,-6.2489693,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6bb2738843:0xd6e56f2ba7575d98' },
    { num:   44, name: 'Drumcondra Rd',     gname: 'Homefarm Road',                             pos: { lat: 53.372989035352300, lng: -6.2522318959236145 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/37+Drumcondra+Rd+Upper,+Dublin,+Ireland/@53.3730373,-6.254448,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6be2047b2b:0xe2208c7ef9fc91ca' },
    { num: 7603, name: 'Drumcondra Rd',     gname: 'St. Patrick\'s College',                    pos: { lat: 53.371692841723906, lng: -6.2530982494354250 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/90+Drumcondra+Rd+Upper,+Dublin+9,+Ireland/@53.3716276,-6.2542149,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e694a74faf1:0x38bd62dcf97e9f1c' },
    { num:   45, name: 'Drumcondra Rd',     gname: 'Upper Drumcondra Road',                     pos: { lat: 53.370002930056680, lng: -6.2540906667709350 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Drumcondra+Road/@53.3697096,-6.2539232,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e6f26ad1d3b:0x473bf87e231b5940' },
    { num:   46, name: 'Drumcondra Rd',     gname: 'Botanic Avenue',                            pos: { lat: 53.367170257295980, lng: -6.2553647160530090 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Botanic+Avenue/@53.366547,-6.2548435,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e658146d421:0x15d9d58e7cfcacd4' },
    { num:   47, name: 'Drumcondra Rd',     gname: 'Near Train Station',                        pos: { lat: 53.363914851595645, lng: -6.2573388218879700 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Near+Train+Station/@53.3639118,-6.2570674,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e64c4b60625:0xdf605599b7b63ef7' },
    { num:   48, name: 'Drumcondra Rd',     gname: 'Lower Drumcondra Road',                     pos: { lat: 53.362341476400610, lng: -6.2587684392929080 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Lower+Drumcondra+Road/@53.3623048,-6.2583755,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7b51072fe3:0xc71023cb8c78fbac' },
    { num:   49, name: 'Dorset St',			gname: 'Lower Dorset Street',                       pos: { lat: 53.358771956130710, lng: -6.2622365355491640 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/51+R132,+Dublin,+Ireland/@53.3594866,-6.2611143,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670c2941195343:0xd6311f5ce5885af8' },
    { num:   51, name: 'Dorset St',			gname: 'Upper Dorset St (Temple Street)',           pos: { lat: 53.357835507807240, lng: -6.2632718682289120 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Dorset+St+(Temple+Street)/@53.3574083,-6.2630089,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7ddcad9a41:0x7764cff6a4047c28' },
    { num:   52, name: 'Dorset St',			gname: 'Upper Dorset St (St.Joseph\'s Parade)',     pos: { lat: 53.356650911219040, lng: -6.2645807862281800 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Upper+Dorset+St+(St.Joseph\'s+Parade)/@53.3574083,-6.2630089,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e7e0507b487:0x5c835988be495577' },
    { num:  265, name: 'Parnell Square',	gname: 'Gate Theatre',                              pos: { lat: 53.353654055004775, lng: -6.2623947858810425 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Dublin+(Parnell+Square)/@53.3537726,-6.2622927,19z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e872888c3a7:0x860145c78860b84a' },
    { num:  271, name: 'O\'Connell St',     gname: 'Lower O\'Connell Street',                   pos: { lat: 53.348597983438990, lng: -6.2595610320568085 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Lower+O\'Connell+Street/@53.3485165,-6.2595073,20z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e845a262729:0xdd6dbbc55120f6cf' },
    { num:  340, name: 'Townsend St',       gname: 'Pearse Street Garda Station',               pos: { lat: 53.345941624501550, lng: -6.2561412155628200 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Pearse+Street+Garda+Station/@53.3467138,-6.2570981,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e854a0af273:0x41a994032ecdbbc9' },
    { num:  350, name: 'Townsend Street',   gname: 'Dublin City South, Lower Sandwith Street',  pos: { lat: 53.345626180891320, lng: -6.2497320771217350 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Dublin+City+South,+Lower+Sandwith+Street/@53.3463584,-6.2514594,17.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e91da39a097:0xc535db2ff73adeed' },
    { num:  351, name: 'Pearse Street',		gname: 'Pearse Station',                            pos: { lat: 53.343025683731260, lng: -6.2437748908996580 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/130+Pearse+St,+Dublin+2,+Ireland/@53.3428719,-6.2459828,17z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e93a5a08915:0xa1e7a7c651e28b35' },
    { num:  352, name: 'Pearse Street',		gname: 'Grand Canal Dock, Pearse Square',           pos: { lat: 53.342932805899300, lng: -6.2424123287200930 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Saint+Andrew\'s+Resource+Centre/@53.3428719,-6.2459828,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e93119bb3f5:0x55bd6300b04ed85f' },
    { num:  353, name: 'Pearse Street',		gname: 'Pearse Street',                             pos: { lat: 53.342593319688916, lng: -6.2396550178527830 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Pearse+Street/@53.3425068,-6.2400497,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e9335374cd7:0x6b6cb3b4172b4f48' },
    { num:  354, name: 'Ringsend Road',     gname: 'Barrow Street',                             pos: { lat: 53.342192978703680, lng: -6.2363612651824950 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Barrow+Street/@53.3425068,-6.2400497,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eec89328961:0x329a5395c4ec53bd' },
    { num:  355, name: 'Ringsend Road',     gname: 'Ringsend Garage',                           pos: { lat: 53.341755802054520, lng: -6.2328502535820010 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Ringsend+Garage/@53.3417926,-6.2329955,18z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eec03375df7:0xed231ba108de6f41' },
    { num:  356, name: 'Bridge Street',		gname: 'Ringsend, Bridge Street',                   pos: { lat: 53.341885514275200, lng: -6.2266838550567630 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Ringsend,+Bridge+Street/@53.3419559,-6.2277169,17z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eef4b5cfb6b:0x228b6722a8f1990b' },
    { num:  357, name: 'Irishtown Rd',      gname: 'Irishtown Road',                            pos: { lat: 53.338612161783750, lng: -6.2230440974235535 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Irishtown+Rd,+Dublin,+Ireland/@53.339166,-6.2237597,19z/data=!3m1!4b1!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ee7cb03ae6b:0x71bbd254b4394b71' },
    { num:  390, name: 'Tritonville Road',  gname: 'Tritonville Road',                          pos: { lat: 53.337551951679416, lng: -6.2223359942436220 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Tritonville+Road/@53.3376702,-6.2227789,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ee793bf8361:0x066a464f76036517' },
    { num:  372, name: 'Sandymount Rd',     gname: 'Star Of The Sea Church',                    pos: { lat: 53.335487509251690, lng: -6.2197020649909970 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount+Road/@53.3354912,-6.2200633,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edda2e64df1:0x9415c86e37227a5e' },
    { num:  373, name: 'Sandymount Rd',     gname: 'Sandymount, Farney Park',                   pos: { lat: 53.334262249853590, lng: -6.2179318070411680 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Farney+Park/@53.3346831,-6.2192378,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670eddcc9c0469:0x36251c5fb06ef542' },
    { num:  374, name: 'Sandymount Rd',     gname: 'Sandymount Road',                           pos: { lat: 53.333168295709270, lng: -6.2163949012756350 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount+Road/@53.3333229,-6.2168392,19z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edc20a722f5:0x7f5dda6e9f2519df' },
    { num:  375, name: 'Seafort Ave',		gname: 'Sandymount, Seafort Avenue',                pos: { lat: 53.333996371924970, lng: -6.2143537402153015 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Seafort+Avenue/@53.3333893,-6.215345,18z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670edef3f77295:0xebd109e2b3f7837b' },
    { num: 2804, name: 'Strand Road',		gname: 'Newgrove Avenue',                           pos: { lat: 53.332759857613250, lng: -6.2107729911804200 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/5+N+Strand+Rd,+North+Strand,+Dublin+1,+Ireland/@53.3305309,-6.2134549,16.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670e8a5bcbb90d:0x933c50d3055edf2' },
    { num:  376, name: 'Strand Road',		gname: 'Sandymount, Strand Road (Lea Road)',        pos: { lat: 53.330703192245620, lng: -6.2093085050582890 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Strand+Road+(Lea+Road)/@53.3305228,-6.2103243,18.25z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x0000000000000000:0xbe2e0f7055ab5896' },
    { num:  377, name: 'Strand Road',		gname: 'Strand Road (Gilford Road)',                pos: { lat: 53.328595167522750, lng: -6.2088471651077270 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Strand+Road+(Gilford+Road)/@53.3271989,-6.2093527,16.75z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670ed87a6225f1:0x0eda47b6cb8fd5d6' },
    { num:  378, name: 'Strand Road',		gname: 'Sandymount, Sandymount Tower',              pos: { lat: 53.325673234570030, lng: -6.2073397636413570 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Sandymount,+Sandymount+Tower/@53.3255567,-6.2079045,17.75z/data=!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2092066!2d53.3246807!3e3!3m1!1s0x48670f281c39bca1:0xe8ba5d879f15e735' },
    { num:  380, name: 'St. John\'s Road',  gname: 'Saint John\'s Road East',                   pos: { lat: 53.324707222590640, lng: -6.2092146277427670 }, stop_marker  : null, gmaps_url: 'https://www.google.es/maps/place/Saint+John\'s+Road+East/@53.3247164,-6.2093105,80m/data=!3m1!1e3!4m13!1m10!4m9!1m3!2m2!1d-6.2621663!2d53.3912044!1m3!2m2!1d-6.2101811!2d53.3245516!3e3!3m1!1s0x48670ed7b89aa90f:0x0167d1d01f99f0d4!6m1!1e1' }
  ];

  return this;
  
}());  // <-- End bus_stops