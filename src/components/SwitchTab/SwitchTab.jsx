import React, { useState } from 'react'

function SwitchTab({data,onTabChange}) {
    const activeTab = (tab,index)=>{
        setLeft(index*100)
            setSelectedTab(index)
            onTabChange(tab)
    }    
    const [selectedTab,setSelectedTab] = useState(0)
    const [left,setLeft] = useState(0)
  return (
      <div className='h-[35px] bg-white rounded-3xl  w-[200px]'>
         <div className='flex justify-center items-center h-[30px] relative'>
              {data.map((tab,index)=>(
                <span key={index} className={`h-[20px] flex justify-center items-center w-[100px] text-xl relative z-10 cursor-pointer transition-[color] font-medium ${selectedTab===index?'text-white':'text-black'}`} onClick={()=>activeTab(tab,index)}>{tab}</span>
              ))}
              <span className='h-[35px] w-[100px] rounded-3xl absolute left-0 transition-all duration-400 bg-red-700 leading-loose text-center top-0 z-0 ease-in-out' style={{ left }}/>
         </div>
      </div>
    )
}

export default SwitchTab