// Illustrativa modellvärden för MVP, inte eldningsanvisningar.
// Kalibrera mot verkliga leveranser och eldstäder före lansering.
export const calculatorConfig = {
  weeksPerQuarter: 13,
  activeWeeks: [13, 6, 3],
  firesPerWeek: [0.5, 1.5, 4, 6],
  hoursPerFire: [1, 2, 3],
  kgPerHour: [1.5, 2.5, 1.3],
  uncertainty: 0.3,
  referenceBagKg: 10,
} as const;
export const questions = [
  { id: "fireplace", title: "Vad eldar du i?", hint: "En eldstad åt gången. Olika eldstäder använder olika mycket ved.", options: ["Braskamin", "Öppen spis", "Kakelugn", "Vedpanna", "Annat / vet inte"] },
  { id: "occupancy", title: "Hur mycket är du på plats?", hint: "Tänk på ett kvartal, ungefär 13 veckor. Vi räknar bara veckorna du använder huset.", options: ["Året runt – hela kvartalet", "Fritidshus – ungefär varannan vecka", "Fritidshus – cirka tre veckor per kvartal"] },
  { id: "frequency", title: "Hur ofta eldar du när du är där?", hint: "Utgå från veckorna du faktiskt använder huset.", options: ["Ungefär varannan vecka", "1–2 gånger i veckan", "3–5 gånger i veckan", "Nästan varje dag"] },
  { id: "duration", title: "Hur länge brukar brasan vara igång?", hint: "Räkna den tid du faktiskt eldar, inte eftervärmen.", options: ["Ungefär en timme", "Ungefär två timmar", "Ungefär tre timmar"] },
  { id: "purpose", title: "Vad använder du elden till?", hint: "Det hjälper oss att sätta uppskattningen i rätt sammanhang.", options: ["Mest för mys", "Extra värme", "En viktig del av uppvärmningen"] },
  { id: "season", title: "Vilket kvartal planerar du för?", hint: "Dina svar om hur ofta och länge du eldar ska gälla just den perioden.", options: ["Januari–mars", "April–juni", "Juli–september", "Oktober–december"] },
] as const;
export type Answers = Record<(typeof questions)[number]["id"], number>;
