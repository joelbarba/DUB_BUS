// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
    // code to run on server at startup

    if (!bus_stops.findOne()) {
        console.log("Initialize bus_stops collection.");

		bus_stops.insert({ num : 10, name : 'Parnell Square', user_lines : [], gname : '', pos : { lat: 53.353387 , lng: -6.265384 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 12, name : 'Dorset St', user_lines : [], gname : '', pos : { lat: 53.356789 , lng: -6.264623 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 14, name : 'Dorset St', user_lines : [], gname : '', pos : { lat: 53.358537 , lng: -6.262724 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 15, name : 'Dorset St', user_lines : [], gname : '', pos : { lat: 53.360251 , lng: -6.260973 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 17, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.363067 , lng: -6.258398 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 18, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.365849 , lng: -6.255931 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 19, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.367138 , lng: -6.255493 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 21, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.370092 , lng: -6.254291 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 44, name : 'Drumcondra Rd', user_lines : [], gname : 'Homefarm Road', pos : { lat: 53.3729890353523 , lng: -6.25223189592361 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 45, name : 'Drumcondra Rd', user_lines : [], gname : 'Upper Drumcondra Road', pos : { lat: 53.3700029300567 , lng: -6.25409066677094 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 46, name : 'Drumcondra Rd', user_lines : [], gname : 'Botanic Avenue', pos : { lat: 53.367170257296 , lng: -6.25536471605301 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 47, name : 'Drumcondra Rd', user_lines : [], gname : 'Near Train Station', pos : { lat: 53.3639148515957 , lng: -6.25733882188797 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 48, name : 'Drumcondra Rd', user_lines : [], gname : 'Lower Drumcondra Road', pos : { lat: 53.3623414764006 , lng: -6.25876843929291 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 49, name : 'Dorset St', user_lines : [], gname : 'Lower Dorset Street', pos : { lat: 53.3587719561307 , lng: -6.26223653554916 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 51, name : 'Dorset St', user_lines : [], gname : 'Upper Dorset St (Temple Street)', pos : { lat: 53.3578355078072 , lng: -6.26327186822891 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 52, name : 'Dorset St', user_lines : [], gname : 'Upper Dorset St (St.Joseph\'s Parade)', pos : { lat: 53.356650911219 , lng: -6.26458078622818 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 85, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.3739 , lng: -6.251859 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 119, name : 'Drumcondra Rd', user_lines : [], gname : 'Upper Drumcondra Road (Griffith Avenue)', pos : { lat: 53.3751140674604 , lng: -6.2508237361908 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 203, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.376396 , lng: -6.24993 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 204, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.379587 , lng: -6.246639 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 205, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.381411 , lng: -6.245341 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 213, name : 'Swords Road', user_lines : [], gname : 'Whitehall, Iveragh Road', pos : { lat: 53.3815013268182 , lng: -6.24493360519409 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 214, name : 'Swords Road', user_lines : [], gname : 'Whitehall, Highfield Hospital', pos : { lat: 53.3795846096146 , lng: -6.24661803245544 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 215, name : 'Collins Ave', user_lines : [], gname : '', pos : { lat: 53.381867 , lng: -6.242433 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 216, name : 'Beaumont Road', user_lines : [], gname : '', pos : { lat: 53.382329 , lng: -6.238176 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 217, name : 'Beaumont Road', user_lines : [], gname : '', pos : { lat: 53.384324 , lng: -6.23678 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 218, name : 'Shantalla Road', user_lines : [], gname : '', pos : { lat: 53.385566 , lng: -6.2336 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 219, name : 'Shantalla Road', user_lines : [], gname : '', pos : { lat: 53.387858 , lng: -6.238386 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 220, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.387935 , lng: -6.244967 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 226, name : 'Shanard Road', user_lines : [], gname : 'Shanard Rd', pos : { lat: 53.3911827897806 , lng: -6.26218557357788 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 227, name : 'Shanliss Rd', user_lines : [], gname : 'Shanliss Road', pos : { lat: 53.3911476000821 , lng: -6.25126361846924 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 228, name : 'Shanliss Rd', user_lines : [], gname : 'Shanliss Road', pos : { lat: 53.3918066023342 , lng: -6.25980377197266 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 229, name : 'Shanliss Rd', user_lines : [], gname : 'Shanliss Road', pos : { lat: 53.3913523397384 , lng: -6.25653684139252 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 230, name : 'Shanliss Rd', user_lines : [], gname : 'Shanliss Road', pos : { lat: 53.3898807515603 , lng: -6.24913394451141 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 231, name : 'Swords Road', user_lines : [], gname : 'Swords Road #1', pos : { lat: 53.389234516328 , lng: -6.24596357345581 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 265, name : 'Parnell Square', user_lines : [], gname : 'Gate Theatre', pos : { lat: 53.3536540550048 , lng: -6.26239478588104 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 271, name : 'O\'Connell St', user_lines : [], gname : 'Lower O\'Connell Street', pos : { lat: 53.348597983439 , lng: -6.25956103205681 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 278, name : 'O\'Connell St', user_lines : [], gname : '', pos : { lat: 53.351628 , lng: -6.261237 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 320, name : 'Westmoreland Street', user_lines : [], gname : '', pos : { lat: 53.345647 , lng: -6.259275 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 340, name : 'Townsend St', user_lines : [], gname : 'Pearse Street Garda Station', pos : { lat: 53.3459416245016 , lng: -6.25614121556282 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 350, name : 'Townsend Street', user_lines : [], gname : 'Dublin City South, Lower Sandwith Street', pos : { lat: 53.3456261808913 , lng: -6.24973207712173 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 351, name : 'Pearse Street', user_lines : [], gname : 'Pearse Station', pos : { lat: 53.3430256837313 , lng: -6.24377489089966 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 352, name : 'Pearse Street', user_lines : [], gname : 'Grand Canal Dock, Pearse Square', pos : { lat: 53.3429328058993 , lng: -6.24241232872009 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 353, name : 'Pearse Street', user_lines : [], gname : 'Pearse Street', pos : { lat: 53.3425933196889 , lng: -6.23965501785278 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 354, name : 'Ringsend Road', user_lines : [], gname : 'Barrow Street', pos : { lat: 53.3421929787037 , lng: -6.2363612651825 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 355, name : 'Ringsend Road', user_lines : [], gname : 'Ringsend Garage', pos : { lat: 53.3417558020545 , lng: -6.232850253582 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 356, name : 'Bridge Street', user_lines : [], gname : 'Ringsend, Bridge Street', pos : { lat: 53.3418855142752 , lng: -6.22668385505676 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 357, name : 'Irishtown Rd', user_lines : [], gname : 'Irishtown Road', pos : { lat: 53.3386121617838 , lng: -6.22304409742355 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 372, name : 'Sandymount Rd', user_lines : [], gname : 'Star Of The Sea Church', pos : { lat: 53.3354875092517 , lng: -6.219702064991 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 373, name : 'Sandymount Rd', user_lines : [], gname : 'Sandymount, Farney Park', pos : { lat: 53.3342622498536 , lng: -6.21793180704117 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 374, name : 'Sandymount Rd', user_lines : [], gname : 'Sandymount Road', pos : { lat: 53.3331682957093 , lng: -6.21639490127564 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 375, name : 'Seafort Ave', user_lines : [], gname : 'Sandymount, Seafort Avenue', pos : { lat: 53.333996371925 , lng: -6.2143537402153 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 376, name : 'Strand Road', user_lines : [], gname : 'Sandymount, Strand Road (Lea Road)', pos : { lat: 53.3307031922456 , lng: -6.20930850505829 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 377, name : 'Strand Road', user_lines : [], gname : 'Strand Road (Gilford Road)', pos : { lat: 53.3285951675228 , lng: -6.20884716510773 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 378, name : 'Strand Road', user_lines : [], gname : 'Sandymount, Sandymount Tower', pos : { lat: 53.32567323457 , lng: -6.20733976364136 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 380, name : 'St. John\'s Road', user_lines : [], gname : 'Saint John\'s Road East', pos : { lat: 53.3247072225906 , lng: -6.20921462774277 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 390, name : 'Tritonville Road', user_lines : [], gname : 'Tritonville Road', pos : { lat: 53.3375519516794 , lng: -6.22233599424362 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1325, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.286503 , lng: -6.282394 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1326, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.288808 , lng: -6.282896 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1327, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.291168 , lng: -6.282505 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1328, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.292207 , lng: -6.282351 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1329, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.295012 , lng: -6.28196 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1330, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.296188 , lng: -6.283981 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1331, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.298501 , lng: -6.28459 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1332, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.300767 , lng: -6.28403 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1333, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.303101 , lng: -6.284045 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1334, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.304844 , lng: -6.283446 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1335, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.307417 , lng: -6.283988 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1336, name : 'Terenure Rd', user_lines : [], gname : '', pos : { lat: 53.308861 , lng: -6.2841 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1337, name : 'Terenure Village', user_lines : [], gname : '', pos : { lat: 53.311106 , lng: -6.283057 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1338, name : 'Terenure Rd N', user_lines : [], gname : '', pos : { lat: 53.312429 , lng: -6.282572 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1339, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.315023 , lng: -6.282285 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1340, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.316415 , lng: -6.280999 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1341, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.319217 , lng: -6.27898 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1342, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.321263 , lng: -6.279319 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1343, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.32266 , lng: -6.279359 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1344, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.327229 , lng: -6.277562 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1345, name : 'Harold\'s Cross Rd', user_lines : [], gname : '', pos : { lat: 53.328785 , lng: -6.276229 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1347, name : 'Clanbrassil St', user_lines : [], gname : '', pos : { lat: 53.33118 , lng: -6.275335 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1348, name : 'South Circular Road', user_lines : [], gname : '', pos : { lat: 53.332248 , lng: -6.273879 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1349, name : 'South Circular Road', user_lines : [], gname : '', pos : { lat: 53.33239 , lng: -6.270873 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1350, name : 'Harrington Street', user_lines : [], gname : '', pos : { lat: 53.332559 , lng: -6.267474 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1352, name : 'Camden Street', user_lines : [], gname : '', pos : { lat: 53.334445 , lng: -6.265387 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1353, name : 'Camden Street', user_lines : [], gname : '', pos : { lat: 53.33601 , lng: -6.265415 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1355, name : 'Aungier Street', user_lines : [], gname : '', pos : { lat: 53.340092 , lng: -6.265835 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1357, name : 'George\'s St', user_lines : [], gname : '', pos : { lat: 53.342586 , lng: -6.264568 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1359, name : 'College Green', user_lines : [], gname : '', pos : { lat: 53.344418 , lng: -6.261423 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1622, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.390037 , lng: -6.246394 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1623, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.391933 , lng: -6.246234 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1624, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.396075 , lng: -6.245461 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1625, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.40109 , lng: -6.24328 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1626, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.404162 , lng: -6.240322 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1627, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.408245 , lng: -6.237873 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1628, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.413711 , lng: -6.239062 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1629, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.416629 , lng: -6.239163 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1630, name : 'Swords Road', user_lines : [], gname : '', pos : { lat: 53.42163 , lng: -6.231821 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1641, name : 'Swords Road', user_lines : [], gname : 'Swords Road', pos : { lat: 53.3865247003957 , lng: -6.24241769313812 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 1642, name : 'Swords Road', user_lines : [], gname : 'Whitehall', pos : { lat: 53.3839011015098 , lng: -6.24358177185059 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2804, name : 'Strand Road', user_lines : [], gname : 'Newgrove Avenue', pos : { lat: 53.3327598576132 , lng: -6.21077299118042 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2976, name : 'Brehon Field Rd', user_lines : [], gname : '', pos : { lat: 53.272028 , lng: -6.25542 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2977, name : 'Brehon Field Rd', user_lines : [], gname : '', pos : { lat: 53.273571 , lng: -6.260242 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2978, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.276992 , lng: -6.265478 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2979, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.278496 , lng: -6.268329 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2980, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.280031 , lng: -6.273081 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2981, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.281284 , lng: -6.277282 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2991, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.283271 , lng: -6.279268 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 2992, name : 'Grange Road', user_lines : [], gname : '', pos : { lat: 53.28462 , lng: -6.281187 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 4432, name : 'Swords Road', user_lines : [], gname : 'Swords Road (Griffith Downs)', pos : { lat: 53.3772069924331 , lng: -6.24849557876587 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 5171, name : 'Brehon Field Rd', user_lines : [], gname : '', pos : { lat: 53.271739 , lng: -6.248255 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 7293, name : 'Rathfarnham Rd', user_lines : [], gname : '', pos : { lat: 53.306161 , lng: -6.283521 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 7347, name : 'Dublin Airport', user_lines : [], gname : '', pos : { lat: 53.428019 , lng: -6.242027 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 7602, name : 'Drumcondra Rd', user_lines : [], gname : '', pos : { lat: 53.371739 , lng: -6.25324 }, stop_marker  : null, gmaps_url    : '' });
		bus_stops.insert({ num : 7603, name : 'Drumcondra Rd', user_lines : [], gname : 'St. Patrick\'s College', pos : { lat: 53.3716928417239 , lng: -6.25309824943543 }, stop_marker  : null, gmaps_url    : '' });


	
    };


    if (!bus_tracks.findOne()) {
        console.log("Initialize bus_track collection.");


        bus_tracks.insert(
		{ line_num   : 1,
		  name       : 'Santry / Sandymount',
		  from_route : {
		    name         : 'From Santry Towards Sandymount', 
		    dub_bus_url  : 'http://www.dublinbus.ie/en/Examples/Google-Map/?routeNumber=1&direction=IO&towards=Sandymount+(St.+John%26%2339%3bs+Church)&from=Santry+(Shanard+Rd.)',
		    stop_ini     : 226,
		    stop_end     : 3800,
		    map_polyline : null,
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
		    { lat: 53.391147600082090, lng: -6.2512636184692380,  stop_num:  227 },
		    { lat: 53.391096415014170, lng: -6.2506198883056640 }, 
		    { lat: 53.390814896040220, lng: -6.2496650218963620 }, 
		    { lat: 53.390565366302220, lng: -6.2493216991424560 }, 
		    { lat: 53.390232657709454, lng: -6.2492251396179200 },                 
		    { lat: 53.389880751560284, lng: -6.2491339445114140,  stop_num:  230 },
		    { lat: 53.389599224546300, lng: -6.2491393089294430 }, 
		    { lat: 53.389775179148245, lng: -6.2462478876113890 }, 
		    { lat: 53.389234516328000, lng: -6.2459635734558105,  stop_num:  231 },
		    { lat: 53.388866605748830, lng: -6.2459099292755130 }, 
		    { lat: 53.388613865334605, lng: -6.2457919120788570 }, 
		    { lat: 53.388319532834360, lng: -6.2455075979232790 }, 
		    { lat: 53.387734061050146, lng: -6.2444722652435300 }, 
		    { lat: 53.387641280629374, lng: -6.2441396713256840 }, 
		    { lat: 53.387462117865326, lng: -6.2419939041137695 }, 
		    { lat: 53.387020606406780, lng: -6.2422031164169310 }, 
		    { lat: 53.386524700395680, lng: -6.2424176931381230,  stop_num: 1641 },
		    { lat: 53.385395292889264, lng: -6.2429809570312500 }, 
		    { lat: 53.383901101509790, lng: -6.2435817718505860,  stop_num: 1642 },
		    { lat: 53.381808505526990, lng: -6.2447941303253170 }, 
		    { lat: 53.381501326818174, lng: -6.2449336051940920,  stop_num:  213 },
		    { lat: 53.381366935436220, lng: -6.2450784444808960 }, 
		    { lat: 53.379623008802810, lng: -6.2465053796768190 }, 
		    { lat: 53.379584609614604, lng: -6.2466180324554440,  stop_num:  214 },
		    { lat: 53.379466211899690, lng: -6.2466341257095340 }, 
		    { lat: 53.377363797654844, lng: -6.2484204769134520 }, 
		    { lat: 53.377206992433140, lng: -6.2484955787658690,  stop_num: 4432 },
		    { lat: 53.377114189070770, lng: -6.2487101554870605 }, 
		    { lat: 53.376378155241440, lng: -6.2496542930603030 }, 
		    { lat: 53.375859723778476, lng: -6.2502229213714600 }, 
		    { lat: 53.375347686509485, lng: -6.2506628036499020 }, 
		    { lat: 53.375114067460410, lng: -6.2508237361907960,  stop_num:  119 },
		    { lat: 53.374976455639974, lng: -6.2510383129119870 }, 
		    { lat: 53.374406801979106, lng: -6.2514567375183105 }, 
		    { lat: 53.373395487946530, lng: -6.2520360946655270 }, 
		    { lat: 53.372989035352300, lng: -6.2522318959236145,  stop_num:   44 },
		    { lat: 53.372880220613780, lng: -6.2523365020751950 }, 
		    { lat: 53.371830464153630, lng: -6.2530446052551270 }, 
		    { lat: 53.371692841723906, lng: -6.2530982494354250,  stop_num: 7603 },
		    { lat: 53.371609627946036, lng: -6.2531840801239010 }, 
		    { lat: 53.370591846278770, lng: -6.2537848949432370 }, 
		    { lat: 53.370143758589610, lng: -6.2540531158447270 }, 
		    { lat: 53.370002930056680, lng: -6.2540906667709350,  stop_num:   45 },
		    { lat: 53.369574040292930, lng: -6.2544393539428710 }, 
		    { lat: 53.368537005409140, lng: -6.2550079822540280 }, 
		    { lat: 53.368447383925400, lng: -6.2551099061965940 }, 
		    { lat: 53.367711200316705, lng: -6.2554425001144410 }, 
		    { lat: 53.367183060760420, lng: -6.2554585933685300 }, 
		    { lat: 53.367170257295980, lng: -6.2553647160530090,  stop_num:   46 },
		    { lat: 53.367090235555860, lng: -6.2554532289505005 }, 
		    { lat: 53.366664517371674, lng: -6.2555176019668580 }, 
		    { lat: 53.366344425709640, lng: -6.2556195259094240 }, 
		    { lat: 53.365893092380055, lng: -6.2558877468109130 }, 
		    { lat: 53.365176070734286, lng: -6.2563866376876830 }, 
		    { lat: 53.364583878580035, lng: -6.2568587064743040 }, 
		    { lat: 53.364084510150490, lng: -6.2572771310806270 }, 
		    { lat: 53.363914851595645, lng: -6.2573388218879700,  stop_num:   47 },
		    { lat: 53.363902047149004, lng: -6.2574166059494020 }, 
		    { lat: 53.363476297106750, lng: -6.2577760219573975 }, 
		    { lat: 53.362618381842920, lng: -6.2585753202438354 }, 
		    { lat: 53.362341476400610, lng: -6.2587684392929080,  stop_num:   48 },
		    { lat: 53.362199021454680, lng: -6.2589615583419800 }, 
		    { lat: 53.361786059481844, lng: -6.2593424320220950 }, 
		    { lat: 53.361277054334330, lng: -6.2597554922103880 }, 
		    { lat: 53.360607975426090, lng: -6.2603777647018430 }, 
		    { lat: 53.359798023744325, lng: -6.2611126899719240 }, 
		    { lat: 53.359020071468926, lng: -6.2618529796600340 }, 
		    { lat: 53.358771956130710, lng: -6.2622365355491640,  stop_num:   49 },
		    { lat: 53.358677511848185, lng: -6.2622767686843870 }, 
		    { lat: 53.357982779676390, lng: -6.2631458044052120 }, 
		    { lat: 53.357835507807240, lng: -6.2632718682289120,  stop_num:   51 },
		    { lat: 53.357765073255100, lng: -6.2634569406509400 }, 
		    { lat: 53.357124753805520, lng: -6.2641704082489010 }, 
		    { lat: 53.356804590472980, lng: -6.2644922733306885 }, 
		    { lat: 53.356650911219040, lng: -6.2645807862281800,  stop_num:   52 },
		    { lat: 53.356519643084130, lng: -6.2648034095764160 }, 
		    { lat: 53.355981759674690, lng: -6.2652325630187990 }, 
		    { lat: 53.354630617834815, lng: -6.2636446952819820 }, 
		    { lat: 53.353810946935210, lng: -6.2626791000366210 }, 
		    { lat: 53.353654055004775, lng: -6.2623947858810425,  stop_num:  265 },
		    { lat: 53.353410711276290, lng: -6.2621963024139400 }, 
		    { lat: 53.353103327738720, lng: -6.2618637084960940 }, 
		    { lat: 53.352914413839790, lng: -6.2616705894470215 }, 
		    { lat: 53.352504563858375, lng: -6.2613379955291750 }, 
		    { lat: 53.351335829379764, lng: -6.2608283758163450 }, 
		    { lat: 53.349968529468480, lng: -6.2601900100708010 }, 
		    { lat: 53.348879781548180, lng: -6.2597501277923580 }, 
		    { lat: 53.348597983438990, lng: -6.2595610320568085,  stop_num:  271 },
		    { lat: 53.348386633634730, lng: -6.2595301866531370 }, 
		    { lat: 53.347618080059284, lng: -6.2591546773910520 }, 
		    { lat: 53.347016036747746, lng: -6.2588167190551760 }, 
		    { lat: 53.346724619112535, lng: -6.2586128711700440 }, 
		    { lat: 53.346385163091890, lng: -6.2580603361129760 }, 
		    { lat: 53.345869569060206, lng: -6.2572932243347170 }, 
		    { lat: 53.345904796180090, lng: -6.2564188241958620 }, 
		    { lat: 53.345941624501550, lng: -6.2561412155628200,  stop_num:  340 },
		    { lat: 53.345888783856470, lng: -6.2556302547454830 }, 
		    { lat: 53.345837544380520, lng: -6.2534040212631230 }, 
		    { lat: 53.345763887525976, lng: -6.2519127130508420 }, 
		    { lat: 53.345722255334486, lng: -6.2511563301086430 }, 
		    { lat: 53.345626180891320, lng: -6.2504106760025020 }, 
		    { lat: 53.345626180891320, lng: -6.2497320771217350,  stop_num:  350 },
		    { lat: 53.345562131142290, lng: -6.2493753433227540 }, 
		    { lat: 53.345459651343680, lng: -6.2485706806182860 }, 
		    { lat: 53.345325146234174, lng: -6.2480020523071290 }, 
		    { lat: 53.345155412990440, lng: -6.2476962804794310 }, 
		    { lat: 53.345008096797194, lng: -6.2473046779632570 }, 
		    { lat: 53.344819147021660, lng: -6.2471276521682740 }, 
		    { lat: 53.344582157983844, lng: -6.2470096349716190 }, 
		    { lat: 53.344255495259056, lng: -6.2468272447586060 }, 
		    { lat: 53.343525298942374, lng: -6.2464034557342530 }, 
		    { lat: 53.343237060111970, lng: -6.2449228763580320 }, 
		    { lat: 53.343025683731260, lng: -6.2437748908996580,  stop_num:  351 },
		    { lat: 53.343000062280595, lng: -6.2432062625885010 }, 
		    { lat: 53.342932805899300, lng: -6.2424123287200930,  stop_num:  352 },
		    { lat: 53.342836725170590, lng: -6.2419027090072630 }, 
		    { lat: 53.342606130538370, lng: -6.2400358915328980 }, 
		    { lat: 53.342593319688916, lng: -6.2396550178527830,  stop_num:  353 },
		    { lat: 53.342506846354354, lng: -6.2393063306808470 }, 
		    { lat: 53.342196181446460, lng: -6.2367314100265500 }, 
		    { lat: 53.342192978703680, lng: -6.2363612651824950,  stop_num:  354 },
		    { lat: 53.342109707306540, lng: -6.2360125780105590 }, 
		    { lat: 53.341779822865910, lng: -6.2334698438644410 }, 
		    { lat: 53.341755802054520, lng: -6.2328502535820010,  stop_num:  355 },
		    { lat: 53.341661320065140, lng: -6.2325310707092285 }, 
		    { lat: 53.341491572236290, lng: -6.2312382459640500 }, 
		    { lat: 53.341555628100170, lng: -6.2302404642105100 }, 
		    { lat: 53.341677333976390, lng: -6.2285828590393070 }, 
		    { lat: 53.341815053364760, lng: -6.2273597717285160 }, 
		    { lat: 53.341885514275200, lng: -6.2266838550567630,  stop_num:  356 },
		    { lat: 53.341805445049780, lng: -6.2265497446060180 }, 
		    { lat: 53.341651711715530, lng: -6.2262761592864990 }, 
		    { lat: 53.341276984391314, lng: -6.2258738279342650 }, 
		    { lat: 53.340863819678450, lng: -6.2252300977706910 }, 
		    { lat: 53.340085521788495, lng: -6.2238246202468870 }, 
		    { lat: 53.339874129785150, lng: -6.2235081195831300 }, 
		    { lat: 53.339665939666750, lng: -6.2233525514602660 }, 
		    { lat: 53.339313615612570, lng: -6.2232398986816410 }, 
		    { lat: 53.338820357046540, lng: -6.2231379747390750 }, 
		    { lat: 53.338612161783750, lng: -6.2230440974235535,  stop_num:  357 },
		    { lat: 53.338474432051300, lng: -6.2228697538375854 }, 
		    { lat: 53.338173346901160, lng: -6.2226390838623050 }, 
		    { lat: 53.337897884157170, lng: -6.2224942445755005 }, 
		    { lat: 53.337551951679416, lng: -6.2223359942436220,  stop_num:  390 },
		    { lat: 53.337302109811500, lng: -6.2223225831985470 }, 
		    { lat: 53.336709530298140, lng: -6.2222099304199220 }, 
		    { lat: 53.336148974531880, lng: -6.2221026420593260 }, 
		    { lat: 53.336043268904620, lng: -6.2219792604446410 }, 
		    { lat: 53.336014440051706, lng: -6.2218666076660160 }, 
		    { lat: 53.335918343734640, lng: -6.2211799621582030 }, 
		    { lat: 53.335780605302580, lng: -6.2205147743225100 }, 
		    { lat: 53.335594817875620, lng: -6.2199890613555910 }, 
		    { lat: 53.335487509251690, lng: -6.2197020649909970,  stop_num:  372 },
		    { lat: 53.335370590592950, lng: -6.2195867300033570 }, 
		    { lat: 53.334319909908570, lng: -6.2180900573730470 }, 
		    { lat: 53.334262249853590, lng: -6.2179318070411680,  stop_num:  373 },
		    { lat: 53.334134116118975, lng: -6.2178164720535280 }, 
		    { lat: 53.333272406755310, lng: -6.2166202068328860 }, 
		    { lat: 53.333168295709270, lng: -6.2163949012756350,  stop_num:  374 },
		    { lat: 53.333083404975980, lng: -6.2163519859313965 }, 
		    { lat: 53.332731026541060, lng: -6.2159013748168945 }, 
		    { lat: 53.332439511271970, lng: -6.2155205011367800 }, 
		    { lat: 53.332324186000160, lng: -6.2154883146286010 }, 
		    { lat: 53.332574057028324, lng: -6.2153166532516480 }, 
		    { lat: 53.333035353542634, lng: -6.2148338556289670 }, 
		    { lat: 53.333160287156730, lng: -6.2146997451782230 }, 
		    { lat: 53.333317254512220, lng: -6.2145870923995970 }, 
		    { lat: 53.333599153618756, lng: -6.2143027782440186 }, 
		    { lat: 53.333877847495000, lng: -6.2142974138259890 }, 
		    { lat: 53.333996371924970, lng: -6.2143537402153015,  stop_num:  375 },
		    { lat: 53.334153336203684, lng: -6.2143296003341675 }, 
		    { lat: 53.334422416480550, lng: -6.2143832445144650 }, 
		    { lat: 53.334540939397314, lng: -6.2144798040390015 }, 
		    { lat: 53.334608209014360, lng: -6.2143296003341675 }, 
		    { lat: 53.334678681832720, lng: -6.2140023708343510 }, 
		    { lat: 53.334758764439530, lng: -6.2138360738754270 }, 
		    { lat: 53.334416009827024, lng: -6.2133586406707760 }, 
		    { lat: 53.333999575283364, lng: -6.2127739191055300 }, 
		    { lat: 53.333865034023370, lng: -6.2125217914581300 }, 
		    { lat: 53.333695255161090, lng: -6.2120926380157470 }, 
		    { lat: 53.333381322654550, lng: -6.2115561962127686 }, 
		    { lat: 53.333057777551595, lng: -6.2111216783523560 }, 
		    { lat: 53.332759857613250, lng: -6.2107729911804200,  stop_num: 2804 },
		    { lat: 53.332660550504755, lng: -6.2107568979263310 }, 
		    { lat: 53.332436307796410, lng: -6.2106335163116455 }, 
		    { lat: 53.332109552025330, lng: -6.2104940414428710 }, 
		    { lat: 53.331869288832074, lng: -6.2103116512298580 }, 
		    { lat: 53.330844150669535, lng: -6.2094694375991820 }, 
		    { lat: 53.330703192245620, lng: -6.2093085050582890,  stop_num:  376 },
		    { lat: 53.330450106633780, lng: -6.2091904878616330 }, 
		    { lat: 53.330120131998780, lng: -6.2090134620666500 }, 
		    { lat: 53.328845060393950, lng: -6.2088686227798460 }, 
		    { lat: 53.328595167522750, lng: -6.2088471651077270,  stop_num:  377 },
		    { lat: 53.328169064763934, lng: -6.2087666988372800 }, 
		    { lat: 53.327675677305386, lng: -6.2086164951324460 }, 
		    { lat: 53.327022090328100, lng: -6.2083053588867190 }, 
		    { lat: 53.326317230405905, lng: -6.2078869342803955 }, 
		    { lat: 53.325881492993320, lng: -6.2075757980346680 }, 
		    { lat: 53.325673234570030, lng: -6.2073397636413570,  stop_num:  378 },
		    { lat: 53.325551483020945, lng: -6.2072914838790890 }, 
		    { lat: 53.325404099101970, lng: -6.2071788311004640 }, 
		    { lat: 53.325183022268950, lng: -6.2071037292480470 }, 
		    { lat: 53.325109329736720, lng: -6.2071305513381960 }, 
		    { lat: 53.325115737788070, lng: -6.2072700262069700 }, 
		    { lat: 53.325038841108540, lng: -6.2077635526657104 }, 
		    { lat: 53.324795334042484, lng: -6.2087720632553100 }, 
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
			{ lat: 53.347912693900780000, lng: -6.252593994140625000, stop_num: 372 }, 
			{ lat: 53.347618080059284000, lng: -6.248431205749512000 }, 
			{ lat: 53.346913560443760000, lng: -6.247272491455078000 }, 
			{ lat: 53.345671015658400000, lng: -6.246113777160644500 }, 
			{ lat: 53.345184235664380000, lng: -6.244890689849853500, stop_num: 373 }, 
			{ lat: 53.345312336201630000, lng: -6.243281364440918000 }, 
			{ lat: 53.345658205729780000, lng: -6.241950988769531000 }, 
			{ lat: 53.346567701099290000, lng: -6.239848136901855500 }, 
			{ lat: 53.349436967781216000, lng: -6.242294311523437500 }, 
			{ lat: 53.349923699220660000, lng: -6.247658729553223000, stop_num: 374 }
		    ]
		  }
    	});
    	
        bus_tracks.insert(
		{ line_num   : 2,
		  name       : 'Route line 2', 
		  from_route : {
		    name         : 'Route line 2a',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
			{ lat: 53.346298697447180, lng: -6.256284713745117, stop_num: 1 }, 
			{ lat: 53.344518106666435, lng: -6.256585121154785 }, 
			{ lat: 53.344095365558300, lng: -6.255812644958496 }, 
			{ lat: 53.342686198260340, lng: -6.253044605255127 }, 
			{ lat: 53.342481224591920, lng: -6.248688697814941 }, 
			{ lat: 53.343442030147070, lng: -6.246006488800049, stop_num: 32 }, 
			{ lat: 53.344505296391404, lng: -6.243689060211182 }, 
			{ lat: 53.345696635504154, lng: -6.244075298309326 }, 
			{ lat: 53.345914403571360, lng: -6.241242885589600 }, 
			{ lat: 53.346388365519815, lng: -6.238753795623779 }, 
			{ lat: 53.344697450112726, lng: -6.238839626312256 }, 
			{ lat: 53.343403598340540, lng: -6.2378740310668945 }, 
			{ lat: 53.342711819899620, lng: -6.238946914672852 }, 
			{ lat: 53.342135329292205, lng: -6.241779327392578, stop_num: 3 }      
		    ]
		  },
		  to_route       : {
		    name         : 'Route line 2b',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
			{ lat: 53.351319819095920, lng: -6.261026859283447 }, 
			{ lat: 53.347464367681575, lng: -6.259310245513916 }, 
			{ lat: 53.346593320406214, lng: -6.259052753448486 }, 
			{ lat: 53.344659019437735, lng: -6.259202957153320 }, 
			{ lat: 53.344159417510750, lng: -6.260726451873779 }, 
			{ lat: 53.344185038264820, lng: -6.263515949249268, stop_num: 43 }      
		    ]
		  }
    	});
    	
        bus_tracks.insert(
		{ line_num   : 3,
		  name       : 'Route line 3', 
		  from_route : {
		    name         : 'Route line 3a',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    { lat:  0.00000000000000000, lng:  0.00000000000000000,  stop_num: 0000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000,  stop_num: 0000 }      
		    ]
		  },
		  to_route       : {
		    name         : 'Route line 3b',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    { lat:  0.00000000000000000, lng:  0.00000000000000000,  stop_num: 0000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000 },
		    { lat:  0.00000000000000000, lng:  0.00000000000000000,  stop_num: 0000 }      
		    ]
		  }
    	});
    	
        bus_tracks.insert(
		{ line_num   : 4,
		  name       : 'xxxxxxxxxxx', 
		  from_route : {
		    name         : 'xxxxxxxx',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    ]
		  },
		  to_route       : {
		    name         : 'xxxxxxxx',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    ]
		  }
    	});
    	
        bus_tracks.insert(
		{ line_num   : 5,
		  name       : 'xxxxxxxxxxx', 
		  from_route : {
		    name         : 'xxxxxxxx',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    ]
		  },
		  to_route       : {
		    name         : 'xxxxxxxx',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    ]
		  }
    	});
    	
        bus_tracks.insert(
		{ line_num   : 16,
		  name       : 'AQUESTA', 
		  from_route : {
		    name         : 'xxxxxxxx',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    { lat: 53.271783479238216, lng: -6.247814297676086, stop_num: 5171 }, 
		    { lat: 53.271754606968585, lng: -6.248372197151184 }, 
		    { lat: 53.271661573967240, lng: -6.250995397567749 }, 
		    { lat: 53.271680822191040, lng: -6.252534985542297 }, 
		    { lat: 53.271754606968585, lng: -6.253650784492493 }, 
		    { lat: 53.271921424257170, lng: -6.254825592041016 }, 
		    { lat: 53.272036912767950, lng: -6.255496144294739, stop_num: 2976 }, 
		    { lat: 53.272316008714280, lng: -6.256687045097351 }, 
		    { lat: 53.272733045238596, lng: -6.258044242858887 }, 
		    { lat: 53.273305661838120, lng: -6.259500682353973 }, 
		    { lat: 53.273614422507820, lng: -6.260251700878143, stop_num: 2977 }, 
		    { lat: 53.274006585442040, lng: -6.261128783226013 }, 
		    { lat: 53.274612867069670, lng: -6.262303590774536 }, 
		    { lat: 53.274920816349340, lng: -6.262786388397217 }, 
		    { lat: 53.275915220749600, lng: -6.264036297798157 }, 
		    { lat: 53.276582421056500, lng: -6.264830231666565 }, 
		    { lat: 53.277004227415645, lng: -6.265503466129303, stop_num: 2978 }, 
		    { lat: 53.277798110223664, lng: -6.266761422157288 }, 
		    { lat: 53.278298489387225, lng: -6.267780661582947 }, 
		    { lat: 53.278516601548304, lng: -6.268354654312134, stop_num: 2979 }, 
		    { lat: 53.279244703202835, lng: -6.270360946655273 }, 
		    { lat: 53.279578278672320, lng: -6.271444559097290 }, 
		    { lat: 53.280085051807210, lng: -6.273075342178345, stop_num: 2980 }, 
		    { lat: 53.280623892599536, lng: -6.274824142456055 }, 
		    { lat: 53.280991134365580, lng: -6.276012361049652 }, 
		    { lat: 53.281258946240090, lng: -6.276977956295013 }, 
		    { lat: 53.281321488891210, lng: -6.2772756814956665, stop_num: 2981 }, 
		    { lat: 53.281416104522760, lng: -6.277758479118347 }, 
		    { lat: 53.281528360085154, lng: -6.278445124626160 }, 
		    { lat: 53.281616560677286, lng: -6.278581917285919 }, 
		    { lat: 53.282121706016430, lng: -6.278895735740662 }, 
		    { lat: 53.282392718038885, lng: -6.279019117355347 }, 
		    { lat: 53.282634863421640, lng: -6.279107630252838 }, 
		    { lat: 53.283051799276110, lng: -6.279142498970032 }, 
		    { lat: 53.283266680012595, lng: -6.279201507568359, stop_num: 2991 }, 
		    { lat: 53.283537684773870, lng: -6.2792471051216125 }, 
		    { lat: 53.283763788022860, lng: -6.279426813125610 }, 
		    { lat: 53.283957818935220, lng: -6.279625296592712 }, 
		    { lat: 53.284161470267456, lng: -6.279917657375336 }, 
		    { lat: 53.284294564708200, lng: -6.280269026756287 }, 
		    { lat: 53.284446901209904, lng: -6.280711591243744 }, 
		    { lat: 53.284584805364180, lng: -6.281065642833710 }, 
		    { lat: 53.284642532552440, lng: -6.281191706657410, stop_num: 2992 }, 
		    { lat: 53.284786850181850, lng: -6.2813714146614075 }, 
		    { lat: 53.285131606990284, lng: -6.281639635562897 }, 
		    { lat: 53.285882044751474, lng: -6.282012462615967 }, 
		    { lat: 53.286359880731496, lng: -6.282275319099426 }, 
		    { lat: 53.286500985636486, lng: -6.282358467578888, stop_num: 1325 }, 
		    { lat: 53.286723866298480, lng: -6.2824952602386475 }, 
		    { lat: 53.287211313478610, lng: -6.282881498336792 }, 
		    { lat: 53.287522378838150, lng: -6.283031702041626 }, 
		    { lat: 53.287849476051800, lng: -6.2830424308776855 }, 
		    { lat: 53.288449147772990, lng: -6.282929778099060 }, 
		    { lat: 53.288803495288460, lng: -6.282873451709747, stop_num: 1326 }, 
		    { lat: 53.289286108670540, lng: -6.282752752304077 }, 
		    { lat: 53.290132673128674, lng: -6.282650828361511 }, 
		    { lat: 53.290992047163066, lng: -6.282522082328796 }, 
		    { lat: 53.291186045253035, lng: -6.282497942447662, stop_num: 1327 }, 
		    { lat: 53.291537163522760, lng: -6.282457709312439 }, 
		    { lat: 53.292204119960050, lng: -6.282385289669037, stop_num: 1328 }, 
		    { lat: 53.292842207958614, lng: -6.282253861427307 }, 
		    { lat: 53.293146819471225, lng: -6.282221674919128 }, 
		    { lat: 53.293570065546085, lng: -6.282098293304443 }, 
		    { lat: 53.293868259126200, lng: -6.281872987747192 }, 
		    { lat: 53.294051021904490, lng: -6.281674504280090 }, 
		    { lat: 53.294262640986650, lng: -6.281261444091797 }, 
		    { lat: 53.294339593120250, lng: -6.2810951471328735 }, 
		    { lat: 53.294746795852745, lng: -6.280735731124878 }, 
		    { lat: 53.294766033681086, lng: -6.280834972858429 }, 
		    { lat: 53.294913523410560, lng: -6.281561851501465 }, 
		    { lat: 53.295032156084240, lng: -6.281964182853699, stop_num: 1329 }, 
		    { lat: 53.295301483093310, lng: -6.282503306865692 }, 
		    { lat: 53.295726310935414, lng: -6.283179223537445 }, 
		    { lat: 53.296069376373170, lng: -6.283737123012543 }, 
		    { lat: 53.296202433721920, lng: -6.283959746360779, stop_num: 1330 }, 
		    { lat: 53.296471753352040, lng: -6.284372806549072 }, 
		    { lat: 53.296702597397670, lng: -6.284614205360413 }, 
		    { lat: 53.297085731636315, lng: -6.284855604171753 }, 
		    { lat: 53.297282908168600, lng: -6.2849655747413635 }, 
		    { lat: 53.297587488014784, lng: -6.285008490085602 }, 
		    { lat: 53.297816722992785, lng: -6.284973621368408 }, 
		    { lat: 53.298108474821720, lng: -6.284831464290619 }, 
		    { lat: 53.298514038613830, lng: -6.284560561180115, stop_num: 1331 }, 
		    { lat: 53.298850669666450, lng: -6.284270882606506 }, 
		    { lat: 53.299206533894180, lng: -6.284024119377136 }, 
		    { lat: 53.299624911018250, lng: -6.283857822418213 }, 
		    { lat: 53.300022445637570, lng: -6.283873915672302 }, 
		    { lat: 53.300474476474730, lng: -6.283927559852600 }, 
		    { lat: 53.300759798440690, lng: -6.283962428569794, stop_num: 1332 }, 
		    { lat: 53.301437831195390, lng: -6.283957064151764 }, 
		    { lat: 53.302530996087185, lng: -6.283938288688660 }, 
		    { lat: 53.303095199276090, lng: -6.2839436531066895, stop_num: 1333 }, 
		    { lat: 53.303313184875350, lng: -6.283879280090332 }, 
		    { lat: 53.303848527139580, lng: -6.283648610115051 }, 
		    { lat: 53.304252433627276, lng: -6.283487677574158 }, 
		    { lat: 53.304617869538370, lng: -6.283369660377502 }, 
		    { lat: 53.304845464007805, lng: -6.283364295959473, stop_num: 1334 }, 
		    { lat: 53.305130756770140, lng: -6.283332109451294 }, 
		    { lat: 53.305550678604300, lng: -6.283375024795532 }, 
		    { lat: 53.306201389013580, lng: -6.283541321754456, stop_num: 7293 }, 
		    { lat: 53.306951456688840, lng: -6.283745169639587 }, 
		    { lat: 53.307419440956090, lng: -6.283900737762451, stop_num: 1335 }, 
		    { lat: 53.307597337739494, lng: -6.283935606479645 }, 
		    { lat: 53.308175897828576, lng: -6.284037530422211 }, 
		    { lat: 53.308685537063130, lng: -6.283957064151764 }, 
		    { lat: 53.308865031193946, lng: -6.283935606479645, stop_num: 1336 }, 
		    { lat: 53.309047729802100, lng: -6.283865869045258 }, 
		    { lat: 53.309619859859360, lng: -6.283653974533081 }, 
		    { lat: 53.310289739089730, lng: -6.283337473869324 }, 
		    { lat: 53.310709610186180, lng: -6.283155083656311 }, 
		    { lat: 53.311095823846200, lng: -6.2830182909965515, stop_num: 1337 }, 
		    { lat: 53.311305755946560, lng: -6.282913684844971 }, 
		    { lat: 53.311831382936710, lng: -6.282707154750824 }, 
		    { lat: 53.312182331500665, lng: -6.282562315464020 }, 
		    { lat: 53.312414693117540, lng: -6.282516717910767, stop_num: 1338 }, 
		    { lat: 53.312709550176050, lng: -6.282438933849335 }, 
		    { lat: 53.313188688552310, lng: -6.282286047935486 }, 
		    { lat: 53.313501167204600, lng: -6.282235085964203 }, 
		    { lat: 53.313711087476210, lng: -6.282315552234650 }, 
		    { lat: 53.314068430296985, lng: -6.282508671283722 }, 
		    { lat: 53.314262323580040, lng: -6.282522082328796 }, 
		    { lat: 53.314523517271460, lng: -6.282428205013275 }, 
		    { lat: 53.314968985033120, lng: -6.282186806201935, stop_num: 1339 }, 
		    { lat: 53.315273438742490, lng: -6.281950771808624 }, 
		    { lat: 53.315774981433530, lng: -6.281478703022003 }, 
		    { lat: 53.316390284544250, lng: -6.280942261219025, stop_num: 1340 }, 
		    { lat: 53.317007181101940, lng: -6.280341446399689 }, 
		    { lat: 53.317521521805200, lng: -6.279874742031097 }, 
		    { lat: 53.318140004287024, lng: -6.2794482707977295 }, 
		    { lat: 53.319024450708720, lng: -6.278938651084900 }, 
		    { lat: 53.319203901369114, lng: -6.2789225578308105, stop_num: 1341 }, 
		    { lat: 53.319636502537640, lng: -6.278793811798096 }, 
		    { lat: 53.320113960958750, lng: -6.278772354125977 }, 
		    { lat: 53.320408764833225, lng: -6.278836727142334 }, 
		    { lat: 53.321004775141400, lng: -6.279131770133972 }, 
		    { lat: 53.321257916785980, lng: -6.279276609420776, stop_num: 1342 }, 
		    { lat: 53.321855517369730, lng: -6.2793973088264465 }, 
		    { lat: 53.322324940377620, lng: -6.2793973088264465 }, 
		    { lat: 53.322645362673526, lng: -6.279311478137970, stop_num: 1343 }, 
		    { lat: 53.322893688297970, lng: -6.2791746854782104 }, 
		    { lat: 53.323651473043974, lng: -6.278839409351349 }, 
		    { lat: 53.324226611468570, lng: -6.278611421585083 }, 
		    { lat: 53.324869027117000, lng: -6.2784504890441895 }, 
		    { lat: 53.325522647076870, lng: -6.278289556503296 }, 
		    { lat: 53.326070526682070, lng: -6.278128623962402 }, 
		    { lat: 53.326325240243165, lng: -6.278160810470581 }, 
		    { lat: 53.326498252360850, lng: -6.278069615364075 }, 
		    { lat: 53.326773788729500, lng: -6.277833580970764 }, 
		    { lat: 53.327058934958340, lng: -6.277619004249573 }, 
		    { lat: 53.327227138300790, lng: -6.2775251269340515, stop_num: 1344 }, 
		    { lat: 53.327364904353956, lng: -6.277358829975128 }, 
		    { lat: 53.328263576645390, lng: -6.276591718196869 }, 
		    { lat: 53.328635214555725, lng: -6.2762778997421265 }, 
		    { lat: 53.328774577937480, lng: -6.276181340217590, stop_num: 1345 }, 
		    { lat: 53.329165433728654, lng: -6.275838017463684 }, 
		    { lat: 53.329570702550380, lng: -6.275559067726135 }, 
		    { lat: 53.330076882706960, lng: -6.275411546230316 }, 
		    { lat: 53.330663147153860, lng: -6.275298893451691 }, 
		    { lat: 53.331025153417215, lng: -6.275269389152527 }, 
		    { lat: 53.331178925059660, lng: -6.275285482406616, stop_num: 1347 }, 
		    { lat: 53.331507289732144, lng: -6.275205016136169 }, 
		    { lat: 53.332063101246810, lng: -6.275218427181244 }, 
		    { lat: 53.332242497077345, lng: -6.275218427181244 }, 
		    { lat: 53.332256912780950, lng: -6.275129914283752 }, 
		    { lat: 53.332216869147736, lng: -6.274247467517853 }, 
		    { lat: 53.332228081368840, lng: -6.2739041447639465, stop_num: 1348 }, 
		    { lat: 53.332191241202740, lng: -6.273123621940613 }, 
		    { lat: 53.332188037708550, lng: -6.272504031658173 }, 
		    { lat: 53.332288947660466, lng: -6.271868348121643 }, 
		    { lat: 53.332341805159110, lng: -6.271130740642548 }, 
		    { lat: 53.332369034754010, lng: -6.270841062068939, stop_num: 1349 }, 
		    { lat: 53.332375441715020, lng: -6.270315349102020 }, 
		    { lat: 53.332455528646186, lng: -6.268791854381561 }, 
		    { lat: 53.332501978997335, lng: -6.267828941345215 }, 
		    { lat: 53.332534013692810, lng: -6.267445385456085, stop_num: 1350 }, 
		    { lat: 53.332535615426970, lng: -6.266756057739258 }, 
		    { lat: 53.332606091669680, lng: -6.264894604682922 }, 
		    { lat: 53.333200329904350, lng: -6.265036761760712 }, 
		    { lat: 53.333722483892060, lng: -6.265178918838501 }, 
		    { lat: 53.334124506073360, lng: -6.265304982662201 }, 
		    { lat: 53.334438433110160, lng: -6.265337169170380, stop_num: 1352 }, 
		    { lat: 53.334999011357770, lng: -6.265267431735992 }, 
		    { lat: 53.335609232446340, lng: -6.265235245227814 }, 
		    { lat: 53.335830255253796, lng: -6.265294253826141 }, 
		    { lat: 53.336006432033540, lng: -6.265372037887573, stop_num: 1353 }, 
		    { lat: 53.336403627921790, lng: -6.265471279621124 }, 
		    { lat: 53.337343750224480, lng: -6.265731453895569 }, 
		    { lat: 53.337782573643010, lng: -6.265849471092224 }, 
		    { lat: 53.338371935217560, lng: -6.2660908699035645 }, 
		    { lat: 53.338557710547350, lng: -6.266096234321594 }, 
		    { lat: 53.339150264381640, lng: -6.265967488288879 }, 
		    { lat: 53.339854912278350, lng: -6.265817284584045 }, 
		    { lat: 53.340085521788495, lng: -6.2657904624938965, stop_num: 1355 }, 
		    { lat: 53.340485882559500, lng: -6.265669763088226 }, 
		    { lat: 53.340955100599060, lng: -6.265530288219452 }, 
		    { lat: 53.341448334473820, lng: -6.265431046485901 }, 
		    { lat: 53.341786228413300, lng: -6.265119910240173 }, 
		    { lat: 53.342149741652364, lng: -6.2647417187690735 }, 
		    { lat: 53.342393149666130, lng: -6.264578104019165 }, 
		    { lat: 53.342580508835610, lng: -6.264529824256897, stop_num: 1357 }, 
		    { lat: 53.342780677978890, lng: -6.264449357986450 }, 
		    { lat: 53.343038494450830, lng: -6.264425218105316 }, 
		    { lat: 53.343528501585126, lng: -6.264433264732361 }, 
		    { lat: 53.344167423998070, lng: -6.264481544494629 }, 
		    { lat: 53.344188240858000, lng: -6.264401078224182 }, 
		    { lat: 53.344223469367020, lng: -6.263459622859955 }, 
		    { lat: 53.344258697846960, lng: -6.262531578540802 }, 
		    { lat: 53.344301932759770, lng: -6.262405514717102 }, 
		    { lat: 53.344324350845476, lng: -6.261909306049347 }, 
		    { lat: 53.344378794718810, lng: -6.261388957500458, stop_num: 1359 }, 
		    { lat: 53.344420428222110, lng: -6.261024177074432 }, 
		    { lat: 53.344575752856436, lng: -6.259683072566986 }, 
		    { lat: 53.344763102435690, lng: -6.2593236565589905 }, 
		    { lat: 53.344932837241170, lng: -6.259232461452484 }, 
		    { lat: 53.345600561003250, lng: -6.259111762046814 }, 
		    { lat: 53.345688629304030, lng: -6.259141266345978, stop_num: 320 }, 
		    { lat: 53.346213832847600, lng: -6.259143948554993 }, 
		    { lat: 53.346915161637910, lng: -6.2590983510017395 }, 
		    { lat: 53.347084887876150, lng: -6.259138584136963 }, 
		    { lat: 53.347603669547400, lng: -6.259428262710571 }, 
		    { lat: 53.348229721738676, lng: -6.259699165821075 }, 
		    { lat: 53.349051101079070, lng: -6.260061264038086 }, 
		    { lat: 53.349901284079050, lng: -6.260426044464111 }, 
		    { lat: 53.350793077404190, lng: -6.260828375816345 }, 
		    { lat: 53.351355041712445, lng: -6.261089891195297, stop_num: 278 }, 
		    { lat: 53.351728079455470, lng: -6.261238753795624 }, 
		    { lat: 53.352488554013500, lng: -6.261557936668396 }, 
		    { lat: 53.352470943177195, lng: -6.261692047119141 }, 
		    { lat: 53.352264415553910, lng: -6.262158751487732 }, 
		    { lat: 53.351923402636810, lng: -6.262861490249634 }, 
		    { lat: 53.351945816715116, lng: -6.263084113597870 }, 
		    { lat: 53.352198774781850, lng: -6.263513267040253 }, 
		    { lat: 53.352698282504775, lng: -6.2642428278923035 }, 
		    { lat: 53.353252216916550, lng: -6.265047490596771 }, 
		    { lat: 53.353401105574285, lng: -6.265347898006439, stop_num: 10 }, 
		    { lat: 53.353541988986606, lng: -6.265487372875214 }, 
		    { lat: 53.353879787089770, lng: -6.266021132469177 }, 
		    { lat: 53.354111921675020, lng: -6.266670227050781 }, 
		    { lat: 53.354220784355380, lng: -6.266922354698181 }, 
		    { lat: 53.354921981427400, lng: -6.266230344772339 }, 
		    { lat: 53.355818472296510, lng: -6.265449821949005 }, 
		    { lat: 53.356647709562020, lng: -6.264712214469910 }, 
		    { lat: 53.356786981419894, lng: -6.2645915150642395, stop_num: 12 }, 
		    { lat: 53.357081531896064, lng: -6.264272332191467 }, 
		    { lat: 53.357275229740930, lng: -6.264132857322693 }, 
		    { lat: 53.357829104670940, lng: -6.263537406921387 }, 
		    { lat: 53.358397379270630, lng: -6.262799799442291 }, 
		    { lat: 53.358568660551086, lng: -6.262622773647308, stop_num: 14 }, 
		    { lat: 53.358877605419070, lng: -6.262260675430298 }, 
		    { lat: 53.359569121565880, lng: -6.261560618877411 }, 
		    { lat: 53.360238216785525, lng: -6.260935664176941, stop_num: 15 }, 
		    { lat: 53.360763241084900, lng: -6.260385811328888 }, 
		    { lat: 53.361379496110600, lng: -6.259833276271820 }, 
		    { lat: 53.361766851850840, lng: -6.259535551071167 }, 
		    { lat: 53.362499936960670, lng: -6.258881092071533 }, 
		    { lat: 53.362951306235130, lng: -6.258447915315628 }, 
		    { lat: 53.363058545749844, lng: -6.258375495672226, stop_num: 17 }, 
		    { lat: 53.363318640466670, lng: -6.258097887039185 }, 
		    { lat: 53.363785206395550, lng: -6.257655322551727 }, 
		    { lat: 53.363946862695430, lng: -6.257432699203491 }, 
		    { lat: 53.364796748599290, lng: -6.256729960441589 }, 
		    { lat: 53.365488168692664, lng: -6.256204247474670 }, 
		    { lat: 53.365846678397730, lng: -6.255973577499390, stop_num: 18 }, 
		    { lat: 53.366379635910170, lng: -6.255640983581543 }, 
		    { lat: 53.366662916919330, lng: -6.255557835102081 }, 
		    { lat: 53.367144650355485, lng: -6.255496144294739, stop_num: 19 }, 
		    { lat: 53.367632780008606, lng: -6.255485415458679 }, 
		    { lat: 53.367943259566390, lng: -6.255372762680054 }, 
		    { lat: 53.368562611512710, lng: -6.255096495151520 }, 
		    { lat: 53.368797866869020, lng: -6.255032122135162 }, 
		    { lat: 53.369526029976015, lng: -6.254592239856720 }, 
		    { lat: 53.370100549884704, lng: -6.254273056983948, stop_num: 21 }, 
		    { lat: 53.370492627268180, lng: -6.2540048360824585 }, 
		    { lat: 53.371363186188740, lng: -6.253420114517212 }, 
		    { lat: 53.371512811711430, lng: -6.253288686275482 }, 
		    { lat: 53.371735248682796, lng: -6.2531693279743195, stop_num: 7602 }, 
		    { lat: 53.372120910031320, lng: -6.252899765968323 }, 
		    { lat: 53.372933027801004, lng: -6.252336502075195 }, 
		    { lat: 53.373697924564830, lng: -6.251896619796753 }, 
		    { lat: 53.373901147964430, lng: -6.251821517944336, stop_num: 85 }, 
		    { lat: 53.374205181161216, lng: -6.251628398895264 }, 
		    { lat: 53.374906049420396, lng: -6.251124143600464 }, 
		    { lat: 53.375134869208530, lng: -6.2510088086128235 }, 
		    { lat: 53.375998932846650, lng: -6.250281929969788 }, 
		    { lat: 53.376398956372160, lng: -6.249874234199524, stop_num: 203 }, 
		    { lat: 53.376632568373190, lng: -6.249514818191528 }, 
		    { lat: 53.376950982667120, lng: -6.249032020568848 }, 
		    { lat: 53.377328596532884, lng: -6.248578727245331 }, 
		    { lat: 53.377925411619934, lng: -6.248039603233337 }, 
		    { lat: 53.378149415123880, lng: -6.247790157794952 }, 
		    { lat: 53.378693418727970, lng: -6.247310042381287 }, 
		    { lat: 53.379357413709236, lng: -6.246760189533234 }, 
		    { lat: 53.379575009812150, lng: -6.246620714664459, stop_num: 204 }, 
		    { lat: 53.380336587416230, lng: -6.2459152936935425 }, 
		    { lat: 53.380741369968860, lng: -6.245582699775696 }, 
		    { lat: 53.381005356517090, lng: -6.2454405426979065 }, 
		    { lat: 53.381394133726324, lng: -6.245220601558685, stop_num: 205 }, 
		    { lat: 53.381754109458770, lng: -6.244957745075226 }, 
		    { lat: 53.382490050374200, lng: -6.244560778141022 }, 
		    { lat: 53.382040487978976, lng: -6.243176758289337 }, 
		    { lat: 53.381850102473470, lng: -6.242465972900391, stop_num: 215 }, 
		    { lat: 53.381590920837160, lng: -6.241486966609955 }, 
		    { lat: 53.381067753098435, lng: -6.239233911037445 }, 
		    { lat: 53.381643717224364, lng: -6.238662600517273 }, 
		    { lat: 53.382322064981290, lng: -6.238134205341339, stop_num: 216 }, 
		    { lat: 53.382755625929030, lng: -6.237756013870239 }, 
		    { lat: 53.383536344473510, lng: -6.237203478813171 }, 
		    { lat: 53.384013087692196, lng: -6.236908435821533 }, 
		    { lat: 53.384265855421210, lng: -6.236707270145416, stop_num: 217 }, 
		    { lat: 53.384465828827120, lng: -6.236428320407867 }, 
		    { lat: 53.384697796801270, lng: -6.236017942428589 }, 
		    { lat: 53.384918565147686, lng: -6.235307157039642 }, 
		    { lat: 53.385374496152830, lng: -6.233378648757935 }, 
		    { lat: 53.385566465641660, lng: -6.233550310134888, stop_num: 218 }, 
		    { lat: 53.385896011245730, lng: -6.233721971511841 }, 
		    { lat: 53.386444715014186, lng: -6.234097480773926 }, 
		    { lat: 53.386785451695864, lng: -6.234438121318817 }, 
		    { lat: 53.387038202965520, lng: -6.234687566757202 }, 
		    { lat: 53.387279754991845, lng: -6.235020160675049 }, 
		    { lat: 53.387551699341610, lng: -6.235492229461670 }, 
		    { lat: 53.387740459692390, lng: -6.235948204994202 }, 
		    { lat: 53.387849236463560, lng: -6.236355900764465 }, 
		    { lat: 53.387919621285060, lng: -6.236935257911682 }, 
		    { lat: 53.387916421977490, lng: -6.237198114395142 }, 
		    { lat: 53.387881229578646, lng: -6.237254440784454 }, 
		    { lat: 53.387868432335530, lng: -6.237336248159409 }, 
		    { lat: 53.387894826645300, lng: -6.237416714429855 }, 
		    { lat: 53.387852435776160, lng: -6.238362193107605, stop_num: 219 }, 
		    { lat: 53.387839638524360, lng: -6.238866448402405 }, 
		    { lat: 53.387810844693700, lng: -6.239376068115234 }, 
		    { lat: 53.387700468162535, lng: -6.240006387233734 }, 
		    { lat: 53.387578893681070, lng: -6.240585744380951 }, 
		    { lat: 53.387482913581970, lng: -6.2411704659461975 }, 
		    { lat: 53.387457318852350, lng: -6.241763234138489 }, 
		    { lat: 53.387492511601630, lng: -6.242342591285706 }, 
		    { lat: 53.387583692680300, lng: -6.243474483489990 }, 
		    { lat: 53.387660476595094, lng: -6.244327425956726 }, 
		    { lat: 53.387862033712490, lng: -6.2447163462638855 }, 
		    { lat: 53.387950014694695, lng: -6.244947016239166, stop_num: 220 }, 
		    { lat: 53.388151570441240, lng: -6.245236694812775 }, 
		    { lat: 53.388412311776900, lng: -6.245609521865845 }, 
		    { lat: 53.388719440626860, lng: -6.245848238468170 }, 
		    { lat: 53.389140139569605, lng: -6.246006488800049 }, 
		    { lat: 53.389445663572080, lng: -6.2461137771606445 }, 
		    { lat: 53.389816768311526, lng: -6.246274709701538 }, 
		    { lat: 53.390051906278046, lng: -6.246392726898193, stop_num: 1622 }, 
		    { lat: 53.390264649033310, lng: -6.246457099914551 }, 
		    { lat: 53.390674135855030, lng: -6.246435642242432 }, 
		    { lat: 53.391573073577100, lng: -6.246269345283508 }, 
		    { lat: 53.392009739320710, lng: -6.246199607849121, stop_num: 1623 }, 
		    { lat: 53.392737505605140, lng: -6.246017217636108 }, 
		    { lat: 53.393901905777610, lng: -6.245775818824768 }, 
		    { lat: 53.395005497415780, lng: -6.245518326759338 }, 
		    { lat: 53.395797186832380, lng: -6.245376169681549 }, 
		    { lat: 53.396088268935220, lng: -6.2453654408454895, stop_num: 1624 }, 
		    { lat: 53.396448120431174, lng: -6.245279610157013 }, 
		    { lat: 53.396995088877530, lng: -6.245175004005432 }, 
		    { lat: 53.397137427466640, lng: -6.2451669573783875 }, 
		    { lat: 53.397538851709520, lng: -6.244955062866211 }, 
		    { lat: 53.398074611233820, lng: -6.244638562202454 }, 
		    { lat: 53.398341688835515, lng: -6.244389116764069 }, 
		    { lat: 53.398619959523700, lng: -6.244126260280609 }, 
		    { lat: 53.398866243557315, lng: -6.244024336338043 }, 
		    { lat: 53.399114125398626, lng: -6.243965327739716 }, 
		    { lat: 53.399633872958500, lng: -6.244048476219177 }, 
		    { lat: 53.399820980525990, lng: -6.244040429592133 }, 
		    { lat: 53.400241569747030, lng: -6.243882179260254 }, 
		    { lat: 53.400590191881825, lng: -6.2436676025390625 }, 
		    { lat: 53.400892435366010, lng: -6.243412792682648 }, 
		    { lat: 53.401077938240190, lng: -6.243265271186829, stop_num: 1625 }, 
		    { lat: 53.401221862326800, lng: -6.243053376674652 }, 
		    { lat: 53.401602459232210, lng: -6.242455244064331 }, 
		    { lat: 53.401978255357370, lng: -6.241910755634308 }, 
		    { lat: 53.402258101379530, lng: -6.241572797298431 }, 
		    { lat: 53.402649882718430, lng: -6.241256296634674 }, 
		    { lat: 53.403196771452680, lng: -6.240867376327515 }, 
		    { lat: 53.403622124497150, lng: -6.240652799606323 }, 
		    { lat: 53.403868379579270, lng: -6.240475773811340 }, 
		    { lat: 53.404149812213550, lng: -6.240274608135223, stop_num: 1626 }, 
		    { lat: 53.404431242986185, lng: -6.239982247352600 }, 
		    { lat: 53.404965316720144, lng: -6.2395235896110535 }, 
		    { lat: 53.406017454342170, lng: -6.238651871681213 }, 
		    { lat: 53.406580289317070, lng: -6.238185167312622 }, 
		    { lat: 53.407002410661555, lng: -6.237911581993103 }, 
		    { lat: 53.407210271905720, lng: -6.237815022468567 }, 
		    { lat: 53.407542847783860, lng: -6.237756013870239 }, 
		    { lat: 53.408044904520810, lng: -6.237793564796448 }, 
		    { lat: 53.408265551785675, lng: -6.237884759902954, stop_num: 1627 }, 
		    { lat: 53.408676464293800, lng: -6.237946450710297 }, 
		    { lat: 53.409419934035554, lng: -6.238394379615784 }, 
		    { lat: 53.409803655269755, lng: -6.238603591918945 }, 
		    { lat: 53.410670212988020, lng: -6.238780617713928 }, 
		    { lat: 53.411760579720490, lng: -6.238989830017090 }, 
		    { lat: 53.412409670396926, lng: -6.239043474197388 }, 
		    { lat: 53.413145081361290, lng: -6.2390220165252686 }, 
		    { lat: 53.413706223348285, lng: -6.239005923271179, stop_num: 1628 }, 
		    { lat: 53.413946025358250, lng: -6.238971054553986 }, 
		    { lat: 53.414260963277330, lng: -6.238987147808075 }, 
		    { lat: 53.415117838399546, lng: -6.239250004291534 }, 
		    { lat: 53.415504705465644, lng: -6.239359974861145 }, 
		    { lat: 53.415770075054525, lng: -6.239365339279175 }, 
		    { lat: 53.416131358700440, lng: -6.239290237426758 }, 
		    { lat: 53.416607736869260, lng: -6.239131987094879, stop_num: 1629 }, 
		    { lat: 53.417151249067830, lng: -6.2387484312057495 }, 
		    { lat: 53.417579659669770, lng: -6.238265633583069 }, 
		    { lat: 53.417771483913510, lng: -6.238104701042175 }, 
		    { lat: 53.418081597943974, lng: -6.2377238273620605 }, 
		    { lat: 53.418906426316624, lng: -6.236447095870972 }, 
		    { lat: 53.419903871813050, lng: -6.234666109085083 }, 
		    { lat: 53.420520869653660, lng: -6.233550310134888 }, 
		    { lat: 53.421326469937700, lng: -6.232367455959320 }, 
		    { lat: 53.421783609342380, lng: -6.231908798217773, stop_num: 1630 }, 
		    { lat: 53.422226358555974, lng: -6.231366991996765 }, 
		    { lat: 53.422721848598606, lng: -6.230868101119995 }, 
		    { lat: 53.423038319862010, lng: -6.230766177177429 }, 
		    { lat: 53.423186964642326, lng: -6.230774223804474 }, 
		    { lat: 53.423346797159624, lng: -6.230860054492950 }, 
		    { lat: 53.423489047594620, lng: -6.231071949005127 }, 
		    { lat: 53.423704819817890, lng: -6.231562793254852 }, 
		    { lat: 53.423958950143096, lng: -6.232367455959320 }, 
		    { lat: 53.424016488873730, lng: -6.232649087905884 }, 
		    { lat: 53.424411266397840, lng: -6.2339794635772705 }, 
		    { lat: 53.424665392500250, lng: -6.234813630580902 }, 
		    { lat: 53.424796450651186, lng: -6.235333979129791 }, 
		    { lat: 53.424932303186060, lng: -6.235682666301727 }, 
		    { lat: 53.425096923911276, lng: -6.236012578010559 }, 
		    { lat: 53.425178434908180, lng: -6.236243247985840 }, 
		    { lat: 53.425296705488540, lng: -6.236854791641235 }, 
		    { lat: 53.425341456433145, lng: -6.237023770809174 }, 
		    { lat: 53.425424565205280, lng: -6.2376245856285095 }, 
		    { lat: 53.425603568162686, lng: -6.238434612751007 }, 
		    { lat: 53.425942393125610, lng: -6.239604055881500 }, 
		    { lat: 53.426417063178250, lng: -6.241124868392944 }, 
		    { lat: 53.426473000377430, lng: -6.241261661052704 }, 
		    { lat: 53.426640811533396, lng: -6.241610348224640 }, 
		    { lat: 53.426746292492350, lng: -6.241706907749176 }, 
		    { lat: 53.426843782236830, lng: -6.241739094257355 }, 
		    { lat: 53.426982824600340, lng: -6.241717636585236 }, 
		    { lat: 53.427097893798620, lng: -6.241637170314789 }, 
		    { lat: 53.427180999137010, lng: -6.241503059864044 }, 
		    { lat: 53.427251318911830, lng: -6.241385042667389 }, 
		    { lat: 53.427337620294644, lng: -6.2413206696510315 }, 
		    { lat: 53.427427117839900, lng: -6.241275072097778 }, 
		    { lat: 53.427535793177290, lng: -6.241280436515808 }, 
		    { lat: 53.427604514203125, lng: -6.241328716278076 }, 
		    { lat: 53.427813872922606, lng: -6.241677403450012 }, 
		    { lat: 53.428037613925790, lng: -6.242034137248993, stop_num: 7347 }
		    ]
		  },
		  to_route       : {
		    name         : 'xxxxxxxx',
		    dub_bus_url  : 'xxxxxxxx',
		    stop_ini     : 0,
		    stop_end     : 0,
		    map_polyline : null,
		    track        : [
		    ]
		  }
		});

    }
    console.log('Initialized');

	Meteor.publish('all-bus-stops', function publishFunction() {
	   return bus_stops.find({});
	});
    
});