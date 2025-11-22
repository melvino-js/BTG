import { useState } from "react"

export default function BGK() {
  const rules = ['batu', 'gunting', 'kertas']

  const [player, setPlayer] = useState('')
  const [com, setCom] = useState('')
  const [result, setResult] = useState('')
  const [canPlay, setCanPlay] = useState(true)

  function Play(pilihan) {
    if (!canPlay) return  // blokir kalau belum di-clear

    const pilihanCom = Math.floor(Math.random() * rules.length)

    setPlayer(pilihan)
    setCom(rules[pilihanCom])

    if (pilihan === rules[pilihanCom]) {
      setResult("Seri 😐")
    } else if (
      (pilihan === 'batu' && rules[pilihanCom] === 'gunting') ||
      (pilihan === 'gunting' && rules[pilihanCom] === 'kertas') ||
      (pilihan === 'kertas' && rules[pilihanCom] === 'batu')
    ) {
      setResult("Menang 😎🔥")
    } else {
      setResult("Kalah 🥲")
    }

    setCanPlay(false)
  }

  function Clear() {
    setPlayer('')
    setCom('')
    setResult('')
    setCanPlay(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-white w-80 text-center space-y-5">

        <h2 className="text-2xl font-bold">Batu Gunting Kertas ✂️</h2>

        <div className="flex justify-center gap-3">
          <button 
            disabled={!canPlay}
            onClick={() => Play('batu')}
            className={`px-4 py-2 rounded-lg font-semibold 
              ${canPlay ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 cursor-not-allowed'}`
            }>
            Batu
          </button>

          <button 
            disabled={!canPlay}
            onClick={() => Play('gunting')}
            className={`px-4 py-2 rounded-lg font-semibold 
              ${canPlay ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 cursor-not-allowed'}`
            }>
            Gunting
          </button>

          <button 
            disabled={!canPlay}
            onClick={() => Play('kertas')}
            className={`px-4 py-2 rounded-lg font-semibold 
              ${canPlay ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 cursor-not-allowed'}`
            }>
            Kertas
          </button>
        </div>

        <div className="text-left space-y-1">
          <p><span className="font-bold">Player:</span> {player}</p>
          <p><span className="font-bold">Computer:</span> {com}</p>
          <p className="text-lg font-bold">{result}</p>
        </div>

        <button 
          onClick={Clear}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
          Clear
        </button>

      </div>
    </div>
  )
}
