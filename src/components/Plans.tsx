"use client";
import { useState } from "react";
import { service, normalizeQuantity, orderPrice } from "@/data/plans";
import { InterestForm } from "./InterestForm";
const money = (value: number) => value.toLocaleString("sv-SE");
export function Plans({ estimatedKg }: { estimatedKg?: number }) {
  const [kg, setKg] = useState(normalizeQuantity(estimatedKg ?? service.minKg));
  const [inspection, setInspection] = useState(false);
  const [fireStart, setFireStart] = useState(false);
  const [open, setOpen] = useState<"subscription" | "once" | null>(null);
  const price = orderPrice(kg, inspection, fireStart);
  const oncePrice = orderPrice(kg, true, fireStart);
  const summary = (once: boolean) => `${once ? "Engångsved + kontroll" : "Ved.Monster"}: ${kg} kg ${once ? "vid ett besök" : "per kvartal"}${inspection || once ? ", kontroll av eldstad och skorsten" : ""}${fireStart ? ", Eldstart" : ""}. Demototal ${money(once ? oncePrice.total : price.total)} kr ${once ? "för besöket" : "per kvartal"}, inklusive moms och vedleverans.`;
  return <section id="abonnemang" className="plans-section wrap">
    <div className="section-heading"><div><p className="eyebrow">EN TJÄNST. DIN MÄNGD VED.</p><h2>Ved.Monster, lagom för dig.</h2></div><p>Ved per kvartal. Kontroll av eldstad och skorsten när vi ändå är där.</p></div>
    <div className="plans service-layout"><article className="plan-card popular">
      <p className="eyebrow">VEDABONNEMANG</p><h3>Ved hemma. Kvartal för kvartal.</h3><p>Välj mängd och hjälp inför säsongen.</p>
      {estimatedKg !== undefined && <p className="estimate-note">Kalkylatorns övre uppskattning: {estimatedKg} kg. {estimatedKg < service.minKg ? `Vår minsta leverans är ${service.minKg} kg, så mängden har höjts till minimum.` : "Avrundat uppåt till närmaste 10 kg. Du kan justera mängden nedan."}</p>}
      <label className="quantity-label" htmlFor="wood-quantity">Ved per kvartal</label>
      <div className="quantity-control"><button type="button" aria-label="Minska vedmängden" disabled={kg <= service.minKg} onClick={() => {setKg(kg - service.stepKg); setOpen(null);}}>−</button><output id="wood-quantity">{kg} kg</output><button type="button" aria-label="Öka vedmängden" disabled={kg >= service.maxKg} onClick={() => {setKg(kg + service.stepKg); setOpen(null);}}>+</button></div>
      <input className="quantity-slider" type="range" aria-label="Vedmängd i kilo" min={service.minKg} max={service.maxKg} step={service.stepKg} value={kg} onChange={event => {setKg(Number(event.target.value)); setOpen(null);}}/>
      <p>Minimum {service.minKg} kg. Justera med {service.stepKg} kg åt gången.</p>
      <label className="addon-option"><input type="checkbox" checked={inspection} onChange={event => {setInspection(event.target.checked); setOpen(null);}}/><span>Kontroll av eldstad och skorsten<br/>+ {service.inspectionPrice} kr per kvartal · vid ett leveransbesök</span></label>
      <label className="addon-option"><input type="checkbox" checked={fireStart} onChange={event => {setFireStart(event.target.checked); setOpen(null);}}/><span>Eldstart inför säsongen<br/>+ {service.fireStartPrice} kr per kvartal</span></label>
      <div className="price" aria-live="polite">{money(price.total)}<span> kr / kvartal</span></div><p>Totalt för vald mängd och tillval. Inklusive moms och en vedleverans per kvartal.</p><p className="demo-note">Demopris. Ved: {money(price.wood)} kr. Kontroll och Eldstart ingår bara om du väljer dem. Tidpunkt och omfattning stäms av inför varje kvartal.</p>
      <button className="button button-orange" onClick={() => setOpen(open === "subscription" ? null : "subscription")} aria-expanded={open === "subscription"}>{open === "subscription" ? "Stäng formuläret" : "Välj mitt vedabonnemang"} ↗</button>
      {open === "subscription" && <InterestForm subject={summary(false)}/>}
    </article><div className="offer-column">
      <article className="inspection-card"><p className="eyebrow">VED OCH KOLL. SAMMA BESÖK.</p><h3>Eldstaden och skorstenen får också omtanke.</h3><p>Välj till en genomgång när vi levererar veden. Ett besök för både vedförrådet och det du eldar i.</p><ul><li>Vi går igenom synliga, åtkomliga delar av eldstad, anslutning och skorsten.</li><li>Du får återkoppling om det vi ser och vad som behöver följas upp.</li><li>Behövs slitdelar, vidare undersökning eller en ny kamin? Du får ett separat förslag.</li></ul><p className="demo-note">Preliminärt innehåll i demon. Åtkomst och omfattning bekräftas före besöket. Detta är inte sotning, brandskyddskontroll, täthetsprovning eller ett godkännande att elda.</p></article>
      <article className="one-time-offer" id="ved-och-kontroll"><p className="eyebrow">SAMMA HJÄLP. EN GÅNG.</p><h3>Engångsved + kontroll</h3><p>{kg} kg ved med kontroll av eldstad och skorsten vid samma besök. Utan abonnemang.</p><p>Mängden följer ditt val i vedkortet. {fireStart ? "Eldstart är också valt." : "Eldstart kan väljas till i vedkortet."}</p><p className="offer-price" aria-live="polite">{money(oncePrice.total)} kr totalt · demopris</p><p>Inklusive moms, vedleverans och kontroll.</p><button className="button button-dark" onClick={() => setOpen(open === "once" ? null : "once")} aria-expanded={open === "once"}>{open === "once" ? "Stäng engångspaket" : "Välj ved + kontroll"} ↗</button>{open === "once" && <InterestForm subject={summary(true)}/>}</article>
    </div></div>
    <p className="demo-note">Minimum, vedpris, tilläggspriser och tjänsteinnehåll är preliminära demovärden. Ingen beställning görs. Kvartalsbetalning anger inte bindningstid; slutliga villkor fastställs inför lansering.</p>
  </section>;
}
