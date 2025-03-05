# HelpDesk System

### Group Members: [Ashley Natasha,Brian Joseph and Victor Kichwen]
#### Date: 2025/02/17 - 2025/03/05 

## Live Link
[Vercel](https://helpdesk-psi.vercel.app/)

## Introduction

The *HelpDesk System* is a web-based platform designed to streamline technical problem-solving and provide a collaborative environment for students. It allows users to raise issues, find solutions, vote on useful answers, and track responses efficiently. The platform supports various tags for easy filtering of problems and solutions based on different criteria, such as language, stage of learning, or technical challenge. Built with an emphasis on APIs, the system enables seamless integration and functionality for all users, fostering a collaborative community of learners.

## Problem Statement

Students face a recurring set of technical problems and challenges during their learning journey. These issues are often repetitive, and students may struggle to find quick, relevant solutions. The duplication of efforts in solving these problems can lead to frustration and inefficiency. Furthermore, users may have difficulty navigating through solutions to find the most relevant ones.

## Solution

The *HelpDesk System* addresses these challenges by providing a user-friendly platform where students can:
- Raise issues they encounter.
- Post solutions to problems.
- Vote on solutions based on their usefulness.
- Tag problems and solutions to make them easily searchable.
- Keep track of solutions and answers in an organized, efficient manner.
- Receive notifications about new responses, votes, and answers.

The system will help reduce redundancy, encourage collaboration, and enhance the learning experience for all users.

## User Stories

- *Student*
  - Raise technical issues or problems they encounter.
  - Post solutions to other students’ problems.
  - Vote on the most helpful solutions provided by others.
  - Mark and follow questions of interest to track responses.
  - Receive notifications when there are new answers, votes, or responses.

- *Administrator*
  - Manage user accounts and authentication.
  - Monitor and moderate posts and solutions for accuracy and appropriateness.
  - Generate reports based on user activity and problem-solving trends.

## Features

### Authentication
- *Login/Signup*: Students can create an account, log in, and manage their profiles securely.
- *Password Reset*: Secure password recovery functionality.
  
### Problem Management
- *Raise Problem*: Students can submit a new problem, specifying details such as the issue type, category, and description.
- *Tagging Problems*: Each problem can be tagged with relevant categories, such as "language", "stage", or "technical issue".
- *Link Similar Problems*: Related issues can be linked to guide students toward similar problems with possible solutions.

### Solution Management
- *Post Solutions*: Students can reply to problems by posting solutions, whether they are answers to questions or suggestions.
- *Vote on Solutions*: Users can vote on solutions to indicate their usefulness. The most helpful solutions will rise to the top.

### Notifications
- *Response Notifications*: Users receive notifications when a response is added to a question they raised or followed.
- *Vote Notifications*: Users are notified when their solution gets a vote.
  
### FAQ System
- *Frequently Asked Questions*: Common issues and solutions will be compiled into an FAQ section for easy access.

### Search and Filter
- *Search Functionality*: Easily search for problems and solutions using keywords.
- *Filter by Tags*: Filter problems and solutions based on categories such as "language", "stage", or "technical challenge".

## Technologies Used

- *Backend*: Flask (Python)
- *Database*: PostgreSQL
- *Frontend*: React.js (with Context API for state management)
- *Testing*: Pytest
- *API*: RESTful APIs to handle problem raising, solution posting, and voting
- *Authentication*: JWT (JSON Web Tokens) for secure authentication and OAuth for social authentication

## ERD Diagram

An Entity-Relationship Diagram (ERD) illustrating the structure of the database:

![Alt text](/frontend/public/drawsql.png "DrawSQL Diagram")

## User Interface

### Home Page
The homepage provides easy navigation, displaying the latest problems, popular solutions, and access to various categories:

![Alt text](/frontend/public/Home%20Page.png "Home Page")

## API Endpoints


## Getting Started

### Prerequisites

- Python 3.8
- Node.js 
- NPM
- PostgreSQL

## Response Format
Fetching problems:
```jsx
   {
    "problems": [
        {
            "id": 1,
            "description": "How to center a div in CSS?",
            "tag": {
                "id": 2,
                "name": "CSS"
            },
            "user": {
                "id": 5,
                "username": "john_doe"
            },
            "solutions": [
                {
                    "id": 10,
                    "description": "You can use flexbox: display: flex; justify-content: center; align-items: center;",
                    "user": {
                        "id": 7,
                        "username": "jane_smith"
                    },
                    "tag": {
                        "id": 2,
                        "name": "CSS"
                    }
                },
                {
                    "id": 12,
                    "description": "Another way is to use text-align: center for inline elements.",
                    "user": {
                        "id": 8,
                        "username": "mark_taylor"
                    },
                    "tag": {
                        "id": 2,
                        "name": "CSS"
                    }
                }
            ]
        },
        {
            "id": 2,
            "description": "What is the difference between let and var in JavaScript?",
            "tag": {
                "id": 3,
                "name": "JavaScript"
            },
            "user": {
                "id": 6,
                "username": "alice_wonder"
            },
            "solutions": []
        }
    ],
    "total_pages": 5,
    "current_page": 1,
    "total_problems": 45
}
```

Fetching solutions:
```jsx
{
    "solutions": [
        {
            "id": 10,
            "user_id": 7,
            "problem_id": 1,
            "description": "You can use flexbox: display: flex; justify-content: center; align-items: center;",
            "tag_id": 2,
            "user": {
                "id": 7,
                "username": "jane_smith"
            },
            "tag": {
                "id": 2,
                "name": "CSS"
            }
        },
        {
            "id": 12,
            "user_id": 8,
            "problem_id": 1,
            "description": "Another way is to use text-align: center for inline elements.",
            "tag_id": 2,
            "user": {
                "id": 8,
                "username": "mark_taylor"
            },
            "tag": {
                "id": 2,
                "name": "CSS"
            }
        }
    ],
    "total_pages": 3,
    "current_page": 1,
    "total_solutions": 25
}
```

### Installation

1. Clone the repositories:
   
   ```bash
   git clone https://github.com/natasherr/HelpDesk-Frontend

   ```bash
   git clone https://github.com/natasherr/HelpDesk-Backend

2. Install backend dependencies:
   ```
   pipenv install
   ```
   
3. Set up the database:
   ```
   pipenv shell
   flask db upgrade
   ```

4. Install frontend dependencies:
   ```
   npm install 
   ```
   
5. Start the backend server:
   ```
   pipenv shell
   gunicorn app:app
   ```
   
6. Start the frontend development server:
   ```
   npm run dev
   ```
   
### Testing

To run tests with Pytest:
```
pipenv run pytest
```

## Contact Information
Brian Joseph - brianjoseph8132@gmail.com
Ashley Natasha - ashleyotsiula@gmail.com
Victor Kichwen - 

## License
### MIT License

Copyright 2025 HeldDesk System 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.