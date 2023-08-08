import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Loader() {
  return (
    <ThreeDots
                        height={45}
                        wrapperStyle={{ margin: "auto" }}

                        color="#304ffe"
                        ariaLabel="three-dots-loading"


                        visible={true}
                    />
  )
}

export default Loader