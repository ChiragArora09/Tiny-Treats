
const AboutItem = ({imgsrc, heading, subheading}) => {
  return (
    <div className="w-full flex flex-col items-center">
        <img src={imgsrc} alt="" className="h-14" />
        <h2 className="font-bold text-white text-lg">{heading}</h2>
        <p className="text-gray-400 text-sm">{subheading}</p>
    </div>
  )
}

export default AboutItem