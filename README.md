# Autopac
Autopac is a Chrome extension that fills HTML forms automatically on bank pages, in particular fills form for scheduled or recurring payments.

### Features

* Auto fill forms automation.
* Payments configuration.
* Cross messaging between chrome extension and external web page.

## Install

* Go to ```chrome://extensions``` in your browser. 
* Ensure that the Developer mode checkbox in the top right-hand corner is checked.
* Click **Load unpacked extension**.
* Select the directory in which your extension files live.

Alternatively, you can drag and drop the directory where your extension files live onto ```chrome://extensions``` in your browser to load it. 

## Strucure

This project uses the structure provided by [extensionizr](https://extensionizr.com).

Autopac is a page action extension that only works with pages defined in ```src/active_pages.json``` .

The extension interact with the active page using content scripts and injecting functions, this functions can be used directly in the page for autolling forms.

### Manifest

JSON file that contains the properties in the extension (name, version, icons, type of extension ...) also contains the persmissions and the pages with available content scripts.  

### Background

```bg/background.js``` enable the script in specific pages and load different popups for different pages. Also contains the listener for external messages.

### Browser Action

```src/browser_action``` directory contains the popup HTML and the java script files with the Autopac listeners and functions.

### Inject

```src/inject```  contains all the script injected in the bank pages, this scripts fill the forms and are unique for each bank.

## Basic Usage

* Send data from external pages to the extension storage or use the deafult values in the background.

* Open a supported bank page log in, open the extension, check the payment data and follow the instructions.

* Autopac will fill the form for scheduled payments.
