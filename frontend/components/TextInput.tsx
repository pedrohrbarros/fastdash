import React from 'react'

function TextInput(props: { 
  text:string,
  id: string
}) {

  return (
    <div className="w-full h-auto flex flex-col justify-center items-start gap-2 relative">
      <input
      id={props.id}
      name={props.id}
      type={props.id !== 'password' ? 'text' : "password"}
      placeholder={props.text}
      className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
      />
      <label htmlFor={props.id} className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]">{props.text}</label>
    </div>
  )
}

export default TextInput