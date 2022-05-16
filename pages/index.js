import Head from "next/head";
import { useState, useEffect } from "react";

const cg = [
  "Apakah anda sering mengalami buang air besar (lebih dari 2 kali)?",
  "Apakah anda mengalami berak encer?",
  "Apakah anda mengalami berak berdarah?",
  "Apakah anda merasa lesu dan tidak bergairah?",
  "Apakah anda tidak selera makan?",
  "Apakah anda merasa mual dan sering muntah (lebih dari satu kali)?",
  "Apakah anda merasa sakit di bagian perut?",
  "Apakah tekanan darah anda rendah?",
  "Apakah anda merasa pusing?",
  "Apakah anda mengalami pingsan?",
  "Apakah suhu badan anda tinggi?",
  "Apakah anda mengalami luka dibagian tertentu?",
  "Apakah anda tida dapat menggerakkan anggota badan tertentu?",
  "Apakah anda pernah memakan sesuatu?",
  "Apakah anda memakan daging?",
  "Apakah anda memakan jamur?",
  "Apakah anda memakan makanan kaleng?",
  "Apakah anda membeli susu?",
  "Apakah anda meminum susu?",
];

const cgk = [
  { title: "Mencret", g: [0, 1, 3, 4] },
  { title: "Muntah", g: [3, 4, 5] },
  { title: "Sakit Perut", g: [3, 6] },
  { title: "Darah Rendah", g: [3, 7, 8] },
  { title: "Koma", g: [7, 9] },
  { title: "Demam", g: [3, 4, 8, 10] },
  { title: "Septicaemia", g: [3, 7, 10, 11] },
  { title: "Lumpuh", g: [3, 12] },
  { title: "Mencret berdarah", g: [0, 1, 2, 3, 4] },
  { title: "Makan daging", g: [13, 14] },
  { title: "Makan jamur", g: [13, 15] },
  { title: "Makan makanan kaleng", g: [13, 16] },
  { title: "Minum susu", g: [17, 18] },
];

const cs = [
  {
    title: "Keracunan Staphylococcus",
    gk: [0, 1, 2, 3, 9],
  },
  {
    title: "Keracunan Jamur Beracun",
    gk: [0, 1, 2, 4, 10],
  },
  {
    title: "Keracunan Salmonellae",
    gk: [0, 1, 2, 5, 6, 9],
  },
  { title: "Keracunan Clostridium Botulinum", gk: [1, 7, 10] },
  { title: "Keracunan Campylobacter", gk: [8, 2, 5, 12] },
];

export default function Home() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState([]);
  const [th, setTh] = useState(0);

  const handleClick = (idx) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((x) => x !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  useEffect(() => {
    setResult(hitungGK());
  }, [selected]);

  const hitungGK = () => {
    var persen;
    var value = [];
    for (var i = 0; i < cgk.length; i++) {
      persen = 0;
      for (var j = 0; j < cgk[i].g.length; j++) {
        if (selected.includes(cgk[i].g[j])) {
          persen = persen + 100 / cgk[i].g.length;
        }
      }
      value.push(persen);
    }
    return hitungS(value);
  };

  const hitungS = (gk) => {
    var persen;
    var value = [];

    for (var i = 0; i < cs.length; i++) {
      persen = 0;
      for (var j = 0; j < cs[i].gk.length; j++) {
        persen = persen + ((gk[cs[i].gk[j]] / 100) * 100) / cs[i].gk.length;
      }
      value.push(persen);
    }
    return value;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Head>
        <title>Sistem Pakar | Alfian Prisma Yopiangga</title>
      </Head>
      <h1 className="text-4xl font-bold mt-10 mb-5 text-center">
        Sistem Pakar | Infeksi Sistem Gastro Usus
      </h1>
      <h4 className="text-center mb-10">Alfian Prisma Yopiangga</h4>

      <div>
        {Math.max(...result) >= th ? (
          <div className="card w-96 bg-base-100 shadow-xl mb-10">
            <div className="card-body">
              <h2 className="card-title">
                {cs[result.indexOf(Math.max(...result))]?.title}
              </h2>
              <p>
                Anda <b>{cs[result.indexOf(Math.max(...result))]?.title}</b>{" "}
                dengan tingkat perkiraan sekitar{" "}
                <b>{Math.max(...result)?.toFixed(2)}%</b>
              </p>
            </div>
          </div>
        ) : (
          <div className="card w-96 bg-base-100 shadow-xl mb-10">
            <div className="card-body">
              <h2 className="card-title">Tidak ditemukan gangguan</h2>
              <p>
                Anda <b>tidak terkena</b> gangguan sistem gastro usus dengan
                nilai batas <b>{th}%</b>
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <input
          value={th}
          onChange={(e) => setTh(e.target.value)}
          type="number"
          placeholder="Nilai Threshold"
          className="input input-bordered w-full max-w-xs mb-10"
        />
      </div>

      <ul className="grid lg:grid-cols-2 grid-cols-1 p-4 gap-4">
        {cg.map((el, idx) => {
          return (
            <li key={idx} className="border-gray-400 flex flex-row">
              <div
                className={`select-none flex flex-1 items-center bg-white transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl ${
                  selected.includes(idx)
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium">{idx + 1 + ") " + el}</div>
                </div>
                <button
                  onClick={() => handleClick(idx)}
                  className={`w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md justify-center items-center border-2 p-2 ${
                    selected.includes(idx)
                      ? "bg-white text-green-500 border-green-500"
                      : "bg-green-500 text-white border-green-500"
                  }`}
                >
                  {selected.includes(idx) ? "Batal" : "Pilih"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <h1 className="text-3xl font-bold mt-16 mb-10 ">Tabel Hasil</h1>

      <div className="overflow-x-auto lg:w-fit w-11/12">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Penyakit</th>
              <th>Persen %</th>
              <th>Gejala Klinis</th>
            </tr>
          </thead>
          <tbody>
            {cs.map((el, idx) => {
              return (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{el.title}</td>
                  <td>{result[idx]?.toFixed(2)}</td>
                  <td>
                    {el.gk.map((e, i) => {
                      return <li key={i}>{cgk[e].title}</li>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="my-5"></div>
    </div>
  );
}
