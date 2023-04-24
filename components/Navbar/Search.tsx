import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { CircleButton } from "../AppButton"
import TextInput from "../utils/Form/TextInput"

interface SearchProps {
    result: String[]
}

const Search: React.FC<[], SearchProps> = (props) => {

    const [searchResult, setSearch] = useState({
        result: []
    });

    const search = (value: string) => {
        document.getElementsByClassName("search-result-container")[0].style.display = 'flex';

        fetch('http://localhost:9000/parsingEngine/search', {
            method: 'POST',
            headers: {
                "content-type": "Application/Json"
            },
            body: JSON.stringify({value: value})
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.result);
                if ( response.result ) {
                    setSearch(prev => {
                        return {
                            ...prev,
                            ...response
                        }
                    });
                } else {
                    clearSearch();
                }
            })
            .catch(err => {
                console.log(err);
            });

        return [ searchResult.result ];

    }

    const clearSearch = () => {
        setSearch({result: []});
    }

    const hideSearchResult = () => {
        document.getElementsByClassName("search-result-container")[0].style.display = 'none';
        clearSearch();
    }

    return (
        <div className="flex items-center">
            <TextInput
                onChange={(e: any) => search(e.target.value)}
                onBlur={(e: any) => hideSearchResult()}
                placeholder={"Search"}
                value={search || ""}
                type={"text"}
                className="navbar-text-input"
            />
            <CircleButton
                className="circle-search-button"
                onClick={() => {/*TODO*/}}
                tooltip={"Search"}
                Icon={
                    <FaSearch style={{
                            color: "#FFF",
                            width: '13px',
                            height: 'auto' as any
                        }} />
                }
                enable={true}
            />
            <div className="search-result-container">
                    {
                        searchResult["result"].map(( item, index ) => (
                            <div className="search-result-item" onClick={() => {
                                window.location.href = `http://localhost:9000/parsingEngine/render?id=638c47281f34a9aa711a7736`;
                            }}
                            >{ item.name }</div>
                        )
                        )
                    }
            </div>

        </div>
    )
}

export default Search
