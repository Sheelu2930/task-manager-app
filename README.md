# Task Manager App

I built this project as a full-stack task management application using Laravel for backend and React for frontend. The main goal was to create a simple but properly structured system where users can manage their tasks with authentication and user-specific data handling.

While building this, I focused more on how frontend and backend communicate through APIs and how authentication works in a real setup.



## What the app does

* Users can register and log in
* After login, each user can manage their own tasks
* Tasks include title, description, due date and status
* Tasks can be marked as completed or kept pending
* Filtering is available (all / pending / completed)
* Pagination is implemented for better data handling



## Backend (Laravel)

Backend is built using Laravel and follows a basic REST API structure.

* Created `User` and `Task` models
* Established relationship: one user → many tasks
* Used migrations to create database schema
* Tasks table includes:

  * title
  * description
  * status (pending / completed)
  * due_date
  * user_id

### Authentication (Sanctum)

For authentication, I used Laravel Sanctum.

* Installed using:
  composer require laravel/sanctum

* Sanctum is used to generate API tokens

* On successful login, a token is created and returned to frontend

* That token is then used to authenticate further requests

* Protected routes use middleware:
  auth:sanctum

* This ensures:

  * only logged-in users can access tasks
  * each user only accesses their own data

## API Logic

* All routes are defined in `routes/api.php`
* Controllers handle the logic:

AuthController:

* register → creates user and hashes password
* login → verifies credentials and returns token

TaskController:

* index → returns user-specific tasks (with pagination)

* store → creates new task

* update → updates task (status, title, etc.)

* destroy → deletes task

* Tasks are always filtered using logged-in user:
  user_id = Auth::id()

---

## Frontend (React)

Frontend is built using React (Vite).

* Pages created:

  * Login
  * Register
  * Dashboard

* Axios is used to connect with backend APIs

* After login:

  * token is stored in localStorage

* For protected requests:

  * token is sent in headers

Example:

Authorization: Bearer token



## How frontend and backend connect

1. User logs in from frontend
2. Backend verifies credentials
3. Sanctum generates token
4. Token is stored in frontend (localStorage)
5. Every API request sends token in header
6. Backend identifies user and returns only their tasks



## Running the project

### Backend

cd backend
composer install
composer require laravel/sanctum
php artisan make:controller TaskController
php artisan make:controller AuthController
php artisan make:model Task -m 
php artisan route:list
php artisan migrate
php artisan optimize:clear
php artisan serve


### Frontend

cd frontend
npm install
npm run dev

## Application URLs
These URLs will work only in local environment after running both frontend and backend servers.

Frontend (Local):
http://localhost:5173

Register Page:
http://localhost:5173/register

Login Page:
http://localhost:5173/

Dashboard:
http://localhost:5173/dashboard

Backend API:
http://127.0.0.1:8000/api


## What I focused on

* Proper API integration between frontend and backend
* Authentication using token-based system (Sanctum)
* Ensuring users only access their own data
* Keeping code simple and readable
* Basic UI for usability

---

## What can be improved

* Edit task feature can be added
* Better UI/UX improvements
* Search and sorting
* Task priority or categories



## Final Note

This project helped me understand how authentication, API integration, and user-based data handling work together in a full-stack application.



## Author

Sheelu Yadav
