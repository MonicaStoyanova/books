import { createContext, useState } from "react";

const BooksContext = createContext();

//custom provider
function Provider({ children }) {
  // we create a piece of state
  const [count, setCount] = useState(5);

  //then we create object that we are going to share with the rest of the application
  const valueToShare = {
    count,
    //function to change the count, everytime we call it it will increment the value of count
    incrementCount: () => {
      setCount(count + 1);
    },
  };
  //now we want to be able to share it
  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
