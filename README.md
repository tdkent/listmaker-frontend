# ListMaker

## About ListMaker

Welcome to the front-end codebase of ListMaker, a list-making application begun in February and
launched in June of 2023. ListMaker is in ongoing development, with improvements and new features
planned. Read on for details!

[Visit ListMaker](https://mylistmaker.netlify.com)

## Features

ListMaker is a free-to-use web application for creating lists to help stay organized and productive.
After creating a free account, users can begin creating lists. ListMaker currently offers two list
types: **Shopping** and **To-Do**.

### Shopping Lists

- Each shopping list item has a **Name** and **Category**.
- The default category for new items is **Uncategorized**.
- Users may edit both the Name and Category of a shopping item.
- Once the default Category is updated it will remain assigned to that item.
  - This includes if the item is checked and unchecked, or deleted and added back.
- When a shopping item is checked it is assigned to the **Checked** category until it is unchecked.

### To-Do Lists

- Each to-do list items may have the following attributes:
  - **Name** (required)
  - **Category** (required)
  - **Due Date** (required)
  - **Due Time** (optional)
  - **Location** (optional)
  - **Recurrence** Interval (optional)
  - **Subtasks** (optional)
- Name: name of the to-do item.
- Category: Users may assign their to-dos to one of these categories:
  - **Home**
  - **Work**
  - **Appointment**
  - **Errand**
- Due Date: The default Due Date of a new item is the same day that it was created. This may be
  updated in the Edit To-Do window.
- Due Time: New to-dos are not assigned a due time by default, but this may be updated in the Edit
  To-Do window.
- Location:
- Recurrence:
- Subtasks:

## Upcoming

- Email authentication
- New list type

## Technologies

### Languages:

- `TypeScript`

### Libraries &amp; Frameworks

- `React (CRA)`
- `React Router`
- `React Query`
- `Tailwind CSS`

### Node Packages

- `Axios`
- `Luxon`
- `React Toastify`
- `Animate.css`
- `Body-Scroll-Lock`
- `Google Maps JavaScript API Loader`
- `React Google Maps API`
- `Use Places Autocomplete`
- `JSON Server`
