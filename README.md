<div align="center">
  <img src="https://user-images.githubusercontent.com/9601737/134082731-213dc876-abe9-4901-b314-9c1640abdf8d.png" alt="WNB.rb logo" height="200px" />
  <h1>WNB.rb</h1>
</div>

<p align="center">
  <a href="https://twitter.com/wnb_rb">Follow us on Twitter</a> •
  <a href="https://wnb-rb.dev/join-us">Join Our Community</a>
</p>

WNB.rb is a virtual community for women and non-binary Rubyists. This is the repo for WNB.rb's website, built by and for our community.

## Code of Conduct ❤️

All contributors to this repository must follow the [WNB.rb code of conduct](https://tinyurl.com/wnb-rb-coc). Those who violate the code of conduct will be reported to GitHub support and banned from all WNB.rb platforms, including GitHub and Slack.

<hr>

### 1. Getting Started 🏁

Before you try to set up this app, make sure you have the following installed on your machine:

- Ruby (3.2.2)
- Node (16.3.0) + Yarn
- Postgres (13.3)
- [Foreman](https://github.com/ddollar/foreman) for managing multiple servers

You must also fork and clone this repository.

For help getting set up, refer to the [Contributor Resources](#contributor-resources) section of this document.

### 2. Set up the repo

To install dependencies and setup the database, run:

```
make setup
```

### 3. Set environment variables

Running the job board locally requires two environment variables. To set up your environment variables, run the following command:

```
cp .env.template .env
```

Then, edit `.env` and set the following environment variables:

- `JOB_BOARD_PASSWORD`: this determines the password for the job board
- `JWT_HMAC_SECRET`: this sets the secret key used to encode the token for job board authentication

### 4. Run the tests

- To run the backend tests: `rspec`
- To run the frontend tests: `yarn jest app/javascript`

### 5. Start the server

To start both the frontend and backend servers at the same time, run:

```
foreman start -f Procfile.dev
```

In your browser, navigate to `localhost:5000` to see the app in action!

Alternatively, you may run the frontend and backend servers separately with these two commands:

```
rails s
bin/shakapacker-dev-server
```

This may be helpful for debugging, but generally should not be necessary.

### 6. Running rake tasks

To execute rake tasks, run:

```
foreman run rake [NAMESPACE]:[TASK_NAME]
```

## Extras

### Creating new migrations

We are utilizing the [data-migrate gem](https://github.com/ilyakatz/data-migrate) to segregate data migrations from schema migrations in our main application.Data migrations can be found in the `db/data` directory, distinct from schema migrations which are located in the `db/migrate` directory. Use the following command to create a new data migration:

```
rails g data_migration add_this_to_that
```

### Setting up Google Sheets Integration

If you want to implement Google Sheets and interact with the form for joining new users, follow the instructions below to enable reCAPTCHA v3 and set up the Google Sheets API and Google Drive API.
</br>

#### <b>Enable Recaptcha v3</b>

reCAPTCHA helps protect your sites from fraudulent activities, spam, and abuse. To start using reCAPTCHA, follow these steps:

1. Sign up for an API key pair for your site by visiting the [reCAPTCHA admin page](http://www.google.com/recaptcha/admin). Generate your `SITE KEY` and `SECRET KEY`.

2. Set the environment variables by editing the `.env` file. Replace the values with the following:

- `RECAPTCHA_ENABLED`: Enable or disable Recaptcha (`'true'` or `'false'`).
- `RECAPTCHA_SITE_KEY`: Use this key in your JSX files.
- `RECAPTCHA_SECRET_KEY`: Use this key to verify the user's response.

</br>

#### <b>Set up Google Sheets API & Google Drive API</b>

To interact with Google Sheets, you need to set up the Google Sheets API and Google Drive API. Follow these steps:

1. Go to the [Google Cloud API Console](https://console.cloud.google.com/apis/) and create a new project.

2. Enable the Google Drive API by clicking on "Enable API" and searching for the Google Drive API.

3. Create credentials for a Web Server to access Application Data.

4. Name the service account and grant it a Project Role of Editor.

5. Download the JSON file that contains your credentials.

6. Move the downloaded JSON file to the location where `google-credentials.json.template` is located in this project. Rename the file to `google-credentials.json`.

7. In the Google Cloud API Console, also enable the Google Sheets API (this step is important).

8. Create a Google Spreadsheet file in your Google Drive. Copy the title or key of the spreadsheet and paste it in `lead_registration_service.rb`.

9. Share the document with the email address found inside the `google-credentials.json` file (the `client_email` value).

</br>

For better understanding, you can refer to the following guides:

- https://www.twilio.com/blog/google-spreadsheets-ruby-html
- https://github.com/wnbrb/google-drive-ruby/blob/master/doc/authorization.md#service-account

</br>

## Contributing 🤝

### 1. Assign yourself an issue from our [Issues](https://github.com/wnbrb/wnb-rb-site/issues/new) tab

- Check out the [`good first issue`](https://github.com/wnbrb/wnb-rb-site/labels/good%20first%20issue) tag if you're just getting started!
- If you want to work on something that isn't listed in our Issues, please [create a new issue](https://github.com/wnbrb/wnb-rb-site/issues/new/choose).

### 2. Write your code and create a pull request

- Note that your pull request may require one or more tests. Tests are required for almost all backend changes, and all frontend logic-related changes. Style or copy changes do not require you to write a test.
- For a style or copy change, please provide side-by-side screenshots showing how the app looks before and after your changes.
- When working on the admin area, controllers for the admin area should inherit from `AdminController` so the layout is properly applied.

## Contributor Resources 📚

Need some help contributing to our app? Check out the resources below for more information about installing and using various third-party tools.

### PostgreSQL

- Installing PostgreSQL: [Mac](https://www.onlinetutorialspoint.com/mac/how-to-install-postgresql-on-mac.html) • [Windows](https://www.postgresqltutorial.com/install-postgresql/) • [Linux](https://www.postgresqltutorial.com/install-postgresql-linux/)

### Ruby

- [Installing Ruby](https://github.com/rbenv/rbenv)

### Node

- [Installing Node](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Installing Yarn](https://classic.yarnpkg.com/en/docs/install/)

### GitHub

- [Forking and cloning a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [Working with forks](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks)
- [Creating and deleting branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository)
- [Commit guide](https://github.com/git-guides/git-commit)
- [Creating a pull request from a fork](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

## Reporting Issues 🐞

To report a bug or request a new feature, please [open an issue](https://github.com/wnbrb/wnb-rb-site/issues/new).
