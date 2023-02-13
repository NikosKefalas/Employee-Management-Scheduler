# Software Engineer Challenge-Employee Management Scheduler

Authors: Nikos Kefalas

## Overview

This project is developed using the MERN Stack. It uses MongoDB, Express and Node.js for Backend
and React for Frontend.Also, the database is hosted in MondoDB Atlas.

## Dependencies

The project is structured in two folders,Backend and Frontend.
In order to run it you have to install the Node Modules, thus use 'npm install' in both Backend
and Frontend folder.


- Backend
    - "body-parser": "^1.20.1",
    - "dotenv": "^16.0.3",
    - "express": "^4.18.2",
    - "fs": "^0.0.1-security",
    - "mongoose": "^6.9.1",
    - "morgan": "^1.10.0",
    - "xlsx": "^0.18.5"
    
- Frontend
    - "@emotion/react": "^11.10.5",
    - "@emotion/styled": "^11.10.5",
    - "@mui/icons-material": "^5.11.0",
    - "@mui/material": "^5.11.8",
    - "@testing-library/jest-dom": "^5.16.5",
    - "@testing-library/react": "^13.4.0",
    - "@testing-library/user-event": "^13.5.0",
    - "axios": "^1.3.2",
    - "date-fns": "^2.29.3",
    - "react": "^18.2.0",
    - "react-dom": "^18.2.0",
    - "react-router-dom": "^6.8.1",
    - "react-scripts": "5.0.1",
    - "web-vitals": "^2.1.4"
    
   ## How To Run
   
   Server: Open terminal in 'backend' folder and use: $npm run dev
   
   Frontend: Open terminal in 'frontend' folder and use: $npm run start
   

 
## API Endpoints
  
- Employee
    - GET all employees :localhost:4000/api/employees/
    - GET a single employee :localhost:4000/api/employees/:id
    - POST a new employee :localhost:4000/api/employees/
    - DELETE an employee :localhost:4000/api/employees/:id
    - POST a new skill to employee :localhost:4000/api/employees/:id/:skillid
    - DELETE a skill from employee :localhost:4000/api/employees/:id/:skillid
    - DELETE many employees :localhost:4000/api/employees/many
    - PATCH an employee :localhost:4000/api/employees/:id
    
 - Skill
    - GET all skills :localhost:4000/api/skills/
    - GET a single skill :localhost:4000/api/skills/:id
    - POST a new skill :localhost:4000/api/skills/
    - DELETE a skill :localhost:4000/api/skills/:id
    - POST many skills :localhost:4000/api/skills/many
    - PATCH a skill :localhost:4000/api/skills/:id
    - GET all skills in .xslx file which is saved in the backend folder :localhost:4000/api/skills/excel


## Personal Thoughts


Thanks for giving me the oportunity to be part of this challenge. During the development of the project, I learned  new concepts,
acquired new skills and also became more familiar with the ones I already know. It was also a process that  helped me find areas that need improvement.
Looking forward to speaking with you soon,

Kind regards,

Nikos Kefalas






