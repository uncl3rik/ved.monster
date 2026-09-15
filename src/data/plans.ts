// PRELIMINÄRA DEMOVÄRDEN. SEK inklusive moms och en vedleverans.
// Mängden anges i kg för att matcha kalkylatorn utan antagen säckstorlek.
export const service = {
  minKg: 60, maxKg: 2000, stepKg: 10,
  minimumPrice: 897, pricePerExtraStep: 90,
  inspectionPrice: 690, fireStartPrice: 390,
} as const;
export function normalizeQuantity(kg: number) {
  if (!Number.isFinite(kg)) return service.minKg;
  return Math.min(service.maxKg, Math.max(service.minKg, Math.ceil(kg / service.stepKg) * service.stepKg));
}
export function orderPrice(kg: number, inspection: boolean, fireStart: boolean) {
  const wood = service.minimumPrice + (normalizeQuantity(kg) - service.minKg) / service.stepKg * service.pricePerExtraStep;
  return { wood, total: wood + (inspection ? service.inspectionPrice : 0) + (fireStart ? service.fireStartPrice : 0) };
}
