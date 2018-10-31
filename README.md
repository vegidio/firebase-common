# Firebase Common

In this project I keep the list of most packages and classes that I commonly use during the development of my Firebase projects. This project will be updated constantly as I find better libraries to do the tasks or when I improve the code.

## Packages

I used a set of well-known Javascript packages so we don't have to reinvent the wheel 🙃

* __eslint:__ linting tool for Javascript.

## Project Structure

The project can be controlled through the [Firebase's](https://console.firebase.google.com) and [Google Cloud's](https://console.cloud.google.com) consoles.

### Functions

* __addFileToDatabase:__ When a file is uploaded in the Storage its reference will automatically be added in the Firestore database.

## Deployment

To build and deploy the project you need Firebase CLI. In the project root folder type:

```
$ firebase deploy --only functions
```

## Author

Vinicius Egidio ([vinicius.io](http://vinicius.io))
