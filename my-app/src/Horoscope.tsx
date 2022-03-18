import logo from "./logo.svg";
import React, {useState} from 'react';
import TextBox from './TextBox';
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import axios from "axios";
import './App.css';
import "react-awesome-button/dist/styles.css";





type HoroscopeRequest = {
    sun: string,
    moon: string,
    rising: string
}

type HoroscopeResponse = {
    horoscope: string[];
} | null


function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");
    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
        const toSend = {
                //TODO: Pass in the values for the data. Follow the format the route expects!
            sun : sun,
            moon : moon,
            rising : rising
    };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Install and import axios!
        //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then(response => {
                console.log(response.data);
                //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
                //Note: It is very important that you understand how this is set up and why it works!
                setHoroscope(response.data['horoscope']);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }


    // @ts-ignore
    return (
        <div className="Horoscope">
            <h1 className="Horoscope-header"> Horoscopes
            </h1>
            <TextBox label={"Enter Sun Sign:  "} changeHandler={setSun}/>
            <TextBox label={"Enter Moon Sign:  "} changeHandler={setMoon}/>
            <TextBox label={"Enter Rising Sign:  "} changeHandler={setRising}/>
            <AwesomeButton type="primary" onPress={requestHoroscope}>Submit</AwesomeButton>
            <ul>
                {horoscope == null ? "": horoscope.map((trait : string) => <p>{trait}</p>)}
            </ul>
        </div>
    );
}


export default Horoscope;