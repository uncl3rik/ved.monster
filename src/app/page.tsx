import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WoodJourney } from "@/components/WoodJourney";

import { Extras } from "@/components/Extras";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
export default function Home() { return <><a className="skip-link" href="#main">Hoppa till innehållet</a><Header /><main id="main"><Hero /><div className="promise-strip"><span>✳ TORR VED. VARM VARDAG.</span><span>↗ VED + KONTROLL VID SAMMA BESÖK</span><span>♡ ETT MONSTER PÅ DIN SIDA</span></div><HowItWorks /><WoodJourney /><Extras /><FAQ /><section className="closing-banner wrap"><div><p className="eyebrow">REDO FÖR EN VARMARE VARDAG?</p><h2>Släpp vedbekymret.<br />Mata eldstaden.</h2></div><a href="#vedquiz" className="button button-dark">Räkna ut mitt vedbehov ↗</a></section></main><Footer /></>; }
