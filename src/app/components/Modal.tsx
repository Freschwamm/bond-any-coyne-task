export default function Modal({ 
  isOpen,
  onClose,
  children,
  } : {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) {    
  if(!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-2xl  w-1/2 md:w-1/2 shadow-lg">
        <div className="">{children}</div>
        <button
          onClick={onClose}
          className="fixed top-0 right-0 mt-4 mr-4 bg-white text-black px-3 py-1 rounded-full"
        >
          X
        </button>
      </div>
    </div>
  );
}




