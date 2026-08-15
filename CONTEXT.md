# Class Odontologia

Premium institutional landing page for Class Odontologia (Foz do Iguaçu). This glossary is the ubiquitous language for the page: identity, cinematic beats, and sections.

## Identity

**Mark**:
The golden Class emblem (oval/lens), independent of letterforms.
_Avoid_: Logo, wordmark, lockup

**Wordmark**:
The Hero identity lockup: Mark centered above CLASS. ODONTOLOGIA is a centered mono signature under CLASS, never wider than CLASS.
_Avoid_: Logo, heading, brand block

## Hero beats

**Decade numeral**:
The giant “3” in the decade beat. It is a CSS-extruded glyph with Z thickness so the form stays visible through a Y rotation. Runtime WebGL is a fallback only if extrusion fails visually.
_Avoid_: 3D model, Three.js element (unless that fallback is accepted), logo

**Decade label**:
The word “décadas”, placed below the Decade numeral with a clear gap. It does not overlay the numeral.
_Avoid_: Caption on the 3, overlay

**Hero copy line**:
One sequential sentence in the Hero copy slot after the decade beat. Only one line occupies the slot at a time; the outgoing line finishes leaving before the next enters. The last line also leaves.
_Avoid_: Word, overlapping text, tagline (the tagline is the full sentence for assistive tech / reduced motion)

## Sections

**Manifesto**:
The positioning section (eyebrow “A clínica”): brand narrative on a light paper field after the dark Hero. Specialties returns to the dark field. It is not the address and not the map.
_Avoid_: Clinic section, Location, facility, white flash, Hero background

**Smile cinematic**:
The Manifesto’s pre-rendered smile video. It plays once when the Manifesto enters the viewport (no scroll scrub). On desktop the copy sits on paper and the video sits in a dark well beside it; on small screens copy stacks above the well. Until the video exists, the well shows a still poster.
_Avoid_: Tooth cinematic, Golden Logo, Hero video

**Specialties**:
The clinical-services list. Out of scope for this polish pass.
_Avoid_: Specialists

**Specialist card**:
A portrait-forward specialist presentation: photo, specialty, and name are the emphasis; credentials and bio recede. Cards are larger, centered in a 2×2 grid. The section heading stays left-aligned.
_Avoid_: Author card, team tile

**Location**:
The closing field’s place: Map art, address, and “Abrir no mapa”. Combined with conversion in one section after Specialists.
_Avoid_: Clinic section, separate Avaliação block, footer address as the primary locator, Google Maps embed

**Map art**:
Owner-supplied site image of the clinic’s place (`public/assets/clinic/map.webp`): dark field, gold streets, Class pin. Treated as art direction. The image and the button open Google Maps. Not a third-party map widget.
_Avoid_: Embed, iframe, Google Maps widget, card frame

**Appointment CTA**:
The conversion column of the closing field (“Agende sua avaliação”). The phone number lives inside the WhatsApp button. Not a separate section.
_Avoid_: Evaluation form, contact strip (that is the Footer)

**Footer**:
The compact contact strip: WhatsApp, a short address, hours, social, and copyright at the bottom-right. It is not the primary locator — Location is.
_Avoid_: Location, Appointment CTA
