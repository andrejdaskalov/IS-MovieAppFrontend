import Repository from "../repository/repository";
import React from "react";
export default function Home() {
    let tickets = Repository.getTickets();
    console.log(tickets);
    return (
        <>
            <p>Home</p>
        </>
    );
}