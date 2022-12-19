<div align="center">
    <img src="./ReadmeResources/logo.png" alt="Logo" width="240">

  <h3 align="center">SpaceWar FullStack Game</h3>

  [![GitHub](https://img.shields.io/badge/GitHub-YassirCH-c1dbc3.svg)](https://github.com/yassirH9)

</div>
<details>
  <summary>Documentation Index</summary>
    <ol>

- [Ababout the project](#Ababout-the-project)
- [Installation manual](#Installation-manual)
- [Data Model diagram](#Data-Model-diagram)
    - [Data Diagram](#Data-Diagram)
    - [Basic explanation of the data model](#Basic-explanation-of-the-data-model)
    - [Relationship of entities](#Relationship-of-entities)
- [Use case diagram](#Use-case-diagram)
- [Technical requirements](#Technical-requirements)
- [Interface](#Interface)
  - [First design idea](#First-design-idea)
  - [Accessibility and usability documentation](#Accessibility-and-usability-documentation)
- [Technology stack](#Technology-stack)
- [Technology selection](#Technology-selection)
- [Planification](#Planification)
- [Project conclusion](#Project-conclusion)
- [External links](#External-links)

    </ol>
</details>

## Ababout the project

<p style="text-align:justify;">
This project consists of a full stack application to visualize game data, such as achievements, scores and rankings. The application is developed using Angular on the front-end and Spring Boot on the back-end, and Unreal Engine has been used to create the game.

The web admin panel is designed to be user-friendly and provides an intuitive interface for users to access the game data easily. With it, users can view the scores and achievements of each player, as well as the ranking of all players.

As for the gameplay, it is expected to be a space invaders style game with solid mechanics and a system of online rankings and achievements which can be managed on the web and encourage the player to beat their records as much as possible.

In summary, this full stack application is a complete solution to visualize and manage game data using Angular, Spring Boot and Unreal Engine.
</p>

## Installation manual

1. Clone the repository

    * Clone the project
        ```sh
        git clone https://github.com/yassirH9/SpaceWar.git
        ```
    
2. Web server startup

    * Install node module
        ```sh
        npm install
        ```
    * Start web server
        ```sh
        npm start
        ```
        if you want to modify the npm start command the base command is in package.json
    <br>
    * Alternative way to start the web server
        ```sh
        ng serve --proxy-config ./src/proxy.conf.json
        ```
    <br>
3. Backend startup
        3.1. Import the SpaceWarBackend folder into a java IDE.
        3.2. Open the application.properties and follow these steps.
        
    * Create a connection in the database in this case MySQL and without creating any element add the connection data in the following lines substituting the example data.
        ```sh
        spring.datasource.url = jdbc:mysql://localhost/example_db_url?useSSL=true
        spring.datasource.username = example_db_user
        spring.datasource.password = example_db_password
        ```
    *  The backend will create all the necessary content for the database, for this you have to uncomment the following line.
        ```sh
        spring.jpa.hibernate.ddl-auto = create
        ```
        <font color="red">*WARNING: </font> After the first execution of the backend comment the previous line again or else if the server is restarted all the data in the database will be deleted and all the entities will be created again.
        
## Data Model diagram

##### Data model
<p align="center">
  <img src="./ReadmeResources/DataModel.png" alt="data model diagram" style="display: block; margin: auto;">
</p>

As can be seen in the previous diagram, the initial model consists of 4 main entities and later a new entity was added for the user images.

#### Basic explanation of the data model
In this section I will make a short explanation of each entity and its attributes.
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">User:</strong>
       <strong style="font-size:15px;" >PLID:</strong> User identifier used for searches in the backend and for searches in other related entities.
        <strong style="font-size:15px;" >MAIL:</strong> User email address, it could be used to verify user accounts and avoid bots.
        <strong style="font-size:15px;" >PSWD:</strong> User password encrypted with bcript.
        <strong style="font-size:15px;" >NICKNAME:</strong> Username, this is used to log-in to the web site
        </div>
        <hr>
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">Ranking:</strong>
        <strong style="font-size:15px;" >ID:</strong> Identifier for modifications and other actions.
        <strong style="font-size:15px;" >POINT:</strong> Number of points obtained by the user in the game.
        <strong style="font-size:15px;" >PLID:</strong> User identifier to establish the relationship.
        </div>
        <hr>
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">Achivement:</strong>
        <strong style="font-size:15px;" >ID:</strong> Identifier for modifications and other actions.
        <strong style="font-size:15px;" >PLID:</strong> User identifier to establish the relationship.
        <strong style="font-size:15px;" >ACHIVEMENTID:</strong> Achivement master identifier for establishing the relationship.
        </div>
        <hr>
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">Master Achivement:</strong>
        <strong style="font-size:15px;" >ID:</strong> Relationship identifier as master.
        <strong style="font-size:15px;" >NAME:</strong> This will be used to assign a name to an internal achievement in the game.
        <strong style="font-size:15px;" >DESCRIPTION:</strong> Small description of the achievement that will be displayed on the website after obtaining the achievement in the game.
        </div>
        <hr>
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">Image:</strong>
        <strong style="font-size:15px;" >ID:</strong> Used internally by the backend to establish a relationship with the user.
        <strong style="font-size:15px;" >IMAGE:</strong> MEDIUMBLOB with image.
        <strong style="font-size:15px;" >NAME:</strong> name generated automatically and hashed by the backend to avoid repetition.
        <strong style="font-size:15px;" >USER:</strong> User id to establish relationship.
        <strong style="font-size:15px;" >TYPE:</strong> Yype of image uploaded png, jpg etc.
        <br >
        In this case as I only store one photo per user I decided to save these in the database, it is like that since it is not required to program a file search system in the backend and the hibernate understands it as an entity which can have a relationship that in this case is with the user.
        </div>
        <hr>
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">Roles:</strong>
        <strong style="font-size:15px;" >ID:</strong> Role master identifier.
        <strong style="font-size:15px;" >NAME:</strong> Name assigned to identify the role on the front-end.
        </div>
        <hr>
        <div style="margin-left:55px;">
            <strong style="color:#c1dbc3; margin-left:-30px;">User_Role:</strong>
        <strong style="font-size:15px;" >USER_ID:</strong> User identifier to establish the relationship with the role master.
        <strong style="font-size:15px;" >ROLE_ID:</strong> Role identifier to establish the relationship with the user.
        </div>
        All entities are automatically generated by the backend if the instructions have been followed correctly.

#### Relationship of entities

<div>

```
USER - RANKING : OneToOne : A user can have either 0 or 1 ranking position.
```
```
USER - ACHIVEMENT : OneToMany : A user can have 0 to many achivement, this is the intermediate table of the relationship between user and masterachivement making this an M-M relationship.
```
```
USER - IMAGE: OneToOne : OneToOne : A user can have 0 or 1 photo and a photo can only have one user in its relationship.
```
```
ACHIVEMENT - MASTERACHIVEMENT : OneToMany : A master achivement can have many achivements and an achivement can only have one master achivement.
```
</div>

#### Extra diagrams
<div align="center">
    
##### UML
<img src="./ReadmeResources/UML_Model.png" alt="UML Model" width="1920px">
</div>
<div align="center">
    
##### Relational
<img src="./ReadmeResources/Relational_model.png" alt="Relational Model" width="1920px">
</div>

## Use case diagram

<div align="center">
<img src="./ReadmeResources/useCase.png" alt="Use Case Model" width="1920px">
</div>
<br>
<p style="text-align: justify;">
In the following use case you can see three main roles with their functions and requirements, a guest which can access the general ranking of the game, this is visible on the web and does not require login, also can be registered as a new user as it will be necessary to download the game, the next role is the user, this has access to everything needed to view your saved data and modify them to taste except the data generated by the game, finally an administrator who has absolute control of the data of the web and registered users.
</p>

## Technical requirements
#### BackEnd
- RAM: Minimum 3GB free ram.
- ROM: 1GB free space.
- CPU: I5 or derivatives thereafter.
- GPU: N/A
- Other requirements
    - MySQL or SQL-derived servers.
    - IntelliJ or Eclipse to run backend
#### FrontEnd
- Visual Studio code to run a front-End web server
- Web Browser [Chrome, Brave or derived].
    - This web application is optimized for mobile devices.
## Interface
#### First design idea
[Link to see mockups and design in figma.](https://www.figma.com/file/2MKemHpBx1IHK3T7tlcxpN/Untitled?node-id=0%3A1&t=l5M5d8fELxULJaG3-1)
### Accessibility and usability documentation

## Technology stack
For this project I have used the following technology stack.

[![Angular][angular2.io]][angular.url]

[![Spring][spring2.io]][spring.url]

## Technology selection

[comparison tecnologies]

## Planification


## Project conclusion

## External links


