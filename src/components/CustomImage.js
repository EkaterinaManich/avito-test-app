import React from 'react'

export default function CustomImage({url, onClick}) {
    return <img className="CustomImage" src={url} alt="some" onClick={onClick} />
}
