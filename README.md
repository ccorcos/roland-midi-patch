# Roland RD-100 Midi Patch

I was having an issue with my Roland RD-100 where the MIDI notes would hang. After opening up the MIDI Monitor, I discovered that when I lift up two notes at the same time, one of the notes will get an on message again rather than an off message.

Thanks to the amazing `node-midi` package, I'm simply keeping track of which notes are pressed and correcting the messages as they come through.

To get this up and running, you'll need node.js installed.

```
npm install
npm start
```

You should see a MIDI instrument called "Roland Patch".
