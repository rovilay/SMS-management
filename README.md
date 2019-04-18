# SMS MANAGEMENT

This is an application that manages SMS.

## Overview

The SMS Management system helps to sends and manage sms

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern.
```
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── Contact.js
│   │   └── Sms.js
│   ├── helpers
│   │   ├── db.js
│   │   ├── defaults.js
│   │   └── utils.js
│   ├── index.js
│   ├── middlewares
│   │   ├── auth.js
│   │   ├── errorhandler.js
│   │   └── validateSmsQuery.js
│   ├── models
│   │   ├── Contact.js
│   │   └── Sms.js
│   └── routes
│       ├── contactRoutes.js
│       ├── index.js
│       └── smsRoutes.js
```

## Requirements

* Node.js v10.x or higher
* yarn
* MongoDB instance (local or remote)

## Getting Started

```
$ git clone https://github.com/rovilay/SMS-management.git
$ cd sms-management
$ yarn install
$ yarn server                  # For development purpose
$ yarn start                   # To run production build
```

You should now be able to access the API via http://localhost:port/api/v1/

**NOTE:** Create a `.env` file configuration following the `.env.sample`.

## Project Details
`SMS:`
 - person sending sms
 - person receiving sms
 - message of sms
 - sms status

`Contact:`
- name of person
- phone number of person

`The following relationships are represented in the model:`
- All sms sent by a Contact are linked to them
- All sms sent to a Contact are linked to them
- Deleting a contact removes the messages they sent and references to messages they received.

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th></tr>
<tr><td>GET</td><td>/api/v1/contacts/:contactId</td><td>Gets a contact</td><td>limit, offset, type</td></tr>
<tr><td>GET</td><td>/api/v1/sms</td><td>Gets a contact sms</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/contacts/signup</td><td>Creates a contact</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/contacts/signin</td><td>logins a contact</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/sms/:phoneNumber</td><td>Sends sms to a contact</td><td></td></tr>
<tr><td>PUT</td><td>/api/v1/sms/:smsId/status</td><td>updates sent sms status to received</td><td></td></tr>
<tr><td>DELETE</td><td>/api/v1/contacts</td><td>Deletes a contact</td><td></td></tr>