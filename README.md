# Web Sight Front-end

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

## Configuration & Setup

## Testing

## Running the Development Server

## Deploying Front-end Code

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
