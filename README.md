# Django-React-Authentication

This is a project that demonstrates how you could implement a fully featured JSON Web Token Authentication system in Django and React. This includes showing how to implement features like account activation, password reset. Further improvements to make it more production ready would just be to utilize the refresh token to get a new access token when the application reloads and also reloads when you go to an important page such as a checkout page, and having alerts present on the frontend to make things more user friendly.

In order to test out this project, follow these steps:

- clone the repository
- in the frontend folder, run: npm install, this will install the required frontend packages
- in the frontend folder, run: npm run build, this will make a build folder and copy it into the backend folder
- in the current of the app, run: python3 -m venv venv
- then activate the virtual environment
- in the current folder, run: pip install -r requirements.txt

 Then under backend/settings.py:
 
- under DATABASES, set the PASSWORD field to your database password
- under EMAIL_HOST_USER, set the email that you want to use
- under EMAIL_HOST_PASSWORD, set the app password that you setup for your email
