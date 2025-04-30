const URL="https://dummyjson.com/products"

const fetchProducts=async()=>{
    const res= await fetch(`${URL}`)
    const data= await res.json()
    return data.products
}

export default fetchProducts