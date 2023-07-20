import React, { ReactNode } from 'react'
import Loader from './Loader'

function Card(props: {
  gross_value: string | ReactNode
  title: string
  percentage: number | undefined
}) {

  const setValueSinals = () => {
    if (props.percentage === undefined) {
      return <Loader/>
    } else {
      if (props.percentage > 0) {
        return (
          <div className="bg-[#bff3cd] rounded-lg h-full w-auto flex flex-col justify-center items-center px-2">
            <p className="font-p text-[#3b7249] font-base text-2xl">
              +{props.percentage}%
            </p>
          </div>
        )
      } else if (props.percentage < 0){
        return (
          <div className="bg-[#f3c7bf] rounded-lg h-full w-auto flex flex-col justify-center items-center px-2 py-4">
            <p className="font-p text-[#72413b] font-base text-2xl">
              {props.percentage}%
            </p>
          </div>
        )
      } else if (props.percentage === 0) {
        return (
          <div className="bg-[#81a8f0] rounded-lg h-full w-auto flex flex-col justify-center items-center px-2 py-4">
            <p className="font-p text-[#ffffff] font-base text-2xl">
              {props.percentage}%
            </p>
          </div>
        )
      }
    }
  }

  return (
    <div className="bg-white rounded-lg w-[30%] h-auto p-4 flex flex-row justify-between items-center flex-wrap max-[850px]:w-full">
      <article className="flex flex-col h-full justify-center items-start w-auto">
        <h1 className="font-h1 text-black font-bold text-2xl">
          {props.gross_value}
        </h1>
        <h2 className="font-h2 text-black font-light text-md">{`${props.title}`}</h2>
      </article>
      {setValueSinals()}
    </div>
  )
}

export default Card