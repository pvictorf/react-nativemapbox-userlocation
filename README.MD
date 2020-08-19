# Install
```
cd react-nativemapbox-userlocation

npm install --save or yarn install

```

# Configurando (Android)
Vá até o diretório *android/app/src/main/AndroidManifest.xml*
e adicione as permissões abaixo:
```
<manifest...>

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

Em *App.js* insira sua "Default public token" do Mapbox (see: https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)

```
const APIKEY = "YOUR_MAPBOX_TOKEN";
```

# Running
```
npx react-native run-android
```

# Features
* Localização em tempo real.
* Indicador da direção que o usuário está indo.
* KeepAlive que impede a tela do dispositivo apagar quando não se está integarindo com app. 