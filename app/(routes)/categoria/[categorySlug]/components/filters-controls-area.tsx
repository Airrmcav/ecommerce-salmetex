import FilterArea from "./filter-area";

type FiltersConstrolsAreaProps = {
    setFilterArea: (area: string) => void;
    filterArea: string;
    setFilterCategory: (category: string) => void;
}

const FiltersControlsArea = (props: FiltersConstrolsAreaProps) => {
    const { setFilterArea, filterArea, setFilterCategory } = props;
    return ( 
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterArea 
                setFilterArea={setFilterArea}
                filterArea={filterArea}
                setFilterCategory={setFilterCategory}
            />
        </div>
     );
}
 
export default FiltersControlsArea;