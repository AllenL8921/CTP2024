mapboxgl.accessToken = 'pk.eyJ1IjoiYWxsZW4wNDc2IiwiYSI6ImNtMDRlMzFibDA3bnkycXB2dm5vZWU0dTAifQ._LlTw-zai5q2QyVzWHOoEQ';

// Initialize a maboxgl instance
const map = new mapboxgl.Map({
    container: 'map', // ID of the container element
    style: 'mapbox://styles/mapbox/streets-v11', // Map style URL
    center: [-73.935242, 40.730610], // Initial center position [lng, lat]
    zoom: 10 // Initial zoom level
});

// Features for the map
map.addControl(new mapboxgl.NavigationControl());

// Locations data
// locations will either be hardcoded into script or into geoJson format
// alternatively, we can utilize an external database to store our locations there


const foodPantryLocations = [
    {
        name: "Bronx Community College",
        coordinates: [-73.911073, 40.855522],
        resourceType: "Food Pantry",
        address: "Access Resource Center office <br> Loew Hall 125",
        hours: "Biweekly Wednesday: 10 AM – 4:30 PM and Thursday: 11 AM – 6:30 PM<br>Daily emergency pantry: 9 AM – 5 PM<br>Daily Healthy Food Cart access 9 AM – 5 PM",
        note: "Students utilize the Plentiful App to make appointments for the bi-weekly pantry and can walk in daily for the Healthy Food Cart and emergency pantry needs.",
        contact: "<a href='mailto: dawn.daniels@bcc.cuny.edu'>dawn.daniels@bcc.cuny.edu</a> <br> <a href='mailto: Raine.diaz@bcc.cuny.edu'>Raine.diaz@bcc.cuny.edu</a>"
    },
    {
        name: "Lehman College",
        coordinates: [-73.892606, 40.868092],
        resourceType: "Food Pantry",
        address: "Student Life Building 120",
        hours: "Wednesday: 10 AM – 8 PM<br>Thursday: 10 AM – 5 PM",
        note: "Serving Lehman students only, Walk-in service food bank with student ID to swipe in building and display to pantry coordinator",
        contact: "<a href='mailto: food.bank@lehman.cuny.edu'>food.bank@lehman.cuny.edu</a>"
    },
    {
        name: "Kingsborough Community College",
        coordinates: [-73.9351, 40.5787],
        resourceType: "Food Pantry",
        address: "CUNY EDGE, T4-216 (Food for Thought)",
        hours: "Monday – Friday: 8 AM – 5 PM",
        note: "Walk-in and online",
        contact: "<a href='mailto: arc.kcc@kbcc.cuny.edu'>arc.kcc@kbcc.cuny.edu</a>"
    },
    {
        name: "Medgar Evers College",
        coordinates: [-73.9571, 40.6664],
        resourceType: "Food Pantry",
        address: "Transition Academy, 1150 Carroll Street (Room C-307)",
        hours: "Monday: 10 AM – 12 PM <br> Tuesday: 3 PM – 5PM (inside pantry) <br> Mobile Pantry every first Friday of the month: 11 AM – 1 PM (outside pantry for anyone) <br> Community Pantry: every last Tuesday of the month 3 PM – 5 PM (outside pantry for anyone)",
        note: "",
        contact: ""
    },
    {
        name: "New York City College of Technology",
        coordinates: [-73.9875, 40.6954],
        resourceType: "Food Pantry",
        address: "Yellowjacket N.E.S.T. (Nutrition for Education and Student Achievement) Food Pantry at City Tech, 300 Jay Street, Student Life, G-516.",
        hours: "Tuesday: 9 AM – 12 PM <br> Wednesday: 3 PM – 6 PM <br> Thursday: 12 PM – 3 PM",
        note: "Appointment only",
        contact: "<a href='mailto: Gerson.ramirez38@citytech.cuny.edu'>Gerson.ramirez38@citytech.cuny.edu</a> "
    },
    {
        name: "Baruch College",
        coordinates: [-73.9832, 40.7404],
        resourceType: "Food Pantry",
        address: "Yellowjacket N.E.S.T. (Nutrition for Education and Student Achievement) Food Pantry at City Tech, 300 Jay Street, Student Life, G-516.",
        hours: "Monday, Tuesday and Thursday: 12 PM – 4 PM <br> Wednesday: 10 AM – 2 PM",
        note: "Students can either walk in during the hours of operation, selecting items on the application or complete the form beforehand, selecting the day they will pick up the items. Grab & Go Packages are also available and located in the following offices: Dean of Students, Health & Wellness, and Student Life.",
        contact: "<a href='mailto: brandy.peer@baruch.cuny.edu'>brandy.peer@baruch.cuny.edu</a>"
    }, 
    {name: "Borough of Manhattan Community College",
    coordinates: [-74.0118, 40.7189],
    resourceType: "Food Pantry",
    address: "Advocacy and Resource Center, Panther Pantry, Room S-230",
    hours: "Mondays – Friday: 8 AM – 6 PM",
    note: "Students access the Panther Pantry on a walk-in, first come – first served basis. Pre-packed Emergency Bags are also available to students",
    contact: "<a href='mailto: rshields@bmcc.cuny.edu'>rshields@bmcc.cuny.edu</a>"
    }, 
    {name: "City College",
    coordinates: [-73.9493, 40.8200],
    resourceType: "Food Pantry",
    address: "NAC Ground Floor",
    hours: "Weekly: 10 AM – 6 PM",
    note: "Walk in (self-serve) / <a href='https://calendly.com/bennysfoodpantry/benny-s-food-pantry-appointment-system?'>Appointment based</a>",
    contact: "<a href='mailto: bennysfoodpantry@ccny.cuny.edu'>bennysfoodpantry@ccny.cuny.edu</a>"
    }, 
    {name: "Craig Newmark School of Journalism",
    coordinates: [-73.9889219, 40.7554192],
    resourceType: "Food Pantry",
    address: "",
    hours: "Weekly: 9 AM – 5 PM",
    note: "Online",
    contact: "<a href='mailto: matthew.brown@journalism.cuny.edu '>matthew.brown@journalism.cuny.edu </a>"
    }, 
    {name: "CUNY School of Professional Studies",
    coordinates: [-73.9900, 40.7484],
    resourceType: "Food Pantry",
    address: "NAC Ground Floor",
    hours: "Weekly: 9 AM – 5 PM",
    note: "",
    contact: "<a href='mailto: FoodAccess@sps.cuny.edu'>FoodAccess@sps.cuny.edu</a> <a href='mailto: arlenis.perez@cuny.edu'>arlenis.perez@cuny.edu</a>"
    }, 
    {name: "Guttman Community College",
    coordinates: [-73.9841, 40.7529],
    resourceType: "Food Pantry",
    address: "The Connect Center, Room LL020/021",
    hours: "Monday and Friday: 9 AM – 5 PM <br> Tuesday and Wednesday: 9 AM – 6 PM <br> Thursday: 9 AM – 4:30 PM",
    note: "Walk-in self serve with student ID to swipe into building and pantry location",
    contact: "<a href='mailto: connectcenter@guttman.cuny.edu'>connectcenter@guttman.cuny.edu</a>"
    }, 
    {name: "John Jay College",
    coordinates: [-73.9892, 40.7707],
    resourceType: "Food Pantry",
    address: "Wellness Center/Single Stop Rm L.68.13",
    hours: "Tuesday – Thursday: 10 AM – 3 PM",
    note: "",
    contact: ""
    }, 
    {name: "CUNY School of Law",
    coordinates: [-73.9444055, 40.7476782],
    resourceType: "Food Pantry",
    address: "Student Affairs",
    hours: " 24/7 with Law School ID unless the building is scheduled for closure due to maintenance",
    note: "Walk-in self serve with student ID to swipe into building and pantry location",
    contact: "<a href='mailto: studentaffairsoffice@law.cuny.edu'>studentaffairsoffice@law.cuny.edu</a>"
    }, 
    {name: "LaGuardia Community College",
    coordinates: [-73.9376385, 40.7438086],
    resourceType: "Food Pantry",
    address: "LaGuardia Cares, Room C-107",
    hours: "Monday, Tuesday, Wednesday and Friday: 9 AM – 5 PM <br> Thursday: 9 AM – 7 PM",
    note: "Walk-in and online",
    contact: "<a href='mailto: laguardiacares@lagcc.cuny.edu'>laguardiacares@lagcc.cuny.edu</a>"
    }, 
    {name: "Queens College",
    coordinates: [-73.8228944, 40.73675],
    resourceType: "Food Pantry",
    address: "Student Union, Lower Level, 29",
    hours: "Monday and Thursday: 12 PM – 4 PM",
    note: "",
    contact: "<a href='mailto: Arianna.Livreri@qc.cuny.edu'>Arianna.Livreri@qc.cuny.edu</a> <a href='mailto: knightstable@qc.cuny.edu'>knightstable@qc.cuny.edu</a>"
    }, 
    {name: "Queensborough Community College",
    coordinates: [-73.7599759, 40.755421],
    resourceType: "Food Pantry",
    address: "Student Union, SU 115",
    hours: "Monday: 12 – 1 PM, 3 – 5 PM <br> Tuesday: 9 – 10 AM, 12 – 1 PM, 2 – 3 PM <br> Wednesday: 9 – 10 AM, 12 – 1 PM, 3 – 4 PM <br> Thursday: 10 – 11 AM, 1 – 3 PM, 4 – 5 PM",
    note: "",
    contact: "<a href='mailto: Arianna.Livreri@qc.cuny.edu'>Arianna.Livreri@qc.cuny.edu</a> <a href='mailto: knightstable@qc.cuny.edu'>knightstable@qc.cuny.edu</a>"
    }, 
    {name: "York College",
    coordinates: [-73.8785112, 40.7010122],
    resourceType: "Food Pantry",
    address: "Room 3 M02 – The Men’s Center",
    hours: "Monday, Thursday and Friday: 9 AM – 5 PM <br> Tuesday and Wednesday: 9 AM – 6:30 PM",
    note: "Student can complete a reservation on the York College website and can pick up their bag at AC 3C01",
    contact: "<a href='mailto:nacevedo@york.cuny.edu'> nacevedo@york.cuny.edu</a>"
    }, 
    {name: "College of Staten Island",
    coordinates: [-74.1504, 40.6022],
    resourceType: "Food Pantry",
    address: "",
    hours: "Wednesday and Friday 10:30 AM – 1 PM",
    note: " In order to make an appointment, please fill out the <a href='https://docs.google.com/forms/d/e/1FAIpQLSePpl2_E4U4RduWCqiB5M6h5rH3LVFPFKGsgNc2mLdwDOLT7Q/viewform'>link here</a> and someone from the Office of Student Life will contact you. Appointments must be made by 4:30 pm on the Tuesday or Thursday, the day before your appointment.  Please note, if the dates and times listed above do not work for your schedule or if you have any questions, please feel free to email us at <a href='mailto: studentlife@csi.cuny.edu'>studentlife@csi.cuny.edu</a>.",
    contact: "<a href='mailto: studentlife@csi.cuny.edu'>studentlife@csi.cuny.edu</a>"
    }
];

const healthCenterLocations = [
    {
        name: "Bronx Community College",
        coordinates: [-73.911073, 40.855522],
        resourceType: "Food Pantry",
        address: "Access Resource Center office <br> Loew Hall 125",
        hours: "Biweekly Wednesday: 10 AM – 4:30 PM and Thursday: 11 AM – 6:30 PM<br>Daily emergency pantry: 9 AM – 5 PM<br>Daily Healthy Food Cart access 9 AM – 5 PM",
        note: "Students utilize the Plentiful App to make appointments for the bi-weekly pantry and can walk in daily for the Healthy Food Cart and emergency pantry needs.",
        contact: "dawn.daniels@bcc.cuny.edu <br> Raine.diaz@bcc.cuny.edu"
    }
]


// Add markers and popups to the map
foodPantryLocations.forEach(location => {
    new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>  <h4>${location.resourceType}</h4> <p>${location.address}</p> <p>${location.hours}</p> <p>Note: ${location.note}</p> <p>Contact: ${location.contact}</p>`))
        .addTo(map);
});
