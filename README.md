<h1 align="center" >M Keyboard</h1>
<p align="center">
  <a href="https://github.com/mienhuang/keyboard/blob/master/LICENSE" title="LICENSE">
    <img src="https://img.shields.io/npm/l/express.svg" alt="MIT License">
  </a>
  <a href="" title="downloads">
    <img src="https://img.shields.io/badge/downloads-0-green.svg" alt="downloads">
  </a>
  <a href="" title="dependencies">
    <img src="https://img.shields.io/badge/dependencies-none-orange.svg" alt="dependencies">
  </a>
</p>

## What is M-Keyboard

M-Keyboard is a tool for WEB mobile application, will provide a customize keyboard.

Build in Web Component, No dependency!

[【查看中文文档】](https://github.com/mienhuang/keyboard/blob/master/docs/README-CN.md)

## Features

- support digital, number, ID Card mode.

- support theme change

## Preview

### Theme Preview

![Image text](https://github.com/mienhuang/keyboard/blob/main/docs/imgs/light.png?raw=true)

![Image text](https://github.com/mienhuang/keyboard/blob/main/docs/imgs/dark.png?raw=true)

### Type Preview

type = number

![Image text](https://github.com/mienhuang/keyboard/blob/main/docs/imgs/number.png?raw=true)

type = idcard

![Image text](https://github.com/mienhuang/keyboard/blob/main/docs/imgs/dark.png?raw=true)

type = digital

![Image text](https://github.com/mienhuang/keyboard/blob/main/docs/imgs/digital.png?raw=true)

## Installation

#### Method1 tag import：

```html
<script src="/path/to/keyboard.min.js" type="text/javascript"></script>
```

#### Method2 npm install：

```
npm i @mobiletools/keyboard -S
```

After install from NPM but you still need import keyboard.js file to your project.

## Getting Started

#### Demo

```html
<m-keyboard id="test" type="idcard" theme="light" value="2021"></m-keyboard>

<script>
  document.querySelector("#test").addEventListener("oninput", (e) => {
    console.log(e);
  });
</script>
```

## How does it works

After you add keyboard to the dom, it will listen on the click event,
once user click the m-keyboard or the inner input, it will trigger the show function to show the keyboard.

And this logic is handled inside the component, user don't need pay attention.

## Settings

| Name  | Default | value                   | Type   | Description                         |
| ----- | ------- | ----------------------- | ------ | ----------------------------------- |
| theme | dark    | dark, light             | String | selected theme for current keyboard |
| type  | number  | number, digital, idcard | String | keyboard type                       |
| value | ''      |                         | String | default value for the input         |

### Values

> Theme:

- light
- dark

> type:

- number
- digital
- idcard

### Functions

- destory(): when user going to remove the m-keyboard can call the destory function to remove the style and keyboard doms

### Events

| Name     | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| oninput  | dispatch this event when user input value, will emit the latest input value and old value |
| onchange | dispatch this event when user press done button, will emit the latest input value         |
| onhide   | dispatch this event when user fold the keyboard                                           |

## You May need

**Sroll Picker**: A wheel like picker for web applications

[Scroll Picker](https://www.npmjs.com/package/@mobiletools/scrollpicker)

## License

[MIT LICENSE](https://github.com/mienhuang/keyboard/blob/main/LICENSE)

Copyright (c) 2021-present, Mien
