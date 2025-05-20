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

<img src="./readme/Readme Template Assets/fridget_er_diagram.png"/>

<br><br>

<!-- Project Highlights -->
<img src="./readme/Readme Template Assets/title4.svg"/>

### Smarter Meals , Healthier Choices

- Generating meals based on available items in the fridge.
- Notifying users about near to expiry products.
- Calorie tracking for custom meal generation.

<img src="./readme/Readme Template Assets/project_highlights.png"/>

<br><br>

<!-- Demo -->
<img src="./readme/Readme Template Assets/title5.svg"/>

### User Screens

| Home screen                            | Items List                       | Choose Meal screen                       |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/Readme%20Template%20Assets/home_screen.jpg) | ![fsdaf](./readme/Readme%20Template%20Assets/items_list_screen.jpg) | ![fsdaf](./readme/Readme%20Template%20Assets/choose_meal_screen.jpg) |


### App Walkthroughs

| Add item | Add Item Flow | Meal Recommendation |
|----------------------|----------------|----------------------|
| ![](./readme/Readme%20Template%20Assets/add_item.gif) | ![](./readme/gifs/add_item.gif) | ![](./readme/gifs/meal_gen.gif) |

<br><br>

<!-- Development & Testing -->
<img src="./readme/Readme Template Assets/title6.svg"/>

### Fridget


| Services                            | Validation                       | Testing                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/Readme%20Template%20Assets/item_service_code.png) | ![fsdaf](./readme/Readme%20Template%20Assets/validation_code.png) | ![fsdaf](./readme/Readme%20Template%20Assets/testing_code.png) |


<br><br>

<img src="./readme/Readme Template Assets/title7.svg"/>

### OpenAi Integration

#### Prompt
<img src="./readme/Readme Template Assets/prompt.png"/>

#### Prism & Open Ai
<img src="./readme/Readme Template Assets/openai_code.png"/>

<br><br>

<!-- Deployment -->
<img src="./readme/Readme Template Assets/title8.svg"/>

#### Deployment & DevOps

- The backend services are containerized using Docker, making them easily portable and environment agnostic.

- The backend is deployed on two AWS EC2 instances:
- Staging Environment: Used for testing and validating new features before pushing to production.
- Production Environment: The live environment serving end users.
- A CI/CD pipeline using GitHub Actions automates the build, testing, and deployment process. Depending on the target branch, the pipeline deploys to either the staging or production instance, ensuring safe rollouts and rapid iteration.


| Signup                           | Postman API 2                       | Postman API 3                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/Readme%20Template%20Assets/signup_postman.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>