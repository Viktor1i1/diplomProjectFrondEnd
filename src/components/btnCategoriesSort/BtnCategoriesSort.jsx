import "./btnCategoriesSort.css"

function BtnCategoriesSort({selectCategory,setSelectCategory}){
    const categories = ["Усі типи","Концерти","Фестивалі","Театр","Stand up"]
    return(
        <div className="filterCategories">
            <div className="eventsCategories">
                {categories.map((category)=>(
                    <div key={category}> 
                        <input 
                            type="checkbox" 
                            name="categor" 
                            value={category} 
                            checked={selectCategory === category} 
                            onChange={() => setSelectCategory(category)} /> {category} </div>
                ))}
            </div>
        </div>
    )
}
export default BtnCategoriesSort;