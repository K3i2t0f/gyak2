
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
