import { Container } from "../../components/container"
import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";

interface CarsProps {
  id: string;
  name: string;
  year: string;
  km: string;
  uid: string;
  price: number;
  city: string;
  images: CarImageProps[];

}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {

  const [cars, setCars] = useState<CarsProps[]>();
  const [loadImages, setLoadImages] = useState<String[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadCars();
  }, [])

  async function loadCars() {

    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("created", "desc"))


    getDocs(queryRef)
      .then((snapshot) => {

        let listCars = [] as CarsProps[];

        snapshot.forEach(doc => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid
          })

        })

        setCars(listCars);

      })

  }

  function handleImageLoad(id: string) {
    setLoadImages((imageLoaded) => [...imageLoaded, id])
  }

  async function handleSearchCar() {

    if (input === '') {
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const q = query(collection(db, "cars"),
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff") //caractere unicode para marcar o final de consultas de algum prefixo
    )

    const querySnapshot = await getDocs(q);

    let listCars = [] as CarsProps[];

    querySnapshot.forEach(doc => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid
      })

      setCars(listCars);

    })

  }

  function resetFilter() {
    loadCars();
    setInput("");
  }


  return (
    <Container>
      <section className="bg-white p-4 rounded-lg max-w-3xl mx-auto flex justify-center items-center gap-2 outline-none">
        <input
          className="w-full border-2 rounded-lg h-9 px-3"
          placeholder="Digite o nome do carro..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium"
          onClick={handleSearchCar}
        >
          Buscar
        </button>
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-justify"
          onClick={resetFilter}
        >
          Limpar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo brasil
      </h1>

      {cars?.length === 0 && (

        <h1 className="font-bold text-center mt-6 text-2xl mb-4 flex items-center justify-center">
          Nenhum carro a ser exibido!
        </h1>

      )}

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">


        {cars?.map(car => (

          <Link key={car.id} to={`/car/${car.id}`}>
            <section className="w-full bg-white rounded-lg">
              <div
                className="w-full h-72 rounded-lg bg-slate-200"
                style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
              >
              </div>
              <img
                src={car.images[0].url}
                alt="Carro"
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                onLoad={() => handleImageLoad(car.id)}
                style={{ display: loadImages.includes(car.id) ? "block" : "none" }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">{car.year} | {car.km}KM </span>
                <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
              </div>

              <div className="w-full h-px bg-slate-200 my-2"></div>

              <div className="px-2 pb-2">
                <span className="text-zinc-700">
                  {car.city}
                </span>
              </div>
            </section>
          </Link>

        ))}
      </main>

    </Container>
  )
}
