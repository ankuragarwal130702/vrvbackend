# VRV Backend

This is the backend for the VRV project.


## Installation

1. Clone the repository
2. Install the dependencies
3. Run the server


## All routes

### 1. Authentication Routes
**Sign Up**
Method: POST
Endpoint: `/api/auth/signup`
Description: Registers a new user and assigns roles.

``` json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "roles": 1
}

```


**Sign In**
Method: POST
Endpoint: `/api/auth/login`
Description: Authenticates a user and returns a JWT token.
``` json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

```

### 2. User Management Routes

**Get all users**

Method: GET
Endpoint: `/api/users`
Description: Retrieves a list of all users.
Protected: Yes (Signed user only)

**Get User by ID**
Method: GET
Endpoint: `/api/users/:id`
Description: Retrieves a specific user by ID.
Protected: Yes (Signed user only)

**Update User**
Method: PUT
Endpoint: /api/users/:id
Description: Updates user details (e.g., name, status, or roles).
``` json
{
  "name": "Jane Smith",
  "status": "Active",
  "roles": 2
}
```

**Delete User**
Method: DELETE
Endpoint: `/api/users/:id`
Description: Deletes a specific user.
Protected: Yes (Admin only)

### 3. Role Management Routes
**Get All Roles**
Method: GET
Endpoint: `/api/roles`
Description: Retrieves all roles.
Protected: Yes (Admin only)


**Get Role by ID**
Method: GET
Endpoint: `/api/roles/:id`
Description: Retrieves a specific role by ID.
Protected: Yes (Admin only)


**Create Role**
Method: POST
Endpoint: `/api/roles`
Description: Creates a new role.
``` json
{
  "name": "Editor",
  "key": "2",
  "permissions": ["read", "write"]
}

```

**Update Role**
Method: PUT
Endpoint: `/api/roles/:id`
Description: Updates a role's name or permissions.


**Delete Role**
Method: DELETE
Endpoint: /api/roles/:id
Description: Deletes a specific role.
Protected: Yes (Admin only)




