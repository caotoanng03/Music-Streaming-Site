# Music Streaming Platform

## Overview
This repository contains the code for a music streaming platform with separate functionalities for the Admin and Client sides. The Admin site is used for managing various aspects of the application, while the Client site provides user-facing features such as song playback and account management.

## Admin Site Features

### 1. Dashboard
Provides a general overview of platform activity and statistics.

### 2. Management Features
- **Singer Management**: CRUD operations for managing singers.
- **Song Management**: CRUD operations for managing songs.
- **Genre Management**: CRUD operations for managing music genres.
- **Role Group Management**: Manage different admin roles and permissions.
- **Access Controls Panel**: Handle permissions for different roles.
- **Admin Account Management**: Manage admin user accounts.
- **User Account Management**: Manage client user accounts.
- **General Settings**: Update client site appearance and settings, such as favicon, site name, logo, and footer links.

### 3. Admin Profile
- Admins can view and modify their profile based on their permissions.
- Enhanced modification rights for General Admins.

### 4. Security
- **Login Feature**: Admins are assumed to have pre-created accounts.
- **Authentication & Authorization**: Unauthorized admins are redirected to the login page. Admins are restricted access based on their permissions, with robust front-end and back-end checks.

### 5. Validations
All create and update operations are validated on the server to ensure data integrity.

## Client Site Features

### 1. Song Features
- **Detailed Song Page**: Each song has a detailed page, using `https://aplayer.js.org` to display an audio player, lyrics synchronization, and streaming statistics.
- **Likes**: Songs can be liked by logged-in users.

### 2. Home Page
Displays a list of all songs with details such as image, singer's name, creation time, and number of likes.

### 3. Genre Page
List and display all music genres.

### 4. Favorites
- Logged-in users can add songs to their favorite list.
- Non-logged users are prompted to log in.

### 5. Account Management
- **Register/Login Page**: Interactive forms for user registration and login, with front-end and back-end validations.
- **Password Recovery**: Uses `nodemailer` for sending OTP codes via Gmail for account recovery.

### 6. Search
Optimized search functionality using slugs, with front-end debounce techniques and back-end regex searches to enhance performance and accuracy.

## Technical Stack
- **Frontend**: HTML, CSS, Javascript, Bootstrap
- **Backend**: Typescript, Nodejs, Expressjs, Mongoose, Git, NPM, Pug(Jade)
- **Database**: MongoDB



