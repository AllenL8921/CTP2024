mapboxgl.accessToken = 'pk.eyJ1IjoiYWxsZW4wNDc2IiwiYSI6ImNtMDRlMzFibDA3bnkycXB2dm5vZWU0dTAifQ._LlTw-zai5q2QyVzWHOoEQ';

// Initialize a maboxgl instance
const map = new mapboxgl.Map({
    container: 'map', // ID of the container element
    style: 'mapbox://styles/mapbox/streets-v11', // Map style URL
    center: [-73.935242, 40.730610], // Initial center position [lng, lat]
    zoom: 10 // Initial zoom level
});

map.on('style.load', () => {
    map.setFog({
      color: 'rgb(220, 240, 255)', // Lower atmosphere (light blue)
      'high-color': 'rgb(135, 206, 235)', // Upper atmosphere (sky blue)
      'horizon-blend': 0.5, // Slightly increased atmosphere thickness
      'space-color': 'rgb(200, 230, 255)', // Background color (light blue)
      'star-intensity': 0 // No stars visible during the day
    });
    
    /*
    map.setLayoutProperty('poi-label', 'visibility', 'none'); // Hides the POI labels.
    map.setLayoutProperty('poi', 'visibility', 'none'); // Hides the POI icons.
    map.setLayoutProperty('road-label', 'visibility', 'none'); // Hides road labels.
    map.setLayoutProperty('road-number-shield', 'visibility', 'none'); // Hides road numbers.
    map.setLayoutProperty('road-exit-shield', 'visibility', 'none'); // Hides public transit lines.
    map.setLayoutProperty('transit-label', 'visibility', 'none'); // Hides transit labels
    map.setLayoutProperty('transit', 'visibility', 'none'); // Hides transit lines

    // Add a layer that shows the buildings in 3D.
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'height']
            ],
            'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.4
        }
    });
    */
  })

// Features for the map
map.addControl(new mapboxgl.NavigationControl());


// Locations data
// locations will either be hardcoded into script or into geoJson format
// alternatively, we can utilize an external database to store our locations there

const foodPantryLocations = [
    {
        name: "<a href='https://www.bcc.cuny.edu/campus-resources/access-resource-center/food-pantry/'>Bronx Community College</a>",
        coordinates: [-73.911073, 40.855522],
        resourceType: "Food Pantry",
        address: "Access Resource Center office <br> Loew Hall 125",
        hours: "Biweekly Wednesday: 10 AM – 4:30 PM and Thursday: 11 AM – 6:30 PM<br>Daily emergency pantry: 9 AM – 5 PM<br>Daily Healthy Food Cart access 9 AM – 5 PM",
        note: "Students utilize the Plentiful App to make appointments for the bi-weekly pantry and can walk in daily for the Healthy Food Cart and emergency pantry needs.",
        contact: "<a href='mailto: dawn.daniels@bcc.cuny.edu'>dawn.daniels@bcc.cuny.edu</a> <br> <a href='mailto: Raine.diaz@bcc.cuny.edu'>Raine.diaz@bcc.cuny.edu</a>"
    },
    {
        name: "<a href='https://www.lehman.edu/student-affairs/basic-needs-center/lehman-food-bank.php'>Lehman College </a>",
        coordinates: [-73.892606, 40.868092],
        resourceType: "Food Pantry",
        address: "Student Life Building 120",
        hours: "Wednesday: 10 AM – 8 PM<br>Thursday: 10 AM – 5 PM",
        note: "Serving Lehman students only, Walk-in service food bank with student ID to swipe in building and display to pantry coordinator",
        contact: "<a href='mailto: food.bank@lehman.cuny.edu'>food.bank@lehman.cuny.edu</a>"
    },
    {
        name: "<a href='https://www.kbcc.cuny.edu/studres/cunyedge.html'> Kingsborough Community College </a>",
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
        name: "<a href='https://www.citytech.cuny.edu/student-life/food-pantry.aspx'>New York City College of Technology </a>",
        coordinates: [-73.9875, 40.6954],
        resourceType: "Food Pantry",
        address: "Yellowjacket N.E.S.T. (Nutrition for Education and Student Achievement) Food Pantry at City Tech, 300 Jay Street, Student Life, G-516.",
        hours: "Tuesday: 9 AM – 12 PM <br> Wednesday: 3 PM – 6 PM <br> Thursday: 12 PM – 3 PM",
        note: "Appointment only",
        contact: "<a href='mailto: Gerson.ramirez38@citytech.cuny.edu'>Gerson.ramirez38@citytech.cuny.edu</a> "
    },
    {
        name: "<a href='https://studentaffairs.baruch.cuny.edu/dean-of-students/bearcat-food-pantry/'> Baruch College </a>",
        coordinates: [-73.9832, 40.7404],
        resourceType: "Food Pantry",
        address: "Yellowjacket N.E.S.T. (Nutrition for Education and Student Achievement) Food Pantry at City Tech, 300 Jay Street, Student Life, G-516.",
        hours: "Monday, Tuesday and Thursday: 12 PM – 4 PM <br> Wednesday: 10 AM – 2 PM",
        note: "Students can either walk in during the hours of operation, selecting items on the application or complete the form beforehand, selecting the day they will pick up the items. Grab & Go Packages are also available and located in the following offices: Dean of Students, Health & Wellness, and Student Life.",
        contact: "<a href='mailto: brandy.peer@baruch.cuny.edu'>brandy.peer@baruch.cuny.edu</a>"
    }, 
    {name: "<a href='https://www.bmcc.cuny.edu/student-affairs/arc/panther-pantry/'> Borough of Manhattan Community College </a>",
    coordinates: [-74.0118, 40.7189],
    resourceType: "Food Pantry",
    address: "Advocacy and Resource Center, Panther Pantry, Room S-230",
    hours: "Mondays – Friday: 8 AM – 6 PM",
    note: "Students access the Panther Pantry on a walk-in, first come – first served basis. Pre-packed Emergency Bags are also available to students",
    contact: "<a href='mailto: rshields@bmcc.cuny.edu'>rshields@bmcc.cuny.edu</a>"
    }, 
    {name: "<a href='https://www.ccny.cuny.edu/bennysfoodpantry'> City College </a>",
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
    {name: "<a href='https://www.laguardia.edu/cares/'>LaGuardia Community College </a>",
    coordinates: [-73.9376385, 40.7438086],
    resourceType: "Food Pantry",
    address: "LaGuardia Cares, Room C-107",
    hours: "Monday, Tuesday, Wednesday and Friday: 9 AM – 5 PM <br> Thursday: 9 AM – 7 PM",
    note: "Walk-in and online",
    contact: "<a href='mailto: laguardiacares@lagcc.cuny.edu'>laguardiacares@lagcc.cuny.edu</a>"
    }, 
    {name: "<a href='https://qcknightstable.org/'>Queens College </a>",
    coordinates: [-73.8228944, 40.73675],
    resourceType: "Food Pantry",
    address: "Student Union, Lower Level, 29",
    hours: "Monday and Thursday: 12 PM – 4 PM",
    note: "",
    contact: "<a href='mailto: Arianna.Livreri@qc.cuny.edu'>Arianna.Livreri@qc.cuny.edu</a> <a href='mailto: knightstable@qc.cuny.edu'>knightstable@qc.cuny.edu</a>"
    }, 
    {name: "<a href='https://www.qcc.cuny.edu/foodPantry/index.html'>Queensborough Community College </a>",
    coordinates: [-73.7599759, 40.755421],
    resourceType: "Food Pantry",
    address: "Student Union, SU 115",
    hours: "Monday: 12 – 1 PM, 3 – 5 PM <br> Tuesday: 9 – 10 AM, 12 – 1 PM, 2 – 3 PM <br> Wednesday: 9 – 10 AM, 12 – 1 PM, 3 – 4 PM <br> Thursday: 10 – 11 AM, 1 – 3 PM, 4 – 5 PM",
    note: "",
    contact: "<a href='mailto: Arianna.Livreri@qc.cuny.edu'>Arianna.Livreri@qc.cuny.edu</a> <a href='mailto: knightstable@qc.cuny.edu'>knightstable@qc.cuny.edu</a>"
    }, 
    {name: "<a href='https://www.york.cuny.edu/student-development/the-food-pantry-is-open--ready-to-serve-you'>York College </a>",
    coordinates: [-73.8785112, 40.7010122],
    resourceType: "Food Pantry",
    address: "Room 3 M02 – The Men’s Center",
    hours: "Monday, Thursday and Friday: 9 AM – 5 PM <br> Tuesday and Wednesday: 9 AM – 6:30 PM",
    note: "Student can complete a reservation on the York College website and can pick up their bag at AC 3C01",
    contact: "<a href='mailto:nacevedo@york.cuny.edu'> nacevedo@york.cuny.edu</a>"
    }, 
    {name: "<a href='https://www.csi.cuny.edu/campus-life/student-services/food-pantry'>College of Staten Island </a>",
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
        name: "<a href='https://www.bcc.cuny.edu/campus-resources/health-services/'> Bronx Community College</a>",
        coordinates: [-73.911073, 40.855522],
        resourceType: "Health Center",
        address: "Loew Hall, Room 101",
        email: "",
        phone: "718-289-5858"
    },
    {
        name: "<a href='https://www.hostos.cuny.edu/Administrative-Offices/SDEM/Health-and-Wellness-Center'> Hostos Community College </a>",
        coordinates: [-73.9297822, 40.8174218],
        resourceType: "Health Center",
        address: "D-101K: 120 East 149th Street, at Walton Avenue",
        email: "<a href='mailto: usanders@hostos.cuny.edu'>usanders@hostos.cuny.edu</a>",
        phone: "718-518-4483"
    },
    {
        name: "<a href='https://www.lehman.edu/student-health-center/'> Lehman College </a>",
        coordinates: [-73.892606, 40.868092],
        resourceType: "Health Center",
        address: "Old Gym, Room B008 (by the library)",
        email: "<a href='mailto: med.requirements@lehman.cuny.edu.'> med.requirements@lehman.cuny.edu.  </a>",
        phone: "718-960-8900"
    },
    {
        name: "<a href='https://www.brooklyn.edu/dosa/health-and-wellness/health-clinic/?utm_campaign=HealthClinicRedirect&utm_medium=StudentAffairs&utm_source=Website'> Brooklyn College </a>",
        coordinates: [-73.9553828, 40.6296448],
        resourceType: "Health Center",
        address: "114 Roosevelt Hall",
        email: "<a href='mailto: BCHealthClinic@gmail.com'> BCHealthClinic@gmail.com </a>",
        phone: "718-951-5580"
    },
    {
        name: "<a href='https://www.citytech.cuny.edu/wellness-center/'> City Tech </a>",
        coordinates: [-73.9901287, 40.6955415],
        resourceType: "Health Center",
        address: "300 Jay Street, G-414",
        email: "<a href='mailto: WellnessCenter@citytech.cuny.edu'> WellnessCenter@citytech.cuny.edu</a>",
        phone: "718-260-5910"
    },
    {
        name: "<a href='https://www.kbcc.cuny.edu/healthservices/index.html'>Kingsborough Community College</a>",
        coordinates: [-73.9351, 40.5787],
        resourceType: "Health Center",
        address: "",
        email: "<a href='mailto: Health.Center@kbcc.cuny.edu'> Health.Center@kbcc.cuny.edu</a>",
        phone: "718-368-5684"
    },
    {
        name: "<a href='https://www.mec.cuny.edu/student-success/health-services/'> Medgar Evers College </a>",
        coordinates: [-73.9562647, 40.6669141],
        resourceType: "Health Center",
        address: "1637 Bedford Ave Room S-217 Brooklyn, NY 11225",
        email: "<a href='mailto: healthservices@mec.cuny.edu'> healthservices@mec.cuny.edu</a>",
        phone: "718-270-6075"
    },
    {
        name: "<a href='https://studentaffairs.baruch.cuny.edu/health/'> Baruch College </a>",
        coordinates: [-73.9832, 40.7404],
        resourceType: "Health Center",
        address: "138 East 26th Street, Main Floor New York, NY 10010 (between Lexington and 3rd Avenues)",
        email: "<a href='mailto: StudentHealthCareCenter@baruch.cuny.edu'> StudentHealthCareCenter@baruch.cuny.edu</a>",
        phone: "646-312-2040​"
    },
    {
        name: "<a href='https://www.bmcc.cuny.edu/student-affairs/health-services/'> BMCC </a>",
        coordinates: [-74.0143296, 40.7188851],
        resourceType: "Health Center",
        address: "Room N-380 199 Chambers St.",
        email: "<a href='mailto: healthservices@bmcc.cuny.edu'> healthservices@bmcc.cuny.edu</a>",
        phone: "212-220-8256"
    },
    {
        name: "<a href='https://www.ccny.cuny.edu/shs'> City College of New York </a>",
        coordinates: [-73.9494064, 40.8194424],
        resourceType: "Health Center",
        address: "160 Convent Avenue Marshak Science Building, Room J15 New York, New York 10031",
        email: "<a href='mailto: shs@ccny.cuny.edu'> shs@ccny.cuny.edu</a>",
        phone: "212-220-8256"
    },
    {
        name: "<a href='https://guttman.cuny.edu/students/counseling-and-wellness-center/'> Guttman Community College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.9841, 40.7529],
        address: "Room 507",
        email: "<a href='mailto: wellness@guttman.cuny.edu'> wellness@guttman.cuny.edu</a>",
        phone: "646-313-8165"
    },
    {
        name: "<a href='https://sph.cuny.edu/students/student-services/student-wellness/'> Graduate School of Public Health </a>",
        resourceType: "Health Center",       
        coordinates: [-73.9442942, 40.8075709],
        address: "55 West 125th street, NY, NY 10027",
        email: "<a href='mailto: wellness@gc.cuny.edu'> wellness@gc.cuny.edu</a>",
        phone: "646-364-9600"
    },
    {
        name: "<a href='https://hunter.cuny.edu/students/health-wellness/immunization-records/contact-us/'> Hunter College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.9648136, 40.7666634],
        address: "Room 307, North Building",
        email: "<a href='mailto: wellness@hunter.cuny.edu'> wellness@hunter.cuny.edu</a> or <a href='mailto: healthandwellness@hunter.cuny.edu'> healthandwellness@hunter.cuny.edu</a>",
        phone: "212-772-4800"
    },
    {
        name: "<a href='https://www.jjay.cuny.edu/student-life/wellness-center/health-center'> John Jay College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.9945843, 40.7711081],
        address: "Room L.68.00 524 West 59th Street New York, NY 10019",
        email: "<a href='mailto:  healthoffice@jjay.cuny.edu'> healthoffice@jjay.cuny.edu</a>",
        phone: "212.237.8052"
    },
    {
        name: "<a href='https://www.laguardia.edu/students/health-services-center/'> Laguardia Community College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.936847, 40.7451641],
        address: "MB-40",
        email: "<a href='mailto: Health-Center@lagcc.cuny.edu'> Health-Center@lagcc.cuny.edu </a>",
        phone: "718-482-5280"
    },
    {
        name: "<a href='https://www.qc.cuny.edu/health/'> Queens College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.8172919, 40.7356728],
        address: "3rd Floor Frese Hall",
        email: "<a href='mailto:  healthquestions@qc.cuny.edu'> healthquestions@qc.cuny.edu</a>",
        phone: "718-997-2760"
    },
    {
        name: "<a href='https://www.jjay.cuny.edu/student-life/wellness-center/health-center'> Queensborough Community College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.7571592, 40.7566984],
        address: "Medical Arts Building, MC-02222-05, 56th Avenue Bayside, NY 11364",
        email: "<a href='mailto: HealthServices@qcc.cuny.edu'> HealthServices@qcc.cuny.edu</a>",
        phone: "718-6310-6375"
    },
    {
        name: "<a href='https://www.york.cuny.edu/health'> York College </a>",
        resourceType: "Health Center",       
        coordinates: [-73.7974691, 40.7010978],
        address: "AC-1F01",
        email: "<a href='mailto: StudHealthSvcCtr@york.cuny.edu'> StudHealthSvcCtr@york.cuny.edu</a>",
        phone: "718-262-2050"
    },
    {
        name: "<a href='https://www.csi.cuny.edu/campus-life/student-services/health-and-wellness-services'> College of Staten Island </a>",
        resourceType: "Health Center",       
        coordinates: [-74.1511079, 40.6018588],
        address: "Office of Student Life in the Campus Center, 1C-201",
        email: "<a href='mailto: healthcenter@csi.cuny.edu'> healthcenter@csi.cuny.edu</a>",
        phone: "718-982-3045"
    }
]

const childCareCenterLocations = [
    {
        name: "<a href='https://studentaffairs.baruch.cuny.edu/early-learning-center/'> Baruch College</a>",
        coordinates: [-73.98357224498129, 40.74098115055397],
        resourceType: "Child Care Center",
        address: "1 Bernard Baruch Way, New York, NY 10010",
        email: "<a href='mailto: EarlyLearningCenter@baruch.cuny.edu'>EarlyLearningCenter@baruch.cuny.edu</a>",
        phone: "212-387-1420 or 212-387-1421 "
    },
    {
        name: "<a href='https://www.bmcc.cuny.edu/student-affairs/ecc/'>Borough of Manhattan Community College</a>",
        coordinates: [-74.0117518174422, 40.71889027966533],
        resourceType: "Child Care Center",
        address: "Room N375, 199 Chambers Street, New York, NY 10007",
        email: "<a href='mailto: CScottCroff@bmcc.cuny.edu'>CScottCroff@bmcc.cuny.edu</a>",
        phone: "212-220-8250 or 212-220-8251"
    },
    {
        name: "<a href='https://www.bcc.cuny.edu/campus-resources/early-childhood-center/'>Bronx Community College</a>",
        coordinates: [-73.91292915243827, 40.85751542400496],
        resourceType: "Child Care Center",
        address: "2155 University Avenue Bronx, NY 10453",
        email: "<a href='mailto: Jessica.manboadh@bcc.cuny.edu'>Jessica.manboadh@bcc.cuny.edu</a>",
        phone: "718-289-5461"
    },
    {
        name: "<a href='https://www.brooklyn.edu/dosa/student-support-services/ecc/'>Brooklyn College</a>",
        coordinates: [-73.9528433876472, 40.63178531672928],
        resourceType: "Child Care Center",
        address: "1604 James Hall, Bedford Avenue & Avenue H, Brooklyn, NY 11210",
        email: "<a href='mailto: latchman@brooklyn.cuny.edu'>latchman@brooklyn.cuny.edu</a>",
        phone: "718-951-5431"
    },
    {
        name: "<a href='https://www.csi.cuny.edu/campus-life/student-services/childrens-center'>College of Staten Island</a>",
        coordinates: [-74.15171688627925, 40.60090048768787],
        resourceType: "Child Care Center",
        address: "2R-104, 2800 Victory Boulevard, Staten Island, NY 10314",
        email: "<a href='mailto: margaret.rooney@csi.cuny.edu'>margaret.rooney@csi.cuny.edu</a>",
        phone: "718-982-3190"
    },
    {
        name: "<a href='https://www.gc.cuny.edu/child-development-and-learning-center'>CUNY Graduate Center</a>",
        coordinates: [-73.98410388036424, 40.74881301157579],
        resourceType: "Child Care Center",
        address: "Suite 3201, 365 Fifth Avenue, New York, NY 10016",
        email: "<a href='mailto: cdlc@gc.cuny.edu'>cdlc@gc.cuny.edu</a>",
        phone: "212-817-7033"
    },
    {
        name: "<a href='https://www.hostos.cuny.edu/Administrative-Offices/SDEM/Children-s-Center'>Hostos Community College</a>",
        coordinates: [-73.92766600320839, 40.81835689191872],
        resourceType: "Child Care Center",
        address: "475 Grand Concourse, Bronx, NY 10451",
        email: "<a href='mailto: childrenscenter@hostos.cuny.edu'>childrenscenter@hostos.cuny.edu </a>",
        phone: "718-518-4176"
    },
    {
        name: "<a href='https://www.hunter.cuny.edu/studentservices/clc'>Hunter College</a>",
        coordinates: [-73.96502545097967, 40.76889874955809],
        resourceType: "Child Care Center",
        address: "Room 207N, 695 Park Avenue, New York, NY 10065",
        email: "<a href='mailto: clc@hunter.cuny.edu'>clc@hunter.cuny.edu </a>",
        phone: "212-772-4066"
    },
    {
        name: "<a href='https://www.jjay.cuny.edu/student-life/welcome-john-jay-childrens-center'>John Jay College of Criminal Justice</a>",
        coordinates: [-73.98973558077512, 40.770900501850285],
        resourceType: "Child Care Center",
        address: "860 11th Avenue, New York, NY 10019",
        email: "<a href='mailto: ChildrensCenter@jjay.cuny.edu'>ChildrensCenter@jjay.cuny.edu </a>",
        phone: "212-393-6438"
    },
    {
        name: "<a href='https://www.kbcc.cuny.edu/childcenter/'>Kingsborough Community College</a>",
        coordinates: [-73.93366595176497, 40.580597389255786],
        resourceType: "Child Care Center",
        address: "Room V105, 2001 Oriental Blvd. Brooklyn, NY 11235",
        email: "<a href='mailto: latasha.collins@kbcc.cuny.edu'>latasha.collins@kbcc.cuny.edu </a>",
        phone: "718-368-5439"
    },
    {
        name: "<a href='https://www.laguardia.edu/eclc/'>LaGuardia Community College</a>",
        coordinates: [-73.93684788394229, 40.74497998277946],
        resourceType: "Child Care Center",
        address: "Room MB09, 31-10 Thomson Avenue, Long Island City, NY 11101",
        email: "<a href='mailto: childcare@lagcc.cuny.edu'>childcare@lagcc.cuny.edu </a>",
        phone: "718-482-5295"
    },
    {
        name: "<a href='https://www.lehman.edu/child-care-center/'>Lehman College</a>",
        coordinates: [-73.8957626876063, 40.872655213213456],
        resourceType: "Child Care Center",
        address: "2870 Goulden Avenue, Bronx, NY 10468",
        email: "",
        phone: "718-960-7436"
    },
    {
        name: "<a href='https://www.mec.cuny.edu/student-affairs/early-childhood-center/'>Medgar Evers College</a>",
        coordinates: [-73.95223207974122, 40.666837401794794],
        resourceType: "Child Care Center",
        address: "Room C103, 1150 Carroll Street, Brooklyn, NY 11225",
        email: "",
        phone: "718-270-6018"
    },
    {
        name: "<a href='https://www.citytech.cuny.edu/occ/'>New York City College of Technology</a>",
        coordinates: [-73.9876258183888, 40.69549308562112],
        resourceType: "Child Care Center",
        address: "Room G-309 and Room NG14, 300 Jay Street, Brooklyn, NY 11201",
        email: "<a href='mailto: childcarectr@citytech.cuny.edu'>childcarectr@citytech.cuny.edu </a>",
        phone: "718-260-5192"
    },
    {
        name: "<a href='https://www.ccny.cuny.edu/cdc'>The City College of New York</a>",
        coordinates: [-73.95200431812987, 40.817234485413614],
        resourceType: "Child Care Center",
        address: "Schiff House, 119 Convent Avenue, New York, NY 10031",
        email: "<a href='mailto: CHuston@ccny.cuny.edu'>CHuston@ccny.cuny.edu </a>",
        phone: "212-650-7679"
    },
    {
        name: "<a href='https://www.qc.cuny.edu/sl/child-development/'>Queens College</a>",
        coordinates: [-73.82050097385967, 40.73816300423891],
        resourceType: "Child Care Center",
        address: "Room 245, Kiely Hall, 65-30 Kissena Blvd, Flushing, NY 11367",
        email: "",
        phone: "718-997-5885"
    },
    {
        name: "<a href='https://www.york.cuny.edu/child-family-center'>York College</a>",
        coordinates: [-73.79798760465582, 40.70199750988184],
        resourceType: "Child Care Center",
        address: "94-12 160th street, Jamaica, New York 11451",
        email: "<a href='mailto: yccfc@york.cuny.edu'>yccfc@york.cuny.edu </a>",
        phone: "718-262-2930"
    }
]

// Add markers and popups to the map
const foodPantryMarkers = foodPantryLocations.map(location => {
    return new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${location.name}</h3>
            <h4>${location.resourceType}</h4>
            <p>${location.address}</p>
            <p>${location.hours}</p>
            <p>Note: ${location.note}</p>
            <p>Contact: ${location.contact}</p>
        `))
        .addTo(map);
});

// Markers and popups for health centers
const healthCenterMarkers = healthCenterLocations.map(location => {
    return new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${location.name}</h3>
            <h4>${location.resourceType}</h4>
            <p>${location.address}</p>
            <p>Email: ${location.email}</p>
            <p>Phone: ${location.phone}</p>
        `))
        .addTo(map);
});

const childCareCenterMarkers = childCareCenterLocations.map(location => {
    return new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${location.name}</h3>
            <h4>${location.resourceType}</h4>
            <p>${location.address}</p>
            <p>Email: ${location.email}</p>
            <p>Phone: ${location.phone}</p>
        `))
        .addTo(map);
});

// Function to toggle markers based on checkbox state
function toggleMarkers() {
    const showFoodPantries = document.getElementById('foodPantryFilter').checked;
    const showHealthCenters = document.getElementById('healthCenterFilter').checked;
    const showChildCareCenters = document.getElementById('childCareCenterFilter').checked;

    foodPantryMarkers.forEach(marker => {
        marker.getElement().style.display = showFoodPantries ? 'block' : 'none';
    });

    healthCenterMarkers.forEach(marker => {
        marker.getElement().style.display = showHealthCenters ? 'block' : 'none';
    });

    childCareCenterMarkers.forEach(marker => {
        marker.getElement().style.display = showChildCareCenters ? 'block' : 'none';
    });
}

// Add event listeners to filters
document.getElementById('foodPantryFilter').addEventListener('change', toggleMarkers);
document.getElementById('healthCenterFilter').addEventListener('change', toggleMarkers);
document.getElementById('childCareCenterFilter').addEventListener('change', toggleMarkers);

// Initialize markers display
toggleMarkers();