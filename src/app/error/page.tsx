import CheckOutBtn from "@/components/CheckOutBtn";

export default function Error() {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen">
      <p className="text-center font-bold text-lg">
        An error occured and the payment didn't go through...we invite you to
        try again.
      </p>
      <CheckOutBtn />
    </div>
  );
}

// <button onClick={()=> useStore.setState((state) => ({ isOpen: true }))} className="btn w-44">go to checkout</button>
