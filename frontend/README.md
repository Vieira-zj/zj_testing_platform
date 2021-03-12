# Testing-platform Frontend

> Testing platform frontend, vue + elementUI.

## Project setup

1. Create project

```sh
vue create frontend
```

2. Update `package.json` and install dependencies

```sh
npm install
```

Module `node-sass` install failed with error `gyp: No Xcode or CLT version detected`. Fix:

- install xcode:

```sh
xcode-select --print-path
sudo rm -rf $(xcode-select --print-path)
xcode-select --install
```

- re install `node-sass` module with fix version:

```sh
npm uninstall node-sass
npm install node-sass@4.14.1
```

3. Fix audit error for npm install

```sh
npm audit fix --force
```

4. Start server

```sh
npm run serve
```

## Project Structure

- `vue.config.js`: vue configurations.
- `src/main.js`: vue entry point.
- `src/App.vue`, `public/index.html`: vue template page.

