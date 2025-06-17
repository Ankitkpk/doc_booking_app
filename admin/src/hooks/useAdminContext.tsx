import { useContext } from 'react';
import { AdminContext } from '../context/Admincontext';

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminContextProvider');
  }
  return context;
};
/*Custom Hooks in React are JavaScript functions that:

Start with the word use

Let you reuse stateful logic (like useState, useEffect, etc.)

Are used to keep your components clean and DRY (Don't Repeat Yourself)

🔥 Why Use Custom Hooks?
Instead of repeating logic across multiple components (like API calls, form handling, auth checks, etc.), you write a custom hook once and reuse it wherever needed.

*/