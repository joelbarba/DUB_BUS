shared_fun = function() {
    if (Meteor.isServer) {
        console.log('exe shared_fun (server)');
    }
    
    if (Meteor.isClient) {
        console.log('exe shared_fun (client)');        
    }
};




 


 /// DATA NORMALIZATION / REPLICATION






// This is to replicate the data of the DB Collections, crossing bus_stops and bus_tracks
data_replication2 = function() {

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
