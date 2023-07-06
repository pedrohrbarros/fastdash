import React from 'react'

function Button(props: {
  color: string
  text: string
  onClick: () => void
}) {
  return (
    <button type="button" className={`w-full outline-none border-0 ${props.color} rounded px-5 py-2.5 text-center shadow-[3px_3px_1px_3px_rgba(0,0,0,0.5)] active:shadow-[2px_2px_1px_1px_rgba(0,0,0,0.5)] active:translate-y-[2px] active:translate-x-[2px] transition-all max-[500px]:px-2 max-[500px]:py-1`} onClick={props.onClick}
    >
      <p className="font-p text-xl text-white font-extralight max-[500px]:text-base">{props.text}</p>
    </button>
  )
}

export default Button