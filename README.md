# UserApi
Code Byter task

# Running Instructions
* clone this repository
* terminal cd to this file
* run command "npm run start" or "npm run server"

  There is a database user created specifically for Saqaya and will expire in 1 week. I have included the files with the database user/password. This is not best practice at all but this is for demonstration to see how things are connected.

# Postman API  tutorial
## First Endpoint 
The endpoint hit is "http://localhost:3000/user" POST request 
JSON request body fields required "firstName" , "lastName" , "email", marketingConsent field is by default false. The response is the id and accessToken.

* Here a user post request with marketing consent false

  
![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW5oemQzYTRzd3JsaWRyYmRjajRoa292dHU3azZ3ZGVyNWdxdGk2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6Axs6Eb7lmNb2oYvMx/giphy.gif)

* Here a user post with marketing consent as true


  ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjQ0NWJrazZ3YnFoYzl6dnE4dHdkcWdycHJta3Y1aHpyZnRndmtpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KYKW9mzEJhAx4ufL0r/giphy.gif)

* Here a user post with an existing email

  
  ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWQxeGoydmNqNHNrOG1kbHdzNTltMTN6N3V5dmNzd3o2cXcyMGpkaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ecZn0GmDzea6hK9YE1/giphy.gif)

* Here a user post request with missing fields (Required fields are firstName , lastName , email)

  
  ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb254ZDZ1YnJsMm02dmkwZzFmMHR1bWwxMGtodTl0ODlwZnloeGExMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vkYBgFGeWlKHMhfDBH/giphy.gif)

## Second Endpoint
The endpoint hit is "http://localhost:3000/user/userid"  Get request with the userid needed to be provided in the URL and x-auth-accessToken Header with the user's JWT.


* Here a user get request that has marketing consent false so no email in response
  ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRndTdlMjVseXprMXJ4NWtoMXZnNnRiNTQyb2Q5ZGhqNnZqMHBnbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OK9c2K4o5KhfablqAM/giphy.gif)

* Here a user get request that has marketing consent as true so email is in response
  ![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczlrbjh3ajU2d3gzZWN1dmM4YzJwZWgxaTh3YmZ3OHhwOGNpenhzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ilyy2PMrttZspNTHAE/giphy.gif)
