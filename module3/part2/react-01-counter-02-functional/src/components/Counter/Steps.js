import React from "react"
import css from "./counter.module.css"

export default function Steps({current}) {
    return <span className={css.counterValue}>({current})</span>
}
