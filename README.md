# Backend API for Articles

A simple backend API for managing articles.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
-   [API Endpoints](#api-endpoints)

## Introduction

This repository contains a Node.js backend API for articles. It allows users to perform CRUD operations on articles, including creating, reading, updating, and deleting articles.

## Features

-   Create a new article with a title, description, and cover image.
-   Retrieve a list of all articles.
-   Retrieve a single article by its ID.
-   Update an existing article's title, description, and cover image.
-   Delete an article by its ID.

## Technologies

-   Node.js
-   Express.js
-   Sequelize (for database ORM)
-   Multer (for file uploads)
-   Mysql (you can mention your preferred database here)
-   Other dependencies (list any other major dependencies)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/apisitas/API-Article.git`
2. Install dependencies: `npm install`
3. Configure the database connection in `.env` file (if required).
4. Run the migrations and seed the database (if applicable): `npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
5. Start the server: `npm run server`
6. The API should now be accessible at `http://localhost:5000`.

## API Endpoints

### List All Articles

-   **Endpoint**: `GET /api/articles?page=1&size=100`
-   **Description**: Get a list of all articles (if not set size the default will be 2 for pagination and if not set page the default will be 1).
-   **Noted**: The publisher object will display in json and if cover is null backend has been set getter in model Article so the cover will be 'assets/no-image-icon-23494.png'
-   **Response**: JSON array containing all articles.

### Get Single Article

-   **Endpoint**: `GET /api/articles/:id`
-   **Description**: Get a single article by its ID totalView will update everytime when access to this endpoint.
-   **Noted**: The publisher object will display in json
-   **Response**: JSON object representing the article.

### Create Article

-   **Endpoint**: `POST /api/articles`
-   **Description**: Create a new article.
-   **Request Body**: JSON object containing `title`, `description`, `cover` and `publisherId` fields.
-   **Response**: JSON object and text 'Article created was a success'.

### Update Article

-   **Endpoint**: `PUT /api/articles/:id`
-   **Description**: Update an existing article by its ID (If add new cover then backend will remove old cover).
-   **Request Body**: JSON object containing `title`, `description`, `cover` and `publisherId` fields.
-   **Response**: JSON object and text 'Article updated was a success'.

### Delete Article

-   **Endpoint**: `DELETE /api/articles/:id`
-   **Description**: Delete an article by its ID (Backend will also remove that cover in server).
-   **Response**: JSON object indicating successful deletion.
