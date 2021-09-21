<div align="center">
  <img src="https://user-images.githubusercontent.com/9601737/134082731-213dc876-abe9-4901-b314-9c1640abdf8d.png" alt="WNB.rb logo" height="200px" />
  <h1>WNB.rb</h1>
</div>

<p align="center">
  <a href="https://twitter.com/wnb-rb">Follow us on Twitter</a> •
  <a href="https://tinyurl.com/join-wnb-rb">Join Our Community</a>
</p>

WNB.rb is a virtual community for women and non-binary Rubyists. This is the repo for WNB.rb's website, built by and for our community.

## Code of Conduct

All contributors to this repository must follow the [WNB.rb code of conduct](https://tinyurl.com/wnb-rb-coc). Those who violate the code of conduct will be reported to GitHub support and banned from all WNB.rb platforms, including GitHub and Slack.

## Getting Started

Before you try to set up this app, make sure you have the following installed on your machine:
- Ruby (3.0.2)
- Node (16.3.0)
- Postgres (13.3)
- Yarn

### 1. Fork and Clone this repository
If you're unfamiliar with this process, use the [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo) to get started!

### 2. Install dependencies
- To install Ruby dependencies, run: `bundle install`
- To install JavaScript dependencies, run: `yarn install`

### 3. Set up the database
- First, make sure Postgres is running on your machine
- Then, run the following: `rails db:setup`

### 4. Run the tests
- To run the backend tests: `rspec`
- To run the frontend tests: `yarn jest app/javascript`

### 5. Start the server
To start both the frontend and backend servers at the same time, run:

```
foreman start
```

Alternatively, you may run the frontend and backend servers separately with these two commands:

```
rails s
bin/webpack-dev-server
```

This may be helpful for debugging, but generally should not be necessary.

## Contributing
To contribute code to this repository, do the following:

### 1. Perform all steps in the [Getting Started](#getting-started) section of this document

### 2. Assign yourself an issue in our [Issues](https://github.com/wnbrb/wnb-rb-site/issues/new) tab
Check out the `good first issue` tag if you're just getting started! Feel free to comment on an issue that interests you, and one of our maintainers can help you get started.

### 3. Create a new branch for your changes: `git branch -b your-branch-name-here`

### 4. Write a failing test (optional)
This step is not always necessary. Tests are required for almost all backend changes and all frontend logic changes. Visual changes, such as modifying styles or copy, do not require you to write a test.

### 5. Write code to make your test pass
Make sure to commit your code periodically! Read [GitHub's commit guide](https://github.com/git-guides/git-commit) if you're not familiar with this process.

### 6. Create a pull request
If you are unfamiliar with creating a pull request from a fork, check out the [GitHub docs](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

A maintainer will review your pull request and help you get it merged into the app!

## Reporting Issues

To report a bug or request a new feature, please [open an issue](https://github.com/wnbrb/wnb-rb-site/issues/new).
