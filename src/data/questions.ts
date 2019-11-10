import {IFAQ} from '~/components/FAQList';

const questions: IFAQ[] = [
  {
    content: 'Yes the app is 100% free and fully open source.',
    title: 'Is Stegappasaurus mobile application free?',
  },
  {
    content: 'At the moment just Android.',
    title: 'What OS is the application available on?',
  },
  {
    content:
      "Simple answer no, all the data is stored on the user's (your device).",
    title: 'Do you store any data?',
  },
  {
    content: `Steganography is the art/science of hiding data in plain sight. In the context of this \
app, it allows you to hide messages (text) within images. You do this by encoding the image with \
the text data. You can then share the image with other people and they can decode the image \
(retrieve the original message) using this app.`,
    title: 'What is steganography?',
  },
  {
    content: `Not quite, encryption, involves obscuring information whereas steganography is concerned with hiding it. \
With encryption if you have the encrypted message you cannot retrieve the original message. \n\n \
Whereas with steganography if you know where to look you can retrieve the original message, it is \
not obscured in any way. However, with encryption, it is obvious you are trying to hide something \
but with steganography you can hide your message inside of an "innocent" looking image, with a third \
party without anyone noticing.\n\n \
You can combine the two "techniques", encrypt your data before encoding it into an image, then simply \
decrypt the message after decoding it from the image for added security. This involves a shared secret \
"password" between you and the person you are sending the image to.`,
    title: 'So is it the same as encryption?',
  },
  {
    content: `This app uses different steganography algorithms to encode the RGB (Red, Green, Blue) pixel values \
with the text data in such a way that the original data can be retrieved at a later date.\n\n \
After the image has been encoded you can save the image, then you can share this image and you use this app \
to decode and get the originally encoded message.\n\n \
In general each algorithm will encode the size of the message, this is so that when decoding the image we \
know when to stop. Each character in the message usually uses 8 bits in the images, this is because we \
encode it using the UTF-8 representation of the letter, symbol or emoji.`,
    title: 'How does this app work?',
  },
  {
    content: `There are many ways to represent colours in an image one of the most common ways is to the (8 bit) RGB colour \
system, which is red, green and blue. Each pixel has three components a red component, a green component and a blue \
component. Each component can be set a value from 0 to 255 (one byte). In binary 0 as a byte would be \
represented by  00000000 and a value of 255 would be represented by 1111111. It is often referred to as \
8 bit RGB because each component can only be represented by eight 1s or 0s (also referred to as a byte). \
So for example, if the RGB values of a pixel was set to 255 (all of them) then that pixel would be \
white (all colours added together). However, if the RGB values were set to 0, the pixel would be \
black. By changing the values of the RGB components we get different colours. So, all in all, \
we can represent 255 ^ 3 colours in 8-bit RGB or 16,777,216 different colours.`,
    title: 'How do RGB images work?',
  },
  {
    content: `LSB which stands for least significant bits, involves changing the smallest bit in a binary number. The \
best way to understand LSB is to look at an example let's say we have the letter A we want to encode into \
a 100 by 100 image which is all white. Each pixel in that image will have RGBA values of 255, remember that \
for each pixel in the image, we can encode 3 bits into since each pixel has three values which determine it's \
colour Red, Green, Blue. Technically we also have an Alpha value but ignore it in our case.\n\n \
So in our example we 100 * 100 * 3 = 30000, bits we can encode. Now before we can encode 'A' we need to convert \
it to a number first. Luckily we can use UTF-8 where A becomes the number 65. So we will encode 65 and then \
when we decode it from the image we will know (using UTF-8) that this 65 is an A. Before we can encode 65, we \
need to convert it into a byte which is the binary representation of 65. Which is 01000001, so now we go through \
this number one at a time and encode each bit into our image. So first we have '0' and we want to encode that \
into the Red component of our first pixel is 255 which in binary is 11111111. Now We want to change the LSB \
which is the rightmost bit since '1' is not equal to '0', we will encode a '0' so our new Red component becomes \
11111110 which is 254. Notice how the number only decreased by 1. So there won't be a large colour difference \
in the image between 255 and 254 (Red). However, if we changed the most significant bit (leftmost bit) it \
would become 01111111 which is 127, which would be a much large colour difference. Which is why we always \
change the LSB. So to include 65 we will need 8 bytes so we will encode the following components RGB RGB RG \
(across 3 pixels)." In our specific implementation, we also include the size of the message we are encoding at \
the beginning so in this case 'A' message is just 1. So we will encode the following byte '00000001'. So the \
whole message that we will encode is '0000000101000001'.`,
    title: 'How does LSB work?',
  },
];

export default questions;
