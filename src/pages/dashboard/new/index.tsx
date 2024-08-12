import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/painelHeader";

import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório."),
  model: z.string().min(1, "O modelo do carro é obrigatório."),
  year: z.string().min(1, "O ano do carro é obrigatório."),
  km: z.string().min(1, "O km do carro é obrigatório."),
  price: z.string().min(1, "O preço do carro é obrigatório."),
  city: z.string().min(1, "A cidade é obrigatória."),
  whatsapp: z.string().min(1, "O telefone é obrigatório.").refine((value) => /^(\d{11, 12})$/.test(value), {
    message: "Número de telefone inválido."
  }),
  description: z.string().min(1, "A descrição do carro é obrigatório.")
})


type FormData = z.infer<typeof schema>;

export function New() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2  w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-500 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input className="opacity-0 cursor-pointer" type="file" accept="image/*" />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 Flex Plus Manual..."
            />
          </div>

          <div className=" flex w-full mb-3 flex-row items-center gap-4">

            <div className="w-full">
              <p className="mb-2 font-medium">Ano do carro</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2012/2013"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Km do carro</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 80.000"
              />
            </div>

          </div>

          <div className=" flex w-full mb-3 flex-row items-center gap-4">

            <div className="w-full">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="Whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 05199452265"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Montenegro/RS"
              />
            </div>

          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Preço do carro</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="Ex: 69.000,00..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição completa do carro"
            />
            {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
          </div>
          
          <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10" >
            Cadastrar
          </button>

        </form>
      </div>

    </Container>
  )
}

