import React from 'react'

export default function CustomImage({url, onClick}) {
    return <img src={url} alt="some" onClick={onClick} />
}
