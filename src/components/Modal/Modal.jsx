import "./Modal.css";

export const Modal = ({setShowModal,closeButton=true,children,width=400,height=200,}) =>{
  const handleClose = (e) =>{
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className='modal'>
      <div className='modalContent' style={{
        width:`${width}px`,
        height:`${height}px`,
      }}>
        {closeButton?<span className='close' onClick={handleClose}>&times;</span>:null}
        {children}            
      </div>  
    </div>                
  );
};