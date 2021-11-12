<div align="center">
  <img src="https://user-images.githubusercontent.com/9601737/134082731-213dc876-abe9-4901-b314-9c1640abdf8d.png" alt="WNB.rb logo" height="200px" />
  <h1>WNB.rb</h1>
</div>

<p align="center">
  <a href="https://twitter.com/wnb-rb">Follow us on Twitter</a> •
  <a href="https://tinyurl.com/join-wnb-rb">Join Our Community</a>
</p>

WNB.rb is a virtual community for women and non-binary Rubyists. This is the repo for WNB.rb's website, built by and for our community.

## Code of Conduct ❤️

All contributors to this repository must follow the [WNB.rb code of conduct](https://tinyurl.com/wnb-rb-coc). Those who violate the code of conduct will be reported to GitHub support and banned from all WNB.rb platforms, including GitHub and Slack.

## Getting Started 🏁

Before you try to set up this app, make sure you have the following installed on your machine:
- Ruby (3.0.2)
- Node (16.3.0) + Yarn
- Postgres (13.3)
- [Foreman](https://github.com/ddollar/foreman) for managing multiple servers

You must also fork and clone this repository.

For help getting set up, refer to the [Contributor Resources](#contributor-resources-) section of this document.

### 2. Install dependencies
- To install Ruby dependencies, run: `bundle install`
- To install JavaScript dependencies, run: `yarn install`

### 3. Set up the database
- `rails db:setup`

### 4. Run the tests
- To run the backend tests: `rspec`
- To run the frontend tests: `yarn jest app/javascript`

### 5. Start the server
To start both the frontend and backend servers at the same time, run:

```
foreman start
```

In your browser, navigate to `localhost:5000` to see the app in action!

Alternatively, you may run the frontend and backend servers separately with these two commands:

```
rails s
bin/webpack-dev-server
```

This may be helpful for debugging, but generally should not be necessary.

## Contributing 🤝

### 1. Assign yourself an issue from our [Issues](https://github.com/wnbrb/wnb-rb-site/issues/new) tab
- Check out the [`good first issue`](https://github.com/wnbrb/wnb-rb-site/labels/good%20first%20issue) tag if you're just getting started!
- If you want to work on something that isn't listed in our Issues, please [create a new issue](https://github.com/wnbrb/wnb-rb-site/issues/new/choose).

### 2. Write your code and create a pull request
- Note that your pull request may require one or more tests. Tests are required for almost all backend changes, and all frontend logic-related changes. Style or copy changes do not require you to write a test.
- For a style or copy change, please provide side-by-side screenshots showing how the app looks before and after your changes.

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
- [Creating and deleting branches](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository)
- [Commit guide](https://github.com/git-guides/git-commit)
- [Creating a pull request from a fork](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

## Reporting Issues 🐞

To report a bug or request a new feature, please [open an issue](https://github.com/wnbrb/wnb-rb-site/issues/new).
