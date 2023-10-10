import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactPhoneInpute from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { setCountryCode } from "store"


export const PhoneInput = () => {
    const {
        aboutUsInfos: {
          type
        } = {},
      } = useSelector((state) => state.aboutUs);
    const dispatch = useDispatch()
    const [showLists, setShowLists] = useState(false)

    const countryCodeHandler = useCallback(({ num }) => {
        dispatch(setCountryCode(num.split(" ")[0] ?? (type == 0 ? '+994' : '+1')))
    }, [dispatch])

    return (
        <div className="relative rounded-md shadow-sm h-[50px] w-[134px] flex gap-2">
            <button className="sm:h-10 sm-w-25 md:h-[50px] md:w-[134px] flex justify-between items-center rounded-lg p-3 border border-solid border-slate-300" onClick={(e) => {
                e.preventDefault()
                setShowLists(!showLists)
            }}>
                <ReactPhoneInpute
                    country={type == 0 ? 'az' : 'us'}
                    enableSearch={true}
                    value={type == 0 ? '+994' : '+1'}
                    onChange={(phone) => countryCodeHandler({ num: phone })}
                    inputStyle={{
                        color: "black",
                        width: "100%",
                        border: "none"
                    }}
                    searchStyle={{
                        color: "black",
                        display: "flex",
                        border: "none"
                    }}
                    dropdownStyle={
                        {
                            color: "black",
                            textAlign: "left",
                            border: "none",
                            width: "auto",
                            background: "white"
                        }
                    }
                    containerStyle={{
                        width: "100px",
                        border: "none",
                        display: "flex"
                    }}
                    buttonStyle={{
                        border: "none",
                        backgroundColor: "white"
                    }}
                    buttonClass="bg-white"
                    searchClass="flex"
                />
            </button>
            {/* {showLists && <div className="absolute w-full left-0 top-12 h-full z-10">
                <ul className="h-[100px] w-full bg-white overflow-y-scroll hide-scroll rounded-lg p-3 flex flex-col  gap-[6px] border border-solid border-slate-300">
                    {numberOptions.map(({ id, src, num }) => (
                        <li key={id} className="h-[50px] flex gap-2 items-center cursor-pointer" onClick={() => countryCodeHandler(id, num)}>
                            <img className="w-4 h-4 rounded-[3px]" src={src} alt={num} />
                            <span className="text-slate-700 font-medium text-base">{num}</span>
                        </li>
                    ))}
                </ul>
            </div>} */}
        </div>
    )
}
