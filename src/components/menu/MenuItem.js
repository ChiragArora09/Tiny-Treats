import Image from "next/image"

const MenuItem = () => {
  return (
    <div className="bg-[#ffe9e2] border border-orange-200 p-3 rounded-lg text-center transition-all hover:shadow-md hover:shadow-neutral-700">
      <div className="text-center">
        <img src="/pizza1.png" alt="pizza" className="max-h-36 block mx-auto" />
      </div>
      <h4 className="font-semibold text-xl my-2">Margherita Pizza</h4>
      <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adquid.</p>
      <button className="mt-4 bg-red-500 text-white rounded-full px-6 py-2">Add to Card $12</button>
    </div>
  )
}

export default MenuItem