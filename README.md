# QuickNodeNFTColletion

### How to run?

`npm run dev`


### Handles user authentication

#### Would you need a database?
Yes, we would need a database to store information related to all the users who have successfully signed up to the application. 
#### Which one and what might the schema look like?
Usually a database can be a Relational Database (RDBMS), with a table containing hashed credentials for the users and a foreign key to other user information in a different table. PostgreSQL is one RDBMS which can do our job to store all the hashed credentials as well as the profile information.

![alt text](https://github.com/iamsharduld/QuickNodeNFTColletion/blob/main/public/db.png)


#### Authentication process flow - Login
Client will send credentials to the application server over the network
Application server will check hashed information stored in the database
If it matches, it’ll return a token with specified access claims for that user
Authentication token is stored in user’s browser cookies or localStorage and will be sent with each request it makes to the application server

#### Are their pros/cons to a specific choice? (SQL vs NoSQL)
In a SQL server, data is managed with help of relationships and constraints on the schema. In user management, this will lead to more robust and predictable queries for the user data. 
Whereas if we decide to go with NoSQL, we have the capabilities to horizontally scale the server with minimal change in performance. In case with multi-millions or billions of users, we would go with a NoSQL database engine. It’ll also help manage unstructured data eg. Changing attributes for a given users of the application

### Serves data to the client via an API
My choice for this system would be a GraphQL API, since 
* It’ll cut down the communication latency between clients and server where clients will request for only the fields they are interested in
* Automatic versioning - Given the fast changing environment with Web3 it would be easier to maintain GraphQL APIs going forward
* Easier to query hierarchical data
* Queries can be reused at multiple levels of the component tree in the front-end
* Adding on top of existing codebase - It’s easy to integrate new GraphQL code to the existing application server


### Scales to handle thousands of requests per second
* Load balancing - To efficiently scale a web application to thousands of requests per second, load balancing would be the primary go to design method. It’ll evenly distribute the load to the servers (usually using algorithms like Round-Robin etc.) and increase the availability and reliability of our application. It’s important to note that a lot of enterprise cloud providers(eg. AWS) have automatic scaling capabilities.
* In-memory data stores - Using in memory data stores like Redis can support an order of magnitude more operations and faster response times. The result is extremely fast performance with average read and write operations taking less than a millisecond and support for millions of operations per second
* Database sharding and replication - Replication and sharding can be used together to good effect, as they can lead to both high availability and improved performance. Using sharding, there will be a number of instances with particular data based on keys. These instances can then be individually replicated to produce a database which is both replicated and sharded.


### Provides real-time updates to clients as new data is available
* Create streaming pipelines with websockets - The architecture can be implemented with help of Pub/Sub model where clients subscribe to topics for the given data and as soon as the data gets updated, changes are reflected on the clients’ ends.
