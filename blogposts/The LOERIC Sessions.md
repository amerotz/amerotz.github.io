# The LOERIC Sessions

2025-10-23

Yesterday we had the final performance of a six-month artist residency with Rosie and Jamie Rutherford. Over multiple workshops, they have been interacting with the performance system LOERIC and writing new music for it, steering its development and creating the performance we had yesterday.

The performance was held at the Djanogly Recital Hall at the School of Music (University of Nottingham) and featured three pieces, each exploring a different way of playing with LOERIC.

This is what our day looked like and what went through in making this happen.

## Setting up

I and Adrian collected various pieces of equipment from the Mixed Reality Lab (e.g. mics, cables, monitors, LOERIC laptop, refreshments etc,) and brought them to the veneue in the morning. The first thing we discussed was how to structure the stage and where everything should be positioned. We temporarily settled on Rosie and Jamie at the center of the stage, with me running LOERIC on the side together with other sound tech (huge thanks to Glenn and Michael for that), though we recognized that that was a conversation we needed to have with Rosie and Jamie later on. We also started thinking about the possibility of bringing the audience on stage in a circle for a “cozier” setting, rather than sitting in the back, as we were unsure about attendance.

Apart from figuring out how draw the power where we needed without blocking emergency exits, getting LOERIC running and responding to mic input was fairly straightforward without many issues.

The setup consisted of:

- LOERIC laptop (a MacBook pro);
- a TASCAM US 4X4 audio interface;
- DI from Jamie’s guitar and Rosie’s clarinet to the interface;
- a MIDI keyboard to quickly try out sounds;
- a Novation Control XL to perform.

What instead ended up taking most of my time was fixing the parts LOERIC was supposed to play.

## Rehearsal

### “Artificialism”

While we had a rehearsal the day before, we had issues with the first piece, Artificialism (”artificial” + “minimalism”, though we eventually discovered that “artificialism” is itself a word) because LOERIC would occasionally skip pauses at the end of a section. To contextualize, the piece is a minimalist piece composed by Jamie exploring how LOERIC could arbitrarily move to different sections in the arrangement and how that would affect its human partners trying to catch up with it or steering it to change at specific times. In particular, LOERIC played different sections a random number of times (input by me for each before the performance), with the exception of some with a fixed number of repetitions and some that waited for Jamie to trigger the next section through a footswitch.

When we first tried this piece, LOERIC had no support for this mode of interaction, which prompted me to build the “scheduling” system that allows it to play different tunes in sequence, each with its own configuration. The issue we kept facing from the start was with sections starting or ending with a pause: being built on Irish traditional dance music, this was not much of an issue in LOERIC’s development, as tunes don’t typically end on a pause and they might start with a pickup bar, but not with *silence.* This had been patched during the summer, but a rewriting of the engine parsing the score introduced a very sneaky and subtle bug that I didn’t discover until around one hour before performance time.

Since the issue was with pauses ending and starting sections, given the limited time, we decided to just patch the score to *not* have pauses in those places. LOERIC was using a marimba sound in those bits, so changing an eight note followed by a pause to a quarter note was not going to be very noticeable. For the pauses at the start of sections, we had LOERIC double the guitar or play the ending note of the previous section, which helped camouflage the fix.

However, *we still had the same problem*, but only occasionally, specifically when LOERIC would skip to a new section *on its own* (*i.e.* when it run through the pre-programmed number of repetitions for that section without Jamie triggering the transition through the HELIX). What happened was that when LOERIC got to the final repetition of a section, the instance for that section is destroyed and replaced by a new one for the next part, and this allowed for radically different configurations between pieces. With the new rewrite, LOERIC would sleep between notes and wake up a bit before the next note was supposed to be played so that it could make all of its calculations ahead of time and avoid latency, while in the previous version, all calculations happen when a new note needs to be played. The latency is usually minimal, but it could add up, so this was added to prevent issues in the future. And this is exactly where LOERIC failed: after playing the last note, it would sleep for a bit, wake up around halfway though that note and try to play another note; being the end of the repetition, there was nothing for it to play, which meant that instance would just terminate and the next one would start, chopping the last note in half. Figuring this out took a while and was also very frustrating because it was not at all apparent why LOERIC was doing this and the subtle skip would sometimes go unnoticed. For good measure, after this was fixed, we still kept the extra notes in, just in case.

### “Klezempo”

Fixing Artificialism took some time, and we decided to start rehearsing the other pieces instead and to come back to it later. The next piece was Klezempo (”klezmer” + “tempo”) exploring the control of tempo, articulation and dynamics. Jamie and Rosie chose Klezmer music as very wide changes in tempo are a feature of this kind of music.

Rehearsing Klezempo was a fairly smooth experience: the tempo was controlled through an expression pedal with a footswitch to reset it to a default speed, useful at performance start. When the pedal was all the way down, the system would play very slow and legato, and all the way up translated to staccato and very fast. Dynamics were controlled by the amplitude of the signal of both guitar and clarinet combined. LOERIC was playing with an accordion sound with volume automation to make the changes in dynamics more apparent. We only needed to try it out a few times to find a good speed setting and set the monitors to the right volume, but it was a smooth experience overall.

### “Side Winds”

The last piece was the first one we ever tried with Jamie and Rosie, and it explores how LOERIC can play unconventional time signatures (7/8 in this case) and introduce errors and ornamentation. We originally had tried this piece through the “conventional” ways of interacting with LOERIC (e.g. audio input and expression pedals), but during the rehearsal the day before the performance we decided to instead have me controlling LOERIC through the MIDI mixer, with different sliders connected to different parameters, namely dynamics, drones, ornamentation and errors. We decided roughly how the piece was planned and annotated a score I used during the performance. Rehearsing this piece was also very straightforward, as all the tech behaved accordingly and, if we want to speculate, the fact that I was actively controlling LOERIC rather than just monitoring it meant it was more “under control” or any weird behaviour could be associated to my choices during the performance rather than a malfunctioning.

## Performance time

We didn’t have a big audience, but people still decided to sit in the audience pit rather than on the on-stage chairs. In terms of on-stage setup, we decided to bring my table in towards the middle as a co-performer with Jamie and Rosie and I played the part of “the meaty part of LOERIC” as a form of embodiment for the system. We also had a projector screen showing my terminal as I was wrangling the system.

After some introductions, we were ready to perform Artificialism, which I had fixed and checked up to 20 minutes before performance start. As Jamie commented later, in the most typically LOERIC way, the piece didn’t start as planned because I typed in the wrong command and started the bit I was debugging earlier rather than the full performance. This was not planned and I specifically had prepared the command while the other were talking to be able to start right away, but did not notice I was calling it on the wrong file. However, one of the effects of this kind of failure (as we have also experienced in other performances) is that it breaks the tension of the performance context, allows you to make a joke about it, the audience laughs with you and it creates an overall more relaxed and informal setting. Maybe it was good that the performance started in this way?

After each piece we had a short discussion of what was happening and then played the piece again so that the audience could listen actively and better grasp how the interaction was working out. Apart from the very start, Artificialism and Klezempo went smoothly, and Side Winds with them.

Side Winds was perhaps the most “polished” piece in the set (at least for me) and I think that might be because it’s the one we managed to rehearse the most overall. It was also the most fun for me because I was actively “DJ-ing” LOERIC on stage and managed to get into a flow, rather than just checking whether LOERIC was behaving as it should have or not. During the first run-through I noticed I was focusing a bit too much on my own score and the system, without engaging much with Rosie and Jamie; the second time I tried to look at them more and took more liberties, since we had performed the piece once without issues and I could get to change how the system sounded more than it did itself in the other pieces. While we were not necessarily always looking at each other at the same time, visual feedback from their playing made me more engaged and changed my decisions DJ-ing LOERIC.

This was maybe the main reason we decided to have me on stage and not on the side; and, apart from Artificialism, in both Klezempo and Side Winds I had to start LOERIC after an intro, and I was coordinating visually with Rosie to start at the same time, which brought me in the performance more as a performer than a technician, even though most of the actual note-playing was done by LOERIC.

At end of the performance we opened the floor for some questions and wrapped up. It was a really good experience overall and, apart from the last minute score fixes, smooth overall, compared to what could have gone wrong. We had the system running nicely, a really good sound setup, a very beautiful hall and a fun and interesting performance. Stepping into a theater always steps up the game a little, and perhaps this is even more apparent in a classical recital hall with an incredibly expensive Steinway just on the side in the back. It was also the first time LOERIC was brought to an overall performance context that felt more professional, with proper sound setup, extensive planning, music composed specifically for the event and professional musicians.

This experience is the first milestone in the Traditionable Machines project and in my newly started PhD experience, and it will be vital to what we will create next.

Special thanks to Rosie and Jamie, for being great performance partners and making this happen, and all the patience during our long sessions; Steve, for enabling this whole experience and all the planning and support that came with that; Adrian, for all the support throughout the experience and for fixing all the logistics of the event, together with Hazel and Lynn; Glenn and Michael for the excellent sound setup and mixing, and Pat for filming during the day.
