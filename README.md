## [Heroku Link](https://tt-33-water-my-plants.herokuapp.com/)

<br>

## **Endpoints**

### /auth

| REST Method | Endpoint      | Description                                                               |
| :---------: | :-----------: | :-----------------------------------------------------------------------: |
| **POST**    | auth/register | register a new user. <br>username, password length > 6<br> & phoneNumber required |
| **POST**    | auth/login    | logs in as designated user.<br> requires creds from user which signed up     |

<br>


### /api/users

| REST Method |      Endpoint      | Description                          |
| :---------: | :----------------: | :----------------------------------- |
|   **GET**   |     api/users      | view list of users                   |
|   **GET**   |   api/users/:id    | get user by id                       |
|  **POST**   |     api/users/     | add new user                         |
|   **PUT**   |   api/users/:id    | update user by id                    |
| **DELETE**  |   api/users/:id    | delete user by id                    |

<br>

### USERS TABLE SCHEMA

| user_id | username | password | phoneNumber |
| :-----: | :------: | :------: | :---------: |
|automatic| required | required | required    |

<br>

### /api/plants

| REST Method |      Endpoint      | Description                          |
| :---------: | :----------------: | :----------------------------------- |
|   **GET**   |     api/plants     | view list of plants                 |
|   **GET**   |   api/plants/:id   | get plants by id                    |
|  **POST**   |     api/plants/    | add new plant                       |
|   **PUT**   |   api/plants/:id   | update plant by id                  |
| **DELETE**  |   api/plants/:id   | delete plant by id                  |

<br>

### PLANTS TABLE SCHEMA

| plant_id | nickname | species | h2oFrequency | image    | user_id |
| :------: | :------: | :-----: | :----------: | :------: | :-----: |
| automatic| required |required |  required    | optional | required|
