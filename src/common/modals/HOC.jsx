import { useRef, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "store"
import {getFromLocale} from "utils"

export default function ModalHOC(Component, keyName) {
  const ModalComponent = (props) => {
  
    const modalRef = useRef('')
    const dispatch = useDispatch()
    const state = useSelector(state => state.modals)

    const type = getFromLocale("typeWebsite") || 1;

    function getTypeWebsite(type) {
      return type === 1 ? "Sayt.az" : "Websiteca.com";
    }

    const websiteName = getTypeWebsite(type);

    const handleToggle = useCallback((event) => {
      if(event.target === modalRef.current) {
        dispatch(closeModal(keyName))
      }
    }, [keyName, modalRef, dispatch])


    useEffect(() => {
      if(window) {
        window.addEventListener('click', handleToggle)
      }

      return () =>  window.removeEventListener('click', handleToggle)
    }, [handleToggle])


    return (
      <div className={` ${state[keyName] ? 'block' : 'hidden'}  fixed z-999 transition-all dark:text-black inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center`} ref={modalRef}>
        <div className="shadow-md border border-solid border-lightgray max-w-[350px] md:max-w-full rounded-md bg-white">
          <Component {...props} websiteName={websiteName} />
        </div>
      </div>
    )
  }

  ModalComponent.displayName = `Modal(${Component.displayName || Component.name || 'Component'})`;

  return ModalComponent;
}