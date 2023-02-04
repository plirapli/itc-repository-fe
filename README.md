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
- Feature [ON PROGRESS]
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

| Name | Value |
|--|--|
| `color` | `primary (default)` `secondary` `gray` `danger` `transparent` |
| `variant` | `textOnly (default)` `iconRight` `iconLeft` `iconOnly` |
| `text` | (string) |
| `icon` (only for button with icon variant) | (icon name based on [iconify](https://iconify.design/)) |
| `onClick` (optional) | (void) |
| `attrType` (optional) | Button type (string) |
| `textClassname` | Optional CSS class for text (string) |

### Form Eelement

#### Input

Props

| Name | Value |
|--|--|
| `label` | Input Label (string) |
| `color` | `primary (default)` `secondary` |
| `onChange` (optional) | (void) |
| `inputType` | text (default) |
| `name (optional)` | (string) |
| `value (optional)` | (string) |
| `placeholder (optional)` | (string) |

### Search Bar [ON PROGRESS]

### Navbar

### Card

### Tags [ON PROGRESS]

## Feature [ON PROGRESS]
