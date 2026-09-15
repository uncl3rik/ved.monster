export function Monster({ small = false }: {
    small?: boolean;
}) {
    return <svg className={small ? "monster-icon" : "monster-art"} viewBox="0 0 560 520" fill="none" aria-hidden="true">
    <defs><linearGradient id={small ? "mini" : "body"} x1="180" y1="100" x2="440" y2="460" gradientUnits="userSpaceOnUse"><stop stopColor="#fa8b4c"/><stop offset="1" stopColor="#db4d29"/></linearGradient></defs>
    {!small && <><circle cx="295" cy="254" r="219" fill="#e9dfcb"/><circle cx="295" cy="254" r="185" stroke="#d8ccb4" strokeDasharray="3 9"/><ellipse cx="285" cy="465" rx="196" ry="20" fill="#d0c2a8" opacity=".5"/><path d="m82 122 8-19m-32 39-19-3m430-15 13-16m15 49 24 1" stroke="#9b6740" strokeWidth="3" strokeLinecap="round"/></>}
    <path d="M153 240c-11-49-4-104 25-142l67 56c28-8 66-9 99 0l61-65c28 43 37 95 26 144 33 50 39 115 13 176-9 24-22 47-44 54-18 6-33-11-38-34H234c-6 23-20 41-39 35-28-9-47-62-51-87-36 5-66-20-67-41-1-18 13-25 27-22l35 8c0-29 5-56 14-82Z" fill={`url(#${small ? "mini" : "body"})`}/>
    <ellipse cx="258" cy="233" rx="29" ry="38" fill="#fff8e7"/><ellipse cx="334" cy="230" rx="29" ry="38" fill="#fff8e7"/><ellipse cx="267" cy="240" rx="11" ry="17" fill="#292b24"/><ellipse cx="342" cy="237" rx="11" ry="17" fill="#292b24"/>
    <path d="M268 287q28 31 57-3" stroke="#612f22" strokeWidth="7" strokeLinecap="round"/><path d="m297 298 12-1-4 13Z" fill="#fff8e7"/>
    <g transform="rotate(-12 294 362)"><rect x="157" y="335" width="245" height="63" rx="31" fill="#694936"/><ellipse cx="387" cy="367" rx="25" ry="31" fill="#c6935b"/><ellipse cx="387" cy="367" rx="14" ry="20" stroke="#966237" strokeWidth="2"/><path d="M185 350h125m-112 29h143" stroke="#926646" strokeWidth="3" strokeLinecap="round"/></g>
    <path d="M406 309c-17-13-34-4-36 12-2 13 8 30 23 36 24 10 39-25 13-48Z" fill="#ef713a"/>
    {!small && <><path d="M76 429c-12-25 8-34 4-54 24 21 39 45 14 61" fill="#d87542"/><path d="M459 420c20-1 30-12 31-33-20 1-31 11-31 33Zm-8 18c-17-6-25-18-22-35 17 6 25 18 22 35Z" fill="#697151"/></>}
  </svg>;
}
