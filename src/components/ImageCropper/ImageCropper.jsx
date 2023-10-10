import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import ReactCrop from 'react-image-crop'
import { setCropControls, setCroppedImageRef } from "store"
import { t } from "i18next"

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
// function centerAspectCrop(
//   mediaWidth,
//   mediaHeight,
//   aspect,
// ) {
//   return centerCrop(
//     makeAspectCrop(
//       {
//         unit: '%',
//         width: 90,
//       },
//       aspect,
//       mediaWidth,
//       mediaHeight,
//     ),
//     mediaWidth,
//     mediaHeight,
//   )
// }

export function ImageCropper() {
  const dispatch = useDispatch()
  const imgRef = useRef(null)
  const [crop, setCrop] = useState({
    unit: '%',
    height: 50,
    width: 50,
    x: 25,
    y: 25
  })
  const [zoom, setZoom] = useState(1)
  const [rotate, setRotate] = useState(0)
  // const [aspect, setAspect] = useState()

  const { file, crop_image } = useSelector(state => state.modals)
  const { src } = file


  // function onImageLoad(e) {
  //   if (aspect) {
  //     const { width, height } = e.currentTarget
  //     setCrop(centerAspectCrop(width, height, aspect))
  //   }
  // }

  const handleChangeZoom = e => {
    const _zoom = Number(e.target.value)
    setZoom(_zoom)
    dispatch(setCropControls({ zoom: _zoom }))
  }

  const handleChangeRotate = e => {
    const { value } = e.target
    setRotate(value)
    dispatch(setCropControls({ rotate: value }))
  }

  const handleCompleteCrop = useCallback(c => {
    dispatch(setCropControls({ crop: c, zoom, rotate }))
    dispatch(setCroppedImageRef(imgRef.current))
  }, [dispatch, zoom, rotate])


  useEffect(() => {
    if(imgRef.current && crop_image) {
      const { width, height } = imgRef.current
      const crop = {
        x: width * 0.25,
        y: height * 0.25,
        width: width / 2,
        height: height / 2,
        unit: 'px'
      }
      handleCompleteCrop(crop)
    }
    setZoom(1)
    setRotate(0)
  }, [imgRef.current, crop_image])


  return (
    <div className="crop-image">
      {!!src && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={handleCompleteCrop}
          // aspect={aspect}
          className="w-full"
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={src}
            style={{ transform: `scale(${zoom}) rotate(${rotate}deg)` }}
            // onLoad={onImageLoad}
            className="h-[300px] w-full min-w-[340px]"
          />
        </ReactCrop>
      )}

      <div className="crop-controls flex flex-col gap-2 mt-4">
        <div className="flex gap-5 w-full">
          <label htmlFor="scale-input block w-[100px]">Zoom: </label>
          <input
            type="range"
            className="w-full"
            min={0}
            max={3}
            step={0.1}
            value={zoom}
            disabled={!src}
            onChange={handleChangeZoom}
          />
        </div>

        <div className="flex gap-5 w-full">
          <label htmlFor="rotate-input block w-[100px]">Rotate: </label>
          <input
            min={0}
            max={360}
            step={1}
            type="range"
            className="w-full"
            value={rotate}
            disabled={!src}
            onChange={handleChangeRotate}
          />
        </div>
      </div>
    </div>
  )
}

