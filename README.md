# Ved.Monster

Next.js App Router, TypeScript och Tailwind CSS. Demo för kvartalsabonnemang på ved, engångsved + kontroll och Eldstart för hem och fritidshus.

## Kör lokalt

Node.js 22.18+ och pnpm. Kör `pnpm install`, sedan `pnpm dev` och öppna http://localhost:3000.

Kontroller: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`. Produktionsserver: `pnpm start`. Vercel kan importera projektet som Next.js; inga miljövariabler krävs i demon. Domänen är inte publicerad genom implementationen.

## Struktur

- `src/app`: startsida, metadata, favicon och design tokens.
- `src/components/WoodCalculator.tsx`: sex frågor och mängdresultat. Inga abonnemang rekommenderas.
- `src/data/calculator.ts`: frågor, modellvärden och svarstyper.
- `src/lib/wood-calculator.ts`: ren beräkningsfunktion.
- `src/data/plans.ts`: en tjänst med justerbar mängd. Preliminärt minimum 60 kg, steg 10 kg, max 2000 kg. 897 SEK för minimum, +90 SEK per extra 10 kg. Kontroll +690 SEK och Eldstart +390 SEK. Demopriser inkluderar moms och en vedleverans. Alla tillval räknas in i totalen. Kvartalspris för abonnemang, engångspris för kombopaketet.
- `src/components/WoodJourney.tsx`: håller kalkylatorns överförda mängd i minnet; mängden förs över först när kunden klickar, och kan sedan justeras. Övre uppskattningen avrundas uppåt och minimum kommuniceras tydligt.
- `src/components/Plans.tsx`: ett vedabonnemang, mängdval och kontroll av eldstad och skorsten samt engångskombo.
- `src/components/InterestForm.tsx`: kontaktformulär och demobekräftelse med vald mängd, tjänster och total.
- `src/components/Extras.tsx`: säsongsförberedelser samt behovsbaserad rådgivning om slitdelar och nya kaminer.
- `src/data/faq.ts`: frågor och svar.

## Vedkalkylator

Sex frågor: eldstad, närvaro i huset, frekvens under veckor på plats, timmar per brasa, syfte och kvartal. Kilo = aktiva veckor × brasor per vecka × timmar per brasa × antagen kg/timme. Resultat: ±30 %, avrundat utåt till 5 kg, samt exempelsäckar om 10 kg. Exempelsäcken är inte en fastställd produktstorlek. Syfte används som sammanhang; kvartalet väljer period utan extra multiplikator för att inte dubbelräkna användarens vanor. Vedpanna/okänd eldstad ger ingen siffra utan manuell avstämning. Modellvärden är illustrativa och behöver kalibreras mot verklig förbrukning före lansering. Ingen uppvärmningsdimensionering eller eldningsinstruktion.

## Erbjudande och demo

Stockholm och Uppsala län med omnejd; adresser och tider stäms av manuellt. Eldstart betyder att förbereda ved och eldstad inför säsongen med omfattning och tillträde enligt överenskommelse. Ingen eld lämnas obevakad. Kontroll ersätter inte sotning eller brandskyddskontroll. Kontroll kan också leda till separat förslag om slitdelar eller ny kamin, enligt kundens behov.

Alla val ligger enbart i React-minnet. Inga uppgifter skickas, sparas eller debiteras. Kontroll ingår i engångskombon men är ett tillval på abonnemang. Eldstart är tillval på båda. Extra stort har ersatts av fritt mängdval över minimum. Kontrollens omfattning och slutliga villkor är preliminära; totaler beräknas från tydligt märkta demopriser. Vedvalet anges i kg. Kvartalspris innebär inte fastställd bindningstid.

Nästa steg: validera kalkylmodellen, fastställ erbjudandet, och koppla servervaliderade intresseanmälningar till Supabase. Därefter Stripe med serverstyrda priser och produkt-ID:n; lita aldrig på klientpriser vid betalning.
