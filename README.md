# Wonde Developer Technical Exercise

**Story**:

> As a Teacher I want to be able to see which students are in my class each day
> of the week so that I can be suitably prepared.

# Getting started

## Run backend

```
cd backend
composer install
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan class-planner:init
npm i
```

## Run frontend

```
cd frontend
npm i
npm run dev
```

## Run reverse proxy

```
# allows all services to be run off a single host/port.
# install caddy to your path. https://caddyserver.com/download

caddy run
```

## Login

```
https://localhost

username is a combobox to allow quick searching of teachers (for demo purposes).
password is "password1" for all users.
```

# Dev Log

> I'm adding this section as my git commits map to multiple features.

-   First thoughts is a week calendar view where you can see lessons and drill down for more info (students (can we fill out a register using the API?, grab medical conditions from backend, but only display true/false... in UI if true, have a button to bring up a modal with student medical conditions, but require password on retrieval so if left unattended and unlocked, sensitive information isn't going to be leaked.
-   Playing around with the API in postman and see what data we have available
-   I'm going to use Laravel as the backend API and React as the Frontend. I'll be using react-hook-forms for form submission with the Joi validation resolver. I want to leverage the service container in the backend so that a I have it wherever needed. Furthermore, I would like to decouple myself from the library and define my own domain entity and repository interfaces on which to code to, ensuring we aren't depending on external libraries. This can and has often caused issues when an author of a library hasn't updated their composer.json after a major PHP version update.
-   To make this more of an "app", I'm going to create a user for each employee. Username is "{forename}.{surname}" and I'll set all passwords to "password1" for this exersise for simplicity. On a real data load to "my app" I would ensure I have an email for each employee and set the account to "unclaimed" or similar.
-   I've decided on using JWT authentication. It's quick and easy to get setup and a simple verification middleware is all that is needed. No DB lookups required. Downside is without a persistent revocation list lookup the session will be valid until expiry. In drastic measures, you could rotote the JWT signing certificate, but all users would be de-authed as a result.
-   After some API analysis I've decided to cache some of the more "static" entities as Eloquent models. Rooms, Periods, and also got that I need to fetch class lessons to be able to correlate that to any time series. I've also noticed that on this test School we have 3 sets of "periods", clearly old ones that have been migrated from internally. I had to write a script to run through all of the sets to determine if any lessons were still using them and then manually adding a WHERE clause manually.
-   Created login page on the frontend. I will be solely usuing TailwindCSS for styling as it's super quick for prototyping new ideas. I will create custom components throughout the exersise. For this exeersise I'm going to just focus on a "medium" screen size (should work on most tablets). Aria and accessibilty are slso going to be ignored due to time constraints. I will use Headless UI for creatig dropdowns and other interactive custom components due to it allowing complete freedom of styling.
-   Update auth endpoint to set a secure cookie (currently 24h for demo purposes). A secure cookie is the only real way to prevent XSS attacks as there's no API to ineract with them from JS. To ensure the cookie was set correctly I needed to use call the frotend and backend on the same port. I'm using [https://caddyserver.com/](https://caddyserver.com/) to act asa reverse proxy for this due to its simplicity (and it's written in Go, which I'm a massive advocate for!).
-   Due to the extra coding involved with using Eloquent and a custom implementation, I've opted to use a cachine proxy [https://github.com/valeriansaliou/bloom](https://github.com/valeriansaliou/bloom). A small footprint API caching proxy that will sit between the frontend I've set it to cache for 10 minutes. It shards on Authorization header so there _shouldn't_ be any chance of cacbhe leakage - It's good enough for this MVP!
-   Ah! You can pass lessons_start_after and lessons_start_before to the `/classes/{id}` endpoint and the `lessons` include will honour it. This is going to cut down on an extra API call per lesson which was going to create an `n + 1` problem.`n + 1` on DB calls is BAD. But when you get sockets and HTTP involved, you've got real problems.
-   add loadng state in to planner. Combine data fetch calls into Promise.all. Just noticed that react-router-dom 6.4 has just introduced data loading functionality outside of the component. TODO!
-   Added username dropdown on login page (for demo purposes)
-   Remove bloom from stack as it was clustering on Authorization header, but we're now using cookie authentication
