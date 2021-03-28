## [Heroku Link](https://tt-33-water-my-plants.herokuapp.com/)

<br>

## **Endpoints**

### /auth
<br>

| REST Method | Endpoint      | Description                                                               |
| :---------: | :-----------: | :-----------------------------------------------------------------------: |
| **POST**    | auth/register | register a new user. username, password length > 6 & phoneNumber required |
| **POST**    | auth/login    | logs in as designated user - requires creds from user which signed up     |

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

### /api/plants
