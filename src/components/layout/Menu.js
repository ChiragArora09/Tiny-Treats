import Image from "next/image"
import MenuItem from "../menu/MenuItem"

const Menu = () => {
  return (
    <section>
        <div className="absolute left-0 right-0 w-full justify-start">
            <div className="absolute left-0 -top-[160px] text-left -z-10">
                <Image src={'/salad1.png'} width={89} height={189}  alt={'salad'} />
            </div>
            <div className="absolute -top-[155px] right-0 -z-10">
                <Image src={'/salad2.png'} width={67} height={195} alt={'salad'} />
            </div>
        </div>
        <div className="text-center mt-20">
            <h5 className="uppercase leading-3 text-gray-500 font-light text-sm">Check our</h5>
            <h2 className="text-primary font-extrabold text-4xl">Menu</h2>
        </div>
        <div className="grid lg:grid-cols-4 gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-6">
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
        </div>
    </section>
  )
}

export default Menu