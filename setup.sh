#!/bin/sh

# app setup
set -e
yarn
cc gadget.c -o gadget

# raspberry pi system setup, add boot arguments to enable usb gadget hid mode
echo "dtoverlay=dwc2" | sudo tee -a /boot/config.txt
echo "dwc2" | sudo tee -a /etc/modules

# run hid script at boot
sudo cp /etc/rc.local /etc/rc.local.bak
sudo cat<<EOF > /etc/rc.local
#!/usr/bin/env bash
/home/pi/acutator/rpi-hid.sh
chmod 777 /dev/hidg0
cd /home/pi/acutator && node /home/pi/acutator/app.js
exit 0
EOF
sudo chmod 755 /etc/rc.local

