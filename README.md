<img src="./readme/Readme Template Assets/title1.svg"/>

<br><br>

<!-- project overview -->
<img src="./readme/Readme Template Assets/title2.svg"/>

> Fridget is a full-stack IoT-powered smart fridge application designed to help users manage the contents of their fridge efficiently. Users can log in, view what's currently inside their fridge, get notified about products that are near expiry, and generate meal ideas based on available ingredients users' preferences.
>
> The system supports multi-user access for each fridge, manual shopping list creation, and calorie tracking for smarter meal planning. Built with React Native for the mobile interface and Laravel for the backend, Fridget ensures a seamless, real-time experience.

<br><br>

<!-- System Design -->
<img src="./readme/Readme Template Assets/title3.svg"/>

### From Pixels to Plates: The Tech Behind Fridget

#### UI/UX
- Before initiating development, the application screens and flows were carefully designed and prototyped using Figma. This step ensured a user-friendly experience and clear alignment with the intended features.

#### Backend
- The backend is built using Laravel, serving as the main API provider for the mobile app and IoT integration.Key features include:

- OpenAI Meal Recommendation Integration: Leveraging Prism API to access OpenAI models, enabling dynamic meal recommendations based on detected or available ingredients.

- Custom Food Detection Model: Developed a lightweight machine learning model using Roboflow, trained with a curated dataset of food images. The model is hosted via Roboflow API and integrated within the Laravel backend.

- IoT Communication: Handles requests from an ESP32-CAM module, receiving images and processing them through the custom food detection pipeline.

#### Frontend
- The mobile application is developed using React Native with Expo, providing cross-platform compatibility. Axios is used for seamless communication with the backend APIs.

#### IoT & Edge Integration
Besides the manual input, an ESP32-CAM module is used as the smart fridge's visual sensor. The module captures images and sends them directly to the backend for ingredient detection and logging.

<br><br>

<!-- Project Highlights -->
<img src="./readme/Readme Template Assets/title4.svg"/>

### Fridget

- Generating meals based on available items in the fridge.
- Notifying users about near to expiry products.
- Calorie tracking for custom meal generation.

<br><br>

<!-- Demo -->
<img src="./readme/Readme Template Assets/title5.svg"/>

### User Screens (Mobile)

| Login screen                            | Register screen                       | Register screen                       |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |


### Admin Screens (Web)

| Login screen                            | Register screen                       |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |


<br><br>

<!-- Development & Testing -->
<img src="./readme/Readme Template Assets/title6.svg"/>

### Fridget


| Services                            | Validation                       | Testing                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |


<br><br>

<!-- Deployment -->
<img src="./readme/Readme Template Assets/title7.svg"/>

### Fridget

- Description here.


| Postman API 1                            | Postman API 2                       | Postman API 3                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>