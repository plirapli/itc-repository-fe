# ITC Repository FE

## Table of Contents

- [ITC Repository (FE)](#itc-repository-fe)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Components](#component)
  - [Button](#button)
  - [Form Element](#form-element)
    - [Input](#input)
    - [Select](select) [ON PROGRESS]
  - [Search Bar](#search-bar) [ON PROGRESS]
  - [Navbar](#navbar)
  - [Card](#card)
    - [Materi Card](#materi-card)
    - [List Materi Card](#list-materi-card)
    - [Diskusi Card](#diskusi-card)
    - [Komentar Card](#komentar-card)
  - [Tags](#tags) [ON PROGRESS]
- [Feature](#feature) [ON PROGRESS]

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

| Name                                                             | Value                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `color`                                                          | `primary (default)` `secondary` `gray` `danger` `transparent` |
| `variant`                                                        | `text-only (default)` `icon-right` `icon-left` `icon-only`    |
| `icon` (only for button with icon variant)                       | (icon name based on [iconify](https://iconify.design/))       |
| `onClick` (optional)                                             | (void)                                                        |
| `type` (optional)                                                | `button (default)` Button type (string)                       |
| `isResponsive` (optional, only for icon-right/icon-left variant) | Hide text on small screen(boolean)                            |

### Form Element

#### Input

Props

| Name                     | Value                           |
| ------------------------ | ------------------------------- |
| `label`                  | Label text (string)             |
| `color`                  | `primary (default)` `secondary` |
| `onChange` (optional)    | (void)                          |
| `type`                   | `text (default)`                |
| `value (optional)`       | (string)                        |
| `placeholder (optional)` | (string)                        |

#### Select

### Search Bar

### Navbar

### Card

#### Materi Card

#### List Materi Card

#### Diskusi Card

#### Komentar Card

### Tags

## Feature
