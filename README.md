# Web Sight Front-end

[![Black Hat Arsenal](https://github.com/toolswatch/badges/blob/master/arsenal/2017.svg)](https://www.toolswatch.org/2017/06/the-black-hat-arsenal-usa-2017-phenomenal-line-up-announced/)

Web Sight is a software platform that enables red and blue teams to automate the information gathering processes required by their day-to-day jobs. At present, Web Sight performs the following activities:

* Domain name enumeration
* DNS record enumeration
* Network scanning (large scale)
* Network service fingerprinting
* SSL support enumeration
* SSL certificate inspection
* Application-layer inspection for supported application protocols (currently only HTTP)

These activities are entirely automated, and require only the following information as scanning "seeds":

* Network ranges
* Domain names

For web applications that are discovered across an organization's domain names and network ranges, the following activities are conducted:

* Virtual host enumeration
* User agent enumeration
* Crawling
* Screen shotting

The goal of automating this information gathering process is to provide users with the situational awareness that proper security strategizing (both offensively and defensively) requires. Simply put, how can you hope to attack and/or defend an organization if you don't have a good understanding of the organization's attack surface at a given point in time? Furthermore, given the nature of enterprise attack surface (constant churn, massive scale), any understanding of attack surface is fleeting, and attack surface must be re-evaluated regularly to maintain situational awareness.

Please note that this documentation is very much a work in progress. If you find any part of it confusing, please feel free to submit a question via GitHub and I will do my best to respond in a timely fashion.

## Introduction

This repository contains the code the Web Sight front-end single page application. The application uses Angular 2 and Typescript, and uses the [Angular2 CLI](https://cli.angular.io/) tool for building and deploying code. The code makes an effort to follow the [Angular2 best practices](https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md). That being said, the front-end code has significantly less attention to detail when compared to the back-end code.

## Installation

**Web Sight has been tested and works with both OSX and Ubuntu. The steps here should work on other Linux distributions, but YMMV.**

To build the front-end code, we require the Angular2 CLI project, which in turn relies upon NodeJS. If you haven't used the Angular2 CLI before, it's a bit of a pain in the ass to install and keep updated (to put things mildly). As such, we're going to install a specific version of Angular2 CLI for the time being.

First thing's first is to install [Node Version Manager](https://github.com/creationix/nvm). Once `nvm` is installed, install NodeJS version 6.10.3 and set it as the default NodeJS version using the following commands:

```
nvm install 6.10.3
nvm alias default 6.10.3
nvm use default
```

Next, (globally) install the Angular2 CLI using the following command:

```
npm install -g "angular-cli@1.0.0-beta.24"
```

With the proper version of Angular2 CLI installed, we can now pull down the front-end code. Use the following commands to clone the front-end repository and `cd` into the cloned directory:

```
git clone https://github.com/lavalamp-/ws-frontend-community.git
cd ws-frontend-community
```

Once the code is retrieved and you're sitting in the front-end code directory, install the necessary dependencies with the following command:

```
npm install
```

Now that the front-end code is pulled down, the proper version of Angular2 CLI is installed, and the application dependencies are installed as well, we can move on to configuring the front-end code for building.

## Configuration & Setup

Configuring the front-end application for building is fairly simple - the first step is to copy over the example configuration file to the expected configuration file path:

```
cp src/app/app.config.ts.example src/app/app.config.ts
```

We will now need to update the contents of the `app.config.ts` file with two values as identified by the `[[REPLACE]]` blocks in the configuration file. Web Sight currently supports the processing of transactions via the [Stripe API](https://stripe.com/docs/api), and if you would like to process payments with your deployment as well then you will need a Stripe account:

```
apiUrl - This is the URL where the Web Sight back-end API that your front-end application will be communicating with resides (ex: http://127.0.0.1:9999/)
stripePublishableKey - This is the public key used by the Stripe payments API (note that you don't need to populate this value, but if you don't and you try to run any purchases through the Stripe API they will fail and the front-end will break)
```

Once you've updated the configuration file, you're ready to build the front-end application.

## Testing

The Web Sight front-end makes use of the default Angular2 CLI testing harness, which at the time of writing fails the majority of tests (I'm pretty sure this is a bug in the version of Angular2 CLI and how it generates code). If you'd like to see all of the failures in action, run the following command from the root directory of the project:

```
ng test
```

## Running the Development Server

We can use the Angular2 CLI to serve up the front-end application using the following command:

```
ng serve
```

This command will likely issue some warnings about `fallbackLoader` and `loader` being deprecated, but the code builds nonetheless. Once the code is finished building, you shouldbe able to navigate a browser to http://127.0.0.1:4200/ to view the application. Note that the Angular2 CLI development server will automatically re-compile code as you edit it.

## Deploying Front-end Code

To build the front-end application for production deployment, run the following command:

```
ng build --prod
```

Once the code is built, a new directory entitled `dist` will be populated within the project root containing all of the compiled code to deploy to your production server. To deploy the code, simply copy the contents of the `dist` directory and all its subdirectories to the web root of a web server (Nginx, Apache, etc). You should then be able to browser to the `index.html` file on the web server and see the application.

 Note that when you're configuring the web server where the code is deployed, you should add a rule that serves up the `index.html` file for all requests to files that don't exist. This enables users to browse to application URLs and still have the application serve up the intended functionality.

## Documentation

**THE CODE IS SO GOOD THAT IT'S PRACTICALLY SELF-DOCUMENTING.**

Loljk that's not true at all. Right now I'm an army of one and I don't have any centralized documentation to offer. I'd love for a community to grow around this project and aid in the development of project documentation. Either way though, I intend to have a wiki / readthedocs project put together at some point in the future.

## Contributing

Yes. Please. Please contribute. At the time of writing this, the majority of code has been written by yours truly, with some fantastic aid from my partner in crime Iggy Krajci.

If you would like to contribute please first take a thorough tour of the codebase and try to get a good understanding of the layout and coding paradigms that are in play. Additionally, make sure that you know how the [Angular2 CLI](https://cli.angular.io/) works and that your code makes an attempt to follow the [Angular2 style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md). I'll generally be happy with any code that anyone contributes, but following these rules will make me even happier!!

I will hopefully have a contributing guide up alongside the aforementioned documentation at some point in the future. Until then, please feel free to ask as many questions as you like to clarify any understanding that you strive to have. I will also have a requested feature list either on GitHub or Trello - again the only constraint is my only having two hands and 24 hours of time in a day.

## Questions

I'm a big fan of Metasploit's approach to asking questions - "Don't ask to ask, just ask." I will happily answer your questions to the best of my ability permitting I am not super swamped with other things. Questions can be asked via any of the following (in descending order of preference):

* GitHub - [open issue](https://github.com/lavalamp-/ws-frontend-community/issues)
* IRC - #thedeepestweb on [Freenode](https://freenode.net/), username is lavalamp
* Twitter - [@_lavalamp](https://twitter.com/@_lavalamp)
* Email - chris AT websight DOT io
