
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Fejlec() {
  return (
    <header className="bg-dark text-white py-4 shadow">
      <div className="container text-center">
        <h1 className="fw-bold mb-2">React alkalmazás</h1>
      </div>
    </header>
  )
}

function Calculator() {
  const [elsoSzam, setElsoSzam] = useState('')
  const [masodikSzam, setMasodikSzam] = useState('')
  const [muvelet, setMuvelet] = useState('+')
  const [eredmeny, setEredmeny] = useState<number | null>(null)
  const [hiba, setHiba] = useState('')

  function szamol() {
    const a = Number(elsoSzam)
    const b = Number(masodikSzam)

    if (
      elsoSzam.trim() === '' ||
      masodikSzam.trim() === '' ||
      !Number.isFinite(a) ||
      !Number.isFinite(b)
    ) {
      setHiba('Kérlek, adj meg két érvényes számot!')
      setEredmeny(null)
      return
    }

    if (muvelet === '/' && b === 0) {
      setHiba('Nullával nem lehet osztani!')
      setEredmeny(null)
      return
    }

    let eredmenySzam = 0

    switch (muvelet) {
      case '+':
        eredmenySzam = a + b
        break
      case '-':
        eredmenySzam = a - b
        break
      case '*':
        eredmenySzam = a * b
        break
      case '/':
        eredmenySzam = a / b
        break
    }

    setEredmeny(eredmenySzam)
    setHiba('')
  }

  return (
    <div className="card shadow border-0 h-100">
      <div className="card-body p-4 p-md-5">
        <h2 className="card-title text-center mb-4">
          Egyszerű számológép
        </h2>

        <div className="mb-3">
          <label htmlFor="elsoSzam" className="form-label">
            Első szám
          </label>
          <input
            id="elsoSzam"
            type="number"
            className="form-control"
            value={elsoSzam}
            onChange={(e) => setElsoSzam(e.target.value)}
            placeholder="Add meg az első számot"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="muvelet" className="form-label">
            Művelet
          </label>
          <select
            id="muvelet"
            className="form-select"
            value={muvelet}
            onChange={(e) => setMuvelet(e.target.value)}
          >
            <option value="+">Összeadás (+)</option>
            <option value="-">Kivonás (-)</option>
            <option value="*">Szorzás (×)</option>
            <option value="/">Osztás (÷)</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="masodikSzam" className="form-label">
            Második szám
          </label>
          <input
            id="masodikSzam"
            type="number"
            className="form-control"
            value={masodikSzam}
            onChange={(e) => setMasodikSzam(e.target.value)}
            placeholder="Add meg a második számot"
          />
        </div>

        <button
          className="btn btn-primary btn-lg w-100"
          onClick={szamol}
        >
          Számolás
        </button>

        {hiba !== '' && (
          <div className="alert alert-danger mt-4 mb-0" role="alert">
            {hiba}
          </div>
        )}

        {eredmeny !== null && hiba === '' && (
          <div className="alert alert-success mt-4 mb-0 text-center">
            <h3 className="h5">Eredmény</h3>
            <p className="fs-2 fw-bold mb-0">{eredmeny}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function GrafikusCalculator() {
  const [kijelzo, setKijelzo] = useState('0')
  const [elsoErtek, setElsoErtek] = useState<number | null>(null)
  const [muvelet, setMuvelet] = useState<string | null>(null)
  const [ujSzam, setUjSzam] = useState(false)
  const [hiba, setHiba] = useState('')

  function torles() {
    setKijelzo('0')
    setElsoErtek(null)
    setMuvelet(null)
    setUjSzam(false)
    setHiba('')
  }

  function szamGomb(szam: string) {
    setHiba('')

    if (ujSzam || kijelzo === '0' || kijelzo === 'Hiba') {
      setKijelzo(szam)
      setUjSzam(false)
    } else {
      setKijelzo(kijelzo + szam)
    }
  }

  function tizedes() {
    setHiba('')

    if (ujSzam || kijelzo === 'Hiba') {
      setKijelzo('0.')
      setUjSzam(false)
    } else if (!kijelzo.includes('.')) {
      setKijelzo(kijelzo + '.')
    }
  }

  function muveletValasztas(kivalasztott: string) {
    setHiba('')
    setElsoErtek(Number(kijelzo))
    setMuvelet(kivalasztott)
    setUjSzam(true)
  }

  function szamitas() {
    if (elsoErtek === null || muvelet === null) return

    const masodikErtek = Number(kijelzo)
    let eredmeny = 0

    switch (muvelet) {
      case '+':
        eredmeny = elsoErtek + masodikErtek
        break
      case '-':
        eredmeny = elsoErtek - masodikErtek
        break
      case '*':
        eredmeny = elsoErtek * masodikErtek
        break
      case '/':
        if (masodikErtek === 0) {
          setHiba('Nullával nem lehet osztani!')
          setKijelzo('Hiba')
          setElsoErtek(null)
          setMuvelet(null)
          setUjSzam(true)
          return
        }
        eredmeny = elsoErtek / masodikErtek
        break
    }

    setKijelzo(String(Number(eredmeny.toFixed(10))))
    setElsoErtek(null)
    setMuvelet(null)
    setUjSzam(true)
    setHiba('')
  }

  const gombok = [
    { szoveg: '7', tipus: 'szam' },
    { szoveg: '8', tipus: 'szam' },
    { szoveg: '9', tipus: 'szam' },
    { szoveg: '÷', tipus: 'muvelet', ertek: '/' },
    { szoveg: '4', tipus: 'szam' },
    { szoveg: '5', tipus: 'szam' },
    { szoveg: '6', tipus: 'szam' },
    { szoveg: '×', tipus: 'muvelet', ertek: '*' },
    { szoveg: '1', tipus: 'szam' },
    { szoveg: '2', tipus: 'szam' },
    { szoveg: '3', tipus: 'szam' },
    { szoveg: '−', tipus: 'muvelet', ertek: '-' },
    { szoveg: '0', tipus: 'szam' },
    { szoveg: '.', tipus: 'tizedes' },
    { szoveg: '=', tipus: 'egyenlo' },
    { szoveg: '+', tipus: 'muvelet', ertek: '+' },
  ]

  return (
    <div className="card shadow border-0 h-100">
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4">
          Grafikus számológép
        </h2>

        <div
          className="bg-dark text-white rounded p-3 mb-3 text-end"
          style={{ minHeight: '85px', overflowWrap: 'anywhere' }}
        >
          <div className="text-secondary small mb-1">
            {elsoErtek !== null && muvelet !== null
              ? `${elsoErtek} ${
                  muvelet === '*'
                    ? '×'
                    : muvelet === '/'
                      ? '÷'
                      : muvelet
                }`
              : ' '}
          </div>
          <div className="fs-2 fw-bold">{kijelzo}</div>
        </div>

        <button
          className="btn btn-danger w-100 mb-3"
          onClick={torles}
        >
          C – Törlés
        </button>

        <div className="row g-2">
          {gombok.map((gomb, index) => (
            <div className="col-3" key={index}>
              <button
                className={`btn w-100 py-3 ${
                  gomb.tipus === 'muvelet'
                    ? 'btn-warning'
                    : gomb.tipus === 'egyenlo'
                      ? 'btn-success'
                      : 'btn-outline-secondary'
                }`}
                onClick={() => {
                  if (gomb.tipus === 'szam') {
                    szamGomb(gomb.szoveg)
                  } else if (gomb.tipus === 'tizedes') {
                    tizedes()
                  } else if (
                    gomb.tipus === 'muvelet' &&
                    'ertek' in gomb
                  ) {
                    muveletValasztas(gomb.ertek)
                  } else if (gomb.tipus === 'egyenlo') {
                    szamitas()
                  }
                }}
              >
                {gomb.szoveg}
              </button>
            </div>
          ))}
        </div>

        {hiba !== '' && (
          <div className="alert alert-danger mt-3 mb-0">
            {hiba}
          </div>
        )}
      </div>
    </div>
  )
}

function Izzokapcsolo() {
  const [beKapcsolva, setBeKapcsolva] = useState(false)

  const kikapcsoltKep =
    'https://www.w3schools.com/js/pic_bulboff.gif'
  const bekapcsoltKep =
    'https://www.w3schools.com/js/pic_bulbon.gif'

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body text-center p-4">
        <h2 className="card-title mb-3">Izzókapcsoló</h2>

        <p>
          Állapot:{' '}
          <span
            className={`badge ${
              beKapcsolva ? 'text-bg-success' : 'text-bg-secondary'
            }`}
          >
            {beKapcsolva ? 'Be' : 'Ki'}
          </span>
        </p>

        <img
          src={beKapcsolva ? bekapcsoltKep : kikapcsoltKep}
          alt="Izzó"
          onClick={() => setBeKapcsolva(!beKapcsolva)}
          style={{ cursor: 'pointer', maxWidth: '100%' }}
        />

        <p className="text-secondary mt-3 mb-0">
          Kattints az izzóra a kapcsoláshoz!
        </p>
      </div>
    </div>
  )
}

function ColorChanger() {
  const [hatterSzin, setHatterSzin] = useState('#ffffff')

  function ujSzin() {
    const piros = Math.floor(Math.random() * 256)
    const zold = Math.floor(Math.random() * 256)
    const kek = Math.floor(Math.random() * 256)

    const szin =
      '#' +
      piros.toString(16).padStart(2, '0') +
      zold.toString(16).padStart(2, '0') +
      kek.toString(16).padStart(2, '0')

    setHatterSzin(szin)
    document.body.style.backgroundColor = szin
  }

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body text-center p-4">
        <h2 className="card-title mb-3">Color Changer</h2>

        <div
          className="rounded border mb-3 mx-auto"
          style={{
            backgroundColor: hatterSzin,
            height: '100px',
            maxWidth: '300px',
          }}
        />

        <p>
          Aktuális szín: <strong>{hatterSzin}</strong>
        </p>

        <button className="btn btn-primary" onClick={ujSzin}>
          Új szín generálása
        </button>
      </div>
    </div>
  )
}

function SzovegKezeloFuggvenyek() {
  const [szoveg, setSzoveg] = useState('')
  const [eredmeny, setEredmeny] = useState('')

  function visszaallit() {
    setSzoveg('')
    setEredmeny('')
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="card-title mb-4">
          Feladat szövegfüggvényekkel
        </h2>

        <label htmlFor="szoveg" className="form-label">
          Írj be egy szöveget!
        </label>

        <input
          id="szoveg"
          type="text"
          className="form-control mb-3"
          value={szoveg}
          onChange={(e) => {
            setSzoveg(e.target.value)
            setEredmeny(e.target.value)
          }}
          placeholder="Például: Hello React!"
        />

        <p>
          <strong>Aktuális szöveg:</strong>{' '}
          {szoveg || 'Nincs megadott szöveg.'}
        </p>

        <p className="text-secondary">
          {szoveg.length === 0
            ? 'Még nem írt be egyetlen karaktert sem.'
            : `A beírt karakterek száma: ${szoveg.length}.`}
        </p>

        <div className="bg-light rounded p-3 mb-3">
          <strong>Eredmény:</strong>
          <p className="mb-0 text-break">
            {eredmeny || 'Itt jelenik meg az eredmény.'}
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setEredmeny(szoveg.toUpperCase())}
          >
            Nagybetűs
          </button>

          <button
            className="btn btn-success"
            onClick={() => setEredmeny(szoveg.toLowerCase())}
          >
            Kisbetűs
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={visszaallit}
          >
            Visszaállít
          </button>
        </div>
      </div>
    </div>
  )
}

function Lablec() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-4">
      <div className="container">
        <hr className="border-secondary" />
        <p className="mb-1">Borbára Kristóf 13.E</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-vh-100">
      <Fejlec />

      <main className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <Calculator />
          </div>

          <div className="col-12 col-lg-6">
            <GrafikusCalculator />
          </div>
        </div>
      </main>

      <main className="container pb-5">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <Izzokapcsolo />
          </div>

          <div className="col-12 col-lg-6">
            <ColorChanger />
          </div>

          <div className="col-12">
            <SzovegKezeloFuggvenyek />
          </div>
        </div>
      </main>

      <Lablec />
    </div>
  )
}

export default App
