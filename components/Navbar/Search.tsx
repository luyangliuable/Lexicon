import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

import CircleButton from "../AppButton/CircleButton"
import TextInput from "../utils/Form/TextInput"

interface iSearch {
    result: String[]
}

const Search: React.FC<iSearch> = () => {
    const [searchResult, setSearch] = useState<iSearch | undefined>({
        result: []
    });

    const search = (value) => {
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

    return (
        <div className="flex items-center">
            <div className="search-result-container">
                <div>
                    <TextInput
                        onChange={(e: any) => search(e.target.value)}
                        placeholder={"Search"}
                        value={search || ""}
                        type={"text"}
                        className="navbar-text-input"
                    />
                    {searchResult["result"].map(( item, index ) => (
                        <div className="search-result-item" onClick={() => window.location=`http://localhost:9000/parsingEngine/render?id=638c47281f34a9aa711a7736`}>{ item.name }</div>
                    )
                    )}
                </div>

                <CircleButton
                    className="circle-search-button"
                    onClick={() => {}}
                    tooltip={"Search"}
                    Icon={<FaSearch style={{color: "#FFF", width: '13px', height: 'auto'}} />}
                    enable={true}
                />
            </div>

        </div>
    )
}

export default Search
