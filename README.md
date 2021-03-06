## GoodArduinoCode.com

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/wokwi/good-arduino-code
```

Then run `npm install` to install all the dependencies.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding new code examples

Create a new directory under the `content` directory, and then create the following files inside:

- `sketch.ino` - the Arduino source code of your example
- `project.json` - This file describes your project. You can see an example [here](content/simon/project.json).

As soon as you create these two files, you should see
the new example appear in the homepage.

Note: the name of the directory will become part of the URL of your example. For instance, if you call the
directory `smart-bin`, the project will be published
as `https://goodarduinocode.com/projects/smart-bin`.
