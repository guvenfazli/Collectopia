import { useState, useEffect } from "react";
import Image from "next/image";

type componentPropType = {
  imageShowcase: string[]
}

export default function ImageShowcase({ imageShowcase }: componentPropType) {

  const [imageNavigator, setImageNavigator] = useState<number>(0)

  useEffect(() => { // Resets navigator if new images uploaded
    setImageNavigator(0)
  }, [imageShowcase, setImageNavigator])

  return (
    <div>
      <div className="flex w-full items-center mb-4 overflow-hidden relative h-96">
        {imageShowcase.length === 0 && <div className="flex w-full justify-center items-center"><p>You did not choose any image yet!</p></div>}
        {imageShowcase.length >= 0 && imageShowcase.map((img) =>
          <div key={img} style={{ translate: `${imageNavigator * -100}%` }} className="flex w-full h-full overflow-hidden flex-shrink-0 duration-700">
            <Image
              width={0} height={0}
              alt="uploadedImage"
              style={{ height: '100%', width: '100%', zIndex: 0, transitionDuration: "700ms" }}
              src={img}>
            </Image>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between items-center">
        <button onClick={() => setImageNavigator(prev => prev -= 1)} disabled={imageNavigator === 0 || imageShowcase.length === 0} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out disabled:bg-blue-300">&lt;</button>
        <button onClick={() => setImageNavigator(prev => prev += 1)} disabled={imageNavigator === imageShowcase.length - 1 || imageShowcase.length === 0} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out disabled:bg-blue-300">&gt;</button>
      </div>

    </div>
  )
}