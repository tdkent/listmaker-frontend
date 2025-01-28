# ListMaker

## Description

ListMaker is a free-to-use web application for creating lists to stay organized and productive. After creating a free account, users can add lists to their private account. ListMaker features two list types: Shopping and To-Do.

[Visit ListMaker](https://mylistmaker.netlify.com)

[View Backend Repo](https://github.com/tdkent/listmaker-backend)

---

## Features

### Shopping Lists

Users begin by creating a new **Shopping List** and assigning some new _items_ to the list.

- Each shopping list _item_ has a **Name** and **Category** value.
- The default category for new items is **Uncategorized**.
- Users may edit both the **Name** and **Category** of a shopping item.
- Once the default **Category** is updated it will remain assigned to that item.

> [!NOTE]  
> An item's Category will remain assigned if the item is checked and unchecked, or deleted and re-added.

- When a shopping item is checked it is assigned to the **Checked** category until it is unchecked.

### To-Do Lists

Users begin by creating a new **To-Do List** and assigning some new _to-dos_ to the list. Each _to-do_ may be checked or unchecked, edited, and deleted.

> [!TIP]  
> Multiple _to-dos_ with the same name (case insensitive) can be created within the same list.

#### Attributes

Each _to-do_ consists of these attributes:

- **Name** (required)
- **Category** (required)
- **Due Date** (required)
- **Due Time** (optional)
- **Location** (optional)
- **Repeat** and **Interval** (optional)
- **Subtasks** (optional)

- Name: name of the to-do item.

#### Category

Users may assign their to-dos to one of four categories:

- Home
- Work
- Appointment
- Errand

#### Due Date

The default Due Date of a new _to-do_ is the same day that it was created. This may be updated in the **Edit To-Do** menu.

#### Due Time

New _to-dos_ are not assigned a due time by default, but this may be updated in the **Edit To-Do** menu.

#### Location

New _to-dos_ are not assigned a location by default, but this may be updated in the **Edit To-Do** menu.

The Location form input is integrated with Google Places API. Once the user begins entering a new address or location a selectable list of addresses will auto-populate in the space beneath the input field.

The new location is assigned coordinates via Google Geocoding API from the backend and used with Google Maps JavaScript API to create a map in the To-do Details modal.

#### Repeat

_To-dos_ are not assigned a repeat interval by default. Users may set a _to-do_ to repeat by checking the `Repeat` checkbox in the **Edit To-Do** menu.

The default repeat interval is 1 day. Users may set a custom interval of 1-10 days,
weeks, months, or years.

#### Subtasks

The Subtasks feature allows users to break _to-dos_ into smaller items of work. Subtasks are created, edited, and deleted in the Subtasks menu.

> [!NOTE]  
> By default the following fields from the most recent version of a _to-do_ are assigned to any _to-do_ with the same name (case insensitive):
> Category, Due Time, Location, Recurrence

### User Profile

A user's profile consists of the following items:

- Email (required, not editable)
- Nickname (optional, editable)
- Password (required, editable)

> [!NOTE]  
> Passwords must have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special symbol (\*@#^&$!%), and be a minimum of 8 characters.

#### Color Preference

Users may also change the color mode of the website to light mode, dark mode, or to use their system settings.

---

## Built with

- TypeScript
- React v18
- React Router
- TanStack Query
- Tailwind CSS
- Axios
- Luxon
- Google Maps JavaScript API
- Google Maps Places Autocomplete

---

## Views

---

## License

MIT &copy; Tim Kent

---
