import { useSelector, useDispatch } from "react-redux"
import { Icon } from 'shared'
import ModalHOC from "../HOC"
import { t } from "i18next"
import { getCroppedImg } from 'utils'
import { closeModal, setModalData, setCropControls } from "store"
import { ImageCropper } from "components"

const modalName = 'crop_image'


const CropImage = ({ setFile }) => {
    const dispatch = useDispatch()

    const { file } = useSelector(state => state.modals)
    const { name } = file

    const { cropControls, croppedImageRef } = useSelector(state => state.common)
    const { crop, rotate, zoom } = cropControls

    const handleCloseModal = () => {
      dispatch(closeModal(modalName))
      dispatch(setModalData({ key: 'file', value: {} }))
      dispatch(setCropControls({ crop: {} , zoom: 1, rotate: 0 }))
    }

    const handleSave = async() => {
      try {
        const croppedImage = await getCroppedImg(
          croppedImageRef,
          crop,
          zoom,
          rotate
        )
        setFile(name, croppedImage)
        handleCloseModal()
      } catch (e) {
        console.error(e)
      }
    }


  return (
    <div className="max-h-content text-black justify-between flex flex-col md:min-w-[450px] max-w-[500px]">
      <div className="modal-header flex flex-col">
        <div className="flex justify-between items-center px-4 gap-5 h-[60px]">
          <h2 className="text-center w-full text-center">{t('image_cropping')}</h2>
          <button onClick={handleCloseModal}>
            <Icon name="closeIcon" />
          </button>
        </div>

        <hr />
      </div>

      <div className="modal-body p-6 flex flex-col gap-5">
        <ImageCropper />

        <button 
            className="bg-primary p-4 flex items-center justify-center text-white rounded-md"
            onClick={handleSave}
        >
          <p className="font-[16px] font-medium">{t('save')}</p>
        </button>
      </div>
    </div>
  )
}

export const CropImageModal = ModalHOC(CropImage, modalName)



