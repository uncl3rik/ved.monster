import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL("https://ved.monster"), title: "Ved.Monster – Din eldstad är hungrig.", description: "Vedleverans och eldstadskontroll vid samma besök i Stockholm och Uppsala län med omnejd. Beräkna vedbehovet, välj kvartalsabonnemang med Eldstart eller engångsved + kontroll." };
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) { return <html lang="sv"><body>{children}</body></html>; }
