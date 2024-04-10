# Vas APP

Aplicación Móvil Vas para gestion de proyectos

## Previsualización

previsualización de `despliegue utilizando Expo y Emulador de Android Studio`

- Pantalla Login

![Imagen despliegue Principal](./public/images/loginApp.png)

## Generar carpeta android

para poder generar la carpeta android:

```bash
npx expo prebuild -p android
```
## Limpiar Cache

limpiar cache de dispositivo (variables de entorno)

```bash
npx expo start --clear
```
## Generar APK o AAB 

generar Nuevo Project Id:
```bash
eas int
```
generar apk con el perfil de preview:
```bash
eas build -p android --profile preview
```
## Configurar expo-env.d.ts

agregar el siguiente codigo con la siguiente estructura

```js
declare module "@env" {
   export const API_URL: string;
   export const BEARER_TOKEN: STRING;
   export const DEBUG_MODE: boolean;
}
```

## Crear estrutura de componente

abreviatura para crear el componente incial deacuerdo al nombre del archivo

```js
rnfe
```

```bash
npx expo start --web --clear
```
### Actualizar version de SDK:
#### Paso 1:
ejecutar para instalar la version del SDK que desea

se brinda un ejemplo, la version la puede cambiar :
```bash
  npm install expo@49
```

#### Paso 2:
verificar si las dependencias coinciden con la version del SDK, si no coincide las intala
```bash
  npx expo install --fix
```