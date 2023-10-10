import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from 'store'
import { Icon } from 'shared'
import ModalHOC from "../HOC"

const modalName = 'fullscreen_image'

const FullScreen = () => {
  const dispatch = useDispatch()
  const { fullscreenImage } = useSelector(state => state.modals)

  return (
    <div className={`max-w-[350px] md:w-[80vw] md:h-[80vh] md:max-w-[800px] justify-between flex flex-col`}>
        <div className="modal-body flex relative bg-black">
            <button className="text-white w-7 h-7 rounded-full bg-black font-medium absolute top-2 right-2 flex items-center justify-center" onClick={() => dispatch(closeModal(modalName))}>
              <Icon name="close_icon" className="w-4 h-4 stroke-2" />
            </button>
            <img 
                src={typeof fullscreenImage === "string" ? fullscreenImage : URL.createObjectURL(fullscreenImage)} 
                alt="fullscreen_image" 
                className={`rounded-3 md:w-[80vw] md:h-[80vh]`}
            />
        </div>
    </div>
  )
}

export const FullScreenImage = ModalHOC(FullScreen, modalName)
