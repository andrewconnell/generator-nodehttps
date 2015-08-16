# generator-nodehttps [![Build Status](https://secure.travis-ci.org/andrewconnell/generator-nodehttps.png?branch=master)](https://travis-ci.org/andrew/generator-nodehttps)

> [Yeoman](http://yeoman.io) generator for creating a locally hosted HTTPS site using Node.js.

There are many options for creating a locally hosted HTTP site, but HTTPS is another matter. This generator simplifies this. 

Initially it will create the `server.js` for you and provide instructions on how to create a self-signed certificate and configure your development environment to trust the certificate.

In the future it will prompt you to provide the certificate & key for a commercially acquired certificate, or it will create & trust a self-signed certificate for you. 

[Roadmap for upcoming plans / features / fixes](https://github.com/andrewconnell/generator-nodehttps/issues/1)

## Install
Install `yo` and `generator-nodehttps` globally using NPM:

```bash
$ npm install -g yo generator-nodehttps
```

## Usage

Make a new directory and `cd` into it:

```bash
$ mkdir my-new-https-site && cd $_
```

Run `yo nodehttps`:

```bash
$ yo nodehttps
```

Follow the instructions at the end of the generator for configuring the SSL certificate following these instructions: [Configure Express with SSL Certificate for HTTPS Development on OS X](docs/setup-https.md).

## Running Tests

Test the generator by running:

```bash
$ npm test
```

## Changelog

Recent changes can be viewed on Githb on the [Releases Page](https://github.com/andrewconnell/generator-nodehttps/releases)

## License

MIT