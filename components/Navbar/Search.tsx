import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { CircleButton } from "../AppButton"
import TextInput from "../utils/Form/TextInput"

interface SearchProps {
    result: String[]
}

const Search: React.FC<[], SearchProps> = () => {
    const [searchResult, setSearch] = useState({
        result: []
    });

    const search = (value: string) => {
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
            </div>

        </div>
    )
}

export default Search
