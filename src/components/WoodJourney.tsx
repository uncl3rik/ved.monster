"use client";
import { useState } from "react";
import { WoodCalculator } from "./WoodCalculator";
import { Plans } from "./Plans";
export function WoodJourney() {
  const [estimate, setEstimate] = useState<{kg: number; revision: number} | null>(null);
  return <><WoodCalculator onUseEstimate={kg => setEstimate(current => ({kg, revision: (current?.revision ?? 0) + 1}))}/><Plans key={estimate?.revision ?? 0} estimatedKg={estimate?.kg}/></>;
}
