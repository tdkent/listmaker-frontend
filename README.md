# ListMaker

## About

Welcome to the frontend codebase of ListMaker, a list-making application begun in February and
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
- Location: New to-dos are not assigned a location by default, but this may be updated in the Edit
  To-Do window. The Location form input is integrated with the Use Places Autocomplete node package,
  an extension of Google Places API. Once the user begins entering a new address or location a
  selectable list of five addresses will auto-populate in the space beneath the input field.
  - The new location is assigned coordinates via Google Geocoding API from the backend and used with
    Google Maps JavaScript API to create a map in the To-do Details modal.
- Recurrence: To-do items are not assigned a recurrence interval by default. Recurrence is activated
  via a checkbox input. The default recurrence value is 1 day, which can be edited to be 1-10 days,
  weeks, months, or years.
- Subtasks: Editable subtasks can be assigned to to-do items via the Subtasks form.
- Unlike Shopping items, multiple to-do items with the same name (case insensitive) can be created
  within the same list. By default the following fields from the most recent version of a to-do
  (even if that to-do has been deleted) are assigned to a to-do of the same name:
  - Category, Due Time, Location, Recurrence

## Upcoming

- Email authentication
- New list type

## Stack

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
- `Google Maps JavaScript API Loader`
- `React Google Maps API`
- `Use Places Autocomplete`
- `JSON Server`
