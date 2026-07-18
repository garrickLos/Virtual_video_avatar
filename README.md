# Virtual D&D Character Setup Guide

## Brief explanation

The idea is that with your D&D character you get a virtual representation that you can use on Discord. For this you'll need the following:

- Discord
- OBS
- Microsoft Paint
- A text editor (a regular Notepad is fine, VS Code also works). VS Code is a bit more complex to install, so stick with Notepad for simplicity.

## Getting started

First, you need an image. There's a dedicated folder within the project for this: `Frontend\character_art\Characters`. Place all the character images you need here.

For the character to work properly, you need a head/mouth area and a body. The head/mouth area is what moves up and down while talking, and the body is what stays stationary.

## Testing the program

Open "Command Prompt" and type: `cd {the location of the folder}` — put the location of the folder where you placed it after the `cd` (my location is `D:\Github\virtual_camera_character\Frontend`, so I type `cd D:\Github\virtual_camera_character\Frontend`).

If after that you still see the old location where you started (usually something like `C:\Users\{user}`), you need to switch drives first. For me it's the D drive, so I type `D:` and then it will take you to the correct location.

Once you're in the Frontend folder, type: `npm start`. This starts the application. This comes with a default character that I use myself, along with a few settings:

- **Button at the very top of the settings**: Hides all the settings for OBS
- **"Click to talk"**: Picks up audio from your mic
- **"Input scale of the character"**: Changes the scale of the character (useful if it's too big or too small)
- **"Greenscreen color"**: Useful for OBS to remove the background using chroma keying
- **"Toggle rotation marker"**: Toggles a marker that shows where the origin of the head is. (To change this position — which you'll probably need to do — you need to find a file called `style.css` in this folder: `D:\Github\virtual_camera_character\Frontend\css`. In it, you'll find:

  ```css
  --origin_x: 511px;
  /* Moves left and right (the neck) */
  --origin_y: 165px;
  /* Moves up and down (the neck) */
  ```

  These two values need to be adjusted to the new position you want for your photo. This can easily be done in Notepad. Once adjusted and saved with Ctrl + S, you need to do Ctrl + Shift + R in the application to reload it.)

- **"Head picture path"**: The filename of the head image. You only need to enter the name of the photo.
- **"Body picture path"**: The filename of the body image. Same as the head — just the name of the photo.

## Creating your own character

To have your own character, you need to do a few things:

1. Generate/create a character
2. Remove the background of the image
3. Cut the head/mouth area away from the body
4. Save the body and head separately (make sure they have exactly the same dimensions — pretend the body and head are still combined, but save them as 2 separate photos [check other photos for reference])
5. Place both images in the `virtual_camera_character\Frontend\character_art\Characters` folder