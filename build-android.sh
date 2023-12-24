#!/bin/bash

# Bundle JavaScript code
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build APK
cd android
./gradlew assembleDebug
