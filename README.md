# musical-scale

a musical scale generator

```ts
import MusicalScale, { NOTES_LIBRARY } from "musical-scale";

const scale = new MusicalScale({ root: "C", mode: "ionian" });
```

```ts
import { MusicalScaleInterval } from "musical-scale";

const triad = MusicalScaleInterval.fromNotation("C", "maj");
```
