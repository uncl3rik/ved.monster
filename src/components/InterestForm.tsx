"use client";
import { useState } from "react";
export function InterestForm({ subject }: { subject: string }) {
  const [submitted, setSubmitted] = useState(false);
  return <div className="interest-form">{submitted ? <div role="status">
    <h3>Ditt önskemål, som demo.</h3><p>{subject}</p><p>Inga uppgifter har skickats eller sparats, inget abonnemang har startats och ingen bokning har gjorts.</p><button className="text-link" onClick={() => setSubmitted(false)}>Ändra kontaktuppgifter ↗</button>
  </div> : <form onSubmit={event => {event.preventDefault(); setSubmitted(true);}}>
    <h3>Gå vidare med ditt val</h3><p>{subject}</p>
    <div className="form-fields"><label>Ditt namn<input name="name" autoComplete="name" required maxLength={100}/></label><label>Din e-post<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
    <p>Stockholm och Uppsala län med omnejd. Exakt adress, tillträde och leveranstid stäms av. Demo – uppgifterna skickas inte.</p><button className="button button-dark" type="submit">Testa intresseanmälan ↗</button>
  </form>}</div>;
}
