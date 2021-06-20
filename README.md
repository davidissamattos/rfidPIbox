# RFID Raspberry Pi Music Box
A Raspberry Pi music box controlled by RFID/NFC cards

Uses local music files, not internet connection required. Easy to add new albums.
Create cards based on albumns (not music) or folders with playlists. The idea is to give a similar experience as in cds...

1. Written in Typescript
2. RFID/NFC reader based on https://github.com/pokusew/nfc-pcsc
3. Music player based on MPlayer

## Installation in a Raspberry Pi/Ubuntu

### Configure the Raspberry Pi to be headless

* https://www.tomshardware.com/reviews/raspberry-pi-headless-setup-how-to,6028.html 
* Access it with ssh pi@192.168.1.213 (in my router for example). 
    * You can change settings/fix an IP in the DHCP of the router.
* Password: raspberry

### Add necessary software
* git
    * `sudo apt-get install -y git`
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

### Git copy the repository

* Clone this repository in the user folder
    * `git clone https://github.com/davidissamattos/rfidPIbox.git`
* Install the node-modules
    * `npm install`


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

1. Create a folder with an album name without space. All music for the album should be there.
2. Create a playlist (*.m3u) with the same name as the album/folder and ending with .m3u extension 
    * OBS: playlists created with VLC have a `%20` instead of space for music name. Replace all if needed. 
3. Place this album folder in the music folder of the software (set with the environment variable)
    * To copy with ssh: `scp -r ./music/ pi@192.168.1.213:~/`
4. Write the payload `"{"album": "album_name"}"` to the NFC card (with NFC Tools for Desktop on Mac or any other alternative)

### To update the software

1. Go to the rfidPibox
   * `cd rfidPibox`
2. Update the code
   * `git pull`
3. Restart process with pm2
   * ``

## Dev
### Commands to run:

* build application `node run-script clean-build`
  * clean the `build` directory
  * Compile the Typescript into JS
* run application `node run-script run-dev`
  * clean the `build` directory
  * Compile the Typescript into JS
  * Runs using a dev configuration

For other npm scripts see the package.json file
