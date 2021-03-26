/*
import express from "express"
import { promises as fs } from "fs"

const { readFile, writeFile } = fs

start()

async function start() {
    const jogos2003 = JSON.parse(await readFile("./jogos/2003/2003.json"))
    console.log(jogos2003[0])
}
*/

import { readFile } from "fs"

readFile("./jogos/2003/2003.json", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        data = JSON.parse(data)
        console.log(data)
    }
    readFile("./jogos/2004/2004.json", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            data = JSON.parse(data)
            console.log(data)
        }
        readFile("./jogos/2005/2005.json", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                data = JSON.parse(data)
                console.log(data)
            }
        })
    })
})
