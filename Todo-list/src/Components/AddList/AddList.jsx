import React, { useReducer, useState } from 'react';
import './addlist.css';
import { FaSquarePlus } from "react-icons/fa6";
import { TiArrowSortedDown, TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

const AddList = () => {

    const reducer = (state, action) => {
        switch (action.type) {
            case "AddList":
                if(action.payload.trim() === "") return state;
                return {
                  ...state,
                  list: [...state.list, {todo: action.payload}]
                }
            case "DeleteItem":
                return{
                  list: state.list.filter((_, index) => index !== action.payload) 
                };
            default:
                return state;
        }
    };

    const initialState = {
        list: []
    };

    const [data, dispatch] = useReducer(reducer, initialState);
    const [userinput, setUserinput] = useState("");

    return (
        <>
            <div className='header'>
                <h1>To-Do List</h1>
            </div>
            <div className='addList'>
                <div className='taskBar'>
                    <input
                        value={userinput}
                        onChange={(e) => setUserinput(e.target.value)}
                        type="text"
                    />
                    <div className='add' onClick={() => {
                        dispatch({ type: "AddList", payload: userinput });
                        setUserinput(""); 
                    }}>
                        <FaSquarePlus />
                    </div>
                </div>
                <div className='category'>
                    <p>All</p>
                    <div className='icon'><TiArrowSortedDown /></div>
                </div>
            </div>

            <div className='list'>
                {data.list.map((item, index) => (
                    <div className='listItem' key={index}>
                        <div className='listItemText'>
                            <j>{item.todo}</j>
                        </div>
                        <div className='listItemIcon'>
                            <div className='edit'><TiTick /></div>
                            <div className='delete' onClick={() => dispatch({ type: "DeleteItem", payload: index })}>
                                <MdDelete />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AddList;



