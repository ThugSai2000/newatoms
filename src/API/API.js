import axios from "axios";
import { atom, } from 'recoil';

// axios.defaults.proxy.host = "http://atomssol.in/backend"
axios.defaults.withCredentials =true;
axios.defaults.xsrfCookieName= 'csrftoken';
axios.defaults.xsrfHeaderName='x-csrftoken';

// const client = axios.create({
//     baseURL: 'http://43.204.19.66:8000/backend',
// });
// export default client;


const client = axios.create({
    baseURL: 'http://192.168.29.144:8000/backend',
});
 export default client
//  const client = axios.create({
//     baseURL: '',
// });
//  export default client
// const client  = axios;
// export default client;


//  const client = axios.create({
//     proxy: {protocol: 'http',
//     host: 'atomssol.in/backend',
//     }
//         // "http://atomssol.in/backend",
// });
//  export default client
 
export const machineDropdownAtom = atom({
    key: 'globalCount',
    default: "",
});

export const globalapi = atom({
    key:'gbres',
    default:[],
})
export const timestampglobal = atom({
    key:'timestamp',
    default:'',
})
export const digitaloutputglobal = atom({
    key:'digitaloutput',
    default:[],
})
// console.log('global api '+JSON.stringify(globalapi))

//  Machines General Details

    