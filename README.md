# CSE330
475569
474190

TA Julia Dickerman approved rubric on 11/22

# Rubric:

# Rubric turned in on time (5 points)

# Languages/Frameworks used (25 points)

Learned/Used React.js frontend (10 points)

Learned/Used Express backend (10 points)

Learned/Used PostgreSQL Database (5 points)

# Functionality (55 points)

Users can register, login, and logout (10 points)

Users can log daily symptoms and latest COVID test result (5 points)

If symptoms indicate a potential covid positive cases, users are alerted to get tested and update their latest COVID test result (5 points)

Users can input/edit/delete other users they’ve seen from day to day (5 points) 

Users are notified if they exposed to a COVID-positive user with direct, secondary, and tertiary contact tracing (10 points)

Users are notified if their network of individuals up to the tertiary level exceeds a safety threshold—alert level. For example, 0-20 contact traced exposures day = yellow, 20-40 = orange, 40+ = red. (10 points)

Database created that contains Users, COVID Status, Daily Symptoms, Active Contacts (within two weeks), COVID-Positive Tracing Standing (None, Direct, Secondary, Tertiary, etc), etc. (10 points)

# Best Practices (5 points)

Code is readable and well formatted (3 points)

All pages pass the html validator (2 points)

# Creative Portion (10 points)

We added a "Check User Safety" button, which upon input of any user within the network tabulated in our app, will check the COVID-status of said user as well as determine their network safety and display this information on the page. This could be useful to run before seing a user. (7 points)

We created a "Risk" attribute that assigns to every user that's based off of two components: the logged symptoms by a user as well as their COVID network status that is determined after contact tracing is applied. For example, a user's risk will be elevated if contact tracing determines that they have a connection to a COVID-positive user. (3 points)
