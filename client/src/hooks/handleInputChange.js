export const handleOnChange = (e, setState)=>{
    const {id, value} = e.target
    setState(prev=>({...prev, [id]:value}))
  }