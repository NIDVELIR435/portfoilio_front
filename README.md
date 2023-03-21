## Installation
```bash
# install all dependencies in your host  
$ yarn;
```

```bash
# rename create env or rename env.example to .env
$ mv .env.example .env
# will configure and start container in watch mode 
$ yarn docker:start;
```
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Stop the app
```bash
# will stop related containers
$ yarn docker:stop;
```
