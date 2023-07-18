import React from 'react'

function Card(props: {
  gross_value: string
  title: string
  percentage: number
}) {

  const setValueSinals = () => {
    if (props.percentage < 0) {
      return `${props.percentage}%`
    } else if (props.percentage > 0){
      return `+${props.percentage}%`
    }
  }

  return (
    <div className="bg-white rounded-lg w-[30%] h-24 p-4 flex flex-row justify-between items-center flex-wrap max-[300px]:h-auto max-[850px]:w-full">
      <article className="flex flex-col h-full justify-center items-start w-auto">
        <h1 className="font-h1 text-black font-bold text-2xl">{`$${props.gross_value}`}</h1>
        <h2 className="font-h2 text-black font-light text-md">{`${props.title}`}</h2>
      </article>
      <div className="bg-[#bff3cd] rounded-lg h-full w-auto flex flex-col justify-center items-center px-2">
        <p className="font-p text-[#3b7249] font-base text-2xl">
          {setValueSinals()}
        </p>
      </div>
    </div>
  )
}

export default Card