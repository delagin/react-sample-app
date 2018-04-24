# axmit-react-typescript-demo

React/TypeScript demo with love from Axmit.com

## Usage

First of all, ensure that you have installed [Docker](https://docs.docker.com/install/).

Then you need to build local docker image (tagged as `axmit-react-typescript-demo`) with application:

```sh
docker build -t axmit-react-typescript-demo ./
```

After that you could try to run image with next command and open [localhost:8080/login](http://localhost:8080/login) in your favorite browser:

```sh
docker run -it -p 8080:8080 axmit-react-typescript-demo yarn start # ...then press `Ctrl\Cmd + C` to stop
```

## Development

To run project in development mode (live reloading), just follow this command (valid only under Linux/OS X operating systems):

```sh
docker run -it -p 8080:8080 -v `pwd`/src:/home/node/app/src axmit-react-typescript-demo yarn start:docker
```
