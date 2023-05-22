import './App.css'
import { useState } from 'react';
import { intervalToDuration } from 'date-fns'

function App() {
  const [file, setFile] = useState();
  const [times, setTimes] = useState([]);

  const dungeonEncounters = {
    // Grimrail Depot
    1715: 'Rocketspark and Borka',
    1732: 'Nitrogg Thundertower',
    1736: 'Skylord Tovra',
  
    // Iron Docks
    1748: 'Grimrail Enforcers',
    1749: "Fleshrender Nok'gar",
    1750: 'Oshir',
    1754: 'Skulloc, Son of Gruul',
  
    // Return to Karazhan: Lower
    1954: 'Maiden of Virtue',
    1957: 'Opera Hall',
    1960: 'Attumen the Huntsman',
    1961: 'Moroes',
  
    // Return to Karazhan: Upper
    1964: 'The Curator',
    1959: 'Mana Devourer',
    1965: 'Shade of Medivh',
    2017: "Viz'aduum the Watcher",
  
    // Mechagon: Workshop
    2257: 'Tussle Tonks',
    2258: 'K.U.-J.0.',
    2259: "Machinist's Garden",
    2260: 'King Mechagon',
  
    // Mechagon: Junkyard
    2290: 'King Gobbamak',
    2291: 'HK-8 Aerial Oppression Unit',
    2292: 'Gunker',
    2312: 'Trixie & Naeno',
  
    // Spires of Ascension
    2356: 'Ventunax',
    2357: 'Kin-Tara',
    2358: 'Oryphrion',
    2359: 'Devos, Paragon of Loyalty',
  
    // Sanguine Depths
    2360: 'Kryxis the Voracious',
    2361: 'Executor Tarvold',
    2362: 'Grand Proctor Beryllia',
    2363: 'General Kaal',
  
    // Theater of Pain
    2364: "Kul'tharok",
    2365: 'Gorechop',
    2366: 'Xav the Unfallen',
    2391: 'An Affront of Challengers',
    2404: 'Mordretha',
  
    // Halls of Atonement
    2380: 'Echelon',
    2381: 'Lord Chamberlain',
    2401: 'Halkias, the Sin-Stained Goliath',
    2403: 'High Adjudicator Aleez',
  
    // Plaguefall
    2382: 'Globgrog',
    2384: 'Doctor Ickus',
    2385: 'Domina Venomblade',
    2386: 'Stradama Margrave',
  
    // Necrotic Wake
    2387: 'Blightbone',
    2388: 'Amarth, The Harvester',
    2389: 'Surgeon Stitchflesh',
    2390: 'Nalthor the Rimebinder',
  
    // De Other Side
    2394: 'The Manastorms',
    2395: 'Hakkar, the Soulflayer',
    2396: "Mueh'zala",
    2400: "Dealer Xy'exa",
  
    // Mists of Tirna Scithe
    2397: 'Ingra Maloch',
    2392: 'Mistcaller',
    2393: "Tred'ova",
  
    // Tazavesh: So'leah's Gambit
    2419: "Timecap'n Hooktail",
    2426: 'Hylbrande',
    2442: "So'leah",
  
    // Tazavesh: Streets of Wonder
    2424: 'Mailroom Mayhem',
    2425: "Zo'phex the Sentinel",
    2441: 'The Grand Menagerie',
    2437: "So'azmi",
    2440: "Myza's Oasis",
  
    // Ruby Life Pools
    2609: 'Melidrussa Chillworn',
    2606: 'Kokia Blazehoof',
    2623: 'Kyrakka and Erhkard Stormvein',
  
    // The Nokhud Offensive
    2637: 'Granyth',
    2636: 'The Raging Tempest',
    2581: 'Teera and Maruuk',
    2580: 'Balakar Khan',
  
    // The Azure Vault
    2582: 'Leymor',
    2585: 'Azureblade',
    2583: 'Telash Greywing',
    2584: 'Umbrelskul',
  
    // Algeth'ar Acedemy
    2562: 'Vexamus',
    2563: 'Overgrown Ancient',
    2564: 'Crawth',
    2565: 'Echo of Doragosa',
  
    // Halls of Valor
    1805: 'Hymdall',
    1806: 'Hyrja',
    1807: 'Fenryr',
    1808: 'God-King Skovald',
    1809: 'Odyn',
  
    // Court of Stars
    1868: 'Patrol Captain Gerdo',
    1869: 'Talixae Flamewreath',
    1870: 'Advisor Melandrus',
  
    // Shadowmmon Burial Grounds
    1677: 'Sadana Bloodfury',
    1688: 'Nhallish',
    1679: 'Bonemaw',
    1682: "Ner'zhul",
  
    // Temple of the Jade Serpent
    1418: 'Wise Mari',
    1417: 'Lorewalker Stonestep',
    1416: 'Liu Flameheart',
    1439: 'Sha of Doubt',
  
    // Brackenhide Hollow
    2570: "Hackclaw's War-Band",
    2567: "Gutshot",
    2568: "Treemouth",
    2569: "Decatriarch Wratheye",
  
    // Halls of Infusion
    2615: "Watcher Irideus",
    2616: "Gulping Goliath",
    2617: "Khajin the Unyielding",
    2618: "Primal Tsunami",
  
    // Uldaman: Legacy of Tyr
    2555: "The Lost Dwarves",
    2556: "Bromach",
    2557: "Sentinel Talondras",
    2558: "Emberon",
    2559: "Chrono-Lord Deios",
    
    // Neltharus
    2610: "Magmatusk",
    2611: "Warlord Sargha",
    2612: "Forgemaster Gorek",
    2613: "Chargath, Bane of Scales",
  
    // Freehold
    2093: "Skycap'n Kragg",
    2094: "Council o' Captains",
    2095: "Ring of Booty",
    2096: "Harlan Sweete",
  
    // The Underrot
    2111: "Elder Leaxa",
    2118: "Cragmaw the Infested",
    2112: "Sporecaller Zancha",
    2123: "Unbound Abomination",
  
    // Neltharion's Lair
    1790: 'Rokmora',
    1791: 'Ularogg Cragshaper',
    1792: 'Naraxas',
    1793: 'Dargrul the Underking',
  
    // The Vortex Pinnacle
    1041: "Altairus",
    1042: "Asaad, Caliph of Zephyrs",
    1043: "Grand Vizier Ertan",
  
  };

  const convertSeconds = totalSeconds => {
    if (totalSeconds === 0) {
      return '00:00'
    }
  
    const seconds = totalSeconds
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
    const zeroPad = (num) => String(num).padStart(2, '0')
  
    const formatted = [
      duration.hours,
      duration.minutes,
      duration.seconds,
    ]
    .filter(Boolean)
    .map(zeroPad)
    .join(':')

    return formatted
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        setFile(JSON.parse(e.target.result));
      };
    }
  };

  const handleFileSubmit = () => {
    file.challengeModeTimeline.map(async item => {
      const name = dungeonEncounters[item.encounterId]
      if (item.hasOwnProperty('encounterId') && dungeonEncounters.hasOwnProperty(item.encounterId)) {
        setTimes(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${name}`}])
      } else {
        setTimes(prev => [...prev, {"description": `${convertSeconds(item.timestamp)} ${item.segmentType}`}])
      }
    })
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileSubmit}>Submit</button>
        
      </div>
      {times.length > 0 && (
        <div className='description'>
          {times.map(item => (
            <div>{item.description}</div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
