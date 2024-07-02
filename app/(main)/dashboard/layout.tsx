
type Props = {
    children: React.ReactNode,
}

const DashBoardLayout = ({
    children
}:Props) => {
    return(
    <div>
    {children}
    </div>
    )
}

export default DashBoardLayout;