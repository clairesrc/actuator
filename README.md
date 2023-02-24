# Actuator
Ultra-lightweight smart KVM system written in vanilla Javascript with raw DOM API. Intended for running directly on a Raspberry Pi or other embedded device. 

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