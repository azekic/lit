
# Updated User Guide for Stage 4

## Workflow

### What was the process or branching model each person used to pull, develop and push?

For this project, we used Git as a version control system, and used Github as an online repository to store our application. Generally, whenever an individual on our team wanted to implement a new feature, they would pull the master into their own branch. Once their feature is working, locally, they would push and merge their features onto the master branch. Therefore the master is always stable and up to date with everyone's features. 

### What development tools/frameworks did your project use?

In this project, we used angularjs as our main front-end framework. Angularjs is responsible for handling the MVC architecture that our web application is based on. Bootstrap is used in some styling choices on our html pages. Uikit is another modular front-end framework used for styling, especially, animations on our website. Google's firebase is an online development tool used as the backend of our web application. Facebook api was used to allow users to log in through facebook. Google maps API is used to create maps that users can manipulate on to create events. 

### How effectively did your team manage task distribution among team members?

Task distribution in our team was based on a self declaration style, where group members would choose which responsibilities and tasks that they would be in charge of. this allowed our members to choose the individual tasks that they felt comfortable with handling. If an individual member was more experienced with javascript, then they would focus primarily on front-end, javascript related responsibilities. If any tasks were left undeclared, then they would be delegated to the more experienced group members. 

## MVC / Design Patterns

### What is the relationship between user interfaces, application logic, and data in your project?

The users input their data, such as when creating an event or changing profile information, into the user interface which is processed through HTML and passed to JavaScript controllers. These controllers then perform any application logic and the querying of the database.  The data for our project is stored in Firebase, an online database provided by Google, which contains the users and events data.

### Did you implement your server-side program as a REST API?

Our server-side program was not implemented as a REST API since Firebase and JavaScript made it very easy to access data directly from the database and pass it to our program.

### Which collection of classes serve as the M, V, and C in MVC?

The Firebase database serves as the model (M) in our project as it stores all of our data to be manipulated. The project’s views (V) are all implemented in the HTML files, such as allevents.html or addevent.html, which pass data to the controllers and display the results to the user. The controllers (C) of the project are the JavaScript files, such as allevents.js or events.js. These files take the input from the HTML files and perform the data querying and manipulation.

### How do these classes communicate with each other? Give an example based on a user action.

When the user navigates to the All Events page, they can select a category from a drop down menu or search for an event. When they select a category and click the submit button this immediately passes the category name as a string through a function call in the allevents.html file to the allevents.js controller. This JavaScript function then performs a few comparisons to check what category the user wants to view. When it has decided on which output the user wants, it populates a list by querying Firebase based on the category each event has as an attribute. The function then returns the list to HTML file and displays it to the user.

### If you were to start the project again today, what aspects of code organization could be improved in your project?

If we were to start over, we could improve on our JavaScript controllers. The project would benefit from a more overarching class structure for subclasses to inherit so we could reuse more code. This way we would not have to worry about changing a variable that may break other components. We could also use this idea to have fewer JavaScript files to help keep the project organized. We could also improve on keeping our code as close as possible to what was laid out in the UML diagram. This way when knew components are added everyone would still understand what information is being manipulated and where it is supposed to be sent. 


## Refactor Retrospective

### Areas of your design that you felt were strong:

One of the good part of our design is we use a route to control all our page and all the controller. Therefore, for the user, each time they click on a icon they are still on the same page, and they will not be redirected to another page. Also, each route has a template url(how the page will look like) and a controller which which control the function of the page. It is convenient for us when we want to add a page, and also good for the communication between each page because we do not need to add hyperlinks in the menu bar in each page, which will save us lots of work. Moreover, it is more readable and clear for team members to know what page we have currently, and corresponding controller for each page.

Another strong part of our design was using google’s firebase as our backend server which held all our data for our web application. Learning how to access and manipulate the firebase was quick to learn. Firebase holds data in objects very similar to the object data type in javascript. This made displaying and manipulating the data with angularJS very easy, especially when displaying the data in an array with ng-repeat. Another benefit of using firebase, was that whenever a new user or event was created, the changes could be seen live on the our firebase database which could be viewed through the web. This allowed for the developers on our team to work with the same database and eliminated any confusion from using different local data.
Areas of your design that you felt were weak:

One of the bad design in our project is in the account settings page, if a user need to modify their information, they need to fill out all the information before they modify their personal information. So they can’t only change one of their personal information such as age or last name. In our code, we only write one update function for the modification of the information which is the reason why user cannot only change one information. In order to improve my code, we have to write different if statement to consider all the situation when a user modify their information. Also there are two photo uploading function, one is in the controller, one is in the upload button event listener, which make the code duplicated.

Another bad design choice in our project is having all our controllers run on the client-side. Since our controllers are responsible for accessing our backend, this means that our backend only changes when a user accesses our front-end website. Although our implementation of our design choice works well with our current application, if we ever wanted to incorporate machine learning or suggestions as a feature in our web application, we would need to incorporate back-end code that would run server-side without the need of a user. This however is not that limiting, since we could incorporate a node.js server along with our firebase server, and the node.js server would hold all our back-end code, and our firebase server would be responsible for real-time updates to data that are accessed by the front end. 


## Project Retrospective

### What did your group do well?

Our group displayed a strong team effort in collaborating to complete features on both frontend and backend. We also met at critical times outside of our scheduled weekly times and had majority participation for the heavy coding requirements leading up to Stage 3.
Vision and communication were also important areas that allowed us to be successful throughout various stages of the project. Every team member had a clear understanding of what our software’s goals were from our user stories and meetings. This allowed for members of the backend team to collaborate in adding new features and front end team members to properly style and include them when updating the user interface.

### What could your group have done better?

Our team would have benefited from additional time bug testing and troubleshooting before submission of Stage 3. Due to how new a lot of these tools were (Firebase, GitHub Master Merging and APIs), it wasn’t uncommon to have certain areas of our code experience bugs on both the frontend and backend. While we did fix a lot in time for the Stage 3 submission having a member devoted specifically to testing may have been helpful. 

### What did you like about the tools and frameworks you used?

Firebase was very flexible and even though it had a steep initial learning curve, it became a solid foundation for our code that allowed us to utilize AngularJS and authentication APIs with a greater focus on adding core features quickly, and fine tuning them as the project progressed.

AngularJS, Firebase, JQuery and UIKit are all flexible tools that would allow us to move from a web application platform to an iOS/Android base without re-implementing the fundamentals of how our code functions. This allowed us to build code that could be easily maintained with the prospect of continuing development - whether on web, iOS, or Android. Most of the tools we used were modular and allowed for a cohesive user experience when considering our overall design and usability goals for the project.

### What didn’t you like about the tools and frameworks you used?

There were some features in Firebase that were missing, making it a challenge to implement certain functionality of our web app. For example, Firebase lacks the ability to have simple implementation for case insensitive search, meaning for our event search function searches the database for exact cases of the word or phrase. 
Also, Facebook’s APIs for authentication along with its developer documentation was incredibly confusing to implement for such a simple function of Facebook Login. Pulling user data from the Facebook authorization request (display_name, age, events) was tedious, and further passing that information to Firebase was not always reliable due to the token storage requirements imposed by Facebook. Overall, while we did get this to work - it appears that areas of the Facebook API documentation were out of date, adding an additional level of complexity to troubleshooting. 

## Video Demonstration
### [Link to video](https://youtu.be/7vAmv45OWUc)

## [Link to website](https://liteventtracker.com/)

## Introduction

There is a disconnect between students and the events going on around them. Councils, clubs, and societies across campus have no standardized method to communicate with students. Students are left to figure out whats going on across campus on their own. From this insight came the inception of LIT, a service that aims to fill the gap and bring the events of all clubs and societies across campus directly to students, using a novel and intuitive user interface.


## Guest Browsing

You can browse current events on the site without registering in two ways. The marker button on the bottom right brings you to a map of all the events on campus, and the list button on the bottom right brings you to a list of all events on campus. For more information on how to use the site, select the question button on the bottom right.

## Registration

If you have not made an account with us, you will be automatically redirected to the login page. Alternatively you can access the login page (while logged out) by selecting the lock button on the bottom right. To create an account, select the "Register" link at the bottom , then fill in your name and email, and type in a password. You will be added to our database and given a unique UserID. Alternatively, you can login with Facebook by selecting “LOG IN WITH F”, and following the registration process from there.

## Login

If you've already created an account, you can log in by email and password on the login page (which can be accessed by selecting the lock button on the bottom right. You can log out at any time by selecting “LOG OUT” at the top right of the nav bar.

## Friends

LIT allows you to interact with other users through a friends system. To view all users on LIT, select the people icon on the bottom right. You can add a user as a friend by selecting ADD FRIEND or view more details about them by selecting GO TO PROFILE. To view a list of all your friends, select the person con on the top right. 

## Map

You can view all events on the map by selecting the marker button on the bottom right. This will bring you to a view of western’s campus with a heat map showing the concentration of users at individual events. To view the areas bound by each event and more details, zoom into the map. You will see polygons outlining the radius of each event. The colour of an event corresponds to its density of attendees - yellow to orange to red in order of increasing attendees. If you click on an event you can view more details about the event. Select the back arrow on the bottom left to return back to the main user interface.

## Account Settings

Selecting the "Account Settings" tab in the top right allows the user to see their current name, age and email. Hovering over the profile picture will give the option to change the user’s first name, last name, email and profile picture. The user can select a picture to upload and save the changes. The user also has the option to fill in the text boxes to change their name and age, as well as gender and occupational information. Clicking the Update Profile button will save these changes. There are also buttons to link and unlink the user’s account with their Facebook profile.

## All Events

The "All Events" tab in the top left leads to a list of all events created on our database. Events can be sorted by the most recently created, the time the event is happening, archived events, by category or display all events in the database. There is also the option to search by entering the case sensitive title, to quickly get to the event the user you want to view. When the filter is applied there are a few options. The user can add to themselves to an event’s guest list by clicking the check icon. To view the guest list, click the people icon.

## Creating an Event

To create an event, select the “+” icon in the bottom right from any page. Here the user can enter the Event Name in the field and select the category by clicking on one of the options. The user can enter an event description, the year in the specified format, and the floor number the event will be held on. A Back button is provided at the bottom to cancel event creation.

## Editing and Deleting Events

On the "My Events" tab, the user can see all the events you've created at a glance. On each event card the user can select the trash can icon to delete their event, and selecting the pencil icon when take the user to another page to edit the details. This page works in the same way as the event creation page. The people icon will display the list of users attending that event and the pin icon will display that event on the map.

