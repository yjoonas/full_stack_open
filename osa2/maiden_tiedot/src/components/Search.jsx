export const Search = ({search, searchHandler}) => {
    return (
        <div>
            find countries <input type={"text"} placeholder={"search by country name"} value={search} onChange={searchHandler} />
        </div>
    )
}