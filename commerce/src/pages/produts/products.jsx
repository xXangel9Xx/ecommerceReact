import React,{ useEffect,useState }  from 'react'
import './products.css'
import { Link }from 'react-router-dom'
import axios from 'axios'

const Products = (props) => {
    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const [seedUser,setSeedUser]=useState(window.sessionStorage.getItem('seed'))
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        let indexOne = document.getElementsByClassName('active')[0].getAttribute('data-index-pagination');
        getProducts(indexOne,0)
    },[])
    useEffect(()=>{
        axios.get('https://codealo-commerce-cms.onrender.com/categories').then(res=>{
            let {data} = res
            setCategories(data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    
    function orderByCategories(e){
        if(parseInt(e.target.value) === categories.length+1 ){
            getProducts(18,0)
        }else{
            setProducts(categories[parseInt(e.target.value)].products)
        }
    }
    

    function getProducts(indexOne,index){
        let items = document.getElementsByClassName('item')
        setLoading(true)
        items = [...items]
        items = items.reverse()
        axios.get('https://codealo-commerce-cms.onrender.com/products',
        {
            params:{
                _start:indexOne,
                _sort:'id'
            }
        }
        ).then((res)=>{
            let {data} = res
            data = data.reverse()
            if(index>0){
                data = data.slice( items[index-1].getAttribute('data-index-pagination') )
                window.location.hash = '#init'
                window.location.hash='#'
            }
            setLoading(false)
            return setProducts(data)
        }).catch((err)=>{
           console.log(('lo sentimos ha ocurrido un error',err))
        })
    }
    

    function handlePage(index){
        let activePagination = document.getElementsByClassName('active')[0];
        activePagination.classList.remove('active')
        let slot = document.getElementsByClassName('page-item')[index]
        slot.classList.add('active')
        document.getElementById('select').selected =categories.length+1 ;
        getProducts(slot.getAttribute('data-index-pagination'),index)
    }

    function next(){
        let items = document.getElementsByClassName('active')[0]
        let index = parseInt( items.getAttribute('data-value')) + 1
        if(index < 3){
            helpArrows(items,index)
        }
    }

    function previous(){
        let items = document.getElementsByClassName('active')[0]
        let index = parseInt( items.getAttribute('data-value')) - 1
        if(index >= 0){
            helpArrows(items,index)
        }
    }
    function helpArrows(items,index){
        items.classList.remove('active')
        let slot =  document.getElementsByClassName('item')[index]
        slot.classList.add('active')
        document.getElementById('select').selected =categories.length+1 ;
        getProducts(parseInt(slot.getAttribute('data-index-pagination')),parseInt(slot.getAttribute('data-value'))+1)
    }

    return (
        <div className="contain-page-products" id='init'>
        {loading? <>
            <p className="loading">cargando...</p>
        </>:
        <>
            <select className="form-select margin-top select" onChange={(e)=>orderByCategories(e)}>
                <option selected value={categories.length+1} id="select">All categories</option>
                {categories.length>1 && categories.map((category,i)=>
                    <option key={i} value={i}>{category.name}</option>
                )}
            </select>
            <div className="contain-products">
                {products.length > 1 && products.map((product,i)=>
                    <div className="card" key={i}>
                    <img src={'https://codealo-commerce-cms.onrender.com'+product.image.url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                            <Link to={'/productDetail/'+product.slug }  className={"btn btn-outline-primary"}>
                                    Ver detalles
                            </Link>
                        </div>
                    </div>
                    )
                }
            </div>
            
            </>

            }
            <div className='d-flex  justify-content-center' >
                <ul className="pagination">
                    <li className="page-item">
                    <a className="page-link" onClick={previous} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                    </li>
                    <li className="page-item item active" onClick={()=>handlePage(1)} data-value={0} data-index-pagination={18}><a className="page-link">1</a></li>
                    <li className="page-item item"  onClick={()=>handlePage(2)} data-value={1} data-index-pagination={9}><a className="page-link">2</a></li>
                    <li className="page-item item"  onClick={()=>handlePage(3)} data-value={2} data-index-pagination={0} ><a className="page-link">3</a></li>
                    <li className="page-item">
                        
                    <a className="page-link" onClick={next} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
            </div> 
        </div>

    )
}
export default Products