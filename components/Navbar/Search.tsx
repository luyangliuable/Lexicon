import React, { useState, useRef, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { CircleButton } from "../AppButton"
import TextInput from "../utils/Form/TextInput"

interface SearchProps {
    result: String[]
}

const Search: React.FC<[], SearchProps> = (props) => {

    const searchInputRef = useRef(null);

    const resultsListRef = useRef(null);

    const [searchResult, setSearch] = useState({
        result: []
    });

    useEffect(() => {
        const handleClickOutside = (event) => {

            // Temporary solution because searchInputRef is not working.
            const searchInput = document.getElementById("search-bar");

            if (searchInput && !searchInput.contains(event.target) && resultsListRef.current && !resultsListRef.current.contains(event.target)) {
                hideSearchResult();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [searchInputRef, resultsListRef]);

    const search = (value: string) => {
        document.getElementsByClassName("search-result-container")[0].style.display = 'flex';

        fetch('http://localhost:9000/parsingEngine/search', {
            method: 'POST',
            headers: {
                "content-type": "Application/Json"
            },
            body: JSON.stringify({ value: value })
        })
            .then(response => response.json())
            .then(response => {
                if (response.result) {
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
                console.error(err);
            });

        return [searchResult.result];

    }

    const clearSearch = () => {
        setSearch({ result: [] });
    }

    const hideSearchResult = () => {
        document.getElementsByClassName("search-result-container")[0].style.display = 'none';
        clearSearch();
    }

    return (
        <div className="flex items-center" >

            <TextInput
                onChange={(e: any) => search(e.target.value)}
                onFocus={(e: any) => search(e.target.value)}
                ref={searchInputRef}
                placeholder={"Search"}
                value={search || ""}
                type={"text"}
                className="navbar-text-input"
            />

            <CircleButton
                className="circle-search-button"
                onClick={() => {/*TODO*/ }}
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

            <div className="search-result-container" ref={resultsListRef}>
                {
                    searchResult["result"].map((item, index) => {
                        let url;

                        if ('inputsCardList' in item) {
                            url = `http://localhost:3000/lexicon_studio?formName=${item._id}`
                        } else {
                            url = `http://localhost:9000/parsingEngine/render?id=${item._id}`
                        }

                        console.log(url);

                        return (
                            <div className="search-result-item" onClick={() => {
                                window.location.href = url;
                            }}
                            >{item.name}</div>
                        );
                    })
                }
            </div>

        </div>
    )
}

export default Search
