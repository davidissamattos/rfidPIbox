# RFID Raspberry Pi Music Box

1. Written in Typescript
2. RFID/NFC reader based on https://github.com/pokusew/nfc-pcsc
3. Music player based on MPlayer

## Dev
### Commands to run:

* build application `node run-script build`
* run application `node run-script run`


## Installation in a Raspberry Pi/Ubuntu

### Configure the Raspberry Pi to be headless

* https://www.tomshardware.com/reviews/raspberry-pi-headless-setup-how-to,6028.html 
* Access it with ssh pi@192.168.1.213 (in my router for example). 
    * You can change settings/fix an IP in the DHCP of the router.
* Password: raspberry

### Add necessary software
* mplayer
    * `sudo apt-get install -y mplayer`
* nodejs and npm
    * https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/
    * `wget https://nodejs.org/dist/v14.17.1/node-v14.17.1-linux-armv7l.tar.gz`
    * `tar -xzf node-v14.17.1-linux-armv7l.tar.gz`
    * `cd node-v14.17.1-linux-armv7l/`
    * `sudo cp -R * /usr/local/`
* pm2
    * `npm install pm2@latest -g`
* nfc libraries
    * `sudo apt-get install -y libpcsclite1 libpcsclite-dev pcscd`

### Configure the RPi to start automatically in the pi user

* `sudo raspi-config` and choose the relevant option (console auto login)

### Set audio to 3.5mmm

* `sudo raspi-config` and choose the audio option

### Setup pm2 to keep the software on always

* 

## List of components

* Raspberry Pi 3 model B
* Milfare NFC cards
* Audio cable 3.5mm
* Speaker with Audio in. I am using the Sony SRS-XB01
* An NFC-USB reader compatible with the nfc-pcsc node library. I am using the ACR1222U  from www.acs.com.hk
* A wooden box to cover some of the cables and the RPi
* Double face tape
* USB-micro cable and outlet adaptor to connect the Raspberry Pi
* A USB-micro cable to keep the speaker charged


## Use

### Add new albums:

1. create a folder with an album name without space. All music for the album should be there.
2. create a playlist (*.m3u) with the same name as the album/folder and ending with .m3u. 
    * OBS: playlists created with VLC have a %20 instead of space for music name. Replace all if needed. 
3. Place this album folder in the music folder of the software (set with the environment variable)
3. Write the payload "{"album": "album_name"}" to the NFC card (with NFC Tools for Desktop on Mac or any other alternative)


