"use client";
import { useRef, useState } from "react";
import { questions, calculatorConfig, type Answers } from "@/data/calculator";
import { calculateWood } from "@/lib/wood-calculator";

const initial: Answers = { fireplace: -1, occupancy: -1, frequency: -1, duration: -1, purpose: -1, season: -1 };
export function WoodCalculator({ onUseEstimate }: { onUseEstimate: (kg: number) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const complete = step === questions.length;
  const question = questions[step];
  const result = complete ? calculateWood(answers) : null;
  function move(next: number) {
    setError(""); setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return <section id="vedquiz" className="quiz-section wrap">
    <div className="quiz-intro"><p className="eyebrow">VEDKALKYLATORN</p><h2>Hur mycket ved<br/>går det åt?</h2><p>Sex snabba frågor om huset och brasorna. Få ett ungefärligt vedbehov för ett kvartal.</p><div className="quiz-doodle" aria-hidden="true">✳</div><p className="small-label">DIN FÖRBRUKNING. DITT VAL AV VED.</p></div>
    <div className="quiz-card">
      <div className="quiz-meta"><span>{complete ? "DITT UNGEFÄRLIGA VEDBEHOV" : "VEDKALKYLATOR"}</span><span>{complete ? "Klart!" : `${step + 1} av ${questions.length}`}</span></div>
      <div className="progress-track" role="progressbar" aria-label="Kalkylatorns framsteg" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={Math.min(step + 1, questions.length)}><span style={{width:`${Math.min(step + 1, questions.length) / questions.length * 100}%`}}/></div>
      {complete ? <div className="quiz-result">
        <h3 ref={heading} tabIndex={-1}>{result ? `${result.minKg}–${result.maxKg} kg ved` : "Här behöver vi räkna tillsammans."}</h3>
        <p>{questions[5].options[answers.season]} · ett kvartal</p>
        {result ? <><p>Ungefär {result.minBags}–{result.maxBags} säckar om varje säck innehåller {calculatorConfig.referenceBagKg} kg. Det är ett räkneexempel, inte vår fastställda säckstorlek.</p><p className="preference">Räknat på {result.weeks} veckor i huset och cirka {result.hours} timmars eldning. Ditt användningssätt: {questions[4].options[answers.purpose].toLowerCase()}.</p></> : <p>För vedpanna eller okänd eldstad räcker inte den enkla modellen. Berätta om huset och anläggningen i samband med din vedbeställning, så stämmer vi av behovet.</p>}
        {answers.purpose === 2 && <p className="notice">Uppskattningen gäller dina angivna brasor, inte husets totala uppvärmningsbehov.</p>}
        <details className="calculation-assumptions"><summary>Så räknar vi</summary><p>Veckor på plats × brasor per vecka × timmar per brasa × antagen vedåtgång. Modellvärdena är preliminära: 1,5 kg/timme för braskamin, 2,5 för öppen spis och 1,3 för kakelugn, med ett spann på ±30 % och avrundning till 5 kg. Kvartalet anger perioden; ingen extra säsongsfaktor läggs på dina egna eldningsvanor. Användningssättet påverkar förklaringen, inte mängden. Följ alltid eldstadens anvisningar – modellen är ingen eldningsinstruktion.</p></details>
        <p className="demo-note">En grov demo, inte en uppmätt förbrukning. Träslag, fukthalt och din eldstad påverkar åtgången. Inget abonnemang väljs åt dig.</p>
        <a className="button button-orange" href="#abonnemang" onClick={() => {if (result) onUseEstimate(result.maxKg);}}>{result ? "Använd mängden och se pris" : "Välj ved och hjälp"} ↗</a>
        <div className="result-actions"><button className="text-link" onClick={() => move(questions.length - 1)}>← Ändra svar</button><button className="text-link" onClick={() => {setAnswers(initial); move(0);}}>Börja om</button></div>
      </div> : <form onSubmit={event => {event.preventDefault(); if (answers[question.id] < 0) {setError("Välj ett alternativ för att fortsätta."); return;} move(step + 1);}}>
        <h3 ref={heading} tabIndex={-1}>{question.title}</h3><p>{question.hint}</p>
        <fieldset className="quiz-options"><legend className="sr-only">{question.title}</legend>{question.options.map((option, index) => <label key={option} className={`quiz-option ${answers[question.id] === index ? "selected" : ""}`}><input type="radio" name={question.id} checked={answers[question.id] === index} onChange={() => {setAnswers({...answers, [question.id]:index}); setError("");}}/><span>{option}</span></label>)}</fieldset>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="quiz-navigation">{step > 0 ? <button className="text-link" type="button" onClick={() => move(step - 1)}>← Tillbaka</button> : <span className="small-label">ETT KVARTAL I TAGET</span>}<button className="button button-dark" type="submit">{step === questions.length - 1 ? "Räkna ut vedbehov" : "Nästa fråga"} →</button></div>
      </form>}
    </div>
  </section>;
}
