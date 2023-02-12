# ITC Repository FE

## Table of Contents

- [ITC Repository (FE)](#itc-repository-fe)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Components](#component)
  - [Button](#button)
  - [Form Element](#form-element)
    - [Input](#input)
    - [Select](select)
  - [Search Bar](#search-bar) [IN PROGRESS]
  - [Navbar](#navbar)
  - [Card](#card)
    - [Materi Card](#materi-card)
    - [List Materi Card](#list-materi-card)
    - [Diskusi Card](#diskusi-card)
    - [Komentar Card](#komentar-card)
  - [Tags](#tags) [IN PROGRESS]
- [Feature](#feature) [IN PROGRESS]

---

## Installation

- Install Node
- Install package with command:

```text
npm install
```

- Create .env file based on .env.example
- Start backend server [here](https://github.com/riobintang/repo_itc/)
- Start server with command

```text
npm run start
```

## Components

### Button

Props:

| Name                                                             | Value                                                             |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| `color`                                                          | `primary` (default), `secondary`, `gray`, `danger`, `transparent` |
| `variant`                                                        | `text-only` (default), `icon-right`, `icon-left`, `icon-only`     |
| `icon` (only for button with icon variant)                       | (icon name based on [iconify](https://iconify.design/))           |
| `onClick` (optional)                                             | (void)                                                            |
| `type` (optional)                                                | `button` (default) Button type (string)                           |
| `isResponsive` (optional, only for icon-right/icon-left variant) | Hide text on small screen(boolean)                                |
| `children`                                                       | Component children                                                |

### Form Element

#### Input

Props

| Name       | Value                            |
| ---------- | -------------------------------- |
| `label`    | Label text (string)              |
| `color`    | `primary` (default), `secondary` |
| `onChange` | (void)                           |
| `type`     | `text` (default)                 |
| `children` | Component children               |

#### Select

Props

| Name       | Value                            |
| ---------- | -------------------------------- |
| `label`    | Label text (string)              |
| `color`    | `primary` (default), `secondary` |
| `onChange` | (void)                           |
| `value`    | string                           |
| `children` | Component children               |

### Search Bar

### Navbar

### Card

#### Materi Card

#### List Materi Card

#### Diskusi Card

#### Komentar Card

### Tags

## Feature

- CRUD USERS
  - Create [DONE]
  - Read [DONE]
  - Update
  - Delete
  - Update Role & Verification (Admin) [50% DONE]
- CRUD Materi:
  - Create [DONE]
  - Read [DONE]
  - Update [IN PROGRESS]
  - Delete [DONE via Manage Materi]
- CRUD Bab:
  - Create [DONE]
  - Read [DONE]
  - Update [DONE]
  - Delete [DONE]
- CRUD Artikel
  - Create [DONE]
  - Read [DONE]
  - Update
  - Delete [DONE]
- CRUD Diskusi
  - Create
  - Read
  - Update
  - Delete
- CRUD Komentar
  - Create
  - Read
  - Update
  - Delete
