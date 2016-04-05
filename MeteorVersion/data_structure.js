
MONGO DB COLLECTION STRUCTURE:
------------------------------



JavaScript Objects:

app.all_markers = [

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
]





bus_stops = [
  { num        : 10, 
    name 	     : 'Parnell Square', 
    user_lines* : [{ line_num: 1, direction: 'from' },
                  { line_num: 1, direction:   'to' },
                  { line_num: 2, direction: 'from' },
                  { line_num: 2, direction:   'to' }
                 ], 
    gname      : '', 
    pos 	     : { lat: 53.353387 , lng: -6.265384 },
    gmaps_url  : '' 
  }, ...
]


bus_tracks = [
  { line_num   : 1,
    name       : 'Santry / Sandymount',
    from_route : {
      name         : 'From Santry Towards Sandymount', 
      dub_bus_url  : 'http://www.dublinbus.ie/en/Examples/Google-Map/?routeNumber=1&direction=IO&towards=Sandymount+(St.+John%26%2339%3bs+Church)&from=Santry+(Shanard+Rd.)',
      stop_ini*     : 226,
      stop_end*     : 3800,
      map_polyline : null,
      stops*        : [
        { stop_num:  226 },
        { stop_num:  228 },
        ...
      ],
      track        : [
      { lat: 53.391182789780610, lng: -6.2621855735778810,  stop_num:  226 },
      { lat: 53.391198785088490, lng: -6.2624108791351320 },
      { lat: 53.391851388524810, lng: -6.2623465061187740 },
      { lat: 53.391889776650636, lng: -6.2615633010864260 },
      { lat: 53.391876980612540, lng: -6.2605333328247070 },                
      { lat: 53.391806602334235, lng: -6.2598037719726560,  stop_num:  228 },
      { lat: 53.391633855157780, lng: -6.2577867507934570 }, 
      { lat: 53.391352339738390, lng: -6.2565368413925170,  stop_num:  229 },
      { lat: 53.391141201951960, lng: -6.2555015087127686 }, 
      { lat: 53.391064424315430, lng: -6.2541925907135010 }, 
      { lat: 53.324707222590640, lng: -6.2092146277427670,  stop_num:  3800 }
      ]
    },
    to_route       : {
      name         : 'From Sandymount Towards Santry', 
      dub_bus_url  : '',
      stop_ini     : 0,
      stop_end     : 0,
      map_polyline : null,
      track        : [
    { lat: 53.346811083893440000, lng: -6.261284351348877000, stop_num: 2804 },
    { lat: 53.345901593715840000, lng: -6.258473396301269500 }, 
    { lat: 53.346452414027640000, lng: -6.255512237548828000 }, 
    ...
    { lat: 53.349923699220660000, lng: -6.247658729553223000, stop_num: 374 }
      ]
    }
  }
]