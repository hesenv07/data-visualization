import React from "react"
import { BoundaryErrorMessage } from "..";

class ErrorBoundaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // you can get parameters like (error)
        return { hasError: true };
    }
    componentDidCatch() {
        // you can get parameters like  (error, errorInfo)
        console.log()
    }

    render() {
        if (this.state.hasError) {
            return  <BoundaryErrorMessage />;
        }

        return this.props.children;
    }
}


export { ErrorBoundaryClass }