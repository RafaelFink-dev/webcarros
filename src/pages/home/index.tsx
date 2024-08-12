import { Container } from "../../components/container"

export function Home() {

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg max-w-3xl mx-auto flex justify-center items-center gap-2 outline-none">
        <input
          className="w-full border-2 rounded-lg h-9 px-3"
          placeholder="Digite o nome do carro..."
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium"
        >
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <section className="w-full bg-white rounded-lg">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202407/20240731/bmw-m-850i-4-4-v8-twinpower-gasolina-xdrive-steptronic-wmimagem00194856641.webp?s=fill&w=249&h=186&q=70"
            alt="Carro"
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
          />
          <p className="font-bold mt-1 mb-2 px-2">BMW M 850i</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">2019/2020 | 7.482KM </span>
            <strong className="text-black font-medium text-xl">R$ 599.900</strong>
          </div>
          
          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">
              Campo Grande - MT
            </span>
          </div>
        </section>
        
      </main>

    </Container>
  )
}
