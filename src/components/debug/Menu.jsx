const Menu = ({ page, setPage, pageNames }) => {
    const menuItems = pageNames.map(
        (name, index) => {
            let disabled = name === page
            let className = disabled? "DisabledMenuButton" : "MenuButton"
            if (index === 0) className += " firstMenuButton"
            if (index === pageNames.length - 1) className += " lastMenuButton"
            return <button key={name} className={className} onClick={() => { setPage(name) }} disabled={disabled}>
                {name} </button>
        })

    return <div className="Menu">
        {menuItems}
    </div>
}

export default Menu