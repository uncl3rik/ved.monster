import { calculatorConfig as config, questions, type Answers } from "../data/calculator.ts";

export function calculateWood(answers: Answers) {
  for (const question of questions) {
    const value = answers[question.id];
    if (!Number.isInteger(value) || value < 0 || value >= question.options.length) {
      throw new Error("Besvara alla frågor innan beräkningen görs.");
    }
  }
  // Vedpanna/okänd eldstad kräver en annan modell. Visa inte falsk precision.
  if (answers.fireplace > 2) return null;
  const weeks = config.activeWeeks[answers.occupancy];
  const hours = weeks * config.firesPerWeek[answers.frequency] * config.hoursPerFire[answers.duration];
  const kg = hours * config.kgPerHour[answers.fireplace];
  const minKg = Math.max(5, Math.floor(kg * (1 - config.uncertainty) / 5) * 5);
  const maxKg = Math.max(minKg + 5, Math.ceil(kg * (1 + config.uncertainty) / 5) * 5);
  return { minKg, maxKg, minBags: Math.ceil(minKg / config.referenceBagKg), maxBags: Math.ceil(maxKg / config.referenceBagKg), weeks, hours: Math.round(hours) };
}
