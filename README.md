# Actuator
Ultra-lightweight smart KVM system written in vanilla Javascript with raw DOM API. Intended for running directly on a Raspberry Pi zero. 

## Use case
Consider this: let's assume you have a [KVM switch](https://en.wikipedia.org/wiki/KVM_switch) that can be actuated with a keyboard hotkey inputted into a specific USB port. That's cool and all, but what if you want to actuate it over a network instead for some ill-advised reason? This app, running on a Raspberry Pi Zero, emulates a USB HID device using the Linux USB Gadget system, and presents a JSON API and Web frontend for managing and sending hotkeys. Using the Web interface, you can define a set of arbitrary keystrokes, which can then be triggered by pressing their corresponding buttons. Crazy! And also very, very insecure. I trust that you know what you're doing if you're still reading this, and that you don't intend to expose this to the internet or anything reckless like that.

**Absolutely, categorically not intended for anything outside extremely low-stakes environments. This is a toy/prototype I threw together in a few hours to solve a very specific technical problem in my home lab. There is no input validation or sanitization of any kind. Do not use this in production!**

## Install
```
$ ./setup.sh
```

Setup script assumes the app is located at `/home/pi/actuator`. If not, please adjust the path in `setup.sh`.

## Run
```
$ node .
```

Then open http://localhost:8005

## Support, contributing, etc.
No, don't bother.