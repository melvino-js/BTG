import { useState, useEffect } from "react";

export default function BGK() {
  const rules = ["batu", "gunting", "kertas"];

  const [player, setPlayer] = useState("");
  const [com, setCom] = useState("");
  const [result, setResult] = useState("");
  const [canPlay, setCanPlay] = useState(true);
  const [countdown, setCountdown] = useState(0); // buat countdown 3..2..1

  function Play(pilihan) {
    if (!canPlay) return;

    setCanPlay(false); // blok tombol dulu
    setCountdown(3);   // mulai countdown 3 detik
    setPlayer(pilihan);
    setCom("");        // kosongin komputer sementara
    setResult("");     // reset hasil
  }

  // useEffect untuk handle countdown dan setCom
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0 && player) {
      // countdown selesai → tentuin komputer & hasil
      const comindex = Math.floor(Math.random() * rules.length);
      const comChoice = rules[comindex];
      setCom(comChoice);

      if (player === comChoice) {
        setResult("Seri 😐");
      } else if (
        (player === rules[0] && comChoice === rules[1]) ||
        (player === rules[1] && comChoice === rules[2]) ||
        (player === rules[2] && comChoice === rules[0])
      ) {
        setResult("Menang 😎🔥");
      } else {
        setResult("Kalah 🥲");
      }
    }
  }, [countdown, player]);

  function Clear() {
    setPlayer("");
    setCom("");
    setResult("");
    setCanPlay(true);
    setCountdown(0);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-white w-80 text-center space-y-5">
        <h2 className="text-2xl font-bold mb-2">
          Batu Gunting Kertas <br />🪨✂️📄
        </h2>

        <p className="text-sm text-gray-200">Pilih salah satu ⬇️</p>

        <div className="flex justify-center gap-3 rounded-2xl p-2.5">
          <button
            disabled={!canPlay}
            onClick={() => Play("batu")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              canPlay ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Batu 🪨
          </button>

          <button
            disabled={!canPlay}
            onClick={() => Play("gunting")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              canPlay ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Gunting ✂️
          </button>

          <button
            disabled={!canPlay}
            onClick={() => Play("kertas")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              canPlay ? "bg-green-500 hover:bg-green-600" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Kertas 📄
          </button>
        </div>

        <p className="text-sm text-gray-200">Menang/Kalah ⬇️</p>

        {countdown > 0 && <p className="text-lg font-bold animate-pulse">{countdown}...</p>}

        <div className="bg-slate-500 rounded-2xl p-2">
          <div className="text-left space-y-1">
            <p>
              <span className="font-bold">Player👱:</span> {player || "-"}
            </p>
            <p>
              <span className="font-bold">Computer🤖:</span> {com || "-"}
            </p>
            <p className="text-lg font-bold">{result}</p>
          </div>
        </div>

        <button
          onClick={Clear}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
