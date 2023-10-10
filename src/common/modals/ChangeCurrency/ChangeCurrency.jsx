import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { 
  closeModal,
  useUpdateUserCurrencyMutation, 
  setUserData, 
  setIsLoading
} from 'store'
import { Icon } from 'shared'
import ModalHOC from "../HOC"
import { getPriceFormat } from "utils"
import { t } from "i18next";
import { Spinner } from "components"


const modalName = 'change_currency'


const ChangeCurrency = () => {
  const dispatch = useDispatch()
  const { new_currency } = useSelector(state => state.modals)
  const { user } = useSelector(state => state.auth)
  const [changeUserCurrency, { data, isSuccess, isLoading, isError, error } ] = useUpdateUserCurrencyMutation()


  const handleChangeCurrency = async () => {
    await changeUserCurrency({ currency: new_currency })
  }

  const handleCloseModal = () => dispatch(closeModal(modalName))


  useEffect(() => {
    if(isSuccess && data?.body) {
      const userData = data?.body
      dispatch(setUserData(userData));
      dispatch(closeModal(modalName))
    }
  }, [isSuccess, data?.body, dispatch])


  useEffect(() => {
    if(isError) dispatch(setAlertData({ message: error?.data?.message, status: 'error' }))
  }, [isError, dispatch, error])


  // useEffect(() => {
  //   dispatch(setIsLoading(isLoading))
  // }, [isLoading, dispatch])


  return (
    <div className="min-w-[350px] max-h-content text-black md:min-w-[600px] justify-between flex flex-col">
        <div className="modal-header flex flex-col">
          <div className="flex justify-between items-center px-4 gap-5 h-[60px]">
            <h2 className="w-full text-center p-2">{t("change_currency_title")}</h2>
            <button onClick={handleCloseModal}>
              <Icon name="closeIcon" />
            </button>
          </div>

          <hr />
        </div>

        <div className="modal-body p-6">
            <div className="flex flex-col gap-2 max-w-[300px] md:max-w-[500px] mb-5">
                <p className="text-center">{t('change_currency_desc', { currency: user?.currency, converted_currency: user?.converted_currency })}</p>
                <p className="text-center">{t('change_currency_note', { from: getPriceFormat(user.money, user.currency), to: getPriceFormat(user.converted_money, user.converted_currency)})}</p>
            </div>

            <div className="flex w-[100%] gap-3 justify-center md:justify-end">
                <button
                    disabled={isLoading}
                    onClick={handleCloseModal}
                    className={`bg-gray-600 text-white font-medium w-[120px] h-[45px] rounded-md flex items-center justify-center place-self-end ${isLoading ? 'cursor-not-allowed' : ''}`}
                    >
                    {t('close')}
                </button>

                <button  
                    disabled={isLoading}
                    onClick={handleChangeCurrency}
                    className={`bg-primary text-white font-medium w-[120px] h-[45px] rounded-md flex items-center justify-center place-self-end ${isLoading ? 'cursor-not-allowed' : ''}`}
                >
                  {
                    isLoading 
                      ? <Spinner /> 
                      : <span>{t('continue')}</span>}
                </button>
            </div>
        </div>
    </div>
  )
}

export const ChangeCurrencyModal = ModalHOC(ChangeCurrency, modalName)
