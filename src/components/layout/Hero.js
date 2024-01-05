import Image from "next/image"

const Hero = () => {
  return (
    <section className="hero">
        <div className="py-16">
            <h1 className="text-4xl font-bold text-gray-700">Every slice tells a delicious story!</h1>
            <p className="text-sm my-6 text-gray-500">Elevate your pizza experience with Tiny Treats, your pizza, your way. Customize your Tiny Treats order and let the flavor journey begin!</p>
            <div className="flex gap-4">
                <button className="bg-red-500 text-white px-8 py-2 rounded-full font-semibold">Order now</button>
                <button className="text-gray-700 rounded-full bg-white border-none font-semibold">Learn more</button>
            </div>
        </div>
        <div className="relative">
            <Image src={'/pizza.png'} alt="pizza" layout="fill" objectFit="contain" />
        </div>
    </section>
  )
}

export default Hero