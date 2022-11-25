import { Button, InputLabel } from "@mui/material";
import React, {useState, useEffect} from "react";
import './main.css'
import {increment, decrement} from "./temperature-origins"
import useToken from "../customHooks/useToken";

export function Main() {
    const {token, setToken} = useToken();

    const incrementTemp = async () => {
        return await increment(token)
    }

    const decrementTemp = () => {
        decrement(token)
    }

    return <div className="inline">
        <Button onClick={incrementTemp}>+</Button>
        <div className="base">
        <InputLabel>04</InputLabel>
        <InputLabel>:</InputLabel>
        <InputLabel>04</InputLabel>
        </div>
        <Button onClick={decrementTemp}>-</Button>
    </div>
}