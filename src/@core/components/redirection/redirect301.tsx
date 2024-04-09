// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'
import axios from '../../../configs/axios'
// ** Next Import
import { useRouter } from 'next/router'

const Redirect301 = ({ children }) => {

  console.log("Redirect301");
  const router = useRouter();
  const currentPath = router.pathname;
  console.log(currentPath);
 
  const fetchRedirectUrls = async () => {
    try {
      const response = await axios.get('/api/website/redirecturl/get?page=1&size=300');
      localStorage.setItem('redirecturlsLearn', JSON.stringify(response.data.data));
      // alert("sete")
    } catch (error) {
      console.error('Error fetching redirect URLs:', error);
    }
  };

  const checkToken = async () => {
    try {
      const redirectToken = localStorage.getItem('redirectTokenLearn');
      const response = await axios.get('/api/website/redirecturl/config');
      if (response.data.status && redirectToken !== response.data.data) {
        await fetchRedirectUrls();
        const redirectUrlsString = localStorage.getItem('redirecturlsLearn');
        const redirectUrls = redirectUrlsString ? JSON.parse(redirectUrlsString) : null;

        const search = (nameKey, myArray) => {
          for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].old_url === nameKey) {
              return myArray[i];
            }
          }
          return null;
        };

        if (redirectUrls) {
          // alert("cheking")
          // alert(currentPath);x
          const resultObject = search(currentPath, redirectUrls);
          // alert(resultObject);
          if (resultObject && resultObject.new_url) {
            router.push(resultObject.new_url);
          }
        }
        localStorage.setItem('redirectTokenLearn', response.data.data);
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  useEffect(() => {
    // alert("1")
    checkToken();
    // alert("2")

    // else {
    //   alert("2")
    //   router.push('/404'); // Redirect to 404 if no redirect URLs are found
    // }
  }, []);

  return <>{children}</>;
};

export default Redirect301;
// export default Redirect301
