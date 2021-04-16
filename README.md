# DEHIA Mobile App
A mobile app for [DEHIA](http://sedici.unlp.edu.ar/handle/10915/116617), a platform for managing and executing data collection activities that require human intervention.

## Contents
- [DEHIA](#dehia)
- [Installation](#installation)
- [Building for Android](#building-for-android)
- [Environment Variables](#environment-variables)
- [See Also](#see-also)

## DEHIA
DEHIA is a platform for Defining and Executing Human Intervention Activities. Its goal is to allow users without programming knowledge to create activities (sets of tasks, mainly for data collection) through a web authoring tool. The activities are exported to a configuration file and then "executed" (solved) from a mobile app. This kind of activities requires human intervention and cannot be solved automatically. 

There is also an API that manages the activities lifecycle, collects the data from the mobile app and returns the results. It also manages the security of the application. The API includes a Gateway and four services: Define, Auth, Collect and Results.
## Installation
You can install the app in a device using React Native, NodeJS, and Android Studio tools.
1. Follow the instructions at [https://reactnative.dev/docs/environment-setup] and [https://reactnative.dev/docs/running-on-device]
2. Install the app dependencies
```
yarn install
```
3. Create an `android/local.properties` from `android/local.properties.dist` and set your Google Maps API Key ([https://console.cloud.google.com/apis/credentials])
3. Start the Metro Bundler (maker sure you have nodejs12+ installed)
```
npx react-native start
```
or (after react-native is installed by npx)
```
yarn start
```
4. Install the app into your device
```
npx react-native run-android
```
5. The app will open in debug mode in the device.
## Building for Android
## Environment Variables
## See Also
- [DEHIA Frontend](https://github.com/mokocchi/autores-demo-client)
- [DEHIA Gateway](https://github.com/mokocchi/dehia_gateway)
- [DEHIA Define Service](https://github.com/mokocchi/dehia_define)
- [DEHIA Auth Service](https://github.com/mokocchi/dehia_auth)
- [DEHIA Collect Service](https://github.com/mokocchi/dehia_collect)
- [DEHIA Results Service](https://github.com/mokocchi/dehia_results)