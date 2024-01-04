import axios from '../../utils/axios'

// rest 示例
// export const getTest = () => {
//     return axios.get('/api/test/:name/:age', { rest: { name: 'zs', age: 18 } })
// }

// post 示例
// export const getTest = () => {
//     return axios.post('/api/test', { name: 'zs', age: 19 })
// }

//get 示例

export const getTest = () => {
    return axios.get('/api/test', { params: { name: 'zs', age: 19 } })
}
