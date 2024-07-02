
type Props = {
    children: React.ReactNode,
}

const AuthLayout = ({
    children
}:Props) => {
    return(
    <div className="items-center h-screen flex flex-col justify-center">
    {children}
    </div>
    )
}

export default AuthLayout;