import PropTypes from "prop-types"

export const BoundaryErrorMessage = () => {
    const resetErrorBoundary = () => window.location.reload()

    return (
        <div className="min-h-[200px] max-h-screen flex items-center justify-center" role="alert">
            <div className="text-center sm:px-[20px] lg:px-0">
                <h1 className="sm:text-3xl lg:text-5xl font-semibold text-red-600 sm:mb-2 lg:mb-4">Error !!</h1>
                <p className="sm:text-sm lg:text-xl text-gray-300 font-semibold">{"Something went during rendering UI"}</p>
                <button className="mt-4 sm:text-[12px] lg:text-2xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-red-500 font-medium sm:px-5 sm:py-2 lg:px-7 lg:py-3 rounded-lg" onClick={resetErrorBoundary}>
                    Reload Page
                </button>
            </div>
        </div>
    )
}

BoundaryErrorMessage.propTypes = {
    error: PropTypes.string,
    resetErrorBoundary: PropTypes.func
}