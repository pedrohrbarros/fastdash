import React from 'react'

function Button(props: {
  color: string
  text: string
  onClick: () => void
}) {
  return (
    <button type="button" className={`w-full outline-none border-0 text-white ${props.color} rounded text-sm px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all`} onClick={props.onClick}
    >
      <p className="font-p text-xl">{props.text}</p>
    </button>
  )
}

export default Button